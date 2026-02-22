import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const workspaceId = req.headers['x-workspace-id'];
    const userWorkspaceId = req.user?.workspaceId ?? req.headers['x-user-workspace-id'];
    if (!workspaceId || !userWorkspaceId || workspaceId !== userWorkspaceId) {
      throw new ForbiddenException('Cross-tenant access denied');
    }
    req.workspaceId = workspaceId;
    return true;
  }
}

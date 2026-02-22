import { ExecutionContext } from '@nestjs/common';
import { WorkspaceGuard } from '../src/common/workspace.guard';

describe('WorkspaceGuard', () => {
  it('blocks cross-tenant requests', () => {
    const guard = new WorkspaceGuard();
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'x-workspace-id': 'w1', 'x-user-workspace-id': 'w2' } })
      })
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(ctx)).toThrow('Cross-tenant access denied');
  });
});

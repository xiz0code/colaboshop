import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../common/workspace.guard';

@Controller('workspace')
export class WorkspaceController {
  @Post('auth/google')
  authGoogle(@Body() body: { idToken: string }) {
    return { accessToken: `workspace-${body.idToken.slice(0, 8)}`, workspaceId: 'from-google-claim' };
  }

  @UseGuards(WorkspaceGuard)
  @Get('settings')
  settings() {
    return { commission: { type: 'PERCENT', value: 2.5 }, closeHour: 22, timezone: 'America/Santiago' };
  }
}

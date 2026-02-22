import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PlatformService } from './platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private readonly service: PlatformService) {}

  @Post('auth/google')
  authGoogle(@Body() body: { idToken: string }) { return this.service.authGoogle(body.idToken); }

  @Post('workspaces')
  createWorkspace(@Body() body: any) { return this.service.createWorkspace(body); }

  @Get('workspaces')
  listWorkspaces() { return this.service.listWorkspaces(); }

  @Get('plans')
  listPlans() { return this.service.listPlans(); }

  @Post('plans')
  createPlan(@Body() body: any) { return this.service.createPlan(body); }

  @Get('metrics')
  metrics() { return this.service.metrics(); }

  @Patch('workspaces/:id/suspend')
  suspend() { return { ok: true }; }
}

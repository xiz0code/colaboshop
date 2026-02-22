import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../common/workspace.guard';
import { SalesService } from './sales.service';

@Controller('workspace/sales')
@UseGuards(WorkspaceGuard)
export class SalesController {
  constructor(private readonly service: SalesService) {}
  @Post() create(@Req() req: any, @Body() body: any) { return this.service.createSale(req.workspaceId, body, req.user?.userId ?? 'system'); }
}

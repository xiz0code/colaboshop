import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../common/workspace.guard';
import { InventoryService } from './inventory.service';

@Controller('workspace/inventory')
@UseGuards(WorkspaceGuard)
export class InventoryController {
  constructor(private readonly service: InventoryService) {}
  @Post('add') add(@Req() req: any, @Body() body: any) { return this.service.add(req.workspaceId, body); }
}

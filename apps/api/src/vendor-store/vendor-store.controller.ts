import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../common/workspace.guard';
import { VendorStoreService } from './vendor-store.service';

@Controller('workspace/vendor-stores')
@UseGuards(WorkspaceGuard)
export class VendorStoreController {
  constructor(private readonly service: VendorStoreService) {}
  @Get() list(@Req() req: any) { return this.service.list(req.workspaceId); }
  @Post() create(@Req() req: any, @Body() body: any) { return this.service.create(req.workspaceId, body); }
}

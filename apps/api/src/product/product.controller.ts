import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../common/workspace.guard';
import { ProductService } from './product.service';

@Controller('workspace/products')
@UseGuards(WorkspaceGuard)
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @Get() list(@Req() req: any) { return this.service.list(req.workspaceId); }
  @Post() create(@Req() req: any, @Body() body: any) { return this.service.create(req.workspaceId, body); }
}

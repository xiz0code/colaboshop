import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../common/workspace.guard';

@Controller('workspace/reports')
@UseGuards(WorkspaceGuard)
export class ReportsController {
  @Get('daily') daily(@Query('date') date: string) { return { date, totals: [] }; }
  @Get('monthly') monthly(@Query('month') month: string) { return { month, totals: [] }; }
}

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 * * * *')
  async runDailyReports() {
    const workspaces = await this.prisma.workspace.findMany({ where: { status: 'ACTIVE' } });
    for (const workspace of workspaces) {
      await this.prisma.dailyReportLog.create({
        data: { workspaceId: workspace.id, reportDate: new Date(), status: 'QUEUED', metadata: { closeHour: workspace.closeHour, timezone: workspace.timezone } }
      });
    }
  }
}

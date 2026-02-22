import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlatformService {
  constructor(private readonly prisma: PrismaService) {}
  authGoogle(idToken: string) { return { accessToken: `platform-${idToken.slice(0, 8)}` }; }
  createWorkspace(data: any) { return this.prisma.workspace.create({ data }); }
  listWorkspaces() { return this.prisma.workspace.findMany(); }
  listPlans() { return this.prisma.plan.findMany(); }
  createPlan(data: any) { return this.prisma.plan.create({ data }); }
  async metrics() {
    const [workspaces, vendors, sales] = await Promise.all([
      this.prisma.workspace.count(), this.prisma.vendorStore.count(), this.prisma.sale.count()
    ]);
    return { workspaces, vendors, sales };
  }
}

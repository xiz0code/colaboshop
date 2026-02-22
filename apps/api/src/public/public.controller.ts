import { Controller, Get, Param, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('public/vendor')
export class PublicController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':token/summary')
  async summary(@Param('token') token: string) {
    const vendor = await this.prisma.vendorStore.findUnique({ where: { publicToken: token } });
    if (!vendor) return { error: 'not found' };
    const sales = await this.prisma.saleItem.findMany({ where: { vendorStoreId: vendor.id, workspaceId: vendor.workspaceId } });
    const total = sales.reduce((acc, item) => acc + Number(item.subtotal), 0);
    const commission = sales.reduce((acc, item) => acc + Number(item.commission), 0);
    return { vendor: vendor.name, total, commission, net: total - commission };
  }

  @Get(':token/sales')
  sales(@Param('token') token: string, @Query('from') from: string, @Query('to') to: string) {
    return { token, from, to, items: [] };
  }
}

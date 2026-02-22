import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService, private readonly realtime: RealtimeGateway) {}

  async createSale(workspaceId: string, payload: any, createdBy: string) {
    const paymentMethod = payload.paymentMethod as 'CASH' | 'CARD';
    return this.prisma.$transaction(async (tx) => {
      const products = await Promise.all(payload.items.map((item: any) =>
        tx.product.findFirst({ where: { id: item.productId, workspaceId } })
      ));

      products.forEach((p, idx) => {
        if (!p) throw new BadRequestException('Product not found in workspace');
        if (p.stock < payload.items[idx].quantity) throw new BadRequestException('Insufficient stock');
      });

      let total = 0;
      let totalCommission = 0;
      const itemsData = products.map((product, idx) => {
        const qty = payload.items[idx].quantity;
        const subtotal = Number(product!.price) * qty;
        const commission = paymentMethod === 'CARD' ? subtotal * 0.025 : 0;
        total += subtotal;
        totalCommission += commission;
        return {
          workspaceId,
          productId: product!.id,
          vendorStoreId: product!.vendorStoreId,
          quantity: qty,
          unitPrice: product!.price,
          subtotal,
          commission,
          net: subtotal - commission,
        };
      });

      const sale = await tx.sale.create({
        data: {
          workspaceId,
          paymentMethod,
          total,
          totalCommission,
          netTotal: total - totalCommission,
          createdBy,
          items: { create: itemsData },
        },
        include: { items: true },
      });

      for (const item of itemsData) {
        await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
        await tx.inventoryMovement.create({
          data: {
            workspaceId,
            productId: item.productId,
            vendorStoreId: item.vendorStoreId,
            type: 'OUT',
            quantity: item.quantity,
            reason: `Sale ${sale.id}`,
            createdBy,
          },
        });
      }

      this.realtime.emitSaleCreated(sale);
      return sale;
    });
  }
}

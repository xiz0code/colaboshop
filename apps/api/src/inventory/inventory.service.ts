import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}
  async add(workspaceId: string, body: { productId: string; quantity: number; reason: string; createdBy: string; vendorStoreId: string }) {
    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({ where: { id: body.productId, workspaceId }, data: { stock: { increment: body.quantity } } as any });
      return tx.inventoryMovement.create({
        data: { workspaceId, productId: body.productId, vendorStoreId: body.vendorStoreId, quantity: body.quantity, reason: body.reason, type: 'IN', createdBy: body.createdBy }
      });
    });
  }
}

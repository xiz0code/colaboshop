import { BadRequestException } from '@nestjs/common';
import { SalesService } from '../src/sales/sales.service';

describe('SalesService', () => {
  it('rejects sale with insufficient stock', async () => {
    const prisma: any = {
      $transaction: (fn: any) => fn({
        product: { findFirst: jest.fn().mockResolvedValue({ id: 'p1', stock: 0, price: 1000, vendorStoreId: 'v1' }) }
      })
    };
    const realtime: any = { emitSaleCreated: jest.fn() };
    const service = new SalesService(prisma, realtime);

    await expect(service.createSale('w1', { paymentMethod: 'CASH', items: [{ productId: 'p1', quantity: 1 }] }, 'u1'))
      .rejects.toBeInstanceOf(BadRequestException);
  });
});

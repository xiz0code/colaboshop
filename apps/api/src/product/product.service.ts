import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  list(workspaceId: string) { return this.prisma.product.findMany({ where: { workspaceId } }); }
  create(workspaceId: string, data: any) {
    const barcodeValue = `CB-${workspaceId.slice(-6)}-${Date.now()}`;
    return this.prisma.product.create({ data: { ...data, workspaceId, barcodeValue } });
  }
}

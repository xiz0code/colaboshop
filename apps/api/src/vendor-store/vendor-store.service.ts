import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorStoreService {
  constructor(private readonly prisma: PrismaService) {}
  list(workspaceId: string) { return this.prisma.vendorStore.findMany({ where: { workspaceId } }); }
  create(workspaceId: string, data: any) {
    return this.prisma.vendorStore.create({ data: { ...data, workspaceId, publicToken: randomBytes(24).toString('hex') } });
  }
}

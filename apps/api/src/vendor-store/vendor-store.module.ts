import { Module } from '@nestjs/common';
import { VendorStoreController } from './vendor-store.controller';
import { VendorStoreService } from './vendor-store.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({ controllers: [VendorStoreController], providers: [VendorStoreService, PrismaService] })
export class VendorStoreModule {}

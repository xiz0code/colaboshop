import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaService } from './prisma/prisma.service';
import { PlatformModule } from './platform/platform.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { VendorStoreModule } from './vendor-store/vendor-store.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';
import { PublicModule } from './public/public.module';
import { RealtimeModule } from './realtime/realtime.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PlatformModule,
    WorkspaceModule,
    VendorStoreModule,
    ProductModule,
    InventoryModule,
    SalesModule,
    ReportsModule,
    PublicModule,
    RealtimeModule,
    JobsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

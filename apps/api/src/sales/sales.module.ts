import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Module({ controllers: [SalesController], providers: [SalesService, PrismaService, RealtimeGateway], exports: [SalesService] })
export class SalesModule {}

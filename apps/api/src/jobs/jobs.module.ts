import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({ providers: [JobsService, PrismaService] })
export class JobsModule {}

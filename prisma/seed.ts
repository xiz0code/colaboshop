import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const free = await prisma.plan.upsert({
    where: { code: 'FREE' },
    update: {},
    create: { code: 'FREE', name: 'Free', maxVendors: 10, maxProducts: 200, maxUsers: 2 },
  });

  await prisma.plan.upsert({
    where: { code: 'PRO' },
    update: {},
    create: {
      code: 'PRO',
      name: 'Pro',
      maxVendors: 1000,
      maxProducts: 20000,
      maxUsers: 40,
      dailyEmailReportsEnabled: true,
      exportsEnabled: true,
      customCommissionEnabled: true,
    },
  });

  await prisma.workspace.upsert({
    where: { id: 'seed-workspace' },
    update: {},
    create: {
      id: 'seed-workspace',
      name: 'ColaboStore Centro',
      adminEmail: 'admin@demo.cl',
      planId: free.id,
      users: {
        create: {
          role: 'WORKSPACE_ADMIN',
          email: 'admin@demo.cl',
          googleSub: 'demo-google-sub'
        }
      }
    }
  });
}

main().finally(() => prisma.$disconnect());

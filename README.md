# ColaboShop (SaaS multi-tenant)

Monorepo con NestJS + Prisma + PostgreSQL + Redis + React (Vite) para gestionar tiendas colaborativas por workspace.

## Estructura
- `apps/api`: API NestJS (`/platform/*`, `/workspace/*`, `/public/*`)
- `apps/platform-web`: panel superadmin
- `apps/admin-web`: panel workspace
- `packages/shared`: tipos compartidos
- `prisma`: schema, migración inicial y seed

## Levantar con Docker
```bash
docker compose up --build
```

## Setup local
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run -w apps/api start:dev
```

## Multi-tenant enforcement
- `workspaceId` en entidades de negocio.
- `WorkspaceGuard` bloquea acceso cruzado por headers/JWT.
- Endpoints públicos resuelven `workspaceId` desde `publicToken`.

## Feature flags y límites por plan
El modelo `Plan` define límites y banderas (`maxVendors`, `exportsEnabled`, etc.). El servicio `FeatureFlagsService` permite bloquear acciones cuando exceden el plan.

## Jobs diarios
`JobsService` ejecuta cron y registra `DailyReportLog` por workspace con su `timezone` y `closeHour`.

## Tests
```bash
npm run -w apps/api test
```

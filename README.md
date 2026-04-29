# Velvet Ink — Sleek Articles Platform

Full-stack article platform with:
- React + TypeScript + Vite + Tailwind (shadcn-inspired design system)
- Express + TypeScript backend
- PostgreSQL via Prisma
- JWT auth with role-based admin publishing
- Authenticated commenting

## Quick start

1. Install dependencies
```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```
2. Copy env
```bash
cp backend/.env.example backend/.env
```
3. Run database migrations
```bash
npm --prefix backend run prisma:generate
npm --prefix backend run prisma:migrate
```
4. Start both apps
```bash
npm run dev
```

The first account to sign up is auto-promoted to ADMIN.

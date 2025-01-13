# Tanstack start example

This is an example app what I will use to showcase using different technologies together.

## Running

Install the dependencies with `pnpm` (You can install pnpm with volta or standalone)

```sh
pnpm i
```

You will need a postgres instance running. You can create one in a container with:

```sh
podman run -d -p 5432:5432 \
  -e POSTGRES_USER=drizzle \
  -e POSTGRES_DB=drizzle \
  -e POSTGRES_PASSWORD="drizzle" \
  --name drizzle-pg \
  postgres:15.3-alpine 
```

## Technology stack

### Router: Tanstack Start

Tanstack start is a SSR framework based on [Tanstack Router](tanstack-router)

[tanstack-router](https://tanstack.com/router/latest)

### Database and ORM: Postgress and DrizzleORM

### Styling and UI components: Tailwind and Shadcn/UI

### Testing: Vitest and Playwright

###

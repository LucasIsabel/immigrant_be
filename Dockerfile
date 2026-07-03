# Stage 1: Dependencies
FROM node:22-bullseye AS deps
WORKDIR /app
# Use npm ci in Docker build to avoid pnpm lockfile / interactive approval issues in CI
COPY package.json package-lock.json .npmrc* ./
RUN npm ci --unsafe-perm --no-audit --progress=false

# Stage 2: Build
# Stage 2: Build
COPY --from=deps /app/node_modules ./node_modules
FROM node:22-bullseye AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN pnpm build && npx nest build microservice

# Stage 3: Production - API + Microservice (single container)
# Stage 3: Production - API + Microservice (single container)
FROM node:22-bullseye AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY scripts/start.sh ./scripts/start.sh
RUN chmod +x ./scripts/start.sh
EXPOSE 3000
CMD ["./scripts/start.sh"]

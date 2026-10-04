FROM node:22-alpine AS build

WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm ci
COPY app/ ./
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=build /app/.output ./.output

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

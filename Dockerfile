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
# Bind every interface. Railway's proxy cannot reach a server that only
# listens on localhost, which is what produces "Application failed to respond".
ENV NITRO_HOST=0.0.0.0
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

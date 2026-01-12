FROM oven/bun:1 AS builder
WORKDIR /tmp

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && update-ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./

RUN bun install --production

COPY . .

RUN bun run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /tmp/dist /usr/share/nginx/html

EXPOSE 8080

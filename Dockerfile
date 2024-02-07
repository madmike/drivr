FROM node:20-alpine as base

ENV NODE_ENV build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

#FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NODE_ENV production
RUN pnpm build


# FROM base AS prod-deps
# ENV NODE_ENV production
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts


FROM node:20-alpine as prod
ENV NODE_ENV production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

#COPY --from=prod-deps /app/node_modules /app/node_modules
#COPY --from=build /app/.nuxt/ /app/.nuxt/
COPY --from=base /app/.output/ /app/.output/
WORKDIR /app

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]
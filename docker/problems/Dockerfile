FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./apps/problems /usr/src/app/apps/problems

RUN npm install pnpm -g -y

# Install dependencies
RUN pnpm install

# Generate Prisma client
RUN cd packages/db && pnpm dlx prisma generate

# Expose ports for both applications
EXPOSE 3000

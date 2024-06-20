FROM node:20-alpine

ARG DATABASE_URL
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire monorepo into the container
COPY ./packages /usr/src/app/packages
COPY ./apps/sweeper /usr/src/app/apps/sweeper
COPY package.json /usr/src/app/package.json
COPY pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml
COPY pnpm-workspace.yaml /usr/src/app/pnpm-workspace.yaml
COPY turbo.json /usr/src/app/turbo.json
COPY tsconfig.json /usr/src/app/tsconfig.json

RUN npm install pnpm -g -y

# Install dependencies
RUN pnpm install

# Generate Prisma client
RUN cd packages/db && DATABASE_URL=$DATABASE_URL pnpm dlx prisma generate

WORKDIR /usr/src/app/apps/sweeper

# Command to start both services
RUN  pnpm run build
CMD ["pnpm", "run", "start"]

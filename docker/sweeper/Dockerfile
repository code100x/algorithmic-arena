FROM node:20-alpine

ARG DATABASE_URL
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire monorepo into the container
COPY ./packages /usr/src/app/packages
COPY ./apps/sweeper /usr/src/app/apps/sweeper
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY turbo.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

# Install dependencies
RUN pnpm install

# Generate Prisma client
RUN cd packages/db && DATABASE_URL=$DATABASE_URL pnpm dlx prisma generate

WORKDIR /usr/src/app

# Command to start both services
RUN pnpm run build --prefix apps/sweeper
CMD ["pnpm", "run", "start:sweeper"]

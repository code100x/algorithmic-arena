FROM node:20-alpine

ARG DATABASE_URL
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire monorepo into the container
COPY ./packages /usr/src/app/packages
COPY ./apps/web /usr/src/app/apps/web
COPY package.json /usr/src/app/package.json
COPY pnpm-lock.json /usr/src/app/pnpm-lock.json
COPY pnpm-workspace.yaml /usr/src/app/pnpm-workspace.yaml
COPY turbo.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

# Install dependencies
RUN pnpm install

# Generate Prisma client
RUN cd packages/db && DATABASE_URL=$DATABASE_URL pnpm dlx prisma generate

# Expose ports for both applications
EXPOSE 3000

WORKDIR /usr/src/app

# Command to start both services
RUN pnpm run build --prefix apps/web
CMD ["pnpm", "run", "start:web"]

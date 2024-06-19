FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./apps/problems /usr/src/app/apps/problems

# Install dependencies
RUN npm install

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Expose ports for both applications
EXPOSE 3000
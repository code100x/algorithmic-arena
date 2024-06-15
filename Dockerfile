FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire monorepo into the container
COPY . .

# Install dependencies
RUN yarn install

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Expose ports for both applications
EXPOSE 3000

WORKDIR /usr/src/app

# Command to start both services
CMD ["yarn", "run", "dev:docker"]

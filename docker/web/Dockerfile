FROM node:20-alpine

ARG DATABASE_URL
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire monorepo into the container
COPY ./packages /usr/src/app/packages
COPY ./apps/web /usr/src/app/apps/web
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY turbo.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN cd packages/db && DATABASE_URL=$DATABASE_URL npx prisma generate

# Expose ports for both applications
EXPOSE 3000

WORKDIR /usr/src/app

# Command to start both services
RUN npm run build --prefix apps/web
CMD ["npm", "run", "start:web"]
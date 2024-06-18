# Local Development Setup
### All Sevices withing Docker
NOTE: Do not update any of the ENV files for this particular configuration. ( Except the mount path for problems )
1. Update the ``##YOUR_LOCAL_PATH_TO_PROBLEMS_DIR##`` in the docker-compose file
2. Start the services
```bash
docker-compose up -d
```
3. Install dependencies
```bash
yarn install
```
4. Copy env files
```bash
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env
```
5. Update the mount path in the ``apps/web/.env``
6. Migrate Database and install local package
```bash
npx turbo db:migrate && yarn install
```
7. Start Dev
```bash
yarn dev
```
---
### Own Configuration

1.Configure the judge0.conf
  - Update the POSTGRES and REDIS configurations based on your local databases
2. Update the ``##YOUR_LOCAL_PATH_TO_PROBLEMS_DIR##`` in the docker-compose file
3. Start only judge0 service
```bash
docker-compose up server workers -d
```
4. Install dependencies
```bash
yarn install
```
5. Copy env files and configure with the same conf you updated in the judge0
```bash
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env
```
6. Update the mount path in the ``apps/web/.env``
7. Migrate Database and install local package
```bash
npx turbo db:migrate && yarn install
```
8. Start Dev
```bash
yarn dev
```

### If you use JUDGE0 in windows, change the mount path to have the \ instead of / for the mounting of judge0.conf and mounting of problems.

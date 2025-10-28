# Database Setup Instructions

## Option 1: Local PostgreSQL Installation

### 1. Install PostgreSQL

Download and install PostgreSQL from: https://www.postgresql.org/download/

### 2. Create Database

```bash
psql -U postgres -c "CREATE DATABASE univesp_feirabairro;"
```

### 3. Run Schema

```bash
psql -U postgres -d univesp_feirabairro -f database/schema.sql
```

### 4. Load Sample Data (Optional)

```bash
psql -U postgres -d univesp_feirabairro -f database/seed-data.sql
```

### 5. Configure Connection String

Create `.env.local` in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=univesp_feirabairro
DB_USER=postgres
DB_PASSWORD=your_password
```

Connection string is configured in `src/lib/db.ts`

---

## Option 2: PostgreSQL with Docker

### 1. Run PostgreSQL Container

```bash
docker run --name feirabairro-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=univesp_feirabairro \
  -p 5432:5432 \
  -v feirabairro-data:/var/lib/postgresql/data \
  -d postgres:16-alpine
```

**Windows PowerShell:**
```powershell
docker run --name feirabairro-db `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=univesp_feirabairro `
  -p 5432:5432 `
  -v feirabairro-data:/var/lib/postgresql/data `
  -d postgres:16-alpine
```

### 2. Run Schema

```bash
docker exec -i feirabairro-db psql -U postgres -d univesp_feirabairro < database/schema.sql
```

### 3. Load Sample Data (Optional)

```bash
docker exec -i feirabairro-db psql -U postgres -d univesp_feirabairro < database/seed-data.sql
```

### 4. Configure Connection String

Create `.env.local` in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=univesp_feirabairro
DB_USER=postgres
DB_PASSWORD=postgres
```

### PostgreSQL Docker Management Commands

**Stop container:**
```bash
docker stop feirabairro-db
```

**Start container:**
```bash
docker start feirabairro-db
```

**Remove container:**
```bash
docker rm -f feirabairro-db
```

**Access PostgreSQL shell:**
```bash
docker exec -it feirabairro-db psql -U postgres -d univesp_feirabairro
```

---

# Docker Instructions

## Build Docker Image

```bash
docker build -t feirabairro .
```

## Run Docker Container Locally

### Development Mode (with volume mount for debugging)

```bash
docker run -p 3000:3000 \
  -v ${PWD}:/app \
  -v /app/node_modules \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=univesp_feirabairro \
  -e DB_USER=postgres \
  -e DB_PASSWORD=your_password \
  feirabairro
```

**Windows PowerShell:**
```powershell
docker run -p 3000:3000 `
  -v ${PWD}:/app `
  -v /app/node_modules `
  -e DB_HOST=host.docker.internal `
  -e DB_PORT=5432 `
  -e DB_NAME=univesp_feirabairro `
  -e DB_USER=postgres `
  -e DB_PASSWORD=your_password `
  feirabairro
```

### Production Mode

```bash
docker run -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=univesp_feirabairro \
  -e DB_USER=postgres \
  -e DB_PASSWORD=your_password \
  feirabairro
```

**Note:** `host.docker.internal` allows Docker container to access PostgreSQL running on host machine.


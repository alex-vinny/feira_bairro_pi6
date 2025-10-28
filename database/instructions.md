# Database Setup Instructions

## 1. Install PostgreSQL

Download and install PostgreSQL from: https://www.postgresql.org/download/

## 2. Create Database

```bash
psql -U postgres -c "CREATE DATABASE resellpur;"
```

## 3. Run Schema

```bash
psql -U postgres -d resellpur -f database/schema.sql
```

## 4. Load Sample Data (Optional)

```bash
psql -U postgres -d resellpur -f database/seed-data.sql
```

## 5. Configure Connection String

Create `.env.local` in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resellpur
DB_USER=postgres
DB_PASSWORD=your_password
```

Connection string is configured in `src/lib/db.ts`


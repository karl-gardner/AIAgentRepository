# IntelliCall Quick Start Guide

## What Changed?

Your repository has been converted from ASP.NET Core Razor Pages to a modern Node.js + React stack:

- **Backend**: ASP.NET Core → Node.js + Express + TypeORM
- **Frontend**: Razor Pages → React + TypeScript
- **Database**: JSON files → SQL Server with TypeORM
- **Auth**: Session-based → JWT tokens
- **Branding**: CallFlow AI → IntelliCall

## Quick Start (5 minutes)

### 1. Setup SQL Server

Create the database:
```sql
CREATE DATABASE IntelliCallDB;
```

### 2. Configure Backend

Edit `backend/.env` with your SQL Server credentials:
```env
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=IntelliCallDB
```

### 3. Install & Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run at: http://localhost:3001

### 4. Install & Run Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: http://localhost:3000

### 5. Migrate Existing Data (Optional)

If you have existing JSON data from the old .NET app:
```bash
cd backend
npm run dev -- src/scripts/migrate-json-data.ts
```

### 6. Create First User

Option A - Via SQL:
```sql
USE IntelliCallDB;
INSERT INTO customers (id, name, email, created_at)
VALUES (NEWID(), 'Admin User', 'admin@intellicall.com', GETUTCDATE());
```

Option B - Via Admin Panel:
1. Login with any email (first time bypass)
2. Go to /admin
3. Add customer using the form

## Project Structure

```
backend/          # Node.js API (Port 3001)
  └── src/
      ├── entities/     # TypeORM models
      ├── routes/       # API endpoints
      └── server.ts     # Main server

frontend/         # React App (Port 3000)
  └── src/
      ├── pages/        # Page components
      ├── contexts/     # Auth & state
      └── services/     # API client
```

## Available Pages

- **/** - Landing page with features
- **/login** - Customer login
- **/dashboard** - Customer notes dashboard
- **/admin** - Customer management
- **/privacy** - Privacy policy

## API Endpoints

```
POST   /api/auth/login                    # Login
POST   /api/auth/login-as-customer        # Admin impersonation
GET    /api/customers                     # List customers
POST   /api/customers                     # Create customer
GET    /api/dashboard                     # Get user notes
PUT    /api/dashboard                     # Save user notes
```

## Common Issues

**Database connection fails?**
- Ensure SQL Server is running
- Check credentials in `backend/.env`
- Try `127.0.0.1` instead of `localhost`
- For named instance: `localhost\\SQLEXPRESS`

**Port already in use?**
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.ts`

**API calls fail?**
- Check backend is running on port 3001
- Verify CORS is enabled
- Check browser console for errors

## Next Steps

1. ✅ Set up SQL Server database
2. ✅ Configure backend `.env` file
3. ✅ Install dependencies (`npm install`)
4. ✅ Start backend (`npm run dev`)
5. ✅ Start frontend (`cd ../frontend && npm run dev`)
6. ✅ Access http://localhost:3000
7. ✅ Create your first customer
8. ✅ Start developing!

## Need Help?

See the full README.md for detailed documentation, troubleshooting, and security notes.

---

**Built with Node.js, React, TypeORM, and SQL Server**

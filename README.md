# IntelliCall - AI-Powered Call Center Platform

IntelliCall is an AI-powered call center platform that helps businesses manage customer interactions, appointments, and inquiries 24/7. This application has been converted from ASP.NET Core to a modern Node.js + React + TypeORM stack with SQL Server.

## Technology Stack

### Backend
- **Node.js** with **Express** - RESTful API server
- **TypeScript** - Type-safe code
- **TypeORM** - Object-Relational Mapping for SQL Server
- **SQL Server** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React 18** with **TypeScript**
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - UI framework

## Project Structure

```
AIAgentRepository/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── entities/       # TypeORM entities
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── scripts/        # Utility scripts
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Main server file
│   ├── .env                # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # React application
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── contexts/      # React contexts
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── styles/        # CSS files
    │   ├── types/         # TypeScript types
    │   ├── App.tsx        # Main app component
    │   └── main.tsx       # Entry point
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **SQL Server** (2019 or higher) - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
  - SQL Server Express (free) is sufficient for development
  - Alternatively, use Azure SQL Database

## Getting Started

### 1. Database Setup

1. **Install SQL Server** (if not already installed)
   - Download and install SQL Server Express or Developer Edition
   - Note your server name (usually `localhost` or `.\SQLEXPRESS`)

2. **Create Database**
   ```sql
   CREATE DATABASE IntelliCallDB;
   ```

3. **Create Login (if using SQL Server Authentication)**
   ```sql
   CREATE LOGIN intellicall_user WITH PASSWORD = 'YourPassword123!';
   USE IntelliCallDB;
   CREATE USER intellicall_user FOR LOGIN intellicall_user;
   ALTER ROLE db_owner ADD MEMBER intellicall_user;
   ```

### 2. Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Edit `backend/.env` file with your database credentials:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=1433
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=IntelliCallDB

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=30m

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Run database migrations (optional)**

   If you have existing data in JSON files (customers.json, dashboard.json):
   - Create a `data/` folder in the project root
   - Place your JSON files in the `data/` folder
   - Run the migration script:
   ```bash
   npm run dev -- src/scripts/migrate-json-data.ts
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

   The API will be running at `http://localhost:3001`

### 3. Frontend Setup

1. **Navigate to frontend directory** (from project root)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/health

## Default Test Data

If you migrated data from the old application, your existing customers will be available. Otherwise, you can create customers through the Admin panel.

### Creating Your First User

1. Navigate to http://localhost:3000/login
2. Since no customers exist yet, you'll need to:
   - Create a customer directly in the database, OR
   - Use the Admin panel (requires authentication bypass for first user)

### Manual Customer Creation (SQL)

```sql
USE IntelliCallDB;

INSERT INTO customers (id, name, email, created_at)
VALUES (
  NEWID(),
  'Admin User',
  'admin@intellicall.com',
  GETUTCDATE()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Customer login
- `POST /api/auth/login-as-customer` - Admin impersonation

### Customers
- `GET /api/customers` - Get all customers (authenticated)
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer

### Dashboard
- `GET /api/dashboard` - Get dashboard data for authenticated user
- `PUT /api/dashboard` - Save dashboard data
- `GET /api/dashboard/:customerId` - Get dashboard data by customer ID (admin)

## Development

### Backend Development

```bash
cd backend
npm run dev        # Start dev server with hot reload
npm run build      # Compile TypeScript
npm start          # Run compiled code
```

### Frontend Development

```bash
cd frontend
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/` directory.

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `DB_HOST` | SQL Server host | localhost |
| `DB_PORT` | SQL Server port | 1433 |
| `DB_USERNAME` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | IntelliCallDB |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | Token expiration | 30m |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |

## Troubleshooting

### Database Connection Issues

1. **SQL Server not running**
   - Start SQL Server service from Services (Windows) or systemctl (Linux)

2. **Authentication failed**
   - Verify username and password in `.env`
   - Ensure SQL Server authentication is enabled
   - Check firewall settings

3. **Cannot connect to localhost**
   - Try `127.0.0.1` instead of `localhost`
   - For named instances, use `localhost\\SQLEXPRESS`

### Backend Issues

1. **Port already in use**
   - Change `PORT` in `.env` to a different port

2. **TypeORM errors**
   - Ensure database exists
   - Check entity definitions
   - Verify database credentials

### Frontend Issues

1. **API calls failing**
   - Ensure backend is running on port 3001
   - Check CORS configuration
   - Verify API base URL in `frontend/src/services/api.ts`

2. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf node_modules/.vite`

## Migration from .NET Application

This application was converted from an ASP.NET Core Razor Pages application. Key changes:

1. **Backend**: ASP.NET Core → Node.js + Express + TypeORM
2. **Frontend**: Razor Pages → React + TypeScript
3. **Database**: JSON files → SQL Server
4. **Authentication**: Session-based → JWT tokens
5. **Branding**: CallFlow AI → IntelliCall

If you have existing JSON data files (customers.json, dashboard.json), the migration script (`backend/src/scripts/migrate-json-data.ts`) can import them. Place the files in a `data/` folder at the project root and run the migration script.

## Features

- **Customer Management** - Add, view, and manage customers
- **Dashboard** - Customer-specific notes and content management
- **Authentication** - JWT-based secure authentication
- **Admin Panel** - Customer impersonation and management
- **Responsive Design** - Mobile-friendly Bootstrap UI
- **Landing Page** - Professional marketing page
- **Industry Solutions** - Tailored for restaurants, real estate, and medical

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change JWT Secret** - Use a strong, random secret in production
2. **Enable HTTPS** - Use SSL/TLS certificates in production
3. **Database Credentials** - Never commit `.env` file to version control
4. **Password Policies** - Implement strong password requirements
5. **Admin Access** - Add proper admin authentication
6. **Rate Limiting** - Implement rate limiting for API endpoints
7. **Input Validation** - Validate all user inputs

## License

This project is proprietary and confidential.

## Support

For questions or issues:
- Email: contact@intellicall.com
- Phone: 1-800-INTELLI

---

Built with ❤️ using Node.js, React, and TypeORM

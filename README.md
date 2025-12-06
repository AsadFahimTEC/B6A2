# 🚗 Project Name: Vehicle Rental System

## 🎯 Live Website Link: https://vehiclerentalsystems.vercel.app/

📚 Additional Features

A backend API for a vehicle rental management system that handles:
- **Vehicles** - Manage vehicle inventory with availability tracking
- **Customers** - Manage customer accounts and profiles
- **Bookings** - Handle vehicle rentals, returns and cost calculation
- **Authentication** - Secure role-based access control (Admin and Customer roles)

## 🔐 Authentication & Authorization

### User Roles
- **Admin** - Full system access to manage vehicles, users and all bookings
- **Customer** - Can register, view vehicles, create/manage own bookings

### Authentication Flow
1. Passwords are hashed using bcrypt before storage into the database
2. User login via `/api/v1/auth/signin` and receives a JWT (JSON Web Token)
3. Protected endpoints require token in header: `Authorization: Bearer <token>`
4. Validates the token and checks user permissions
5. Access granted if authorized, otherwise returns 401 (Unauthorized) or 403 (Forbidden)

---

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

---

## 📁 Setup & Usage Instructions

> - at first create package.json file using command npm init -y
- we can install express.js web framework from their official documentation using npm i express --save command
- now typescript tsconfig.json file created using npm i -D tsx command
- now use "dev" : "npx tsx watch ./src/server.ts" in package.json for current changed watching on that
- now we can create server.ts file and use basic express code from their website for basic server setup
- now we can use npm run dev command for running our server locally
- after that we can follow a modular pattern as create 4 folders in src to modules folder as auth, bookings, users & vehicles
- here auth folder can be use for authentication of admin and customers with 3 files name as auth.routes.ts, auth.controllers.ts & auth.services.ts
- here first file will be use for route definition, second will be use for user request and server response and third use for controlled business logic
- same work for bookings, users and vehicles files also
- app.ts file use for app routes setup
- server.ts file use for server setup
- .env file add for database connection string, jwt secret and port as make safety for our app
- .gitignore file add for ignoring the node_modules in github
- here middleware folder will be in config folder where auth.ts can be use for authorization of customers and admin
- we can use json web token JWT for out authorization also use Bearer JWT for admin and customers authentication
- vercel.json file added for deployment of our production file to the website before it can build and deploy to vercel

---

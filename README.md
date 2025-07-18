# Genkit Project with PostgreSQL Integration

This project demonstrates how to create a Genkit flow that connects to a PostgreSQL database.

## Prerequisites

- Node.js and npm installed
- A running PostgreSQL database

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your PostgreSQL database:**
   - Create a database and a user with access to it.
   - You can use the following SQL commands as a reference:
     ```sql
     CREATE DATABASE your_database;
     CREATE USER your_user WITH PASSWORD 'your_password';
     GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;
     ```

3. **Configure database connection:**
   - Open `src/index.ts` and replace the placeholder connection details in the `main` function with your actual database credentials:
     ```typescript
     const dbResult = await postgresFlow({
       user: "your_user",
       host: "your_host",
       database: "your_database",
       password: "your_password",
       port: 5432,
     });
     ```

4. **Run the project:**
   ```bash
   npx genkit start
   ```

This will start the Genkit development server. You can then interact with the flows through the Genkit UI. The `main` function will also be executed, and you will see the output of both the `recipeGeneratorFlow` and the `postgresFlow` in the console.

# Capybara Hub Backend

A robust hotel booking system backend built with NestJS and MongoDB.

## Project Overview

Capybara Hub is a hotel management system that enables customers to book rooms, manage their profiles, and interact with hotel services through a secure API.

## Features

### Authentication

- [x] Customer signup
- [x] Secure signin with JWT authentication
- [ ] Protected routes with role-based access

### Customer Management

- [x] Profile creation and management
- [x] Address management
- [x] Profile deletion capabilities
- [x] Secure password handling with bcrypt

### Hotel Management

- [ ] Hotel creation and listing
- [ ] Room management system
- [ ] Hotel address management
- [ ] Multiple room types support

### Booking System

- [ ] Room booking functionality
- [ ] Booking management (create, update, cancel)
- [ ] Booking history tracking

### API Documentation

- Swagger/OpenAPI integration
- Detailed API endpoint documentation
- Response examples and error handling

## Tech Stack

- NestJS
- MongoDB with Mongoose
- JWT Authentication
- TypeScript
- OpenAPI/Swagger

## Running Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/capybara-hub-back-end.git
    ```

2. Install dependencies:

    ```bash
    cd capybara-hub-back-end && npm install
    ```

3. Create a .env file in the root directory with the following variables:

    ```plain_text
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the development server:

    ```bash
    npm run start:dev
    ```

5. Access the API documentation:

    - Open your browser and navigate to <http://localhost:3000/api/docs>
    - The Swagger documentation will be available for testing endpoints

## API Endpoints

- POST /auth/signup - Register a new customer
- POST /auth/signin - Customer login
- GET /customers/profile - Get customer profile
- PATCH /customers/profile - Update customer profile
- POST /hotels - Create new hotel
- POST /rooms - Add new room
- POST /bookings - Create new booking

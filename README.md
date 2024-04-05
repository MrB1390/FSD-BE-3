# Order-Management Application

This project is an Order-Management application built with Node.js and Express.js. It provides functionality for managing users, products, orders, and categories.

## Features

- **User Management**:
  - Create, retrieve, update, and delete user accounts.
  - User authentication with JWT tokens and secure cookie storage.
  - User role management (e.g., user or admin).

- **Authentication and Authorization**:
  - User login with email and password.
  - Email verification and password reset functionality.
  - Logout functionality to clear authentication cookies.

- **Product Management**:
  - Create, retrieve, update, and delete product listings.
  - Product status management (e.g., available or unavailable).

- **Order Management**:
  - Create, retrieve, update, and delete customer orders.
  - Order status management (e.g., placed or not placed).

- **Category Management**:
  - Create, retrieve, update, and delete product categories.
  - Category images for better organization.

## Middleware

- **Authentication Middleware**:
  - Ensures user authentication before accessing protected routes.
  - Handles JWT token verification and user role checks.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables in a `.env` file.
4. Run the application using `npm start`.

## Usage

- Access the API endpoints using tools like Postman or by integrating with a frontend application.
- Protected routes require authentication and authorization headers.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/MyFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/MyFeature`).
5. Create a new Pull Request.

## Credits

- Created by [Balasivam].
- Inspired by [Ebazar Template].

## License

This project is licensed under the [MIT License](LICENSE).

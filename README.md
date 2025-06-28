# let-s-journal-app
This app, built with Express.js, Node.js, and MongoDB, offers a user-friendly interface using EJS and CSS. It provides secure routing and full CRUD capabilities for managing journal entries. Designed as a therapeutic tool, it helps users facing mental health challenges, such as depression and stress, express experiences and manage mood changes.

# Journal Authentication App

A Node.js web application for creating and managing personal journal entries with user authentication.

## Features

- User registration and login system
- Create, read, update, and delete journal entries
- User dashboard with entry statistics
- Tag and categorize journal entries
- Search functionality
- Responsive design for all device sizes

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express-session with MongoDB store
- **View Engine**: EJS
- **CSS**: Custom CSS with variables for theming
- **Frontend JS**: Vanilla JavaScript

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas connection)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables (see `.env.example`):
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/journal-app
   SESSION_SECRET=your-secure-session-secret
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Access the application at `http://localhost:3000`

## Project Structure

- **src/**: Main application code
  - **controllers/**: Route handlers
  - **middleware/**: Custom middleware functions
  - **models/**: MongoDB schemas
  - **routes/**: Express routes
  - **views/**: EJS templates
- **public/**: Static assets
  - **css/**: Stylesheets
  - **js/**: Client-side JavaScript
  - **images/**: Image assets

## License

MIT

# MergeMate

A modern platform for open source contribution management and collaboration. MergeMate helps developers discover projects, manage tasks, track contributions, and collaborate more effectively.

![MergeMate Banner](https://i.imgur.com/placeholder.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)

## Overview

MergeMate is a comprehensive platform designed to streamline the open source contribution process. It connects project owners with contributors, provides tools for task management, and creates a seamless experience for open source collaboration.

The application features a modern, responsive UI built with React, with a planned backend implementation using Node.js and MongoDB.

## Features

### For Contributors

- **Project Discovery**: Find open source projects that match your skills and interests
- **Task Management**: View, select, and track tasks assigned to you
- **Contribution Tracking**: Monitor your contributions across different projects
- **Profile Management**: Showcase your skills and contributions
- **Notifications**: Stay updated on project activities

### For Project Owners

- **Project Management**: Create and manage open source projects
- **Task Creation**: Create tasks and assign them to contributors
- **Contributor Management**: View and manage contributors to your projects
- **Progress Tracking**: Monitor the progress of your projects

## Technology Stack

### Frontend

- **React**: UI library for building the interface
- **React Router**: For navigation
- **Bootstrap & Custom CSS**: For styling
- **Context API**: For state management

### Backend (Planned Implementation)

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication

## Project Structure

The frontend is organized into the following structure:

```
merge-mate/
├── public/
└── src/
    ├── api/                # API calls
    ├── components/         # Reusable components
    ├── config/             # Configuration files
    ├── context/            # Context providers
    ├── pages/              # Page components
    │   ├── add-project/    # Add project page
    │   ├── contributors/   # Contributors page
    │   ├── contributions/  # Contributions page
    │   ├── dashboard/      # Dashboard pages
    │   ├── discover/       # Discover projects page
    │   ├── login/          # Authentication pages
    │   ├── notifications/  # Notifications page
    │   ├── profile/        # User profile page
    │   ├── projects/       # Projects management
    │   └── tasks/          # Task management
    ├── styles/             # CSS styles
    ├── utils/              # Utility functions
    ├── App.jsx             # Main application component
    └── main.jsx            # Application entry point
```

## Database Design

For the MongoDB implementation, the following collections are recommended:

### Users Collection

```javascript
{
  _id: ObjectId,
  githubId: String,       // ID from GitHub OAuth
  username: String,
  email: String,
  displayName: String,
  avatar: String,         // URL to profile image
  bio: String,
  skills: [String],       // Array of skills
  role: String,           // 'contributor' or 'owner'
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  owner: ObjectId,        // Reference to User
  status: String,         // 'In Progress', 'Completed', 'Planned'
  techStack: [String],    // Array of technologies used
  progress: Number,       // Percentage complete (0-100)
  contributors: [         // Array of contributor references
    {
      user: ObjectId,     // Reference to User
      role: String,       // Role in the project
      joinedAt: Date
    }
  ],
  stars: Number,          // Number of stars/likes
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  project: ObjectId,      // Reference to Project
  assignedTo: ObjectId,   // Reference to User
  createdBy: ObjectId,    // Reference to User
  status: String,         // 'todo', 'in-progress', 'completed'
  priority: String,       // 'low', 'medium', 'high'
  dueDate: Date,
  techStack: String,      // Primary technology for the task
  difficulty: String,     // 'beginner', 'intermediate', 'advanced'
  createdAt: Date,
  updatedAt: Date
}
```

### Contributions Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId,         // Reference to User
  project: ObjectId,      // Reference to Project
  task: ObjectId,         // Reference to Task
  type: String,           // 'code', 'documentation', 'review', etc.
  description: String,
  pullRequestUrl: String, // GitHub PR URL
  status: String,         // 'submitted', 'accepted', 'rejected'
  createdAt: Date,
  updatedAt: Date
}
```

### Notifications Collection

```javascript
{
  _id: ObjectId,
  recipient: ObjectId,    // Reference to User
  type: String,           // 'mention', 'review', 'task', etc.
  content: String,
  project: ObjectId,      // Reference to Project
  read: Boolean,
  createdAt: Date
}
```

## API Endpoints

The following API endpoints will be needed to support the frontend:

### Authentication

- `POST /api/auth/github` - Authenticate with GitHub
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `POST /api/auth/logout` - Logout user
- `GET /api/user` - Get authenticated user

### Users

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/projects` - Get user's projects
- `GET /api/users/:id/tasks` - Get user's tasks
- `GET /api/users/:id/contributions` - Get user's contributions

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/tasks` - Get project tasks
- `GET /api/projects/:id/contributors` - Get project contributors
- `POST /api/projects/:id/contributors` - Add contributor to project

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/:id/status` - Update task status

### Contributions

- `GET /api/contributions` - Get all contributions
- `POST /api/contributions` - Create a new contribution
- `GET /api/contributions/:id` - Get contribution details
- `PUT /api/contributions/:id` - Update contribution

### Notifications

- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read

## Authentication

MergeMate uses GitHub OAuth for authentication. The authentication flow is as follows:

1. User clicks "Continue with GitHub" button
2. User is redirected to GitHub OAuth page
3. User authorizes the application
4. GitHub redirects back to MergeMate with a code
5. Backend exchanges code for access token
6. Backend creates or updates user in database
7. Backend returns user data and JWT token
8. Frontend stores token and user data
9. User is authenticated

### Implementation Notes

- Use passport.js with passport-github2 strategy
- Implement JWT token generation and verification
- Store GitHub access token securely to make API calls on behalf of the user

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (v4 or later)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/mergemate.git

# Navigate to project directory
cd mergemate

# Install dependencies
npm install

# Create .env file with required environment variables
cp .env.example .env
# Edit .env file with your configuration

# Start development server
npm run dev
```

### Backend Setup (After Implementation)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with required environment variables
cp .env.example .env
# Edit .env file with your MongoDB connection string and other config

# Start development server
npm run dev
```

## Development

### Frontend Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development (After Implementation)

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Start in debug mode
npm run debug
```

## Deployment

### Deployment Options

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, DigitalOcean, AWS, Render

### Environment Variables

The following environment variables need to be set in production:

#### Frontend

- `VITE_API_URL` - URL of the backend API
- `VITE_GITHUB_CLIENT_ID` - GitHub OAuth client ID

#### Backend

- `PORT` - Port to run the server on
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `GITHUB_CALLBACK_URL` - GitHub OAuth callback URL

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any questions or suggestions, please reach out to [mujtaba.ahmed.232004@gmail.com](mailto:mujtaba.ahmed.232004@gmail.com).

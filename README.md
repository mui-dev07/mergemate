# MergeMate 🚀

[![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)](https://github.com/your-username/mergemate)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![PHP](https://img.shields.io/badge/php-%3E%3D8.2-blue.svg)](https://php.net/)
[![Laravel](https://img.shields.io/badge/laravel-11.31-red.svg)](https://laravel.com/)

A modern platform for open source contribution management and collaboration. MergeMate helps developers discover projects, manage tasks, track contributions, and collaborate more effectively in the open source ecosystem.

## ✨ Features

### For Contributors

- **Project Discovery**: Find open source projects that match your skills and interests
- **Task Management**: View, select, and track tasks assigned to you
- **Contribution Tracking**: Monitor your contributions across different projects
- **Profile Management**: Showcase your skills and contributions with GitHub integration
- **Real-time Notifications**: Stay updated on project activities and task assignments

### For Project Owners

- **Project Management**: Create and manage open source projects with detailed descriptions
- **Task Creation**: Create tasks with different difficulty levels and assign them to contributors
- **Contributor Management**: View and manage contributors to your projects
- **Progress Tracking**: Monitor the progress of your projects and tasks
- **GitHub Integration**: Sync with GitHub repositories and manage pull requests

### Platform Features

- **GitHub OAuth Authentication**: Secure login with GitHub accounts
- **Responsive Design**: Modern, mobile-friendly interface
- **Dark/Light Theme**: Customizable theme preferences
- **Real-time Updates**: Live notifications and activity feeds
- **RESTful API**: Well-structured backend API for all operations

## 🛠️ Technology Stack

### Frontend

- **React 18.3.1** - Modern UI library with hooks and context
- **React Router DOM 7.0.1** - Client-side routing
- **Bootstrap 5.3.3** - Responsive CSS framework
- **Bootstrap Icons 1.12.1** - Icon library
- **Framer Motion 11.12.0** - Animation library
- **React Beautiful DnD 13.1.1** - Drag and drop functionality
- **React Tinder Card 1.6.4** - Swipeable card components
- **React Toastify 10.0.6** - Toast notifications
- **Axios 1.7.8** - HTTP client for API calls
- **Vite 6.0.1** - Fast build tool and dev server

### Backend

- **Laravel 11.31** - PHP web framework
- **Laravel Sanctum 4.0** - API authentication
- **Laravel Socialite 5.16** - OAuth authentication
- **PHP 8.2+** - Server-side language
- **MySQL/PostgreSQL** - Database (configurable)

### Development Tools

- **ESLint 9.15.0** - Code linting
- **Vite** - Build tool and development server
- **Composer** - PHP dependency management
- **NPM** - Node.js package management

## 📦 Installation

### Prerequisites

- Node.js (v18.0.0 or later)
- PHP (v8.2 or later)
- Composer
- MySQL/PostgreSQL database
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/mergemate.git
cd mergemate/merge-mate

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Edit .env file with your configuration:
# VITE_GITHUB_CLIENT_ID=your_github_client_id
# VITE_API_BASE_URL=http://localhost:8000/api/
# VITE_FRONTEND_URL=http://localhost:5173

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd ../mergemate-Backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=mergemate
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run database migrations
php artisan migrate

# Start development server
php artisan serve
```

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - **Application name**: MergeMate
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5173/github/callback`
3. Copy the Client ID and Client Secret
4. Add them to your environment files

## 🚀 Usage

### Development

```bash
# Frontend development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend development
php artisan serve    # Start Laravel dev server
php artisan migrate  # Run database migrations
php artisan test     # Run tests
```

### Production Deployment

```bash
# Frontend
npm run build
# Deploy the 'dist' folder to your hosting service

# Backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📋 Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite development server        |
| `npm run build`   | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint to check code quality     |

## 📚 API Endpoints

### Authentication

- `GET /api/auth/github` - Redirect to GitHub OAuth
- `GET /api/auth/github/callback` - Handle GitHub OAuth callback
- `POST /api/logout` - Logout user

### Profile Management

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `POST /api/profile/sync-github` - Sync with GitHub profile
- `GET /api/profile/repositories` - Get user's GitHub repositories

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `GET /api/projects/recommended` - Get recommended projects

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task details
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `POST /api/tasks/{id}/contribute` - Contribute to a task

### Contributions

- `GET /api/contributions` - Get all contributions
- `POST /api/contributions` - Create a new contribution
- `GET /api/contributions/{id}` - Get contribution details
- `PUT /api/contributions/{id}` - Update contribution

## 🏗️ Project Structure

```
mergemate/
├── merge-mate/                 # Frontend (React)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/               # API service functions
│   │   ├── components/        # Reusable React components
│   │   ├── config/            # Configuration files
│   │   ├── context/           # React Context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── discover/      # Project discovery
│   │   │   ├── tasks/         # Task management
│   │   │   ├── projects/      # Project management
│   │   │   ├── profile/       # User profile
│   │   │   └── ...
│   │   ├── styles/            # CSS stylesheets
│   │   └── utils/             # Utility functions
│   ├── package.json
│   └── vite.config.js
└── mergemate-Backend/          # Backend (Laravel)
    ├── app/
    │   ├── Http/Controllers/   # API controllers
    │   ├── Models/            # Eloquent models
    │   └── Providers/         # Service providers
    ├── database/
    │   ├── migrations/        # Database migrations
    │   └── seeders/          # Database seeders
    ├── routes/
    │   └── api.php           # API routes
    ├── composer.json
    └── artisan
```

## 🔧 Dependencies

### Frontend Dependencies

- `@popperjs/core` - Tooltip and popover positioning
- `axios` - HTTP client for API requests
- `bootstrap` - CSS framework
- `bootstrap-icons` - Icon library
- `framer-motion` - Animation library
- `react` - UI library
- `react-beautiful-dnd` - Drag and drop
- `react-dom` - React DOM rendering
- `react-helmet-async` - Document head management
- `react-router-dom` - Client-side routing
- `react-tinder-card` - Swipeable cards
- `react-toastify` - Toast notifications

### Frontend Dev Dependencies

- `@eslint/js` - ESLint JavaScript configuration
- `@types/react` - TypeScript definitions for React
- `@types/react-dom` - TypeScript definitions for React DOM
- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Code linting
- `eslint-plugin-react` - React ESLint rules
- `eslint-plugin-react-hooks` - React Hooks ESLint rules
- `eslint-plugin-react-refresh` - React Refresh ESLint rules
- `globals` - Global variables for ESLint
- `vite` - Build tool

### Backend Dependencies

- `laravel/framework` - Laravel framework
- `laravel/sanctum` - API authentication
- `laravel/socialite` - OAuth authentication
- `laravel/tinker` - REPL for Laravel

### Backend Dev Dependencies

- `fakerphp/faker` - Fake data generator
- `laravel/pail` - Log viewer
- `laravel/pint` - Code style fixer
- `laravel/sail` - Docker development environment
- `mockery/mockery` - Mocking framework
- `nunomaduro/collision` - Error handler
- `phpunit/phpunit` - Testing framework

## 🤝 Contributing

We welcome contributions to MergeMate! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow our coding standards
4. **Run tests**: `npm run lint` (frontend) and `php artisan test` (backend)
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Laravel** - For the excellent PHP framework
- **React** - For the powerful UI library
- **Bootstrap** - For the responsive CSS framework
- **GitHub** - For OAuth integration and inspiration
- **Open Source Community** - For the amazing tools and libraries

## 📞 Contact

For questions, suggestions, or support, please reach out to:

- **Email**: [mujtaba.ahmed.232004@gmail.com](mailto:mujtaba.ahmed.232004@gmail.com)
- **GitHub Issues**: [Create an issue](https://github.com/your-username/mergemate/issues)

---

**Made with ❤️ for the open source community**

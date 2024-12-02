# MergeMate Backend

<div align="center">
<h1> Merge Mate</h1>
<p>🚀 A powerful backend system for connecting open-source projects with contributors</p>
</div>

<div align="center">

[![Laravel](https://img.shields.io/badge/Laravel-v11.31-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-v8.3-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![GitHub](https://img.shields.io/badge/GitHub_OAuth-Integration-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

## 🌟 Features

-   **GitHub OAuth Integration**: Seamless authentication with GitHub
-   **Project Management**: Create and manage open-source projects
-   **Task Tracking**: Organize project tasks with difficulty levels
-   **Contribution System**: Track and manage project contributions
-   **User Profiles**: GitHub-synchronized profiles with expertise tracking
-   **API-First Design**: RESTful API endpoints for all functionality
-   **Real-time Updates**: WebSocket support for live notifications
-   **Smart Matching**: Connect contributors with suitable projects

## 📋 Prerequisites

-   PHP >= 8.2
-   Composer
-   MySQL/MariaDB
-   Node.js & NPM
-   GitHub OAuth Application credentials

## 🚀 Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/your-username/mergemate-backend.git
cd mergemate-backend
```

2. **Install dependencies**

```bash
composer install
npm install
```

3. **Environment setup**

```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure environment variables**

```env
APP_NAME=MergeMate
APP_ENV=local
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mergemate
DB_USERNAME=root
DB_PASSWORD=

GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:8000/api/auth/github/callback
```

5. **Database setup**

```bash
php artisan migrate
```

6. **Start the development server**

```bash
php artisan serve
```

## 🏗️ Architecture

### Database Schema

The application uses several key tables:

-   **Users**: Store user information and GitHub integration data

```php:database/migrations/0001_01_01_000000_create_users_table.php
startLine: 14
endLine: 40
```

-   **Projects**: Manage open-source projects

```php:database/migrations/2024_12_02_085251_create_projects_table.php
startLine: 11
endLine: 22
```

-   **Tasks**: Track project tasks and their status

```php:database/migrations/2024_12_02_085329_create_tasks_table.php
startLine: 14
endLine: 23
```

### API Endpoints

#### Authentication

-   `GET /api/auth/github`: GitHub OAuth redirect
-   `GET /api/auth/github/callback`: OAuth callback handler
-   `POST /api/logout`: User logout

#### Projects

-   `GET /api/projects`: List all projects
-   `POST /api/projects`: Create a new project
-   `GET /api/projects/{id}`: Get project details
-   `PUT /api/projects/{id}`: Update project
-   `DELETE /api/projects/{id}`: Delete project

#### Tasks

-   `GET /api/tasks`: List tasks
-   `POST /api/tasks`: Create task
-   `GET /api/tasks/{id}`: Get task details
-   `PUT /api/tasks/{id}`: Update task
-   `DELETE /api/tasks/{id}`: Delete task

#### Contributions

-   `POST /api/tasks/{task}/contribute`: Submit contribution
-   `GET /api/contributions`: List contributions
-   `PUT /api/contributions/{id}`: Update contribution status

## 🔒 Security

-   Implements Laravel Sanctum for API authentication
-   GitHub OAuth for secure user authentication
-   CSRF protection enabled
-   Rate limiting on API endpoints
-   Secure password hashing

## 🧪 Testing

Run the test suite:

```bash
php artisan test
```

## 📦 Deployment

1. Set up production environment
2. Configure web server (Nginx/Apache)
3. Set up SSL certificate
4. Configure environment variables
5. Run migrations

```bash
php artisan migrate --force
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Adnan Hasnain** - _Curry & Compiler_

-   GitHub: [@adnanhasnain](https://github.com/Dev-Adnan27)
-   LinkedIn: [Adnan Hasnain](https://www.linkedin.com/in/dev-adnan27/)

## 🙏 Acknowledgments

-   Laravel Team for the amazing framework
-   GitHub for OAuth integration support
-   All contributors who help improve this project

---

<div align="center">
  Made with ❤️ by Curry & Compiler
</div>

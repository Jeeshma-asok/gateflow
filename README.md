# GateFlow – Enterprise Authentication & RBAC System

## 1. Project Overview

GateFlow is an enterprise authentication and Role-Based Access Control (RBAC) management system designed to manage users, roles, policies, and permissions through a centralized application.

The application uses a React frontend and Django REST Framework backend.

### Key Features

- User authentication and authorization
- User management (CRUD)
- Role management (CRUD)
- Policy management
- Module-based permission management
- Role and policy association
- Dynamic permission assignment
- Protected frontend routes
- API-based communication between frontend and backend

## 2. Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Styled Components
- Axios
- React Router
- Zustand
- Formik and Yup

### Backend

- Python
- Django
- Django REST Framework
- Django REST Framework Simple JWT
- drf-yasg (Swagger API documentation)

### Database

- Database configuration is managed through Django settings and environment variables.

## 3. Project Structure

The proposed project structure is:

```text
gateflow/
│
├── backend/
│   ├── users/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   ├── permissions/
|   |   └──management/
|   |   |    └──commands/
|   |   |    |    └──initial_database.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
│
├── .gitignore
└── README.md
```

## 4. Prerequisites

Install the following before setting up the project:

- Python 3.10 or later
- Node.js and npm
- Postgres
- A supported database

## 5. Backend Setup

### Step 1: Navigate to backend

```bash
cd backend
```

### Step 2: Create a virtual environment

```bash
python3 -m venv venv
```

Activate the environment.

Linux/macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

### Step 3: Install dependencies

```bash
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install drf-yasg
```

Install any additional dependencies required by the project.

Save dependencies:

```bash
pip freeze > requirements.txt
```

For an existing requirements file:

```bash
pip install -r requirements.txt
```

### Step 4: Configure environment variables

Create a `.env` file for environment-specific configuration.

Example:

```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_NAME=gateflow
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

Configure Django settings to read these variables. The database example assumes PostgreSQL; use the database engine configured for your project.

### Step 5: Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 7: Create an admin user

```bash
python manage.py createsuperuser
```
### Step 8: Initial database setup

```bash
python manage.py initial_database
```

### Step 9: Start the backend

```bash
python manage.py runserver
```

Backend URL:

`http://127.0.0.1:8000/`

## 6. Frontend Setup

### Step 1: Navigate to frontend

```bash
cd frontend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the development server

```bash
npm run dev
```

Frontend URL:

`http://localhost:5173/`

## 7. Application Modules

### 7.1 Authentication

Responsible for:

- User login
- JWT authentication
- Token refresh
- Authentication state management
- Protected routes

### 7.2 User Management

Responsible for:

- Listing users
- Creating users
- Updating user details
- Deleting users
- Assigning roles
- Displaying assigned role information

### 7.3 Role Management

Responsible for:

- Creating roles
- Updating roles
- Deleting roles
- Assigning policies to roles
- Displaying associated policy details

### 7.4 Policy Management

Policies define the permissions available within the application.

A policy can contain multiple modules and their corresponding permissions.

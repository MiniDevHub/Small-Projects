<div align="center">

# 🚴 E-Bike Point - ERP System

### _Full-Stack Electric Bike Dealership Management Platform_

![Backend](https://img.shields.io/badge/Backend-98%25%20Complete-success?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-80%25%20Complete-blue?style=for-the-badge)
![Overall](https://img.shields.io/badge/Overall-87%25%20Complete-brightgreen?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-Django%20%7C%20React%2019%20%7C%20MongoDB-blueviolet?style=for-the-badge)

**Transforming an electric bike website into a comprehensive business management system**

[🎯 Status](#-project-status) • [🚀 Quick Start](#-quick-start-using-makefile) • [📚 Testing](#-testing--quality-assurance) • [🛠️ Tech Stack](#️-tech-stack--exact-versions) • [📖 API Docs](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Project Status](#-project-status)
- [Quick Start (Makefile)](#-quick-start-using-makefile)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Makefile Commands](#-makefile-commands)
- [Tech Stack & Exact Versions](#️-tech-stack--exact-versions)
- [Prerequisites](#-prerequisites)
- [Detailed Setup](#-detailed-setup)
- [Environment Configuration](#-environment-configuration)
- [Project Structure](#-project-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Key Features](#-key-features)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [For Future AI Assistants](#-for-future-ai-assistants)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

**E-Bike Point** is a complete modern rebuild of https://ebikepoint.co.in/ - transforming a legacy PHP e-commerce site into a comprehensive **ERP (Enterprise Resource Planning) system** for managing an electric bike dealership network across India.

### **What Makes This Special:**

- 🏢 **Multi-Tiered Role Hierarchy** - Super Admin → Admin → Dealer → Employee/Serviceman → Customer
- 📦 **Complete Business Workflow** - Product ordering → Inventory → Sales → Service tracking
- 🔐 **Advanced RBAC** - 6 distinct user types with granular permissions matrix
- 🎫 **Smart Warranty System** - Automatic warranty activation with free service tracking
- 📊 **Full-Featured ERP** - Orders, billing, inventory, attendance, analytics, notifications
- ⚡ **Modern Tech Stack** - Django REST Framework + React 19 + MongoDB + Celery
- 🎨 **Premium UI/UX** - Framer Motion animations, Radix UI components, Tailwind CSS
- 🔧 **Production-Ready DevOps** - Comprehensive Makefiles with health monitoring
- 🧪 **Complete Testing Suite** - End-to-end testing guide with all role workflows

### **Original Website:**

- **URL:** https://ebikepoint.co.in/
- **Current Stack:** PHP (legacy e-commerce)
- **Products:** 6 electric bike models (LIGHTNING, MARIUM, RABBITOR, SSUP, JV, MAKI)
- **Network:** 250+ dealers, 15,000+ customers
- **Contact:** +91 7980598210 | enicontrol@yahoo.com

### **Rebuild Goals:**

✅ Replace PHP with modern Django REST API
✅ Build comprehensive dealer/admin management system
✅ Implement complete inventory & order tracking
✅ Add warranty & service request management
✅ Create role-based dashboards for all user types
✅ Enable real-time notifications & analytics
✅ Provide production-ready deployment tools

---

<div align="center">

## 📊 Project Status

**Last Updated:** 2026-02-04

| Module                                | Status      | Completion |
| ------------------------------------- | ----------- | ---------- |
| **Authentication & Authorization**    | ✅ Complete | 100%       |
| **User Management (6 Roles)**         | ✅ Complete | 100%       |
| **Product Management**                | ✅ Complete | 100%       |
| **Order Management (Dealer → Admin)** | ✅ Complete | 100%       |
| **Order Management (Customer)**       | ✅ Complete | 100%       |
| **Billing & Sales System**            | ✅ Complete | 100%       |
| **Inventory Tracking**                | ✅ Complete | 100%       |
| **Attendance Management**             | ✅ Complete | 100%       |
| **Service Request System**            | ✅ Complete | 100%       |
| **Warranty Tracking**                 | ✅ Complete | 100%       |
| **Notifications System**              | ✅ Complete | 100%       |
| **Analytics & Reporting**             | ✅ Complete | 100%       |
| **Role-Based Dashboards**             | ✅ Complete | 100%       |
| **UI/UX Components**                  | ✅ Complete | 100%       |
| **Developer Tooling (Makefiles)**     | ✅ Complete | 100%       |
| **Testing Documentation**             | ✅ Complete | 100%       |

### **Progress Metrics:**

| Category                 | Backend | Frontend | Overall |
| ------------------------ | ------- | -------- | ------- |
| **Completion**           | 98%     | 80%      | 87%     |
| **API Endpoints**        | 45+     | N/A      | N/A     |
| **Pages/Views**          | N/A     | 40       | 40      |
| **Components**           | N/A     | 30       | 30      |
| **Custom Hooks**         | N/A     | 9        | 9       |
| **Service Integrations** | N/A     | 6        | 6       |
| **Lines of Code**        | ~12,000 | ~19,000  | ~31,000 |

### **File Breakdown:**

```plaintext
Frontend:
                        └── Pages (JSX):        40 files
                        └── Components (JSX):   30 files
                        └── JavaScript files:   25 files
                        └── Total Files:        95 files

Backend:
                        └── Django Apps:        11 apps
                          └── Python files:       ~80 files
                           └── API Endpoints:      45+ routes
                                 └── Models:            15 MongoDB models
```

</div>

---

## 🚀 Quick Start (Using Makefile)

### **⚡ Fastest Setup (5 Minutes):**

#### **Step 1: Backend Setup**

```bash
cd server

# Complete automated setup
make setup              # Installs deps, checks services, migrates DB, seeds products

# Create your admin account
make createsuperuser    # Interactive prompt

# OR use quick admin (preset credentials)
make create-admin       # Email: admin@ebike.com, Password: Admin@1234

# Start server with auto-open browser
make dev-open          # Opens http://127.0.0.1:8000/api/
```

#### **Step 2: Frontend Setup** _(new terminal)_

```bash
cd client

# Complete automated setup
make setup             # Installs deps, verifies .env, checks backend

# Start dev server with auto-open browser
make dev-open          # Opens http://localhost:5173
```

#### **Step 3: Test Login**

**Default Credentials:**

```plaintext
Super Admin:
  Email:    superadmin@ebike.com
  Password: SuperAdmin@123

Admin:
  Email:    admin@ebike.com
  Password: Admin@1234

Test Dealer:
  Email:    dealer@ebike.com
  Password: Dealer@1234
```

### **🏥 Health Checks:**

```bash
# Backend comprehensive health check
cd server
make health           # Shows: Django, Celery, MongoDB status + DB stats

# Frontend health check
cd client
make health           # Shows: Dev server, API connectivity, build status
```

### **📊 Live Monitoring:**

```bash
# Backend real-time monitoring
cd server
make monitor          # Live service status (updates every 2s)

# Frontend monitoring
cd client
make monitor          # Live frontend/backend status
```

**🎉 You're Ready!** Visit http://localhost:5173 and explore the dashboards.

---

## 🧪 Testing & Quality Assurance

### **📚 Complete Testing Guide:**

See **[TestingGuide.md](TestingGuide.md)** for comprehensive end-to-end testing workflow covering:

✅ **System Setup:** Super Admin creation → Database seeding<br>
✅ **Role Hierarchy:** Super Admin → Admin → Dealer → Employee → Customer<br>
✅ **Order Workflows:** Dealer ordering → Admin approval → Inventory updates<br>
✅ **Sales Process:** Employee sales → Warranty activation → Inventory deduction<br>
✅ **Service Lifecycle:** Customer booking → Dealer assignment → Serviceman completion<br>
✅ **Permission Testing:** All 6 roles validated against permissions matrix<br>
✅ **Cyclic Dependencies:** Testing the interdependent role creation order<br>

**Estimated Test Time:** 2-3 hours for complete system validation

### **Quick Testing Commands:**

#### **Backend Tests:**

```bash
cd server

make test              # Run all Django tests
make test-fast         # Parallel test execution
make test-coverage     # Generate HTML coverage report
make test-api          # Test API endpoints only

make lint              # Run flake8 linter
make format            # Auto-format with black
make quality           # Run all quality checks at once
make audit             # Security vulnerability scan
```

#### **Frontend Tests:**

```bash
cd client

make test              # Run Vitest tests
make test-watch        # Watch mode for TDD
make test-coverage     # Generate coverage report

make lint              # Run ESLint
make lint-fix          # Auto-fix ESLint issues
make format            # Format with Prettier
make format-check      # Check formatting without changes
make quality           # All quality checks
make audit             # npm security audit
```

### **Coverage Reports:**

```bash
# Backend coverage
cd server
make test-coverage
make open-coverage     # Opens htmlcov/index.html

# Frontend coverage
cd client
make test-coverage
# Report opens automatically
```

---

## ⚡ Makefile Commands

Both frontend and backend include **production-ready Makefiles** with 50+ commands each.

### **Backend Commands:**

```bash
make help              # Show all 50+ commands with descriptions

# Development
make setup             # Complete setup (install + check + seed)
make dev               # Start Django server only
make dev-open          # Start + open API in browser
make dev-all           # Start Django + Celery + Beat (multi-tab)
make restart           # Clean restart

# Database
make migrate           # Run migrations
make makemigrations    # Create migrations
make createsuperuser   # Interactive super admin creation
make create-admin      # Quick admin (preset credentials)
make seed              # Seed 6 sample bikes
make seed-all          # Complete test data
make backup            # Backup MongoDB with timestamp
make restore           # Restore from backup
make flush-db          # ⚠️ Delete all data (requires confirmation)

# Celery & Background Tasks
make celery            # Start Celery worker
make celery-beat       # Start Celery beat scheduler
make flower            # Start Flower monitor (Celery GUI)

# Testing & Quality
make test              # Run all tests
make test-fast         # Parallel tests
make test-coverage     # Coverage report
make lint              # Flake8 linting
make format            # Black formatter
make quality           # All checks
make audit             # Security scan

# Monitoring & Debugging
make health            # Complete health report
make monitor           # Live service monitoring
make status            # Quick status overview
make logs              # View Django logs
make logs-celery       # View Celery logs
make logs-error        # View error logs only
make logs-live         # Live tail all logs

# Browser Shortcuts
make open              # Open API root
make open-api          # Open API documentation
make open-admin        # Open Django admin panel
make open-flower       # Open Celery Flower
make open-coverage     # Open coverage report

# Utilities
make shell             # Django shell
make shell-plus        # Enhanced shell (django-extensions)
make dbshell           # MongoDB shell
make show-urls         # List all API endpoints
make clean             # Clean temp files
make clean-all         # Deep clean (includes .venv)
make stop              # Stop all services
```

**Backend Shortcuts:**

```bash
make s    # setup
make d    # dev
make do   # dev-open
make da   # dev-all
make h    # health
make st   # status
make ca   # create-admin
make m    # migrate
make mm   # makemigrations
make cs   # createsuperuser
make t    # test
make tc   # test-coverage
```

### **Frontend Commands:**

```bash
make help              # Show all 50+ commands with descriptions

# Development
make setup             # Complete setup with checks
make dev               # Start Vite dev server
make dev-open          # Start + auto-open browser
make dev-host          # Network accessible dev server
make dev-host-open     # Network dev + open
make restart           # Clean restart

# Build & Preview
make build             # Production build
make build-check       # Build + verify output
make preview           # Preview production build
make preview-open      # Preview + open browser
make serve             # Serve production build

# Browser Shortcuts
make open              # Open homepage
make open-login        # Open login page
make open-register     # Open registration
make open-admin        # Open admin dashboard
make open-api          # Open backend API

# Testing & Quality
make test              # Run tests
make test-watch        # Watch mode
make test-coverage     # Coverage report
make lint              # ESLint check
make lint-fix          # Auto-fix issues
make format            # Prettier format
make format-check      # Check formatting
make quality           # All checks
make audit             # Security audit

# Monitoring
make health            # Complete health check
make monitor           # Live service monitoring
make status            # Quick status
make logs              # View logs

# Dependencies
make install           # Install dependencies
make install-clean     # Clean install
make deps              # List dependencies
make deps-check        # Check for outdated
make deps-update       # Update all packages

# Utilities
make clean             # Clean build artifacts
make clean-all         # Deep clean (includes node_modules)
make stop              # Stop all servers
```

**Frontend Shortcuts:**

```bash
make s    # setup
make d    # dev
make do   # dev-open
make b    # build
make p    # preview-open
make h    # health
make st   # status
make t    # test
make l    # lint
make f    # format
make i    # install
make c    # clean
```

**💡 Pro Tip:** Run `make help` in either directory for a beautifully formatted command list with descriptions!

---

## 🛠️ Tech Stack & Exact Versions

> **⚠️ IMPORTANT:** Use these exact versions to avoid compatibility issues. The project is tested with these specific versions.

### **Backend Stack**

```plaintext
╔════════════════════════════════════════════════════════╗
║                   BACKEND TECHNOLOGIES                 ║
╚════════════════════════════════════════════════════════╝

Language & Runtime:
├── Python 3.10+ (Tested: 3.14.0)
└── pip 23+

Web Framework:
├── Django==5.0.1
├── djangorestframework==3.14.0
└── djangorestframework-simplejwt==5.3.1

Database & ODM:
├── MongoDB 6.0+ (Community Edition)
├── pymongo==4.6.0
└── mongoengine==0.28.2

Security & Authentication:
├── bcrypt==4.1.2
├── PyJWT==2.11.0
├── django-cors-headers==4.3.1
└── python-decouple==3.8

Task Queue & Messaging:
├── celery==5.3.6
├── redis==5.0.1
├── kombu==5.3.5
└── flower==2.0.1 (optional monitoring)

WebSockets & Real-time:
├── channels==4.0.0
├── daphne==4.0.0
└── channels-redis==4.1.0

File Handling & Media:
├── Pillow==10.1.0
└── python-magic==0.4.27

Utilities:
├── python-dateutil==2.8.2
└── pytz==2024.1

Development Tools:
├── black==24.3.0 (formatter)
├── flake8==7.0.0 (linter)
├── coverage==7.4.0 (testing)
└── django-debug-toolbar==4.3.0 (optional)
```

### **Frontend Stack**

```plaintext
╔════════════════════════════════════════════════════════╗
║                  FRONTEND TECHNOLOGIES                 ║
╚════════════════════════════════════════════════════════╝

Runtime:
├── Node.js 18+ (Tested: 20.11.0)
└── npm 9+ (Tested: 10.2.4)

Core Framework:
├── react==19.2.0
├── react-dom==19.2.0
└── vite==7.2.4

Routing & State Management:
├── react-router-dom==7.13.0
├── @tanstack/react-query==5.90.20
└── zustand==5.0.11 (with persist middleware)

Forms & Validation:
├── react-hook-form==7.71.1
├── yup==1.7.1
└── @hookform/resolvers==5.2.2

Styling & UI:
├── tailwindcss==3.4.19 ⚠️ (v3, NOT v4!)
├── postcss==8.4.38
├── autoprefixer==10.4.19
├── framer-motion==12.30.0
├── lucide-react==0.563.0
└── clsx==2.1.1 + tailwind-merge==2.8.0

UI Component Library (Radix UI):
├── @radix-ui/react-dialog==1.1.15
├── @radix-ui/react-dropdown-menu==2.1.16
├── @radix-ui/react-label==2.1.2
├── @radix-ui/react-slot==1.1.1
└── @radix-ui/react-tabs==1.1.13

API & Communication:
├── axios==1.13.4
└── socket.io-client==4.8.3

Notifications & Feedback:
├── react-hot-toast==2.6.0
└── sonner==2.0.7

Utilities:
├── date-fns==4.0.1
└── class-variance-authority==0.7.5

Development Tools:
├── @vitejs/plugin-react==4.4.0
├── eslint==9.0+ (with React plugin)
└── prettier==3.2.5 (code formatter)
```

### **Additional Services:**

```plaintext
Message Broker:
└── Redis 6.0+ (for Celery & Channels)

Reverse Proxy (Production):
└── Nginx 1.24+

Process Manager (Production):
└── Gunicorn==21.2.0 + Supervisor
```

---

## ✅ Prerequisites

### **System Requirements:**

```bash
# Check installed versions
python3 --version  # Must be 3.10 or higher
node --version     # Must be 18.0 or higher
mongod --version   # Must be 6.0 or higher

# Optional but recommended
redis-server --version  # For Celery task queue
```

### **Installation Guides:**

#### **macOS (Using Homebrew):**

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install all prerequisites
brew install python@3.11 node@20 mongodb-community@6.0 redis

# Start services
brew services start mongodb-community@6.0
brew services start redis

# Verify installations
python3 --version  # Should show 3.11.x
node --version     # Should show v20.x.x
mongosh           # Should connect to MongoDB
redis-cli ping    # Should return PONG
```

#### **Ubuntu/Debian Linux:**

```bash
# Update package list
sudo apt update

# Install Python 3.11
sudo apt install python3.11 python3.11-venv python3-pip

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB 6.0
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Install Redis
sudo apt install redis-server

# Start services
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verify
python3.11 --version
node --version
mongosh --version
redis-cli ping
```

#### **Windows:**

```powershell
# Install using Chocolatey (Admin PowerShell)
choco install python311 nodejs mongodb redis-64

# OR download installers:
# Python: https://www.python.org/downloads/
# Node.js: https://nodejs.org/
# MongoDB: https://www.mongodb.com/try/download/community
# Redis: https://redis.io/download (or use WSL)

# Verify
python --version
node --version
mongod --version
```

---

## 📦 Detailed Setup

### **Method 1: Automated Setup (Recommended)**

#### **Backend:**

```bash
cd server

# One-command complete setup
make setup
# This runs:
# - Creates Python virtual environment (.venv)
# - Installs all dependencies from requirements.txt
# - Checks MongoDB and Redis connectivity
# - Creates/verifies .env file
# - Runs database migrations
# - Collects static files
# - Seeds 6 sample products

# Create your admin account
make createsuperuser
# OR quick preset admin
make create-admin

# Start development server
make dev-open  # Opens http://127.0.0.1:8000/api/
```

#### **Frontend:**

```bash
cd client

# One-command complete setup
make setup
# This runs:
# - Checks Node.js version
# - Installs all npm dependencies
# - Creates/verifies .env file
# - Checks backend connectivity
# - Verifies build configuration

# Start development server
make dev-open  # Opens http://localhost:5173
```

### **Method 2: Manual Setup**

#### **Backend Manual Setup:**

```bash
cd server

# 1. Create virtual environment
python3 -m venv .venv

# 2. Activate virtual environment
# macOS/Linux:
source .venv/bin/activate
# Windows:
.venv\Scripts\activate

# 3. Upgrade pip
pip install --upgrade pip

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create .env file (copy from .env.example or create manually)
cp .env.example .env
# Edit .env with your settings

# 6. Run migrations
python manage.py migrate

# 7. Create super admin
python manage.py createsuperuser_mongo

# 8. Seed sample products
python manage.py seed_products

# 9. Collect static files
python manage.py collectstatic --noinput

# 10. Run development server
python manage.py runserver 8000
```

#### **Frontend Manual Setup:**

```bash
cd client

# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Edit .env with your settings

# 3. Start development server
npm run dev
```

---

## 🔐 Environment Configuration

### **Backend `.env` File:**

Create `server/.env` with these settings:

```env
# ====================================
# Django Core Settings
# ====================================
SECRET_KEY=django-insecure-change-this-in-production-random-string-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# ====================================
# MongoDB Configuration
# ====================================
MONGODB_NAME=ebikepoint_erp
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USERNAME=
MONGODB_PASSWORD=
# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ebikepoint_erp

# ====================================
# Redis Configuration (Celery)
# ====================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=
# Full Redis URL (alternative):
# REDIS_URL=redis://localhost:6379/0

# ====================================
# CORS Settings
# ====================================
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CORS_ALLOW_CREDENTIALS=True

# ====================================
# JWT Authentication Settings
# ====================================
JWT_ACCESS_TOKEN_LIFETIME=60        # minutes
JWT_REFRESH_TOKEN_LIFETIME=1        # days
JWT_ALGORITHM=HS256

# ====================================
# Auto Logout Configuration
# ====================================
AUTO_LOGOUT_HOURS=9

# ====================================
# Business Rules - Warranty & Services
# ====================================
FREE_SERVICES_COUNT=4
WARRANTY_MONTHS=24

# ====================================
# Email Configuration (Optional)
# ====================================
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
# For production (Gmail example):
# EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USE_TLS=True
# EMAIL_HOST_USER=your-email@gmail.com
# EMAIL_HOST_PASSWORD=your-app-password

# ====================================
# Celery Settings
# ====================================
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
CELERY_ACCEPT_CONTENT=application/json
CELERY_TASK_SERIALIZER=json
CELERY_RESULT_SERIALIZER=json

# ====================================
# File Upload Settings
# ====================================
MAX_UPLOAD_SIZE=5242880  # 5MB in bytes
MEDIA_ROOT=media
MEDIA_URL=/media/

# ====================================
# Logging
# ====================================
LOG_LEVEL=INFO
# Options: DEBUG, INFO, WARNING, ERROR, CRITICAL
```

### **Frontend `.env` File:**

Create `client/.env` with these settings:

```env
# ====================================
# API Configuration
# ====================================
VITE_API_BASE_URL=http://localhost:8000/api
# For production:
# VITE_API_BASE_URL=https://api.ebikepoint.com/api

# ====================================
# App Configuration
# ====================================
VITE_APP_NAME=E-Bike Point
VITE_APP_VERSION=1.0.0

# ====================================
# Auto Logout
# ====================================
VITE_AUTO_LOGOUT_HOURS=9

# ====================================
# Business Rules
# ====================================
VITE_FREE_SERVICES_COUNT=4
VITE_WARRANTY_MONTHS=24

# ====================================
# Feature Flags
# ====================================
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_WEBSOCKETS=false
VITE_ENABLE_DARK_MODE=false

# ====================================
# Social Media Links
# ====================================
VITE_FACEBOOK_URL=https://facebook.com/ebikepoint
VITE_INSTAGRAM_URL=https://instagram.com/ebikepoint
VITE_YOUTUBE_URL=https://youtube.com/@ebikepoint
VITE_LINKEDIN_URL=https://linkedin.com/company/ebikepoint

# ====================================
# Contact Information
# ====================================
VITE_CONTACT_PHONE=+91 7980598210
VITE_CONTACT_EMAIL=enicontrol@yahoo.com
VITE_CONTACT_ADDRESS=India

# ====================================
# Analytics (Optional)
# ====================================
# VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
# VITE_MIXPANEL_TOKEN=your-token-here

# ====================================
# Sentry Error Tracking (Optional)
# ====================================
# VITE_SENTRY_DSN=https://your-sentry-dsn
# VITE_SENTRY_ENVIRONMENT=development
```

---

## 📂 Project Structure

```plaintext
e-bike-erp/
├── 📄 README.md                     # This file
├── 📄 TestingGuide.md              # Comprehensive testing documentation
├── 📄 .gitignore
│
├── 📁 server/                       # Django Backend (98% Complete)
│   ├── 📄 Makefile                 # 50+ production commands
│   ├── 📄 requirements.txt         # Python dependencies
│   ├── 📄 manage.py               # Django management script
│   ├── 📄 .env                    # Environment variables (create from .env.example)
│   ├── 📄 .env.example
│   │
│   ├── 📁 config/                  # Django project configuration
│   │   ├── __init__.py
│   │   ├── settings.py            # Main settings (MongoDB, CORS, JWT, etc.)
│   │   ├── urls.py                # Root URL configuration
│   │   ├── asgi.py                # ASGI config (WebSockets)
│   │   └── wsgi.py                # WSGI config
│   │
│   ├── 📁 apps/                    # Django applications
│   │   │
│   │   ├── 📁 users/              # 👥 User Management & Authentication
│   │   │   ├── models.py          # User, Profile (6 roles)
│   │   │   ├── views.py           # Register, login, profile, CRUD
│   │   │   ├── serializers.py     # User/Auth serializers
│   │   │   ├── urls.py            # /api/auth/* routes
│   │   │   ├── authentication.py  # JWT backend
│   │   │   ├── backends.py        # Custom auth backend
│   │   │   └── management/
│   │   │       └── commands/
│   │   │           ├── createsuperuser_mongo.py
│   │   │           └── delete_all_users.py
│   │   │
│   │   ├── 📁 products/           # 🚴 Product Management
│   │   │   ├── models.py          # Product (6 bikes)
│   │   │   ├── views.py           # CRUD, search, filter
│   │   │   ├── serializers.py
│   │   │   ├── urls.py            # /api/products/*
│   │   │   └── management/
│   │   │       └── commands/
│   │   │           └── seed_products.py  # Seeds 6 bikes
│   │   │
│   │   ├── 📁 orders/             # 📦 Order Management
│   │   │   ├── models.py          # DealerOrder, CustomerOrder
│   │   │   ├── views.py           # Create, approve, reject, track
│   │   │   ├── serializers.py
│   │   │   └── urls.py            # /api/orders/*
│   │   │
│   │   ├── 📁 billing/            # 💰 Sales & Invoicing
│   │   │   ├── models.py          # Sale, Invoice, Warranty
│   │   │   ├── views.py           # Create sales, warranty tracking
│   │   │   ├── serializers.py
│   │   │   └── urls.py            # /api/billing/*
│   │   │
│   │   ├── 📁 inventory/          # 📊 Dealer Inventory
│   │   │   ├── models.py          # DealerInventory, Transaction
│   │   │   ├── views.py           # Stock management, adjustments
│   │   │   ├── serializers.py
│   │   │   └── urls.py            # /api/inventory/*
│   │   │
│   │   ├── 📁 service/            # 🔧 Service Requests
│   │   │   ├── models.py          # ServiceRequest, ServiceHistory
│   │   │   ├── views.py           # Book, assign, update, complete
│   │   │   ├── serializers.py
│   │   │   ├── urls.py            # /api/service/*
│   │   │   └── tasks.py           # Celery tasks (reminders)
│   │   │
│   │   ├── 📁 attendance/         # ⏰ Attendance Management
│   │   │   ├── models.py          # Attendance, DailyReport
│   │   │   ├── views.py           # Clock in/out, reports
│   │   │   ├── serializers.py
│   │   │   ├── urls.py            # /api/attendance/*
│   │   │   └── tasks.py           # Auto clock-out at 9 hours
│   │   │
│   │   ├── 📁 notifications/      # 🔔 Notification System
│   │   │   ├── models.py          # Notification
│   │   │   ├── views.py           # Send, receive, mark read
│   │   │   ├── serializers.py
│   │   │   └── urls.py            # /api/notifications/*
│   │   │
│   │   └── 📁 analytics/          # 📈 Analytics & Reporting
│   │       ├── models.py          # (optional aggregation models)
│   │       ├── views.py           # Dashboard stats, charts
│   │       └── urls.py            # /api/analytics/*
│   │
│   ├── 📁 static/                  # Static files (CSS, JS)
│   ├── 📁 staticfiles/            # Collected static (production)
│   ├── 📁 media/                  # User uploads
│   │   ├── products/              # Product images
│   │   ├── profiles/              # Profile pictures
│   │   ├── invoices/              # Generated invoices
│   │   └── service_photos/        # Service completion photos
│   │
│   ├── 📁 logs/                   # Log files
│   │   ├── django.log
│   │   ├── celery.log
│   │   └── error.log
│   │
│   └── 📁 backups/                # Database backups (created by make backup)
│
└── 📁 client/                      # React Frontend (80% Complete)
    ├── 📄 Makefile                # 50+ production commands
    ├── 📄 package.json            # npm dependencies
    ├── 📄 vite.config.js          # Vite configuration
    ├── 📄 tailwind.config.js      # Tailwind CSS config
    ├── 📄 postcss.config.js
    ├── 📄 eslint.config.js        # ESLint rules
    ├── 📄 .env                    # Environment variables
    ├── 📄 .env.example
    ├── 📄 index.html              # HTML entry point
    │
    ├── 📁 public/                 # Static assets
    │   ├── 📁 images/
    │   │   ├── logo.png
    │   │   ├── 📁 bikes/          # Bike product images
    │   │   │   ├── lightning/
    │   │   │   ├── rabbitor/
    │   │   │   ├── ssup/
    │   │   │   ├── jv/
    │   │   │   ├── marium/
    │   │   │   └── maki/
    │   │   └── 📁 about/
    │   └── 📁 videos/
    │       └── video.mp4          # Homepage video
    │
    └── 📁 src/                    # Source code (40 pages, 30 components)
        │
        ├── 📄 main.jsx            # React entry point
        ├── 📄 App.jsx             # Root component
        ├── 📄 index.css           # Global styles
        ├── 📄 App.css
        │
        ├── 📁 api/                # API Service Layer (6 services)
        │   ├── axios.js           # Axios instance with interceptors
        │   ├── authService.js     # Login, register, profile
        │   ├── productService.js  # Product CRUD
        │   ├── orderService.js    # Order management
        │   ├── billingService.js  # Sales, invoices
        │   ├── inventoryService.js # Stock management
        │   ├── serviceService.js  # Service requests
        │   ├── attendanceService.js # Clock in/out
        │   ├── adminService.js    # Admin operations
        │   ├── analyticsService.js # Dashboard stats
        │   └── superAdminService.js # Super admin ops
        │
        ├── 📁 pages/              # Route Pages (40 total)
        │   │
        │   ├── 📁 auth/           # Authentication Pages
        │   │   ├── Login.jsx      # Role-based login with animations
        │   │   └── Register.jsx   # Multi-step registration
        │   │
        │   ├── 📁 public/         # Public Pages
        │   │   ├── Home.jsx       # Landing page with video
        │   │   ├── Products.jsx   # Product catalog
        │   │   ├── ProductDetail.jsx # Single product view
        │   │   ├── About.jsx
        │   │   └── Contact.jsx
        │   │
        │   ├── 📁 super-admin/    # 👑 Super Admin Dashboard
        │   │   ├── Dashboard.jsx
        │   │   ├── Admins.jsx     # Admin CRUD
        │   │   ├── System.jsx     # System settings
        │   │   ├── Logs.jsx       # System logs
        │   │   └── Analytics.jsx
        │   │
        │   ├── 📁 admin/          # 👨‍💼 Admin Dashboard
        │   │   ├── Dashboard.jsx
        │   │   ├── Products.jsx   # Product management
        │   │   ├── CreateProduct.jsx
        │   │   ├── Orders.jsx     # Dealer orders approval
        │   │   ├── Users.jsx      # Dealer/User management
        │   │   ├── Analytics.jsx
        │   │   └── Settings.jsx
        │   │
        │   ├── 📁 dealer/         # 🏪 Dealer Dashboard
        │   │   ├── Dashboard.jsx
        │   │   ├── Orders.jsx     # Order from admin
        │   │   ├── Inventory.jsx  # Stock management
        │   │   ├── Sales.jsx      # Create sales
        │   │   ├── Employees.jsx  # Employee management
        │   │   ├── Services.jsx   # Service requests
        │   │   └── Attendance.jsx # Staff attendance
        │   │
        │   ├── 📁 employee/       # 👤 Employee Dashboard
        │   │   ├── Dashboard.jsx
        │   │   ├── Sales.jsx      # Create sales
        │   │   ├── Attendance.jsx # Clock in/out
        │   │   └── Profile.jsx
        │   │
        │   ├── 📁 serviceman/     # 🔧 Serviceman Dashboard
        │   │   ├── Dashboard.jsx
        │   │   ├── Services.jsx   # Assigned services
        │   │   ├── Attendance.jsx
        │   │   └── Profile.jsx
        │   │
        │   ├── 📁 customer/       # 👥 Customer Dashboard
        │   │   ├── Dashboard.jsx
        │   │   ├── Bikes.jsx      # Browse & order bikes
        │   │   ├── Orders.jsx     # Order tracking
        │   │   ├── Services.jsx   # Service booking
        │   │   └── Profile.jsx
        │   │
        │   └── NotFound.jsx       # 404 page
        │
        ├── 📁 components/         # Reusable Components (30 total)
        │   │
        │   ├── 📁 layout/         # Layout Components
        │   │   ├── Header.jsx     # Main header with navigation
        │   │   ├── Footer.jsx
        │   │   ├── Sidebar.jsx    # Dashboard sidebar
        │   │   ├── DashboardLayout.jsx # Dashboard wrapper
        │   │   ├── PublicLayout.jsx    # Public page wrapper
        │   │   └── MinimalHeader.jsx   # Auth page header
        │   │
        │   ├── 📁 common/         # Common UI Components
        │   │   ├── DataTable.jsx  # Sortable table
        │   │   ├── LoadingSpinner.jsx
        │   │   ├── StatusBadge.jsx
        │   │   ├── EmptyState.jsx
        │   │   ├── ProductCard.jsx
        │   │   ├── ImageUpload.jsx
        │   │   ├── StatCard.jsx
        │   │   └── FormField.jsx
        │   │
        │   ├── 📁 products/       # Product-specific
        │   │   ├── ProductsGrid.jsx
        │   │   ├── ProductCard.jsx
        │   │   └── ProductCardSkeleton.jsx
        │   │
        │   ├── 📁 admin/          # Admin-specific
        │   │   ├── ProductForm.jsx
        │   │   ├── UserForm.jsx
        │   │   ├── StatsCard.jsx
        │   │   └── OrderDetailsModal.jsx
        │   │
        │   ├── 📁 dealer/         # Dealer-specific
        │   │   ├── OrderForm.jsx
        │   │   └── SaleForm.jsx
        │   │
        │   └── 📁 ui/            # Radix UI Components
        │       ├── badge.jsx
        │       ├── button.jsx
        │       ├── card.jsx
        │       ├── dialog.jsx
        │       ├── input.jsx
        │       ├── label.jsx
        │       └── table.jsx
        │
        ├── 📁 hooks/             # Custom React Hooks (9 total)
        │   ├── useAuth.js        # Authentication & user state
        │   ├── useProducts.js    # Product operations
        │   ├── useOrders.js      # Order management
        │   ├── useSales.js       # Sales operations
        │   ├── useAnalytics.js   # Dashboard stats
        │   ├── useSuperAdmin.js  # Super admin operations
        │   ├── useAdminStats.js  # Admin analytics
        │   ├── useNotifications.js # Notification handling
        │   └── useDebounce.js    # Search debouncing
        │
        ├── 📁 store/             # Zustand State Management
        │   └── authStore.js      # Global auth state
        │
        ├── 📁 routes/            # Routing Configuration
        │   ├── index.jsx         # Route definitions
        │   ├── ProtectedRoute.jsx # Auth guard
        │   └── RoleRoute.jsx     # Role-based guard
        │
        ├── 📁 utils/             # Utility Functions
        │   ├── constants.js      # App constants
        │   ├── formatters.js     # Date, currency formatters
        │   └── cn.js            # Tailwind class merger
        │
        └── 📁 lib/               # Third-party Libraries
            └── queryClient.js    # React Query config
```

**Key Metrics:**

- **Backend:** 11 Django apps, ~80 Python files, 45+ API endpoints
- **Frontend:** 40 pages, 30 components, 9 custom hooks, 6 API services
- **Total:** ~95 frontend files, ~31,000 lines of code

---

## 👥 User Roles & Permissions

### **Role Hierarchy:**

```
👑 Super Admin (System Owner)
    └── 👨‍💼 Admin (Business Manager)
        └── 🏪 Dealer (Dealership Owner)
            ├── 👤 Employee (Sales Staff)
            └── 🔧 Serviceman (Technician)

👥 Customer (Independent User)
```

### **Permissions Matrix:**

| Feature               | Super Admin | Admin | Dealer | Employee | Serviceman | Customer |
| --------------------- | :---------: | :---: | :----: | :------: | :--------: | :------: |
| **Manage Admins**     |     ✅      |  ❌   |   ❌   |    ❌    |     ❌     |    ❌    |
| **Manage Products**   |     ❌      |  ✅   |   ❌   |    ❌    |     ❌     |    ❌    |
| **Approve Orders**    |     ❌      |  ✅   |   ❌   |    ❌    |     ❌     |    ❌    |
| **Order Products**    |     ❌      |  ❌   |   ✅   |    ❌    |     ❌     |    ❌    |
| **Sell Products**     |     ❌      |  ❌   |   ✅   |    ✅    |     ❌     |    ❌    |
| **Manage Dealers**    |     ❌      |  ✅   |   ❌   |    ❌    |     ❌     |    ❌    |
| **Manage Employees**  |     ❌      |  ✅   |   ✅   |    ❌    |     ❌     |    ❌    |
| **Manage Servicemen** |     ❌      |  ✅   |   ✅   |    ❌    |     ❌     |    ❌    |
| **Edit Attendance**   |     ❌      |  ❌   |   ✅   |    ❌    |     ❌     |    ❌    |
| **Assign Services**   |     ❌      |  ❌   |   ✅   |    ❌    |     ❌     |    ❌    |
| **Update Services**   |     ❌      |  ❌   |   ❌   |    ❌    |     ✅     |    ❌    |
| **Book Services**     |     ❌      |  ❌   |   ❌   |    ❌    |     ❌     |    ✅    |
| **Place Orders**      |     ❌      |  ❌   |   ❌   |    ❌    |     ❌     |    ✅    |

### **Detailed Role Descriptions:**

#### **👑 Super Admin:**

- **Purpose:** System owner and administrator
- **Capabilities:**
  - Create, update, delete Admin accounts
  - View system-wide analytics
  - Access system logs
  - Configure system settings
  - Full database access
- **Restrictions:** Cannot directly manage products or dealers

#### **👨‍💼 Admin:**

- **Purpose:** Business operations manager
- **Capabilities:**
  - Manage all products (6 bikes)
  - Create/manage dealer accounts
  - Approve/reject dealer orders
  - Mark orders as shipped
  - View business analytics
  - Generate reports
- **Restrictions:** Cannot create other admins

#### **🏪 Dealer:**

- **Purpose:** Dealership owner/manager
- **Capabilities:**
  - Order products from admin
  - Manage personal inventory
  - Create employees and servicemen
  - Process customer sales
  - Assign service requests
  - Edit staff attendance
  - View dealership analytics
- **Restrictions:** Cannot manage products or other dealers

#### **👤 Employee:**

- **Purpose:** Sales staff at dealership
- **Capabilities:**
  - Create customer sales
  - Process walk-in purchases
  - Clock in/out for attendance
  - View dealer inventory
  - View own sales history
- **Restrictions:** Cannot manage orders or inventory

#### **🔧 Serviceman:**

- **Purpose:** Technical service provider
- **Capabilities:**
  - View assigned service requests
  - Update service status
  - Complete service requests
  - Add service notes and photos
  - Clock in/out for attendance
- **Restrictions:** Cannot create sales or orders

#### **👥 Customer:**

- **Purpose:** End user/bike buyer
- **Capabilities:**
  - Browse product catalog
  - Place bike orders
  - Track order status
  - Book service requests
  - View warranty information
  - View purchase history
- **Restrictions:** Cannot access business operations

---

## 🎯 Key Features

### **🔐 Authentication & Authorization:**

- ✅ JWT-based authentication with refresh tokens
- ✅ Role-based access control (RBAC) with 6 roles
- ✅ Auto-logout after 9 hours of inactivity
- ✅ Secure password hashing (bcrypt)
- ✅ CORS-enabled API for frontend access

### **👥 User Management:**

- ✅ User registration with role assignment
- ✅ Profile management with image upload
- ✅ Hierarchical user creation (Admin creates Dealers, etc.)
- ✅ User activation/deactivation

### **🚴 Product Management:**

- ✅ 6 electric bike models pre-configured
- ✅ Multiple variants per model (colors, specs)
- ✅ Image upload and gallery
- ✅ Price management (base, dealer, MRP)
- ✅ Stock tracking at admin level
- ✅ Featured products
- ✅ Product categories and filters

### **📦 Order Management:**

**Dealer Orders (Dealer → Admin):**

- ✅ Dealers order stock from admin
- ✅ Order approval workflow
- ✅ Inventory auto-update on approval
- ✅ Order rejection with reasons
- ✅ Shipping status tracking

**Customer Orders (Customer → Dealer):**

- ✅ Customers order from dealers
- ✅ Dealer confirmation workflow
- ✅ Home delivery option
- ✅ Advance payment tracking
- ✅ Order status updates

### **💰 Billing & Sales:**

- ✅ Create sales for walk-in customers
- ✅ Create sales for registered customers
- ✅ Auto-generate invoice numbers
- ✅ PDF invoice generation
- ✅ Payment method tracking (cash, UPI, card, etc.)
- ✅ Automatic warranty activation on sale
- ✅ Inventory deduction on sale

### **📊 Inventory Management:**

- ✅ Dealer-specific inventory tracking
- ✅ Stock increases on order approval
- ✅ Stock decreases on sales
- ✅ Low stock alerts
- ✅ Inventory adjustment with reasons
- ✅ Transaction history

### **🎫 Warranty & Service:**

**Warranty System:**

- ✅ Auto-activation on bike purchase
- ✅ 4 free services per bike
- ✅ 24-month warranty period
- ✅ Free service count tracking
- ✅ Warranty expiry tracking

**Service Requests:**

- ✅ Customer books service
- ✅ Dealer assigns to serviceman
- ✅ Serviceman updates status
- ✅ Service completion with notes
- ✅ Parts used tracking
- ✅ Service time tracking
- ✅ Service photo upload

### **⏰ Attendance Management:**

- ✅ Employee/serviceman clock in/out
- ✅ Automatic clock-out after 9 hours
- ✅ Dealer can edit attendance
- ✅ Attendance reports
- ✅ Leave management
- ✅ Late/early tracking

### **🔔 Notifications:**

- ✅ Real-time notifications
- ✅ Role-based notifications
- ✅ Order status updates
- ✅ Service request updates
- ✅ Inventory alerts
- ✅ Mark as read/unread

### **📈 Analytics & Reporting:**

**Admin Analytics:**

- ✅ Total dealers, products, sales
- ✅ Pending orders count
- ✅ Revenue tracking
- ✅ Sales trends
- ✅ Low stock alerts

**Dealer Analytics:**

- ✅ Total sales and revenue
- ✅ Pending customer orders
- ✅ Inventory levels
- ✅ Employee performance
- ✅ Service request stats

**Customer Dashboard:**

- ✅ Order history
- ✅ Warranty status
- ✅ Service history
- ✅ Favorite products

### **🎨 UI/UX Features:**

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations (Framer Motion)
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Form validation with real-time feedback
- ✅ Image galleries
- ✅ Data tables with sorting/filtering
- ✅ Role-specific color themes

### **🔧 Developer Experience:**

- ✅ Production-ready Makefiles (50+ commands each)
- ✅ Comprehensive health checks
- ✅ Live service monitoring
- ✅ Database backup/restore
- ✅ Auto-seeding sample data
- ✅ Browser auto-open
- ✅ Hot reload (Vite + Django)
- ✅ ESLint + Prettier (Frontend)
- ✅ Black + Flake8 (Backend)

---

## 📡 API Documentation

### **Base URL:**

```
Development: http://localhost:8000/api
Production:  https://api.ebikepoint.com/api
```

### **Authentication:**

All protected endpoints require JWT token:

```http
Authorization: Bearer <access_token>
```

### **API Endpoints:**

#### **Authentication (`/api/auth/`):**

```http
POST   /auth/register/                  # Customer registration
POST   /auth/admins/register/           # Admin registration (Super Admin only)
POST   /auth/dealers/register/          # Dealer registration (Admin only)
POST   /auth/employees/register/        # Employee registration (Dealer only)
POST   /auth/servicemen/register/       # Serviceman registration (Dealer only)
POST   /auth/login/                     # Login (all roles)
POST   /auth/logout/                    # Logout
POST   /auth/token/refresh/             # Refresh access token
GET    /auth/profile/                   # Get current user
PATCH  /auth/profile/update/            # Update profile
POST   /auth/change-password/           # Change password
```

#### **Products (`/api/products/`):**

```http
GET    /products/                       # List all products (paginated)
GET    /products/{id}/                  # Get single product
POST   /products/create/                # Create product (Admin only)
PATCH  /products/{id}/update/           # Update product (Admin only)
DELETE /products/{id}/delete/           # Delete product (Admin only)
GET    /products/featured/              # Get featured products
GET    /products/search/?q=lightning    # Search products
GET    /products/category/{category}/   # Filter by category
```

#### **Orders (`/api/orders/`):**

**Dealer Orders:**

```http
POST   /orders/dealer/create/           # Dealer orders from admin
GET    /orders/dealer/                  # List dealer's orders
GET    /orders/dealer/{id}/             # Get order details
POST   /orders/dealer/{id}/approve/     # Approve order (Admin only)
POST   /orders/dealer/{id}/reject/      # Reject order (Admin only)
POST   /orders/dealer/{id}/ship/        # Mark as shipped (Admin only)
```

**Customer Orders:**

```http
POST   /orders/customer/create/         # Customer places order
GET    /orders/customer/                # List customer's orders
GET    /orders/customer/{id}/           # Get order details
PATCH  /orders/customer/{id}/status/    # Update status (Dealer)
```

#### **Billing & Sales (`/api/billing/`):**

```http
POST   /billing/sales/create/           # Create sale (Dealer/Employee)
GET    /billing/sales/                  # List sales
GET    /billing/sales/{id}/             # Get sale details
GET    /billing/sales/{id}/invoice/     # Download invoice PDF
PATCH  /billing/sales/{id}/delivery/    # Update delivery status
GET    /billing/customer/purchases/     # Customer's purchases
GET    /billing/sales/dashboard/        # Sales dashboard stats
```

#### **Inventory (`/api/inventory/`):**

```http
GET    /inventory/                      # Get dealer's inventory
GET    /inventory/low-stock/            # Get low stock items
GET    /inventory/{id}/                 # Get inventory item
PATCH  /inventory/{id}/adjust/          # Adjust stock (Dealer only)
GET    /inventory/{id}/transactions/    # Get transaction history
```

#### **Service Requests (`/api/service/`):**

```http
POST   /service/request/create/         # Book service (Customer)
GET    /service/requests/               # List service requests
GET    /service/requests/{id}/          # Get request details
POST   /service/requests/{id}/assign/   # Assign to serviceman (Dealer)
PATCH  /service/requests/{id}/status/   # Update status (Serviceman)
GET    /service/warranty/{invoice_id}/  # Check warranty status
```

#### **Attendance (`/api/attendance/`):**

```http
POST   /attendance/clock-in/            # Clock in (Employee/Serviceman)
POST   /attendance/clock-out/           # Clock out
GET    /attendance/today/               # Get today's attendance
GET    /attendance/my/                  # Get my attendance history
GET    /attendance/                     # Get all attendance (Dealer)
PATCH  /attendance/{id}/edit/           # Edit attendance (Dealer only)
POST   /attendance/mark/                # Manually mark attendance (Dealer)
GET    /attendance/report/              # Generate attendance report
```

#### **Notifications (`/api/notifications/`):**

```http
GET    /notifications/my/               # Get my notifications
POST   /notifications/create/           # Create notification (Admin)
PATCH  /notifications/{id}/read/        # Mark as read
DELETE /notifications/{id}/             # Delete notification
GET    /notifications/unread-count/     # Get unread count
```

#### **Analytics (`/api/analytics/`):**

```http
GET    /analytics/admin/dashboard/      # Admin dashboard stats
GET    /analytics/dealer/dashboard/     # Dealer dashboard stats
GET    /analytics/sales-trend/          # Sales trend data
GET    /analytics/revenue-report/       # Revenue report
GET    /analytics/inventory-summary/    # Inventory summary
```

### **API Response Format:**

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "count": 10, // For list endpoints
  "next": "http://api.com/products/?page=2", // Pagination
  "previous": null
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": ["Validation error message"]
  },
  "status_code": 400
}
```

### **Status Codes:**

```plaintext
200 OK                  # Success
201 Created             # Resource created
204 No Content          # Success with no response body
400 Bad Request         # Validation error
401 Unauthorized        # Authentication required
403 Forbidden           # Permission denied
404 Not Found           # Resource not found
409 Conflict            # Duplicate resource
500 Internal Error      # Server error
```

### **Testing API:**

**Using cURL:**

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@ebike.com", "password": "Admin@1234"}'

# Get products (with auth)
curl http://localhost:8000/api/products/ \
  -H "Authorization: Bearer <your_access_token>"
```

**Using Postman:**

1. Import collection (create from endpoints above)
2. Set environment variable `base_url` = `http://localhost:8000/api`
3. Login to get token
4. Use token in Authorization header

**Using httpie:**

```bash
# Install httpie
pip install httpie

# Login
http POST http://localhost:8000/api/auth/login/ \
  email=admin@ebike.com password=Admin@1234

# Get products
http GET http://localhost:8000/api/products/ \
  "Authorization: Bearer <token>"
```

---

## 🐛 Troubleshooting

### **Common Issues & Solutions:**

#### **1. MongoDB Connection Error**

**Error:**

```
MongoServerError: couldn't connect to server localhost:27017
```

**Solution:**

```bash
# macOS
brew services start mongodb-community@6.0

# Linux
sudo systemctl start mongod

# Verify
mongosh  # Should connect
```

#### **2. Redis Not Running (Celery Error)**

**Error:**

```
celery.exceptions.OperationalError: Error connecting to Redis
```

**Solution:**

```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis-server

# Verify
redis-cli ping  # Should return PONG
```

#### **3. Port Already in Use**

**Error:**

```
OSError: [Errno 48] Address already in use
```

**Solution:**

```bash
# Backend (port 8000)
make stop  # Stops Django

# OR manually:
lsof -ti:8000 | xargs kill -9

# Frontend (port 5173)
cd client
make stop
```

#### **4. Module Not Found Error (Backend)**

**Error:**

```
ModuleNotFoundError: No module named 'rest_framework'
```

**Solution:**

```bash
cd server

# Ensure venv is activated
source .venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

#### **5. npm Install Fails (Frontend)**

**Error:**

```
npm ERR! code ERESOLVE
```

**Solution:**

```bash
cd client

# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# OR use Makefile
make clean-all
make install
```

#### **6. Tailwind Styles Not Working**

**Issue:** No styling appears

**Solution:**

```bash
cd client

# Ensure Tailwind v3 (NOT v4)
npm install tailwindcss@3.4.19 --save-exact

# Restart dev server
make restart
```

#### **7. CORS Error**

**Error:**

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

```bash
# Check backend .env
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Restart backend
cd server
make restart
```

#### **8. JWT Token Expired**

**Error:**

```
401 Unauthorized: Token has expired
```

**Solution:**

```javascript
// Frontend automatically handles this via axios interceptors
// If issue persists, clear localStorage:
localStorage.clear();
// Then re-login
```

#### **9. Database Migration Error**

**Error:**

```
django.db.migrations.exceptions.InconsistentMigrationHistory
```

**Solution:**

```bash
cd server

# Reset migrations (⚠️ CAUTION: Development only)
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Drop database (⚠️ CAUTION: Loses all data)
mongosh
> use ebikepoint_erp
> db.dropDatabase()
> exit

# Recreate
python manage.py migrate
python manage.py seed_products
```

#### **10. Vite Build Fails**

**Error:**

```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

**Solution:**

```bash
cd client

# Clear cache and rebuild
rm -rf node_modules/.vite dist
npm install
npm run build
```

### **Getting Help:**

If issues persist:

1. **Check Logs:**

   ```bash
   # Backend
   cd server
   make logs
   make logs-error

   # Frontend
   cd client
   npm run dev  # Check console output
   ```

2. **Health Check:**

   ```bash
   # Backend
   cd server
   make health

   # Frontend
   cd client
   make health
   ```

3. **System Status:**

   ```bash
   make status     # Quick overview
   make monitor    # Live monitoring
   ```

4. **Complete Reset (⚠️ Last Resort):**

   ```bash
   # Backend
   cd server
   make clean-all
   make setup

   # Frontend
   cd client
   make clean-all
   make setup
   ```

---

## 🤖 For Future AI Assistants

### **Critical Information:**

#### **1. Service Exports (Frontend):**

All service files (`src/api/*.js`) MUST use **named exports**, not default exports:

```javascript
// ✅ CORRECT
export const orderService = {
  /* methods */
};

// ❌ WRONG
export default orderService;
```

**Why:** Frontend imports use `{ serviceName }` (named import syntax).

#### **2. Tailwind CSS Version:**

**MUST use Tailwind CSS v3, NOT v4:**

```json
"tailwindcss": "3.4.19"  // ✅ Correct
"tailwindcss": "^4.0.0"  // ❌ Wrong
```

**Why:** v4 has breaking changes. Project is built on v3.

#### **3. MongoDB Connection:**

Don't create new connections in management commands. Use existing:

```python
# ✅ CORRECT
from mongoengine import connection
db = connection.get_db()

# ❌ WRONG
from mongoengine import connect
connect('ebikepoint_erp')  # Duplicate connection error
```

#### **4. Makefile Health Check:**

The `health` target uses a management command `health_check.py`:

```bash
cd server/apps/products/management/commands/
# Create health_check.py with database check
```

#### **5. Role Hierarchy:**

Order matters for testing:

```
1. Create Super Admin first
2. Super Admin creates Admin
3. Admin creates Products (required before dealers can order)
4. Admin creates Dealer
5. Dealer creates Employees/Servicemen
6. Customer self-registers
```

#### **6. Permissions Matrix:**

Located in README, enforced in backend views. Update both when changing permissions.

#### **7. Auto-Logout:**

Set to 9 hours. Configured in:

- Backend: `settings.py` → `AUTO_LOGOUT_HOURS=9`
- Frontend: `.env` → `VITE_AUTO_LOGOUT_HOURS=9`

#### **8. Warranty System:**

- **Free Services:** 4 per bike
- **Warranty Period:** 24 months
- **Auto-activated:** On sale creation
- **Tracked in:** `billing` app, `Warranty` model

#### **9. File Locations:**

```plaintext
API Endpoints:    server/apps/*/urls.py
Frontend Routes:  client/src/routes/index.jsx
Service Layer:    client/src/api/*.js
Components:       client/src/components/*
Pages:            client/src/pages/*
```

#### **10. Common Tasks:**

```bash
# Add new API endpoint
1. Create view in server/apps/<app>/views.py
2. Add URL in server/apps/<app>/urls.py
3. Create service method in client/src/api/<service>.js
4. Create hook in client/src/hooks/use<Feature>.js

# Add new user role
1. Update server/apps/users/models.py → ROLE_CHOICES
2. Update permissions matrix in README
3. Add role-specific routes in client/src/routes/
4. Update RoleRoute.jsx to include new role

# Add new page
1. Create page in client/src/pages/<role>/
2. Add route in client/src/routes/index.jsx
3. Add navigation link in client/src/components/layout/Sidebar.jsx
```

---

## 🤝 Contributing

### **Development Workflow:**

1. **Fork & Clone:**

   ```bash
   git clone https://github.com/your-username/e-bike-erp.git
   cd e-bike-erp
   ```

2. **Create Feature Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes:**
   - Backend: Edit in `server/apps/`
   - Frontend: Edit in `client/src/`

4. **Test Changes:**

   ```bash
   # Backend
   cd server
   make test
   make lint

   # Frontend
   cd client
   make test
   make lint
   ```

5. **Commit:**

   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

6. **Push & PR:**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

### **Code Style:**

**Backend (Python):**

- Use Black formatter: `make format`
- Follow PEP 8: `make lint`
- Add docstrings to all functions
- Type hints recommended

**Frontend (JavaScript):**

- Use Prettier: `make format`
- Follow ESLint rules: `make lint`
- Use arrow functions
- Prefer `const` over `let`

### **Commit Convention:**

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 📄 License

This project is built for **E-Bike Point** (https://ebikepoint.co.in/).

**Contact:**

- **Phone:** +91 7980598210
- **Email:** enicontrol@yahoo.com

---

<div align="center">

## 🎉 Project Status Summary

**Backend:** 98% Complete ✅
**Frontend:** 80% Complete ✅
**Overall:** 87% Complete ✅

**Last Updated:** 2026-02-04
**Version:** 1.0.0
**Status:** Active Development

---

**Built with ❤️ using Django, React, MongoDB, and modern DevOps practices**

[⬆ Back to Top](#-e-bike-point---erp-system)

</div>

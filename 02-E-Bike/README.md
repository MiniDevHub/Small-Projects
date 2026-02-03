<div align="center">

# 🚲 E-Bike Point - ERP System

### _Full-Stack Electric Bike Dealership Management Platform_

![Status](https://img.shields.io/badge/Backend-90%25%20Complete-success?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Template%20Ready-blue?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-Django%20%7C%20React%20%7C%20MongoDB-blueviolet?style=for-the-badge)

**Transforming an electric bike website into a comprehensive business management system**

[🎯 Project Status](#-project-status) • [🛠️ Tech Stack](#️-tech-stack-versions) • [🚀 Quick Start](#-quick-start) • [📚 API Docs](#-api-documentation) • [🔮 Next Steps](#-next-steps)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Current Status](#-project-status)
- [Tech Stack & Versions](#️-tech-stack--exact-versions)
- [Prerequisites](#-prerequisites)
- [Backend Setup](#-backend-setup-step-by-step)
- [Frontend Setup](#-frontend-setup-step-by-step)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [Version Compatibility Matrix](#-version-compatibility-matrix)
- [Troubleshooting](#-troubleshooting)
- [For Future AI Assistants](#-for-future-ai-assistants)

---

## 🎯 Project Overview

**E-Bike Point** is a complete rebuild of https://ebikepoint.co.in/ - transforming a simple PHP e-commerce site into a modern, full-stack **ERP (Enterprise Resource Planning) system** for managing an electric bike dealership network across India.

### **What Makes This Special:**

- 🏢 **Multi-Role Hierarchy** - Admin → Dealer → Employee/Serviceman → Customer
- 📦 **Complete Business Workflow** - From product ordering to customer service
- 🔐 **Role-Based Access Control** - 5 distinct user types with specific permissions
- 🎫 **Warranty Management** - Track free services (4 per bike) and paid services
- 📊 **Comprehensive ERP** - Orders, billing, inventory, attendance, payroll, service requests
- ⚡ **Modern Stack** - Django REST API + React + MongoDB
- 🔌 **Real-time Features** - WebSocket support via Django Channels

### **Original Website:**

- **URL:** https://ebikepoint.co.in/
- **Current Tech:** PHP (basic e-commerce)
- **Products:** 6 electric bike models
- **Contact:** +91 7980598210 | enicontrol@yahoo.com

---

<div align="center">

## 📊 Project Status

| Module                      | Status  | Completion |
| --------------------------- | ------- | ---------- |
| **Authentication**          | ✅ Done | 100%       |
| **User Management**         | ✅ Done | 100%       |
| **Products**                | ✅ Done | 100%       |
| **Orders (Dealer → Admin)** | ✅ Done | 100%       |
| **Orders (Customer)**       | ✅ Done | 100%       |
| **Billing/Sales**           | ✅ Done | 100%       |
| **Inventory**               | ✅ Done | 100%       |
| **Attendance**              | ✅ Done | 100%       |
| **Service Requests**        | ✅ Done | 100%       |
| **Notifications**           | ✅ Done | 100%       |
| **Analytics**               | ✅ Done | 100%       |

**Backend: 98% Complete | Frontend: 30% Complete | Overall: 65%**

</div>

---

## 🛠️ Tech Stack & Exact Versions

> **⚠️ IMPORTANT:** Use these exact versions to avoid compatibility issues

### **Backend Stack**

```plaintext
Language & Runtime:
├── Python 3.10+ (Tested on 3.14)

Web Framework:
├── Django==5.0.1
├── djangorestframework==3.14.0
└── djangorestframework-simplejwt==5.3.1

Database & ODM:
├── pymongo==4.6.0
├── mongoengine==0.28.2
└── MongoDB 6.0+

Security & Authentication:
├── bcrypt==4.1.2
├── PyJWT==2.11.0
└── django-cors-headers==4.3.1

WebSocket Support:
├── channels==4.0.0
├── channels-redis==4.1.0
├── daphne==4.0.0
└── redis==5.0.1

Task Queue:
├── celery==5.3.6
├── amqp==5.3.1
├── billiard==4.2.4
├── kombu==5.6.2
└── vine==5.1.0

Utilities:
├── python-decouple==3.8
├── pillow==12.1.0
├── pytz==2025.2
├── python-dateutil==2.9.0.post0
├── gunicorn==21.2.0
└── reportlab==4.0.9
```

### **Frontend Stack**

```plaintext
Runtime:
├── Node.js 18+ (Tested on 20+)
└── npm 9+

Core Framework:
├── react==19.2.0
├── react-dom==19.2.0
└── vite==7.2.4

Routing & Navigation:
└── react-router-dom==6.30.3

API & State Management:
├── axios==1.13.4
├── @tanstack/react-query==5.90.20
├── zustand==5.0.11
└── socket.io-client==4.7.5

Forms & Validation:
├── react-hook-form==7.71.1
├── yup==1.7.1
└── @hookform/resolvers==5.2.2

Styling (Tailwind CSS v3):
├── tailwindcss==3.4.16
├── postcss==8.5.6
├── autoprefixer==10.4.24
├── @tailwindcss/forms==0.5.11
└── @tailwindcss/typography==0.5.19

UI Components (Radix UI):
├── @radix-ui/react-dialog==1.1.15
├── @radix-ui/react-dropdown-menu==2.1.16
├── @radix-ui/react-label==2.1.8
├── @radix-ui/react-select==2.2.6
├── @radix-ui/react-slot==1.2.4
└── @radix-ui/react-tabs==1.1.13

UI Utilities:
├── lucide-react==0.563.0
├── framer-motion==12.29.3
├── react-hot-toast==2.6.0
├── clsx==2.1.1
├── tailwind-merge==3.4.0
└── class-variance-authority==0.7.1

Charts & Data Visualization:
├── recharts==3.7.0
└── date-fns==4.1.0
```

### **Development Tools**

```plaintext
├── Postman (API testing)
├── Git/GitHub (version control)
├── MongoDB Compass (database GUI)
└── VS Code (recommended IDE)
```

---

## ✅ Prerequisites

### **System Requirements:**

```bash
# Check Python version (must be 3.10+)
python3 --version

# Check Node.js version (must be 18+)
node --version

# Check npm version (must be 9+)
npm --version

# Check MongoDB installation
mongod --version
```

### **Install Prerequisites:**

**macOS:**

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python@3.11

# Install Node.js
brew install node@20

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB service
brew services start mongodb-community@6.0
```

**Linux (Ubuntu/Debian):**

```bash
# Install Python
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Windows:**

- Download Python 3.11+: https://www.python.org/downloads/
- Download Node.js 20+: https://nodejs.org/
- Download MongoDB 6.0+: https://www.mongodb.com/try/download/community

---

## 🚀 Backend Setup (Step-by-Step)

### **Step 1: Clone Repository & Navigate**

```bash
# Clone your repository
git clone <your-repo-url>
cd 02-E-Bike

# Navigate to backend
cd server
```

### **Step 2: Create Virtual Environment**

```bash
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
# macOS/Linux:
source .venv/bin/activate

# Windows:
.venv\Scripts\activate

# Your terminal should show (.venv) prefix
```

### **Step 3: Install Exact Dependencies**

**Create `requirements.txt` with these EXACT versions:**

```txt
# Core Framework
Django==5.0.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1

# Database
pymongo==4.6.0
mongoengine==0.28.2

# Security
bcrypt==4.1.2
PyJWT==2.11.0
django-cors-headers==4.3.1
cryptography==46.0.4

# WebSocket & Real-time
channels==4.0.0
channels-redis==4.1.0
daphne==4.0.0
redis==5.0.1

# Task Queue
celery==5.3.6
amqp==5.3.1
billiard==4.2.4
kombu==5.6.2
vine==5.1.0

# Utilities
python-decouple==3.8
pillow==12.1.0
pytz==2025.2
python-dateutil==2.9.0.post0
gunicorn==21.2.0

# Additional Dependencies
asgiref==3.11.0
autobahn==25.12.2
Automat==25.4.16
attrs==25.4.0
cbor2==5.8.0
cffi==2.0.0
click==8.3.1
click-didyoumean==0.3.1
click-plugins==1.1.1.2
click-repl==0.3.0
constantly==23.10.4
dnspython==2.8.0
hyperlink==21.0.0
idna==3.11
Incremental==24.11.0
msgpack==1.1.2
packaging==26.0
prompt_toolkit==3.0.52
py-ubjson==0.16.1
pyasn1==0.6.2
pyasn1_modules==0.4.2
pycparser==3.0
pyOpenSSL==25.3.0
reportlab==4.0.9
service-identity==24.2.0
six==1.17.0
sqlparse==0.5.5
Twisted==25.5.0
txaio==25.12.2
typing_extensions==4.15.0
tzdata==2025.3
ujson==5.11.0
wcwidth==0.5.3
zope.interface==8.2
```

**Install dependencies:**

```bash
pip install -r requirements.txt

# Verify installation
pip list
```

### **Step 4: Configure Environment Variables**

Create `.env` file in `server/` directory:

```bash
# Create .env file
cat > .env << 'EOF'
# Django Settings
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MongoDB Configuration
MONGODB_NAME=ebikepoint_erp
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASSWORD=

# JWT Configuration
JWT_SECRET_KEY=your-jwt-secret-key-change-this
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7

# Business Rules
AUTO_LOGOUT_HOURS=9
FREE_SERVICES_COUNT=4
WARRANTY_MONTHS=24

# Redis Configuration (for Channels & Celery)
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8000
EOF
```

### **Step 5: Start MongoDB**

```bash
# macOS
brew services start mongodb-community@6.0

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services app

# Verify MongoDB is running
mongosh
# Should connect successfully, then exit:
# exit
```

### **Step 6: Run Django Server**

```bash
# Make sure you're in server/ directory with activated venv
python manage.py runserver

# Server should start at: http://localhost:8000
# You should see:
# Starting development server at http://127.0.0.1:8000/
# Quit the server with CONTROL-C.
```

### **Step 7: Create Admin User**

Open a new terminal (keep server running):

```bash
cd server
source .venv/bin/activate  # Activate venv

# Open Django shell
python manage.py shell
```

In Python shell:

```python
from apps.users.models import User

# Create admin user
admin = User.create_superuser(
    email="admin@ebike.com",
    password="Admin@1234",
    first_name="Admin",
    last_name="User",
    phone="9999999999"
)
print(f"Admin created: {admin.email}")

# Exit shell
exit()
```

### **Step 8: Test Backend**

```bash
# Test API endpoint
curl http://localhost:8000/api/products/

# Or visit in browser:
# http://localhost:8000/api/products/
```

---

## ⚛️ Frontend Setup (Step-by-Step)

### **Step 1: Navigate to Project Root**

```bash
# If you're in server/ directory:
cd ..

# You should be in 02-E-Bike/ directory
pwd
```

### **Step 2: Create React Project with Vite**

```bash
# Create React project with Vite
npm create vite@latest client -- --template react

# Navigate to frontend
cd client
```

### **Step 3: Install Dependencies with EXACT Versions**

**Replace `package.json` with this:**

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "5.2.2",
    "@radix-ui/react-dialog": "1.1.15",
    "@radix-ui/react-dropdown-menu": "2.1.16",
    "@radix-ui/react-label": "2.1.8",
    "@radix-ui/react-select": "2.2.6",
    "@radix-ui/react-slot": "1.2.4",
    "@radix-ui/react-tabs": "1.1.13",
    "@tanstack/react-query": "5.90.20",
    "axios": "1.13.4",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "date-fns": "4.1.0",
    "framer-motion": "12.29.3",
    "lucide-react": "0.563.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-hook-form": "7.71.1",
    "react-hot-toast": "2.6.0",
    "react-router-dom": "6.30.3",
    "recharts": "3.7.0",
    "socket.io-client": "4.7.5",
    "tailwind-merge": "3.4.0",
    "yup": "1.7.1",
    "zustand": "5.0.11"
  },
  "devDependencies": {
    "@eslint/js": "9.39.1",
    "@tailwindcss/forms": "0.5.11",
    "@tailwindcss/typography": "0.5.19",
    "@types/react": "19.2.5",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "5.1.1",
    "autoprefixer": "10.4.24",
    "eslint": "9.39.1",
    "eslint-plugin-react-hooks": "7.0.1",
    "eslint-plugin-react-refresh": "0.4.24",
    "globals": "16.5.0",
    "postcss": "8.5.6",
    "tailwindcss": "3.4.16",
    "vite": "7.2.4"
  }
}
```

**Install dependencies:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify installation
npm list --depth=0
```

### **Step 4: Initialize Tailwind CSS v3**

```bash
# Initialize Tailwind (this should work now with v3)
npx tailwindcss init -p

# If it still fails, use manual configuration (see below)
```

**If init fails, create `tailwind.config.js` manually:**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Create `postcss.config.js`:**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### **Step 5: Setup Project Structure**

```bash
# Create directory structure
mkdir -p src/{components/{ui,layout,features},pages/{public,admin,dealer,employee,customer},services,hooks,store,utils,lib}

# Create necessary files
touch src/services/{api.js,auth.js,websocket.js}
touch src/store/authStore.js
touch src/lib/utils.js
touch src/pages/HomePage.jsx
touch src/pages/LoginPage.jsx
touch src/pages/RegisterPage.jsx
touch src/pages/DashboardPage.jsx
```

### **Step 6: Configure Core Files**

**`src/index.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**`src/main.jsx`:**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
```

**`src/App.jsx`:**

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
```

**`src/services/api.js`:**

```js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("access_token", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
```

**`src/services/auth.js`:**

```js
import api from "./api";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login/", { email, password });
    const { access, refresh } = response.data;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    return response.data;
  },

  async register(userData) {
    const response = await api.post("/auth/register/", userData);
    return response.data;
  },

  async logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me/");
    return response.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  },
};
```

**`src/store/authStore.js`:**

```js
import { create } from "zustand";
import { authService } from "../services/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      await authService.login(email, password);
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    try {
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
```

**`src/lib/utils.js`:**

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**`src/pages/HomePage.jsx`:**

```jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Welcome to E-Bike Point</h1>
        <p className="text-xl mb-8">Your Complete ERP Solution</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**`src/pages/LoginPage.jsx`:**

```jsx
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);

    if (result.success) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
```

**`src/pages/RegisterPage.jsx`:**

```jsx
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register - Coming Soon</h2>
        <p className="text-gray-600">
          Registration page will be implemented next.
        </p>
      </div>
    </div>
  );
}
```

**`src/pages/DashboardPage.jsx`:**

```jsx
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-4">Welcome back!</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
```

### **Step 7: Create Environment Variables**

Create `.env` in `client/` directory:

```bash
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000
```

### **Step 8: Start Frontend Development Server**

```bash
npm run dev

# Should open at: http://localhost:5173
```

### **Step 9: Test Frontend**

1. Open browser: `http://localhost:5173`
2. You should see the homepage with Login/Register buttons
3. Click Login
4. Try logging in with admin credentials:
   - Email: `admin@ebike.com`
   - Password: `Admin@1234`

---

## 📁 Project Structure

```plaintext
02-E-Bike/
├── server/                          # ✅ Django Backend (90% Complete)
│   ├── apps/
│   │   ├── users/                   # User management & auth
│   │   │   ├── models.py
│   │   │   ├── views.py
│   │   │   ├── serializers.py
│   │   │   └── backends.py
│   │   ├── products/                # Product catalog
│   │   ├── orders/                  # Order management
│   │   ├── billing/                 # Sales & invoicing
│   │   ├── inventory/               # Stock tracking
│   │   ├── attendance/              # Employee attendance
│   │   └── service/                 # Service requests
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── requirements.txt
│   ├── .env
│   └── manage.py
│
├── client/                          # ✅ React Frontend (Template Ready)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable components
│   │   │   ├── layout/              # Layout components
│   │   │   └── features/            # Feature components
│   │   ├── pages/
│   │   │   ├── public/              # Public pages
│   │   │   ├── admin/               # Admin pages
│   │   │   ├── dealer/              # Dealer pages
│   │   │   ├── employee/            # Employee pages
│   │   │   └── customer/            # Customer pages
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── auth.js              # Auth API
│   │   │   └── websocket.js         # WebSocket client
│   │   ├── hooks/                   # Custom hooks
│   │   ├── store/                   # Zustand stores
│   │   │   └── authStore.js
│   │   ├── utils/                   # Utilities
│   │   ├── lib/
│   │   │   └── utils.js             # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── .env
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🔐 Version Compatibility Matrix

| Component            | Version     | Compatible With                   | Notes                               |
| -------------------- | ----------- | --------------------------------- | ----------------------------------- |
| **Python**           | 3.10 - 3.14 | Django 5.0.1                      | Tested on 3.14                      |
| **Django**           | 5.0.1       | Python 3.10+                      | LTS version                         |
| **DRF**              | 3.14.0      | Django 5.0+                       | Latest stable                       |
| **MongoDB**          | 6.0+        | pymongo 4.6.0, mongoengine 0.28.2 | Community Edition                   |
| **Node.js**          | 18 - 20     | React 19, Vite 7                  | LTS recommended                     |
| **React**            | 19.2.0      | React Router 6, React Query 5     | Latest stable                       |
| **Tailwind CSS**     | 3.4.16      | PostCSS 8.5.6, Autoprefixer 10.4  | **NOT v4** (incompatible)           |
| **Vite**             | 7.2.4       | React 19, Node 18+                | Latest                              |
| **React Router**     | 6.30.3      | React 19                          | v6 required                         |
| **React Query**      | 5.90.20     | React 19                          | v5 required (@tanstack/react-query) |
| **Zustand**          | 5.0.11      | React 19                          | Lightweight state mgmt              |
| **Socket.io-client** | 4.7.5       | Django Channels 4.0.0             | For WebSocket support               |
| **simplejwt**        | 5.3.1       | Django 5.0, DRF 3.14              | JWT authentication                  |
| **Celery**           | 5.3.6       | Redis 5.0.1, Django 5.0           | Background tasks                    |
| **Channels**         | 4.0.0       | Django 5.0, Redis 5.0             | WebSocket support                   |

### **⚠️ Known Incompatibilities:**

| Package          | Version to AVOID | Reason                                                    | Use Instead   |
| ---------------- | ---------------- | --------------------------------------------------------- | ------------- |
| **tailwindcss**  | 4.x              | Breaking changes, PostCSS plugin separated                | 3.4.16        |
| **React**        | < 18             | Incompatible with React Router 6.30+, React Query 5       | 19.2.0        |
| **Node.js**      | < 18             | Vite 7 requires Node 18+                                  | 18+ or 20 LTS |
| **Python**       | < 3.10           | Django 5.0 requires Python 3.10+                          | 3.10+         |
| **MongoDB**      | < 5.0            | mongoengine 0.28.2 works best with MongoDB 6.0+           | 6.0+          |
| **React Router** | v5               | Different API, incompatible with modern React 19 patterns | v6.30.3       |

---

## 🗄️ Database Schema

### **Key MongoDB Collections:**

#### **1. users**

```javascript
{
  _id: ObjectId,
  email: "admin@ebike.com",
  password: "$2b$12$...",  // bcrypt hashed
  role: "admin",  // admin | dealer | employee | serviceman | customer
  first_name: "Admin",
  last_name: "User",
  phone: "9999999999",
  dealership_name: "Sharma E-Bike Store",  // for dealers
  dealer_id: ObjectId,  // for employees/servicemen
  is_active: true,
  is_approved: true,
  date_joined: ISODate()
}
```

#### **2. products**

```javascript
{
  _id: ObjectId,
  name: "Super Bike LIGHTNING",
  slug: "super-bike-lightning",
  model: "LIGHTNING",
  specifications: {
    range_km: "50-60 KM",
    battery_type: "Lithium-ion",
    top_speed: "50 km/h",
    motor_power: "500W"
  },
  base_price: 45000,
  dealer_price: 40000,
  mrp: 50000,
  service_charges: {
    standard_service: 500,
    major_service: 1000
  },
  warranty: {
    free_services: 4,
    warranty_period_months: 24
  },
  total_stock: 100,
  is_available: true,
  created_at: ISODate(),
  updated_at: ISODate()
}
```

#### **3. orders** (Dealer → Admin)

```javascript
{
  _id: ObjectId,
  order_number: "ORD-20260127-001",
  dealer_id: ObjectId,
  items: [
    {
      product_id: ObjectId,
      product_name: "Super Bike LIGHTNING",
      quantity: 5,
      unit_price: 40000
    }
  ],
  status: "pending",  // pending | approved | rejected | shipped
  total_amount: 200000,
  tax_amount: 36000,
  grand_total: 236000,
  approved_by: ObjectId,
  approval_date: ISODate(),
  notes: "",
  created_at: ISODate(),
  updated_at: ISODate()
}
```

#### **4. sales** (Customer Purchases)

```javascript
{
  _id: ObjectId,
  invoice_number: "INV-20260127-001",
  dealer_id: ObjectId,
  employee_id: ObjectId,
  customer_id: ObjectId,
  items: [
    {
      product_id: ObjectId,
      product_name: "Super Bike LIGHTNING",
      quantity: 1,
      unit_price: 45000
    }
  ],
  warranty: {
    is_activated: true,
    activation_date: ISODate(),
    expiry_date: ISODate(),
    free_services_total: 4,
    free_services_used: 0,
    free_services_remaining: 4
  },
  payment_method: "cash",  // cash | card | upi | emi
  tax_amount: 8100,
  grand_total: 53100,
  created_at: ISODate()
}
```

---

## 📚 API Documentation

### **Base URL:** `http://localhost:8000/api`

### **Authentication Endpoints**

| Method | Endpoint                 | Description        | Auth Required |
| ------ | ------------------------ | ------------------ | ------------- |
| POST   | `/auth/register/`        | Register customer  | No            |
| POST   | `/auth/login/`           | Login (all roles)  | No            |
| POST   | `/auth/logout/`          | Logout             | Yes           |
| GET    | `/auth/me/`              | Get current user   | Yes           |
| PUT    | `/auth/profile/`         | Update profile     | Yes           |
| POST   | `/auth/change-password/` | Change password    | Yes           |
| POST   | `/auth/token/refresh/`   | Refresh JWT token  | No            |
| DELETE | `/auth/delete-account/`  | Delete own account | Yes           |

### **Product Endpoints**

| Method | Endpoint                          | Description         | Auth Required |
| ------ | --------------------------------- | ------------------- | ------------- |
| GET    | `/products/`                      | List all products   | No (Public)   |
| GET    | `/products/:id/`                  | Get product by ID   | No            |
| GET    | `/products/slug/:slug/`           | Get product by slug | No            |
| POST   | `/products/admin/create/`         | Create product      | Yes (Admin)   |
| PUT    | `/products/admin/:id/update/`     | Update product      | Yes (Admin)   |
| DELETE | `/products/admin/:id/delete/`     | Delete product      | Yes (Admin)   |
| GET    | `/products/admin/stock/overview/` | Stock overview      | Yes (Admin)   |

### **Order Endpoints** (Dealer → Admin)

| Method | Endpoint               | Description     | Auth Required |
| ------ | ---------------------- | --------------- | ------------- |
| POST   | `/orders/create/`      | Create order    | Yes (Dealer)  |
| GET    | `/orders/`             | List orders     | Yes           |
| GET    | `/orders/:id/`         | Order details   | Yes           |
| POST   | `/orders/:id/approve/` | Approve order   | Yes (Admin)   |
| POST   | `/orders/:id/reject/`  | Reject order    | Yes (Admin)   |
| POST   | `/orders/:id/ship/`    | Mark as shipped | Yes (Admin)   |

### **Billing/Sales Endpoints**

| Method | Endpoint                       | Description        | Auth Required         |
| ------ | ------------------------------ | ------------------ | --------------------- |
| POST   | `/billing/sales/create/`       | Create sale        | Yes (Dealer/Employee) |
| GET    | `/billing/sales/`              | List sales         | Yes                   |
| GET    | `/billing/sales/:id/`          | Sale details       | Yes                   |
| GET    | `/billing/customer/purchases/` | Customer purchases | Yes (Customer)        |

### **Service Endpoints**

| Method | Endpoint                               | Description            | Auth Required    |
| ------ | -------------------------------------- | ---------------------- | ---------------- |
| POST   | `/service/request/create/`             | Create service request | Yes (Customer)   |
| GET    | `/service/requests/`                   | List service requests  | Yes              |
| GET    | `/service/requests/:id/`               | Service details        | Yes              |
| POST   | `/service/requests/:id/assign/`        | Assign to serviceman   | Yes (Dealer)     |
| POST   | `/service/requests/:id/update-status/` | Update status          | Yes (Serviceman) |
| GET    | `/service/warranty/:invoice_id/`       | Check warranty         | Yes              |

---

## 👥 User Roles & Permissions

### **Role Hierarchy:**

```
Admin (Super User)
  └── Dealer (Dealership Owner)
      ├── Employee (Sales Staff)
      └── Serviceman (Technician)

Customer (End User - Independent)
```

### **Permissions Matrix:**

| Feature               | Super Admin | Admin | Dealer | Employee | Serviceman | Customer |
| --------------------- | ----------- | ----- | ------ | -------- | ---------- | -------- |
| **Manage Admins**     | ✅          | ❌    | ❌     | ❌       | ❌         | ❌       |
| **Manage Products**   | ❌          | ✅    | ❌     | ❌       | ❌         | ❌       |
| **Approve Orders**    | ❌          | ✅    | ❌     | ❌       | ❌         | ❌       |
| **Order Products**    | ❌          | ❌    | ✅     | ❌       | ❌         | ❌       |
| **Sell Products**     | ❌          | ❌    | ✅     | ✅       | ❌         | ❌       |
| **Manage Dealers**    | ❌          | ✅    | ❌     | ❌       | ❌         | ❌       |
| **Manage Employees**  | ❌          | ✅    | ✅     | ❌       | ❌         | ❌       |
| **Manage Servicemen** | ❌          | ✅    | ✅     | ❌       | ❌         | ❌       |
| **Edit Attendance**   | ❌          | ❌    | ✅     | ❌       | ❌         | ❌       |
| **Assign Services**   | ❌          | ❌    | ✅     | ❌       | ❌         | ❌       |
| **Update Services**   | ❌          | ❌    | ❌     | ❌       | ✅         | ❌       |
| **Book Services**     | ❌          | ❌    | ❌     | ❌       | ❌         | ✅       |
| **Place Orders**      | ❌          | ❌    | ❌     | ❌       | ❌         | ✅       |

---

## 🐛 Troubleshooting

### **Backend Issues:**

#### **MongoDB Connection Error:**

```bash
# Error: MongoServerSelectionTimeoutError
# Solution: Make sure MongoDB is running

# macOS
brew services start mongodb-community@6.0
brew services list

# Linux
sudo systemctl start mongod
sudo systemctl status mongod

# Verify connection
mongosh
```

#### **Import Error: No module named 'apps':**

```bash
# Solution: Make sure you're in the correct directory
cd server
python manage.py runserver
```

#### **JWT Token Error:**

```python
# Error: Token is invalid or expired
# Solution: Clear tokens and login again

# In Django shell:
from apps.users.models import User
user = User.objects.get(email="admin@ebike.com")
user.save()  # This will refresh token settings
```

### **Frontend Issues:**

#### **Tailwind CSS Not Working:**

```bash
# 1. Verify Tailwind v3 is installed
npm list tailwindcss
# Should show: tailwindcss@3.4.16

# 2. If showing v4, uninstall and reinstall v3
npm uninstall tailwindcss
npm install -D tailwindcss@3.4.16

# 3. Verify config files exist
ls tailwind.config.js postcss.config.js

# 4. Make sure index.css has Tailwind directives
cat src/index.css
# Should have: @tailwind base; @tailwind components; @tailwind utilities;

# 5. Restart dev server
npm run dev
```

#### **CORS Error:**

```javascript
// Error: Access to XMLHttpRequest blocked by CORS policy

// Solution 1: Check backend .env CORS_ALLOWED_ORIGINS
// Make sure it includes: http://localhost:5173

// Solution 2: Check Django settings.py
CORS_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173", // Add this
  "http://127.0.0.1:5173",
];
```

#### **API Connection Error:**

```javascript
// Error: Network Error or 404

// Check .env file
VITE_API_URL=http://localhost:8000/api  // Must match backend URL

// Restart frontend after changing .env
npm run dev
```

#### **React Router Not Working:**

```javascript
// Error: Cannot read property 'pathname' of undefined

// Solution: Make sure BrowserRouter wraps App in main.jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {" "}
    {/* This is required */}
    <App />
  </BrowserRouter>,
);
```

### **Version Conflict Issues:**

#### **Node Version Error:**

```bash
# Error: The engine "node" is incompatible with this module

# Check Node version
node --version

# If < 18, install Node 18 or 20
# macOS
brew install node@20
brew link --force --overwrite node@20

# Linux
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### **Python Version Error:**

```bash
# Error: Python 3.10 or higher is required

# Check Python version
python3 --version

# Install correct version
# macOS
brew install python@3.11

# Linux
sudo apt install python3.11 python3.11-venv
```

---

## 🚀 Running Both Servers

### **Option 1: Two Terminal Windows**

**Terminal 1 - Backend:**

```bash
cd server
source .venv/bin/activate
python manage.py runserver
# Running at http://localhost:8000
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
# Running at http://localhost:5173
```

### **Option 2: tmux (Advanced)**

```bash
# Start tmux session
tmux new -s ebike

# Split window horizontally
Ctrl+B then "

# Terminal 1 (top): Backend
cd server && source .venv/bin/activate && python manage.py runserver

# Switch to Terminal 2 (bottom): Ctrl+B then down arrow
cd client && npm run dev

# Switch between panes: Ctrl+B then arrow keys
# Detach session: Ctrl+B then D
# Reattach: tmux attach -t ebike
```

---

## 🤖 For Future AI Assistants

### **Project Context:**

- **Name:** E-Bike Point ERP System
- **Type:** Full-stack e-commerce + business management
- **Original:** PHP website (https://ebikepoint.co.in/)
- **Rebuild:** Django REST API + React SPA + MongoDB
- **Purpose:** Skill demonstration & production ERP

### **Current State (As of 2026-02-02):**

✅ **Backend (90% Complete):**

- 38+ REST API endpoints functional
- 5 user roles with RBAC (Admin, Dealer, Employee, Serviceman, Customer)
- JWT authentication with refresh tokens
- MongoDB integration via MongoEngine
- All CRUD operations tested
- Order workflow complete (dealer → admin approval)
- Sales with warranty activation (4 free services)
- Attendance tracking with auto-logout
- Service request management
- Management commands for utilities

✅ **Frontend (Template Ready):**

- React 19.2.0 + Vite 7.2.4
- Tailwind CSS v3 configured
- React Router v6 setup
- Axios with JWT interceptors
- Zustand auth store
- Login/Register/Dashboard pages
- Role-based routing structure

### **Exact Version Information:**

**Backend Dependencies:**

```plaintext
Python: 3.10-3.14
Django: 5.0.1
djangorestframework: 3.14.0
simplejwt: 5.3.1
mongoengine: 0.28.2
pymongo: 4.6.0
channels: 4.0.0
celery: 5.3.6
redis: 5.0.1
```

**Frontend Dependencies:**

```plaintext
Node.js: 18-20
React: 19.2.0
Vite: 7.2.4
React Router: 6.30.3
Axios: 1.13.4
React Query: 5.90.20
Zustand: 5.0.11
Tailwind CSS: 3.4.16 (NOT v4)
```

### **Critical Information:**

🚨 **Must use Tailwind CSS v3.4.16, NOT v4** - v4 has breaking changes
🚨 **JWT tokens stored in localStorage** - access (1hr), refresh (7 days)
🚨 **MongoDB database name:** `ebikepoint_erp`
🚨 **Backend URL:** `http://localhost:8000`
🚨 **Frontend URL:** `http://localhost:5173`
🚨 **CORS enabled** for localhost:5173

### **When User Asks to Continue:**

1. ✅ Backend is 90% complete and functional
2. ✅ Frontend template is set up and tested
3. 🚧 Next: Build role-specific dashboards
4. 🚧 Next: Implement product catalog UI
5. 🚧 Next: Create order management interface
6. 🚧 Next: Build sales/billing interface

### **Quick Start Commands:**

```bash
# Backend
cd server && source .venv/bin/activate && python manage.py runserver

# Frontend
cd client && npm run dev

# Test Login:
# Email: admin@ebike.com
# Password: Admin@1234
```

### **Available Resources:**

- ✅ Complete API documentation (38+ endpoints)
- ✅ Database schema design (8+ collections)
- ✅ Postman collection (separate file)
- ✅ Management commands
- ✅ Frontend template with auth
- ✅ All dependencies with exact versions

---

<div align="center">

## 🎯 Project Metrics

| Metric                     | Count                   |
| -------------------------- | ----------------------- |
| **Backend Completion**     | 98%                     |
| **Frontend Completion**    | 30% (Template Ready)    |
| **API Endpoints**          | 80+                     |
| **User Roles**             | 6                       |
| **Database Collections**   | 12+                     |
| **Backend Lines of Code**  | ~15,000+                |
| **Frontend Lines of Code** | ~2,000+ (partial UI)    |
| **Days Worked**            | ~20                     |
| **Remaining Work**         | Frontend Implementation |

</div>

---

## 🏆 Key Achievements

✅ Complete authentication system with JWT & refresh tokens <br>
✅ Multi-role access control (5 roles) <br>
✅ Order workflow (dealer → admin approval) <br>
✅ Sales with automatic warranty activation <br>
✅ Service tracking (free vs paid services) <br>
✅ Attendance system with auto-logout (9 hours) <br>
✅ Management commands & utilities <br>
✅ Clean, documented, production-ready code <br>
✅ Frontend template with auth & routing <br>
✅ No version conflicts (tested & verified) <br>

---

<div align="center">

## 📞 Project Info

**Original Website:** https://ebikepoint.co.in/ <br>
**Contact:** +91 7980598210 | enicontrol@yahoo.com <br>
**Stack:** Django 5.0.1 + React 19.2.0 + MongoDB 6.0+ <br>
**Status:** Backend 90% + Frontend 30% = 60% Total <br>

</div>

---

### 🎯 Next Milestones

#### Phase 1: Core Dashboards (Week 1-2)

- [ ] Admin Dashboard with Analytics
- [ ] Dealer Dashboard with Inventory & Sales
- [ ] Customer Dashboard with Purchases & Services
- [ ] Employee Dashboard with Sales & Attendance
- [ ] Serviceman Dashboard with Assigned Services

#### Phase 2: Feature Pages (Week 3-4)

- [ ] Product Catalog UI (Public)
- [ ] Product Detail Pages
- [ ] Order Management UI (Dealer/Admin)
- [ ] Sales/Billing Interface
- [ ] Inventory Management UI

#### Phase 3: Advanced Features (Week 5-6)

- [ ] Service Booking System
- [ ] Attendance Management
- [ ] Notifications System
- [ ] Analytics & Reports
- [ ] Profile & Settings Pages

#### Phase 4: Polish & Deploy (Week 7-8)

- [ ] Responsive Design
- [ ] Performance Optimization
- [ ] Testing & Bug Fixes
- [ ] Production Deployment

---

## 📝 License

This project is proprietary software for E-Bike Point.

---

<div align="center">

**Built with 💚 and lots of ☕**<br>
**⭐ Star this repository if you found it helpful!**<br>

**Last Updated:** 2026-02-02 <br>
**Version:** 1.0.0-beta <br>

</div>

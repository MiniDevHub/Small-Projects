<div align="center">

# 🚲 E-Bike Point - ERP System

### _Full-Stack Electric Bike Dealership Management Platform_

![Status](https://img.shields.io/badge/Backend-90%25%20Complete-success?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Ready%20to%20Build-blue?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-Django%20%7C%20React%20%7C%20MongoDB-blueviolet?style=for-the-badge)

**Transforming an electric bike website into a comprehensive business management system**

[🎯 Project Status](#-project-status) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Quick Start](#-quick-start) • [📚 API Docs](#-api-documentation) • [🔮 Next Steps](#-next-steps)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Current Status](#-project-status)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Setup](#-backend-setup-django)
- [Frontend Setup](#-frontend-setup-react)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [Features Completed](#-features-completed)
- [Next Steps](#-next-steps)
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

### **Original Website:**

- **URL:** https://ebikepoint.co.in/
- **Current Tech:** PHP (basic e-commerce)
- **Products:** 6 electric bike models
- **Contact:** +91 7980598210 | enicontrol@yahoo.com

---

## 📊 Project Status

<div align="center">

### **Backend: 90% Complete** ✅

</div>

| Module                      | Status     | Completion |
| --------------------------- | ---------- | ---------- |
| **Authentication**          | ✅ Done    | 100%       |
| **User Management**         | ✅ Done    | 100%       |
| **Products**                | ✅ Done    | 100%       |
| **Orders (Dealer → Admin)** | ✅ Done    | 100%       |
| **Billing/Sales**           | ✅ Done    | 100%       |
| **Inventory**               | ✅ Done    | 100%       |
| **Attendance**              | ✅ Done    | 95%        |
| **Service Requests**        | ✅ Done    | 90%        |
| **Notifications**           | 🚧 Planned | 0%         |
| **Analytics**               | 🚧 Planned | 0%         |

### **API Endpoints:** 38+ fully functional ✅

### **Database Collections:** 8+ designed ✅

### **User Roles:** 5 roles implemented ✅

<div align="center">

### **Frontend: Next Phase** 🚀

</div>

---

## 🛠️ Tech Stack

### **Backend (Completed)**

```

Django 5.0.1 → Web framework
Django REST Framework → API endpoints
MongoEngine → MongoDB ODM
JWT (simplejwt) → Authentication
bcrypt → Password hashing
CORS Headers → Cross-origin requests
Python 3.14 → Programming language

```

### **Frontend (To Build)**

```

React 18+ → UI framework
React Router v6 → Routing
Axios → API calls
Tailwind CSS → Styling
shadcn/ui or MUI → Component library
TanStack Query → State management
React Hook Form → Forms
Recharts → Analytics charts

```

### **Database**

```

MongoDB 6.0+ → Primary database

```

### **Development Tools**

```

Postman → API testing
Git/GitHub → Version control

```

---

## 📁 Project Structure

```

02-E-Bike/
├── server/ # ✅ Django Backend (90% done)
│ ├── apps/
│ │ ├── users/ # Authentication & user management
│ │ │ ├── models.py # User model (5 roles)
│ │ │ ├── views.py # Auth endpoints
│ │ │ ├── serializers.py # JWT serializers
│ │ │ ├── backends.py # Custom auth backend
│ │ │ └── management/
│ │ │ └── commands/
│ │ │ ├── delete_all_users.py # Cleanup utility
│ │ │ └── createsuperuser_mongo.py
│ │ ├── products/ # Product management
│ │ │ ├── models.py # Product, specs, warranty
│ │ │ ├── views.py # CRUD endpoints
│ │ │ └── serializers.py
│ │ ├── orders/ # Dealer orders → Admin approval
│ │ │ ├── models.py # Order workflow
│ │ │ ├── views.py # Order processing
│ │ │ └── serializers.py
│ │ ├── billing/ # Sales & invoicing
│ │ │ ├── models.py # Sales with warranty
│ │ │ ├── views.py # Billing endpoints
│ │ │ └── serializers.py
│ │ ├── inventory/ # Dealer stock management
│ │ ├── attendance/ # Employee attendance & payroll
│ │ ├── service/ # Service requests & warranty
│ │ ├── notifications/ # 🚧 Planned
│ │ └── analytics/ # 🚧 Planned
│ ├── config/
│ │ ├── settings.py # Django configuration
│ │ ├── urls.py # Main URL routing
│ │ └── wsgi.py
│ ├── manage.py
│ ├── requirements.txt
│ └── .gitignore
│
├── frontend/ # 🚧 React Frontend (to build)
│ ├── src/
│ │ ├── components/
│ │ │ ├── common/ # Reusable UI components
│ │ │ ├── layout/ # Header, sidebar, footer
│ │ │ ├── dashboard/ # Role-based dashboards
│ │ │ ├── products/ # Product components
│ │ │ ├── orders/ # Order management
│ │ │ └── ...
│ │ ├── pages/
│ │ │ ├── public/ # Home, products, about
│ │ │ ├── admin/ # Admin pages
│ │ │ ├── dealer/ # Dealer pages
│ │ │ ├── employee/ # Employee pages
│ │ │ └── customer/ # Customer pages
│ │ ├── services/
│ │ │ ├── api.js # Axios config
│ │ │ ├── authService.js # Auth API calls
│ │ │ └── ...
│ │ ├── hooks/ # Custom React hooks
│ │ ├── utils/ # Helper functions
│ │ └── App.jsx
│ └── package.json
│
└── README.md # You are here

```

---

## 🚀 Backend Setup (Django)

### **Prerequisites:**

- Python 3.10+
- MongoDB 6.0+
- pip

### **Installation:**

```bash
# Navigate to backend
cd server

# Create virtual environment
python -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

MONGODB_NAME=ebikepoint_erp
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASSWORD=

JWT_SECRET_KEY=your-jwt-secret
AUTO_LOGOUT_HOURS=9
FREE_SERVICES_COUNT=4
WARRANTY_MONTHS=24
EOF

# Run server
python manage.py runserver
```

**Server runs at:** `http://localhost:8000`

### **Create Admin User:**

```bash
python manage.py shell
```

```python
from apps.users.models import User

admin = User.create_superuser(
    email="admin@ebike.com",
    password="Admin@1234",
    first_name="Admin",
    last_name="User",
    phone="9999999999"
)
print("Admin created:", admin.email)
```

### **Management Commands:**

```bash
# Delete all users
python manage.py delete_all_users --confirm

# Delete by role
python manage.py delete_all_users --role customer --confirm
```

---

## ⚛️ Frontend Setup (React)

### **Prerequisites:**

- Node.js 18+
- npm

### **Installation:**

```bash
# Initialize React project with Vite
npm create vite@latest frontend -- --template react

cd frontend

# Install core dependencies
npm install react-router-dom axios

# Install UI library (choose one)
npm install @mui/material @emotion/react @emotion/styled
# OR
npm install tailwindcss @shadcn/ui

# Install state management
npm install @tanstack/react-query zustand

# Install forms & validation
npm install react-hook-form yup

# Install additional tools
npm install recharts date-fns

# Run development server
npm run dev
```

**Frontend runs at:** `http://localhost:5173`

### **API Integration Example:**

```javascript
// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

```javascript
// src/services/authService.js
import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login/", { email, password });
  localStorage.setItem("access_token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/me/");
  return response.data;
};
```

---

## 🗄️ Database Schema

### **Key Collections:**

#### **1. Users Collection**

```javascript
{
  email: "admin@ebike.com",
  password: "hashed_bcrypt",
  role: "admin",  // admin | dealer | employee | serviceman | customer
  first_name: "Admin",
  last_name: "User",
  phone: "9999999999",
  dealership_name: "Sharma E-Bike Store",  // For dealers
  dealer_id: "ObjectId",  // For employees/servicemen
  is_active: true,
  is_approved: true,
  date_joined: ISODate()
}
```

#### **2. Products Collection**

```javascript
{
  name: "Super Bike LIGHTNING",
  slug: "super-bike-lightning",
  model: "LIGHTNING",
  specifications: {
    range_km: "50-60 KM",
    battery_type: "Lithium-ion",
    top_speed: "50 km/h"
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
  is_available: true
}
```

#### **3. Orders Collection** (Dealer → Admin)

```javascript
{
  order_number: "ORD-20260127-001",
  dealer_id: "ObjectId",
  items: [{ product_id: "ObjectId", quantity: 5, unit_price: 40000 }],
  status: "pending",  // pending | approved | rejected | shipped
  total_amount: 200000,
  tax_amount: 36000,
  grand_total: 236000,
  approved_by: "ObjectId",
  approval_date: ISODate()
}
```

#### **4. Sales Collection** (Customer Purchases)

```javascript
{
  invoice_number: "INV-20260127-001",
  dealer_id: "ObjectId",
  employee_id: "ObjectId",
  customer_id: "ObjectId",
  items: [{ product_id: "ObjectId", quantity: 1, unit_price: 45000 }],
  warranty: {
    is_activated: true,
    free_services_total: 4,
    free_services_used: 0,
    free_services_remaining: 4
  },
  payment_method: "cash",
  grand_total: 53100
}
```

---

## 📚 API Documentation

### **Base URL:** `http://localhost:8000/api`

### **Authentication** ✅

| Method | Endpoint                 | Description                | Auth Required |
| ------ | ------------------------ | -------------------------- | ------------- |
| POST   | `/auth/register/`        | Register customer          | No            |
| POST   | `/auth/register-dealer/` | Create dealer (admin only) | Yes (Admin)   |
| POST   | `/auth/login/`           | Login (all roles)          | No            |
| POST   | `/auth/logout/`          | Logout                     | Yes           |
| GET    | `/auth/me/`              | Get current user           | Yes           |
| PUT    | `/auth/profile/`         | Update profile             | Yes           |
| POST   | `/auth/change-password/` | Change password            | Yes           |
| POST   | `/auth/token/refresh/`   | Refresh JWT token          | No            |
| DELETE | `/auth/delete-account/`  | Delete own account         | Yes           |

### **Products** ✅

| Method | Endpoint                          | Description         | Auth Required |
| ------ | --------------------------------- | ------------------- | ------------- |
| GET    | `/products/`                      | List all products   | No (Public)   |
| GET    | `/products/:id/`                  | Get product by ID   | No            |
| GET    | `/products/slug/:slug/`           | Get product by slug | No            |
| POST   | `/products/admin/create/`         | Create product      | Yes (Admin)   |
| PUT    | `/products/admin/:id/update/`     | Update product      | Yes (Admin)   |
| DELETE | `/products/admin/:id/delete/`     | Delete product      | Yes (Admin)   |
| GET    | `/products/admin/stock/overview/` | Stock overview      | Yes (Admin)   |

### **Orders** (Dealer → Admin) ✅

| Method | Endpoint               | Description     | Auth Required          |
| ------ | ---------------------- | --------------- | ---------------------- |
| POST   | `/orders/create/`      | Create order    | Yes (Dealer)           |
| GET    | `/orders/`             | List orders     | Yes (Filtered by role) |
| GET    | `/orders/:id/`         | Order details   | Yes                    |
| POST   | `/orders/:id/approve/` | Approve order   | Yes (Admin)            |
| POST   | `/orders/:id/reject/`  | Reject order    | Yes (Admin)            |
| POST   | `/orders/:id/ship/`    | Mark as shipped | Yes (Admin)            |

### **Billing/Sales** ✅

| Method | Endpoint                       | Description        | Auth Required         |
| ------ | ------------------------------ | ------------------ | --------------------- |
| POST   | `/billing/sales/create/`       | Create sale        | Yes (Dealer/Employee) |
| GET    | `/billing/sales/`              | List sales         | Yes                   |
| GET    | `/billing/sales/:id/`          | Sale details       | Yes                   |
| GET    | `/billing/customer/purchases/` | Customer purchases | Yes (Customer)        |

### **Inventory** ✅

| Method | Endpoint                | Description      | Auth Required |
| ------ | ----------------------- | ---------------- | ------------- |
| GET    | `/inventory/`           | Dealer inventory | Yes (Dealer)  |
| GET    | `/inventory/low-stock/` | Low stock alerts | Yes (Dealer)  |

### **Attendance** ✅

| Method | Endpoint                 | Description     | Auth Required             |
| ------ | ------------------------ | --------------- | ------------------------- |
| POST   | `/attendance/clock-in/`  | Clock in        | Yes (Employee/Serviceman) |
| POST   | `/attendance/clock-out/` | Clock out       | Yes (Employee/Serviceman) |
| GET    | `/attendance/my/`        | Own attendance  | Yes (Employee/Serviceman) |
| PUT    | `/attendance/:id/edit/`  | Edit attendance | Yes (Dealer)              |

### **Service** ✅

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

| Feature              | Admin | Dealer | Employee | Serviceman | Customer |
| -------------------- | ----- | ------ | -------- | ---------- | -------- |
| **Manage Products**  | ✅    | ❌     | ❌       | ❌         | ❌       |
| **Approve Orders**   | ✅    | ❌     | ❌       | ❌         | ❌       |
| **Order Products**   | ❌    | ✅     | ❌       | ❌         | ❌       |
| **Sell Products**    | ❌    | ✅     | ✅       | ❌         | ❌       |
| **Manage Employees** | ✅    | ✅     | ❌       | ❌         | ❌       |
| **Edit Attendance**  | ❌    | ✅     | ❌       | ❌         | ❌       |
| **Assign Services**  | ❌    | ✅     | ❌       | ❌         | ❌       |
| **Update Services**  | ❌    | ❌     | ❌       | ✅         | ❌       |
| **Book Services**    | ❌    | ❌     | ❌       | ❌         | ✅       |
| **Place Orders**     | ❌    | ❌     | ❌       | ❌         | ✅       |

---

## ✅ Features Completed

### **Backend (90% Complete):**

- ✅ JWT Authentication System
- ✅ Role-Based Access Control (5 roles)
- ✅ User Management (CRUD)
- ✅ Product Management (CRUD with specs, pricing, warranty)
- ✅ Order Workflow (Dealer → Admin approval)
- ✅ Sales/Billing (Invoice generation, warranty activation)
- ✅ Inventory Tracking (Dealer-wise stock)
- ✅ Attendance System (Clock in/out, auto-logout after 9 hours)
- ✅ Service Request Management (Booking, assignment, tracking)
- ✅ Warranty System (4 free services per bike)
- ✅ Management Commands (User creation, cleanup)

### **Remaining (10%):**

- 🚧 Notifications Module
- 🚧 Analytics/Reporting Endpoints
- 🚧 WebSocket Integration
- 🚧 Advanced Filtering

---

## 🔮 Next Steps

### **Phase 1: Frontend Foundation** (Week 1-2)

- [ ] Initialize React project
- [ ] Setup routing (React Router)
- [ ] Create authentication UI
- [ ] Implement JWT token management
- [ ] Build role-based routing

### **Phase 2: Core UI** (Week 3-4)

- [ ] Admin dashboard
- [ ] Dealer dashboard
- [ ] Employee dashboard
- [ ] Customer dashboard
- [ ] Public product pages

### **Phase 3: Features** (Week 5-8)

- [ ] Product management interface
- [ ] Order management system
- [ ] Sales/billing interface
- [ ] Inventory tracking UI
- [ ] Attendance system UI
- [ ] Service booking interface

### **Phase 4: Polish** (Week 9-10)

- [ ] Responsive design
- [ ] Error handling
- [ ] Loading states
- [ ] Notifications
- [ ] Testing

---

## 🤖 For Future AI Assistants

**If this README is shared in a new chat, here's what you need to know:**

### **Project Context:**

- **Name:** E-Bike Point ERP System
- **Type:** Full-stack e-commerce + business management platform
- **Original:** PHP website → https://ebikepoint.co.in/
- **Rebuild:** Django + React + MongoDB
- **Purpose:** Skill demonstration and company ERP system

### **Current State:**

✅ **Backend (90% Complete):**

- 38+ REST API endpoints functional
- 5 user roles with permissions (Admin, Dealer, Employee, Serviceman, Customer)
- JWT authentication working
- MongoDB integrated with MongoEngine
- All CRUD operations tested
- Order workflow complete (dealer → admin approval)
- Sales with warranty activation
- Attendance tracking
- Service request management
- Management commands for utilities

✅ **Testing:**

- Postman collection available with all endpoints
- All major flows tested
- Role-based access verified

### **What Needs Work:**

🚧 **Frontend (0% - Next Phase):**

- Initialize React project with Vite
- Build authentication UI (login, register, role-based routing)
- Create dashboards for each role
- Implement product catalog (public)
- Build admin interface (product management, order approvals)
- Build dealer interface (ordering, sales, employee management)
- Build employee interface (sales, attendance)
- Build customer interface (shopping, service booking)
- Integrate all with backend APIs
- Responsive design
- Real-time notifications (optional)

🚧 **Backend Remaining (10%):**

- Notifications module
- Analytics endpoints
- WebSocket for real-time features
- Advanced search/filtering

### **Key Technical Details:**

- **Backend URL:** `http://localhost:8000`
- **Database:** MongoDB (`ebikepoint_erp`)
- **Auth:** JWT tokens (access: 1hr, refresh: 7 days)
- **Storage:** Tokens in localStorage (frontend)
- **CORS:** Enabled for localhost:3000, localhost:5173
- **Role-based routing required:** Each role sees different UI

### **When User Asks to Continue:**

1. Understand backend is 90% ready
2. All APIs documented above are functional
3. Focus should be on frontend development
4. Reference API endpoints for integration
5. Help build React components
6. Integrate with backend using axios
7. Implement role-based UI

### **Quick Start for Continuation:**

```bash
# Backend (already working)
cd server
source .venv/bin/activate
python manage.py runserver

# Frontend (to build)
cd frontend
npm install
npm run dev
```

### **Important Files:**

- Backend: `server/apps/*/views.py` - All API logic
- Auth: `server/apps/users/` - Authentication system
- Models: `server/apps/*/models.py` - Database schemas
- Frontend: To be created in `frontend/src/`

### **Available Resources:**

- Full API documentation (above)
- Database schema (above)
- Postman collection (separate file)
- Management commands (utilities)

---

<div align="center">

## 🎯 Project Metrics

| Metric                   | Count                  |
| ------------------------ | ---------------------- |
| **Backend Completion**   | 90%                    |
| **API Endpoints**        | 38+                    |
| **User Roles**           | 5                      |
| **Database Collections** | 8+                     |
| **Lines of Code**        | ~10,000+               |
| **Days Worked**          | ~15                    |
| **Remaining**            | Frontend + 10% backend |

</div>

---

<div align="center">

## 🏆 Key Achievements

✅ Complete authentication system with JWT <br>
✅ Multi-role access control working <br>
✅ Order workflow (dealer → admin approval) <br>
✅ Sales with automatic warranty activation <br>
✅ Service tracking (free vs paid services) <br>
✅ Attendance system with auto-logout <br>
✅ Management commands for utilities <br>
✅ Clean, documented code structure <br>

</div>

---

<div align="center">

## 📞 Project Info

**Original Website:** https://ebikepoint.co.in/ <br>
**Contact:** +91 7980598210 | enicontrol@yahoo.com <br>
**Stack:** Django + React + MongoDB <br>
**Status:** Backend 90% → Frontend Next <br>

---

**Built with 💚 and lots of ☕**

**Backend:** 90% Complete ✅ | **Frontend:** Ready to Build 🚀

---

</div>

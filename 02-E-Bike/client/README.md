# 🚲 E-Bike Point - Frontend (Client)

React frontend for the E-Bike Point ERP system built with Vite, React Router, TanStack Query, Zustand, and Tailwind CSS.

## 🛠️ Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Routing
- **Axios** - HTTP client
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **React Hook Form + Yup** - Forms & validation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📁 Project Structure

```

client/
├── public/ # Static assets
├── src/
│ ├── api/ # API service files (8 services)
│ ├── components/ # Reusable components
│ │ ├── common/ # Buttons, inputs, cards, modals
│ │ ├── layout/ # Header, sidebar, footer
│ │ └── ui/ # shadcn/ui components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Library configurations
│ ├── pages/ # Page components
│ │ ├── auth/ # Login, Register
│ │ ├── public/ # Home, Products, About
│ │ ├── admin/ # Admin dashboard & pages
│ │ ├── dealer/ # Dealer dashboard & pages
│ │ ├── employee/ # Employee dashboard & pages
│ │ ├── serviceman/ # Serviceman dashboard & pages
│ │ └── customer/ # Customer dashboard & pages
│ ├── routes/ # Route configurations
│ ├── store/ # Zustand stores
│ └── utils/ # Helper functions
└── ...config files

```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the root:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=E-Bike Point
VITE_AUTO_LOGOUT_HOURS=9
VITE_FREE_SERVICES_COUNT=4
VITE_WARRANTY_MONTHS=24
```

## 📡 API Integration

All API services are located in `src/api/`:

- **authService.js** - Authentication (login, register, profile)
- **productService.js** - Product management
- **orderService.js** - Order management (Dealer → Admin)
- **billingService.js** - Sales & invoicing
- **inventoryService.js** - Inventory tracking
- **attendanceService.js** - Attendance management
- **serviceService.js** - Service requests & warranty

## 🎨 Key Features

### 🔐 Authentication

- JWT-based authentication
- Automatic token refresh
- Role-based access control (5 roles)
- Protected routes

### 👥 User Roles

1. **Admin** - Product management, order approvals, analytics
2. **Dealer** - Order products, sales, employee management
3. **Employee** - Sales, attendance tracking
4. **Serviceman** - Service request updates
5. **Customer** - Shopping, service booking, warranty tracking

### 🎯 Core Workflows

- **Dealer Orders Products** → Admin approves → Inventory updated
- **Sales/Billing** → Warranty activation → Free services tracking
- **Service Booking** → Assignment → Status updates → Completion
- **Attendance** → Clock in/out → Auto-logout after 9 hours

## 🧩 Component Library

Using **shadcn/ui** with Tailwind CSS for consistent, accessible UI components.

## 📦 State Management

- **Zustand** - Auth state, user data
- **TanStack Query** - Server state, caching, mutations

## 🔄 Development Status

- ✅ Foundation setup complete
- ✅ API services integrated
- 🚧 UI components (in progress)
- 🚧 Pages & routing (next)
- 🚧 Role-based dashboards (upcoming)

## 🤝 Backend Integration

This frontend connects to the Django REST API backend at `http://localhost:8000/api`

Make sure the backend server is running before starting the frontend.

---

**Built with ⚡ Vite + ⚛️ React + 🎨 Tailwind CSS**

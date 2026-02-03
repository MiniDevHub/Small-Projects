# 🚀 E-Bike Point - Frontend Development Plan

> **Comprehensive guide to building the React frontend for E-Bike Point ERP**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Current State](#current-state)
3. [Architecture](#architecture)
4. [Development Phases](#development-phases)
5. [Component Structure](#component-structure)
6. [Page Breakdown](#page-breakdown)
7. [API Integration](#api-integration)
8. [State Management](#state-management)
9. [Routing Structure](#routing-structure)
10. [UI/UX Guidelines](#uiux-guidelines)
11. [Timeline](#timeline)

---

## 📊 Overview

### **Project Summary**

- **Backend**: ✅ 98% Complete (80+ API endpoints ready)
- **Frontend**: 🚧 30% Complete (Template + Auth working)
- **Goal**: Build a complete, role-based ERP interface

### **Tech Stack**

```

Core: React 19.2.0 + Vite 7.2.4
Routing: React Router 6.30.3
State: Zustand 5.0.11 + React Query 5.90.20
API: Axios 1.13.4
Styling: Tailwind CSS 3.4.16
UI Components: Radix UI + Custom Components
Forms: React Hook Form 7.71.1 + Yup 1.7.1
Charts: Recharts 3.7.0
Animations: Framer Motion 12.29.3
Notifications: React Hot Toast 2.6.0

```

---

## 🏗️ Current State

### **✅ Completed**

- [x] Project setup with Vite
- [x] Tailwind CSS v3 configuration
- [x] Axios instance with JWT interceptors
- [x] Zustand auth store
- [x] Protected routes
- [x] Role-based routing structure
- [x] Login/Register pages
- [x] Basic dashboard layout
- [x] API service files structure

### **🚧 Existing Structure**

```

src/
├── api/ # ✅ API services (8 files)
├── components/
│ ├── admin/ # 🚧 1 component
│ ├── common/ # 🚧 8 components
│ ├── dealer/ # 🚧 2 components
│ ├── layout/ # ✅ 5 components
│ ├── products/ # 🚧 3 components
│ └── ui/ # ✅ 7 components (Radix)
├── hooks/ # 🚧 5 hooks
├── pages/
│ ├── admin/ # 🚧 7 pages (skeletons)
│ ├── auth/ # ✅ 2 pages (working)
│ ├── customer/ # 🚧 5 pages
│ ├── dealer/ # 🚧 7 pages
│ ├── employee/ # 🚧 4 pages
│ ├── public/ # 🚧 5 pages (Home.jsx has errors)
│ └── serviceman/ # 🚧 4 pages
├── routes/ # ✅ Routing setup
├── store/ # ✅ Auth store
└── utils/ # ✅ Utilities

```

---

## 🎯 Architecture

### **Application Flow**

```

┌─────────────────────────────────────────────────────────┐
│                  Public Pages                           │
│      (Home, Products, Product Detail, About, Contact)   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 Authentication                          │
│            (Login/Register/Logout)                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  Role-Based Dashboard                   │
│ ┌──────────┬──────────┬──────────┬──────────┬────────┐  │
│ │  Admin   │  Dealer  │ Employee │ Customer │  S-man │  │
│ │----------│----------│----------│----------│--------│  │
│ │ Products │ Inventory│ Sales    │ Bikes    │Services│  │
│ │ Orders   │ Orders   │Attendance│ Orders   │Attend. │  │
│ │ Users    │ Sales    │ Profile  │ Services │Profile │  │
│ │ Analytics│ Services │          │ Profile  │        │  │
│ │ Settings │  Attend. │          │          │        │  │
│ └──────────┴──────────┴──────────┴──────────┴────────┘  │
└─────────────────────────────────────────────────────────┘

```

### **Data Flow**

```

Component → React Query → Axios → API → MongoDB
   ↓              ↓                 ↓
 Zustand        Cache            JWT Auth

```

---

## 📅 Development Phases

### **Phase 1: Foundation (Week 1) - Priority 1**

#### **1.1 Fix Home.jsx Error** ✅ Critical

```

Issue: Failed to load /src/pages/public/Home.jsx
Error: products?.slice is not a function

Solution:

- Check useProducts hook
- Fix featured products query
- Handle loading/error states properly

```

#### **1.2 Complete Public Pages** 🎯 High Priority

```

Pages to Build:
├── Home.jsx (fix + enhance)
├── Products.jsx (list view)
├── ProductDetail.jsx (detail view)
├── About.jsx
└── Contact.jsx

Features:

- Product catalog with filters
- Search functionality
- Product detail with image gallery
- Responsive design
- SEO optimization

```

#### **1.3 Auth Pages Enhancement**

```

├── Login.jsx (enhance with social login)
├── Register.jsx (complete implementation)
└── ForgotPassword.jsx (new)

```

---

### **Phase 2: Admin Dashboard (Week 2) - Priority 1**

#### **2.1 Admin Dashboard Overview**

```jsx
// pages/admin/Dashboard.jsx
Features:
- Revenue metrics (today, month, year)
- Sales charts (line/bar)
- Top products
- Top dealers
- Recent orders
- Pending approvals
- Low stock alerts
- Active service requests
```

#### **2.2 Product Management**

```jsx
// pages/admin/Products.jsx
Features:
- List all products (DataTable)
- Filter by model, category, availability
- Search by name
- Create new product (modal/page)
- Edit product (modal/page)
- Delete product (confirmation)
- Bulk actions
- Stock overview
```

#### **2.3 Order Management**

```jsx
// pages/admin/Orders.jsx
Features:
- List dealer orders (DataTable)
- Filter by status, dealer, date
- View order details (modal)
- Approve/Reject orders
- Mark as shipped
- Track shipments
- Order history
```

#### **2.4 User Management**

```jsx
// pages/admin/Users.jsx
Features:
- List all users by role
- Create dealer accounts
- Approve/Reject dealer registrations
- View user details
- Activate/Deactivate users
- Reset passwords
```

#### **2.5 Analytics**

```jsx
// pages/admin/Analytics.jsx
Features:
- Sales analytics (trends, charts)
- Revenue reports
- Dealer performance comparison
- Product performance
- Geographic distribution
- Export reports
```

---

### **Phase 3: Dealer Dashboard (Week 3) - Priority 2**

#### **3.1 Dealer Dashboard Overview**

```jsx
// pages/dealer/Dashboard.jsx
Features:
- Sales metrics (today, month)
- Revenue charts
- Inventory overview
- Low stock alerts
- Pending orders
- Pending services
- Pending deliveries
- Top products
```

#### **3.2 Inventory Management**

```jsx
// pages/dealer/Inventory.jsx
Features:
- View inventory (DataTable)
- Filter by stock level
- Low stock alerts
- Adjust inventory (manual)
- View transaction history
- Inventory analytics
```

#### **3.3 Orders (Dealer → Admin)**

```jsx
// pages/dealer/Orders.jsx
Features:
- Create new order
- View order history
- Track order status
- View approved/rejected orders
- Reorder functionality
```

#### **3.4 Sales Management**

```jsx
// pages/dealer/Sales.jsx
Features:
- Create new sale (to customer)
- View sales history
- Update delivery status
- Sales analytics
- Print invoices
- EMI tracking
```

#### **3.5 Service Management**

```jsx
// pages/dealer/Services.jsx
Features:
- View service requests
- Assign to serviceman
- Track service status
- Service history
- Warranty tracking
```

#### **3.6 Employees & Attendance**

```jsx
// pages/dealer/Employees.jsx
Features:
- List employees/servicemen
- Add new employee/serviceman
- View attendance
- Edit attendance
- Mark attendance manually
- Attendance reports

// pages/dealer/Attendance.jsx
Features:
- Monthly attendance view
- Edit attendance records
- Mark leaves/holidays
- Attendance summary
- Export reports
```

---

### **Phase 4: Customer Dashboard (Week 4) - Priority 2**

#### **4.1 Customer Dashboard**

```jsx
// pages/customer/Dashboard.jsx
Features:
- My bikes overview
- Upcoming services
- Service history
- Recent orders
- Warranty status
```

#### **4.2 My Bikes**

```jsx
// pages/customer/Bikes.jsx
Features:
- List purchased bikes
- View bike details
- Warranty information
- Service history
- Book service
```

#### **4.3 Orders**

```jsx
// pages/customer/Orders.jsx
Features:
- View order history
- Track order status
- View order details
- Reorder
```

#### **4.4 Services**

```jsx
// pages/customer/Services.jsx
Features:
- Book service
- View service requests
- Track service status
- Service history
- Rate service
```

#### **4.5 Profile**

```jsx
// pages/customer/Profile.jsx
Features:
- View profile
- Edit profile
- Change password
- Notification preferences
```

---

### **Phase 5: Employee & Serviceman (Week 5) - Priority 3**

#### **5.1 Employee Dashboard**

```jsx
// pages/employee/Dashboard.jsx
Features:
- Today's sales
- Monthly performance
- Attendance status
- Quick sale button
```

#### **5.2 Employee Sales**

```jsx
// pages/employee/Sales.jsx
Features:
- Create sale
- View sales history
- Sales analytics
```

#### **5.3 Employee Attendance**

```jsx
// pages/employee/Attendance.jsx
Features:
- Clock in/out
- View monthly attendance
- Check today's status
- Leave requests
```

#### **5.4 Serviceman Dashboard**

```jsx
// pages/serviceman/Dashboard.jsx
Features:
- Assigned services
- Pending services
- Completed services
- Attendance status
```

#### **5.5 Serviceman Services**

```jsx
// pages/serviceman/Services.jsx
Features:
- View assigned services
- Update service status
- Add parts used
- Complete service
- Service notes
```

---

### **Phase 6: Common Features (Week 6) - Priority 3**

#### **6.1 Notifications System**

```jsx
// components/layout/NotificationBell.jsx
Features:
- Unread count badge
- Notification dropdown
- Mark as read
- Real-time updates (WebSocket)
```

#### **6.2 Search & Filters**

```jsx
// components/common/SearchBar.jsx
// components/common/FilterPanel.jsx
Features:
- Global search
- Advanced filters
- Sort options
- Saved filters
```

#### **6.3 File Uploads**

```jsx
// components/common/ImageUpload.jsx
// components/common/FileUpload.jsx
Features:
- Drag & drop
- Preview
- Validation
- Progress bar
```

---

## 🧩 Component Structure

### **Layout Components**

```jsx
// components/layout/Header.jsx
- Logo
- Navigation (role-based)
- User menu
- Notifications bell
- Search bar

// components/layout/Sidebar.jsx
- Navigation links (role-based)
- Collapsible
- Active state
- Icons

// components/layout/Footer.jsx
- Copyright
- Links
- Contact info

// components/layout/DashboardLayout.jsx
- Header + Sidebar + Content
- Responsive
- Breadcrumbs

// components/layout/PublicLayout.jsx
- Header + Content + Footer
- Minimal design
```

### **Common Components**

```jsx
// components/common/DataTable.jsx
- Sortable columns
- Filterable
- Paginated
- Bulk actions
- Export

// components/common/StatCard.jsx
- Metric display
- Icon
- Trend indicator
- Click action

// components/common/ProductCard.jsx
- Image
- Name, price
- Add to cart
- Quick view

// components/common/StatusBadge.jsx
- Color-coded
- Status text
- Icons

// components/common/LoadingSpinner.jsx
- Full page
- Inline
- Button

// components/common/EmptyState.jsx
- Icon
- Message
- Action button

// components/common/FormField.jsx
- Label
- Input/Select/Textarea
- Error message
- Helper text
```

### **Feature Components**

```jsx
// components/admin/ProductForm.jsx
- Create/Edit product
- Image upload
- Specifications
- Validation

// components/dealer/OrderForm.jsx
- Select products
- Quantity
- Total calculation
- Submit

// components/dealer/SaleForm.jsx
- Customer selection
- Product selection
- Payment details
- Warranty activation

// components/serviceman/ServiceUpdateForm.jsx
- Status update
- Parts used
- Time tracking
- Notes
```

---

## 🔌 API Integration

### **Setup API Services**

Each API service file should follow this pattern:

```javascript
// api/productService.js
import api from "./axios";

export const productService = {
  // Get all products (public)
  getAll: async (params = {}) => {
    const response = await api.get("/products/", { params });
    return response.data;
  },

  // Get product by slug
  getBySlug: async (slug) => {
    const response = await api.get(`/products/${slug}/`);
    return response.data;
  },

  // Create product (admin only)
  create: async (data) => {
    const response = await api.post("/products/create/", data);
    return response.data;
  },

  // Update product (admin only)
  update: async (id, data) => {
    const response = await api.patch(`/products/${id}/update/`, data);
    return response.data;
  },

  // Delete product (admin only)
  delete: async (id) => {
    const response = await api.delete(`/products/${id}/delete/`);
    return response.data;
  },
};
```

### **Create React Query Hooks**

```javascript
// hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../api/productService";
import toast from "react-hot-toast";

export const useProducts = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getAll(params),
  });
};

export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update product");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete product");
    },
  });
};
```

---

## 📦 State Management

### **Zustand Stores**

```javascript
// store/authStore.js (existing - enhance)
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    /* ... */
  },
  logout: () => {
    /* ... */
  },
  fetchUser: async () => {
    /* ... */
  },
}));

// store/cartStore.js (new)
export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) =>
    set((state) => ({
      items: [...state.items, { product, quantity }],
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + item.product.base_price * item.quantity,
      0,
    );
  },
}));

// store/notificationStore.js (new)
export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => set({ notifications }),
  setUnreadCount: (count) => set({ unreadCount: count }),

  markAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, is_read: true } : n,
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
      unreadCount: 0,
    })),
}));
```

---

## 🛣️ Routing Structure

```jsx
// routes/index.jsx (complete implementation)
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Public Pages
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetail from "../pages/public/ProductDetail";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";
import AdminUsers from "../pages/admin/Users";
import AdminAnalytics from "../pages/admin/Analytics";

// Dealer Pages
import DealerDashboard from "../pages/dealer/Dashboard";
import DealerInventory from "../pages/dealer/Inventory";
import DealerOrders from "../pages/dealer/Orders";
import DealerSales from "../pages/dealer/Sales";
import DealerServices from "../pages/dealer/Services";
import DealerEmployees from "../pages/dealer/Employees";
import DealerAttendance from "../pages/dealer/Attendance";

// Employee Pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeSales from "../pages/employee/Sales";
import EmployeeAttendance from "../pages/employee/Attendance";
import EmployeeProfile from "../pages/employee/Profile";

// Customer Pages
import CustomerDashboard from "../pages/customer/Dashboard";
import CustomerBikes from "../pages/customer/Bikes";
import CustomerOrders from "../pages/customer/Orders";
import CustomerServices from "../pages/customer/Services";
import CustomerProfile from "../pages/customer/Profile";

// Serviceman Pages
import ServicemanDashboard from "../pages/serviceman/Dashboard";
import ServicemanServices from "../pages/serviceman/Services";
import ServicemanAttendance from "../pages/serviceman/Attendance";
import ServicemanProfile from "../pages/serviceman/Profile";

// Not Found
import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      {/* Dealer Routes */}
      <Route
        path="/dealer"
        element={
          <ProtectedRoute allowedRoles={["dealer"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DealerDashboard />} />
        <Route path="inventory" element={<DealerInventory />} />
        <Route path="orders" element={<DealerOrders />} />
        <Route path="sales" element={<DealerSales />} />
        <Route path="services" element={<DealerServices />} />
        <Route path="employees" element={<DealerEmployees />} />
        <Route path="attendance" element={<DealerAttendance />} />
      </Route>

      {/* Employee Routes */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
        <Route path="sales" element={<EmployeeSales />} />
        <Route path="attendance" element={<EmployeeAttendance />} />
        <Route path="profile" element={<EmployeeProfile />} />
      </Route>

      {/* Customer Routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="bikes" element={<CustomerBikes />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="services" element={<CustomerServices />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* Serviceman Routes */}
      <Route
        path="/serviceman"
        element={
          <ProtectedRoute allowedRoles={["serviceman"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ServicemanDashboard />} />
        <Route path="services" element={<ServicemanServices />} />
        <Route path="attendance" element={<ServicemanAttendance />} />
        <Route path="profile" element={<ServicemanProfile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

---

## 🎨 UI/UX Guidelines

### **Design System**

```css
/* Color Palette */
:root {
  /* Brand Colors */
  --primary: #1e4488; /* Blue */
  --secondary: #00afaa; /* Teal */
  --accent: #201b51; /* Dark Purple */

  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;

  /* Neutral */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-900: #111827;
}
```

### **Typography**

```
Headings:     font-bold, text-2xl to text-6xl
Body:         font-normal, text-base
Small:        text-sm, text-xs
Font Family:  Inter (default Tailwind)
```

### **Spacing**

```
Sections:  py-24, px-8
Cards:     p-6, rounded-xl
Buttons:   px-6 py-3, rounded-lg
Inputs:    px-4 py-2, rounded-md
```

### **Components Styling**

```jsx
// Button Variants
<Button variant="primary" size="lg">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Badge
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Rejected</Badge>
```

---

## ⏱️ Timeline

### **8-Week Plan**

| Week  | Phase               | Focus                          | Deliverables                   |
| ----- | ------------------- | ------------------------------ | ------------------------------ |
| **1** | Foundation          | Fix errors, public pages       | Home, Products, Product Detail |
| **2** | Admin               | Dashboard, Products, Orders    | Admin panel functional         |
| **3** | Dealer              | Dashboard, Inventory, Sales    | Dealer panel functional        |
| **4** | Customer            | Dashboard, Bikes, Services     | Customer panel functional      |
| **5** | Employee/Serviceman | Dashboards, Features           | E/S panels functional          |
| **6** | Common              | Notifications, Search, Filters | Shared features                |
| **7** | Polish              | Responsive, Performance        | Mobile-ready                   |
| **8** | Deploy              | Testing, Bug fixes, Deploy     | Production ready               |

---

## 🚀 Getting Started

### **Step 1: Fix Home.jsx Error**

```jsx
// Fix: src/pages/public/Home.jsx
// FeaturedProductsGrid component

const FeaturedProductsGrid = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useProducts({
    featured: true,
    limit: 6,
  });

  // Fix: Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Fix: Handle error state
  if (error) {
    return <div>Error loading products</div>;
  }

  // Fix: Ensure products is an array
  const displayProducts = Array.isArray(products?.results)
    ? products.results.slice(0, 6)
    : Array.isArray(products)
      ? products.slice(0, 6)
      : [];

  if (displayProducts.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### **Step 2: Build First Dashboard**

Choose one and implement fully:

- Option A: Admin Dashboard (most complex, best reference)
- Option B: Customer Dashboard (simplest, quick win)

### **Step 3: Iterate & Repeat**

Once you have one dashboard working:

1. Extract reusable components
2. Apply patterns to other dashboards
3. Test each feature
4. Move to next phase

---

## 📝 Development Checklist

### **For Each Page:**

- [ ] Create page component
- [ ] Add route
- [ ] Build layout structure
- [ ] Create API service functions
- [ ] Create React Query hooks
- [ ] Implement data fetching
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add empty states
- [ ] Implement CRUD operations
- [ ] Add form validation
- [ ] Add success/error toasts
- [ ] Test functionality
- [ ] Make responsive
- [ ] Add animations

### **Quality Checks:**

- [ ] No console errors
- [ ] Proper loading states
- [ ] Error handling
- [ ] Responsive design
- [ ] Accessible (keyboard navigation)
- [ ] SEO optimized (meta tags)
- [ ] Performance optimized
- [ ] Cross-browser tested

---

## 🎯 Priority Order

**Must Do First:**

1. Fix Home.jsx error
2. Complete public pages (Home, Products)
3. Build one complete dashboard (Customer recommended)

**Do Next:** 4. Admin dashboard 5. Dealer dashboard 6. Employee/Serviceman dashboards 7. Notifications & common features 8. Polish & deploy

---

## 📚 Resources

### **Documentation:**

- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)
- [React Hook Form Docs](https://react-hook-form.com/)

### **Code Examples:**

- Backend API: `http://localhost:8000/api/`
- Postman Collection: `E-Bike-ERP-v2.json`
- Backend README: `README.md`

---

## 🤝 Need Help?

**Common Issues:**

1. **API not responding** → Check backend is running
2. **CORS error** → Check .env VITE_API_URL
3. **401 Unauthorized** → Check JWT token in localStorage
4. **Products not loading** → Check useProducts hook
5. **Tailwind not working** → Check v3 is installed, not v4

**Debug Steps:**

1. Open browser DevTools → Network tab
2. Check API requests/responses
3. Check Console for errors
4. Verify token in Application → Local Storage
5. Test API endpoint in Postman first

---

<div align="center">

**🚀 Ready to build an amazing frontend!**

**Remember:** Start small, test often, iterate quickly.

**Questions?** Check the backend README or API documentation.

</div>

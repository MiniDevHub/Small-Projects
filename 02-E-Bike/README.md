# E-Bike Point - Complete ERP System Rebuild

## 🎯 Project Overview

This is a complete rebuild of the E-Bike Point website (https://ebikepoint.co.in/) - transforming it into a comprehensive **ERP (Enterprise Resource Planning) system** for managing an electric bike dealership network across India. The original site is built with PHP, and this project recreates it from scratch with a multi-role hierarchy system, inventory management, billing, attendance tracking, service management, and **free service warranty program**.

**Context**: This is a skill assessment and improvement project assigned by management. The goal is to recreate the company's existing website and expand it into a full-featured business management platform demonstrating advanced technical capabilities.

## 🏢 Original Website Analysis

**Live Site**: https://ebikepoint.co.in/index.php#

### Current Website Structure:

#### **Pages & Sections:**

1. **Homepage**
   - Hero section with dealer inquiry form
   - Products showcase (6 bike models)
   - Dealer benefits section
   - FAQ section
   - Service booking options

2. **Navigation Pages**
   - About Us
   - Products
   - Features
   - Contact Us
   - FAQs
   - Login/Register
   - Shopping Cart

3. **Key Features**
   - User authentication (Login/Register)
   - Shopping cart functionality
   - Service booking (for purchase & non-purchase customers)
   - Dealer application form
   - Product catalog

#### **Product Models:**

1. **Super Bike LIGHTNING** - Speed limit high, 50-60KM per charge
2. **MARIUM**
3. **Rabbitor Blue** - Starting range model, robust body
4. **E-Went SSUP** - 50-70KM/Charge, Red & White
5. **E-went JV Sea Green** - 50-80 KM Range per Charge, JV 6032 Lead Acid Battery
6. **MAKI**

#### **Contact Information:**

- Phone: +91 7980598210
- Email: enicontrol@yahoo.com

#### **Current Tech Stack (Original Site):**

- Frontend: PHP with basic HTML/CSS/JS
- Backend: PHP
- Database: Likely MySQL
- File structure: `/ebike/admin/` directory structure

---

## 🛠️ New Tech Stack (Rebuild)

### **Mandated by Management:**

- **Frontend**: React.js
- **Backend**: Django (Python)
- **Database**: MongoDB

### **Additional Technologies:**

#### **Frontend:**

```

- React.js 18+ (with functional components & hooks)
- React Router v6 (for routing)
- Axios (API calls)
- Tailwind CSS (styling)
- shadcn/ui or Material-UI (component library)
- React Hook Form (form handling)
- Yup/Zod (validation)
- Framer Motion (animations)
- React Query/TanStack Query (state management & caching)
- Recharts/Chart.js (analytics & reports)
- React Big Calendar (scheduling)
- React-PDF (invoice generation)
- Socket.io-client (real-time notifications)

```

#### **Backend:**

```

- Django 5.x
- Django REST Framework (API endpoints)
- djangorestframework-simplejwt (JWT authentication)
- django-cors-headers (CORS handling)
- Pillow (image processing)
- python-decouple (environment variables)
- Celery (async tasks - emails, notifications)
- Redis (caching & Celery broker)
- django-channels (WebSocket for real-time features)
- ReportLab (PDF invoice generation)

```

#### **Database:**

```

- MongoDB (primary database)
- Djongo (Django-MongoDB connector)
- PyMongo (MongoDB driver)
- Redis (session storage & real-time data)

```

#### **DevOps & Tools:**

```

- Git & GitHub (version control)
- Docker (containerization)
- Nginx (production server)
- Gunicorn (WSGI server)
- AWS S3/Cloudinary (image storage)
- Postman (API testing)

```

---

## 👥 User Roles & Permissions System

### **1. ADMIN (Super User)**

#### **Product Management:**

- ✅ Add new products (with specs, images, pricing)
- ✅ Edit existing products
- ✅ Delete/archive products
- ✅ Manage product categories
- ✅ Set product availability and stock levels
- ✅ Configure service charges (standard rates)
- ✅ Bulk product import/export

#### **Order Management:**

- ✅ View all dealer orders
- ✅ Approve dealer product orders
- ✅ Disapprove/reject orders with reason
- ✅ Track order fulfillment status
- ✅ Generate order reports

#### **User Management:**

- ✅ Add new dealers (with location, credentials)
- ✅ Add employees to specific dealers
- ✅ Add servicemen
- ✅ Edit user details and permissions
- ✅ Deactivate/activate users
- ✅ View user activity logs

#### **Communication:**

- ✅ Send notifications to all users
- ✅ Send targeted messages (by role, location, user)
- ✅ Broadcast announcements
- ✅ View message delivery status

#### **Analytics & Reports:**

- ✅ Overall sales dashboard
- ✅ Dealer performance reports
- ✅ Product sales analytics
- ✅ Revenue reports
- ✅ Service statistics (free vs paid)
- ✅ Inventory overview across all dealers

#### **System Settings:**

- ✅ Manage pricing and margins
- ✅ Configure system settings
- ✅ Manage dealer commission structure
- ✅ Set service charges by type
- ✅ Configure warranty/free service policy

---

### **2. DEALER (Dealership Owner/Manager)**

#### **Inventory Management:**

- ✅ Order products from admin (pending approval)
- ✅ View order history and status
- ✅ Track received inventory
- ✅ View current stock levels
- ✅ Set low-stock alerts
- ✅ Transfer stock between employees

#### **Sales Management:**

- ✅ Sell products to customers
- ✅ Generate invoices/bills with warranty activation
- ✅ View sales history
- ✅ Daily/Weekly/Monthly sales reports
- ✅ Customer management
- ✅ Payment tracking (cash, UPI, card, EMI)

#### **Employee Management:**

- ✅ Add employees to their dealership
- ✅ Assign employee roles and permissions
- ✅ View employee list
- ✅ Edit employee details
- ✅ Deactivate employees

#### **Attendance & Payroll:**

- ✅ View employee attendance dashboard
- ✅ Check daily attendance records
- ✅ Edit attendance (mark present, half-day, off-day, leave)
- ✅ Manual attendance entry (if phone not working)
- ✅ Calculate monthly payouts
- ✅ Generate salary slips
- ✅ View attendance history
- ✅ Export attendance reports

#### **Service Management:**

- ✅ View incoming service requests
- ✅ Assign service requests to servicemen
- ✅ Track service status
- ✅ View service history
- ✅ See free service usage per customer
- ✅ Generate service reports
- ✅ Manage service charges (apply/waive)

#### **Analytics:**

- ✅ Sales dashboard (today, week, month, year)
- ✅ Top-selling products
- ✅ Employee performance metrics
- ✅ Revenue vs expenses
- ✅ Profit/loss statements
- ✅ Customer analytics
- ✅ Service revenue tracking

#### **Communication:**

- ✅ Send messages to employees
- ✅ Receive admin notifications
- ✅ Customer communication

---

### **3. EMPLOYEE (Sales Staff)**

#### **Sales Operations:**

- ✅ Sell products to walk-in customers
- ✅ Generate bills/invoices (auto-activate warranty)
- ✅ Process payments
- ✅ View own sales records
- ✅ Access customer database
- ✅ Create customer profiles

#### **Inventory:**

- ✅ View current stock levels
- ✅ Check product availability
- ✅ View product specifications
- ✅ Request stock from dealer

#### **Attendance:**

- ✅ Auto-attendance on login (timestamp recorded)
- ✅ View own attendance history
- ✅ Apply for leave
- ✅ Auto-logout after 9 hours (attendance closed)
- ✅ View monthly attendance summary
- ✅ Check calculated salary

#### **Communication:**

- ✅ Send notifications to customers
- ✅ Receive messages from dealer/admin
- ✅ Update customer contact info

#### **Limitations:**

- ❌ Cannot add other employees
- ❌ Cannot access other employees' data
- ❌ Cannot edit inventory
- ❌ Cannot approve orders
- ❌ Cannot edit own attendance

---

### **4. SERVICEMAN (Service Technician)**

#### **Service Operations:**

- ✅ Login to system
- ✅ View assigned service requests
- ✅ View service request details (customer, bike, issue, service number)
- ✅ See if service is free or chargeable
- ✅ Update service status:
  - Pending
  - In Progress
  - Waiting for Parts
  - Completed
  - Cancelled
- ✅ Add service notes/comments
- ✅ Upload service photos
- ✅ Record parts used
- ✅ Log service time
- ✅ Complete service with customer signature
- ✅ View service history

#### **Attendance:**

- ✅ Clock in/out
- ✅ View own attendance

#### **Limitations:**

- ❌ Cannot access sales data
- ❌ Cannot view inventory
- ❌ Cannot assign services
- ❌ Cannot modify service charges
- ❌ Limited to service module only

---

### **5. CUSTOMER (End User)**

#### **Shopping:**

- ✅ Browse products
- ✅ View product details
- ✅ Add to cart
- ✅ Place orders
- ✅ Track order status

#### **Service Warranty & Booking:**

- ✅ View purchased bikes in "My Orders"
- ✅ Access service dashboard from product page
- ✅ See warranty status (4 free services remaining)
- ✅ View service history with labels:
  - **Service 1 - Free** ✅
  - **Service 2 - Free** ✅
  - **Service 3 - Free** ✅
  - **Service 4 - Free** ✅
  - **Service 5 - ₹500** 💰
  - **Service 6 - ₹500** 💰
- ✅ Book free services (Service 1-4)
- ✅ Book paid services (Service 5+)
- ✅ See service charges before booking
- ✅ Track active service requests
- ✅ View service completion status

#### **Account:**

- ✅ View purchase history
- ✅ Download invoices
- ✅ Update profile
- ✅ View notifications
- ✅ Service warranty dashboard

---

## 📁 Updated Project Structure

```

ebikepoint-erp/
├── frontend/ # React application
│ ├── public/
│ │ ├── index.html
│ │ └── assets/
│ ├── src/
│ │ ├── components/
│ │ │ ├── common/ # Reusable components
│ │ │ │ ├── Button.jsx
│ │ │ │ ├── Input.jsx
│ │ │ │ ├── Modal.jsx
│ │ │ │ ├── Table.jsx
│ │ │ │ ├── Card.jsx
│ │ │ │ ├── Badge.jsx
│ │ │ │ └── LoadingSpinner.jsx
│ │ │ ├── layout/
│ │ │ │ ├── Header.jsx
│ │ │ │ ├── Footer.jsx
│ │ │ │ ├── Sidebar.jsx
│ │ │ │ └── RoleBasedLayout.jsx
│ │ │ ├── dashboard/ # Role-specific dashboards
│ │ │ │ ├── AdminDashboard.jsx
│ │ │ │ ├── DealerDashboard.jsx
│ │ │ │ ├── EmployeeDashboard.jsx
│ │ │ │ ├── ServicemanDashboard.jsx
│ │ │ │ └── CustomerDashboard.jsx
│ │ │ ├── products/
│ │ │ │ ├── ProductCard.jsx
│ │ │ │ ├── ProductList.jsx
│ │ │ │ ├── ProductDetail.jsx
│ │ │ │ ├── ProductForm.jsx # Admin: Add/Edit
│ │ │ │ ├── ProductComparison.jsx
│ │ │ │ └── ServiceWarrantyCard.jsx # NEW
│ │ │ ├── orders/
│ │ │ │ ├── OrderList.jsx
│ │ │ │ ├── OrderDetail.jsx
│ │ │ │ ├── OrderApproval.jsx # Admin
│ │ │ │ ├── CreateOrder.jsx # Dealer
│ │ │ │ └── PurchasedProductCard.jsx # NEW
│ │ │ ├── billing/
│ │ │ │ ├── InvoiceGenerator.jsx
│ │ │ │ ├── BillPreview.jsx
│ │ │ │ ├── PaymentForm.jsx
│ │ │ │ └── InvoiceList.jsx
│ │ │ ├── attendance/
│ │ │ │ ├── AttendanceCalendar.jsx
│ │ │ │ ├── AttendanceTable.jsx
│ │ │ │ ├── AttendanceEdit.jsx # Dealer
│ │ │ │ ├── PayrollCalculator.jsx
│ │ │ │ └── AutoLogout.jsx
│ │ │ ├── service/
│ │ │ │ ├── ServiceRequestList.jsx
│ │ │ │ ├── ServiceDetail.jsx
│ │ │ │ ├── ServiceAssignment.jsx # Dealer
│ │ │ │ ├── ServiceUpdate.jsx # Serviceman
│ │ │ │ ├── ServiceDashboard.jsx # NEW - Customer
│ │ │ │ ├── ServiceHistory.jsx # NEW - Customer
│ │ │ │ ├── ServiceBooking.jsx # NEW - Customer
│ │ │ │ └── FreeServiceBadge.jsx # NEW
│ │ │ ├── users/
│ │ │ │ ├── UserList.jsx
│ │ │ │ ├── AddUser.jsx # Admin/Dealer
│ │ │ │ ├── EditUser.jsx
│ │ │ │ └── UserProfile.jsx
│ │ │ ├── notifications/
│ │ │ │ ├── NotificationCenter.jsx
│ │ │ │ ├── SendNotification.jsx # Admin
│ │ │ │ └── NotificationList.jsx
│ │ │ ├── reports/
│ │ │ │ ├── SalesReport.jsx
│ │ │ │ ├── InventoryReport.jsx
│ │ │ │ ├── AttendanceReport.jsx
│ │ │ │ └── ServiceReport.jsx
│ │ │ └── analytics/
│ │ │ ├── SalesDashboard.jsx
│ │ │ ├── Charts.jsx
│ │ │ └── Metrics.jsx
│ │ ├── pages/
│ │ │ ├── public/ # Public pages
│ │ │ │ ├── Home.jsx
│ │ │ │ ├── Products.jsx
│ │ │ │ ├── About.jsx
│ │ │ │ ├── Contact.jsx
│ │ │ │ └── Login.jsx
│ │ │ ├── admin/
│ │ │ │ ├── Dashboard.jsx
│ │ │ │ ├── ProductManagement.jsx
│ │ │ │ ├── OrderApprovals.jsx
│ │ │ │ ├── UserManagement.jsx
│ │ │ │ ├── DealerManagement.jsx
│ │ │ │ ├── Notifications.jsx
│ │ │ │ ├── ServiceSettings.jsx # NEW
│ │ │ │ └── Analytics.jsx
│ │ │ ├── dealer/
│ │ │ │ ├── Dashboard.jsx
│ │ │ │ ├── Inventory.jsx
│ │ │ │ ├── Sales.jsx
│ │ │ │ ├── OrderProducts.jsx
│ │ │ │ ├── EmployeeManagement.jsx
│ │ │ │ ├── Attendance.jsx
│ │ │ │ ├── Payroll.jsx
│ │ │ │ ├── ServiceManagement.jsx
│ │ │ │ └── Reports.jsx
│ │ │ ├── employee/
│ │ │ │ ├── Dashboard.jsx
│ │ │ │ ├── Sales.jsx
│ │ │ │ ├── Stock.jsx
│ │ │ │ ├── MyAttendance.jsx
│ │ │ │ └── Customers.jsx
│ │ │ ├── serviceman/
│ │ │ │ ├── Dashboard.jsx
│ │ │ │ ├── ServiceRequests.jsx
│ │ │ │ └── ServiceDetail.jsx
│ │ │ └── customer/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Shop.jsx
│ │ │ ├── Cart.jsx
│ │ │ ├── Orders.jsx
│ │ │ ├── MyBikes.jsx # NEW
│ │ │ ├── BikeServiceDashboard.jsx # NEW
│ │ │ └── ServiceBooking.jsx
│ │ ├── hooks/
│ │ │ ├── useAuth.js
│ │ │ ├── useAttendance.js
│ │ │ ├── useAutoLogout.js
│ │ │ ├── useNotifications.js
│ │ │ ├── usePermissions.js
│ │ │ └── useFreeServices.js # NEW
│ │ ├── services/
│ │ │ ├── api.js
│ │ │ ├── authService.js
│ │ │ ├── productService.js
│ │ │ ├── orderService.js
│ │ │ ├── attendanceService.js
│ │ │ ├── billingService.js
│ │ │ ├── serviceService.js
│ │ │ ├── warrantyService.js # NEW
│ │ │ └── notificationService.js
│ │ ├── utils/
│ │ │ ├── rolePermissions.js
│ │ │ ├── invoiceGenerator.js
│ │ │ ├── payrollCalculator.js
│ │ │ ├── dateHelpers.js
│ │ │ ├── formatters.js
│ │ │ └── serviceCalculator.js # NEW
│ │ ├── context/
│ │ │ ├── AuthContext.jsx
│ │ │ ├── NotificationContext.jsx
│ │ │ └── AttendanceContext.jsx
│ │ ├── routes/
│ │ │ ├── AppRoutes.jsx
│ │ │ ├── PrivateRoute.jsx
│ │ │ └── RoleBasedRoute.jsx
│ │ ├── styles/
│ │ │ └── globals.css
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── .env
│
├── backend/ # Django application
│ ├── ebikepoint/
│ │ ├── settings.py
│ │ ├── urls.py
│ │ ├── wsgi.py
│ │ └── asgi.py # For WebSocket
│ ├── apps/
│ │ ├── users/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ ├── permissions.py # Role-based permissions
│ │ │ └── signals.py
│ │ ├── products/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ └── admin_views.py # Admin-only views
│ │ ├── orders/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ └── approval_workflow.py
│ │ ├── billing/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ └── invoice_generator.py
│ │ ├── inventory/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ └── urls.py
│ │ ├── attendance/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ ├── auto_logout.py
│ │ │ └── payroll.py
│ │ ├── service/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ └── warranty.py # NEW - Free service logic
│ │ ├── notifications/
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ ├── urls.py
│ │ │ ├── consumers.py # WebSocket
│ │ │ └── tasks.py # Celery tasks
│ │ └── analytics/
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── views.py
│ │ └── urls.py
│ ├── media/
│ ├── static/
│ ├── celery.py
│ ├── requirements.txt
│ ├── manage.py
│ └── .env
│
├── docker/
│ ├── frontend.Dockerfile
│ ├── backend.Dockerfile
│ ├── docker-compose.yml
│ └── nginx.conf
│
├── docs/
│ ├── api-documentation.md
│ ├── role-permissions.md
│ ├── free-service-policy.md # NEW
│ ├── setup-guide.md
│ └── deployment.md
│
├── .gitignore
├── README.md
└── LICENSE

```

---

## 🗄️ Complete Database Schema (MongoDB Collections)

### **Users Collection:**

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: String, // "admin", "dealer", "employee", "serviceman", "customer"

  // Personal Info
  first_name: String,
  last_name: String,
  phone: String,
  profile_picture: String (URL),

  // Role-specific fields
  dealer_id: ObjectId (for employees/servicemen - ref to dealer),
  dealership_name: String (for dealers),
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },

  // Employment details (for employees/servicemen)
  joining_date: Date,
  salary: Number,
  employment_status: String, // "active", "inactive", "terminated"

  // Status
  is_active: Boolean,
  is_approved: Boolean (for dealers),
  last_login: Date,

  // Timestamps
  created_at: Date,
  updated_at: Date,
  created_by: ObjectId (ref to admin/dealer who added)
}
```

### **Products Collection:**

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  model: String, // "LIGHTNING", "MARIUM", "RABBITOR", "SSUP", "JV", "MAKI"
  description: String,

  specifications: {
    range: String, // "50-60 KM"
    battery_type: String,
    battery_capacity: String,
    top_speed: String,
    charging_time: String,
    motor_power: String,
    weight: String,
    load_capacity: String,
    colors: [String],
    dimensions: {
      length: String,
      width: String,
      height: String
    }
  },

  // Pricing
  base_price: Number,
  dealer_price: Number (wholesale price),
  mrp: Number,
  tax_rate: Number,

  // Service pricing (NEW)
  service_charges: {
    standard_service: Number,  // e.g., 500
    major_service: Number,     // e.g., 1000
    repair: Number,            // e.g., varies
    inspection: Number         // e.g., 300
  },

  // Warranty (NEW)
  warranty: {
    free_services: Number,  // Default: 4
    warranty_period_months: Number,  // e.g., 24 months
    terms: String
  },

  // Media
  images: [{
    url: String,
    alt: String,
    is_primary: Boolean
  }],
  videos: [String],

  // Inventory
  total_stock: Number (admin master stock),
  low_stock_threshold: Number,

  // Status
  is_available: Boolean,
  is_featured: Boolean,
  category: String,

  // SEO
  meta_title: String,
  meta_description: String,

  // Timestamps
  created_at: Date,
  updated_at: Date,
  created_by: ObjectId (ref to admin)
}
```

### **Dealer Inventory Collection:**

```javascript
{
  _id: ObjectId,
  dealer_id: ObjectId (ref to User),
  product_id: ObjectId (ref to Product),
  quantity: Number,
  reserved_quantity: Number (items in active sales),
  last_restocked: Date,
  low_stock_alert: Boolean,
  updated_at: Date
}
```

### **Orders Collection (Dealer → Admin):**

```javascript
{
  _id: ObjectId,
  order_number: String (unique, auto-generated),
  dealer_id: ObjectId (ref to User),

  items: [{
    product_id: ObjectId (ref to Product),
    quantity: Number,
    unit_price: Number,
    subtotal: Number
  }],

  total_amount: Number,
  tax_amount: Number,
  grand_total: Number,

  // Approval workflow
  status: String, // "pending", "approved", "rejected", "shipped", "delivered"
  approved_by: ObjectId (ref to admin),
  approval_date: Date,
  rejection_reason: String,

  // Shipping
  expected_delivery: Date,
  actual_delivery: Date,
  tracking_number: String,

  // Notes
  dealer_notes: String,
  admin_notes: String,

  // Timestamps
  created_at: Date,
  updated_at: Date
}
```

### **Sales/Invoices Collection (Customer Purchases):**

```javascript
{
  _id: ObjectId,
  invoice_number: String (unique, auto-generated),

  // Parties involved
  dealer_id: ObjectId (ref to User),
  employee_id: ObjectId (ref to User - who made the sale),
  customer_id: ObjectId (ref to User, nullable for walk-ins),

  // Customer details (for walk-ins)
  customer: {
    name: String,
    phone: String,
    email: String,
    address: String
  },

  // Products
  items: [{
    product_id: ObjectId (ref to Product),
    product_name: String (snapshot),
    quantity: Number,
    unit_price: Number,
    discount: Number,
    tax_rate: Number,
    subtotal: Number
  }],

  // Billing
  subtotal: Number,
  discount: Number,
  tax_amount: Number,
  grand_total: Number,

  // Payment
  payment_method: String, // "cash", "card", "upi", "emi", "bank_transfer"
  payment_status: String, // "paid", "pending", "partial"
  payment_details: {
    transaction_id: String,
    emi_months: Number,
    down_payment: Number
  },

  // Warranty Activation (NEW)
  warranty: {
    is_activated: Boolean,
    activation_date: Date,
    expiry_date: Date,
    free_services_total: Number,  // Default: 4
    free_services_used: Number,   // Track: 0, 1, 2, 3, 4
    free_services_remaining: Number  // Calculated: total - used
  },

  // Documents
  invoice_pdf: String (URL),

  // Status
  delivery_status: String, // "pending", "ready", "delivered"

  // Timestamps
  sale_date: Date,
  created_at: Date
}
```

### **Attendance Collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref to User - employee/serviceman),
  dealer_id: ObjectId (ref to User - their dealer),
  date: Date (YYYY-MM-DD),

  // Login/Logout
  login_time: Date,
  logout_time: Date,
  auto_logout: Boolean, // true if logged out after 9 hours

  // Status
  status: String, // "present", "absent", "half_day", "leave", "off_day"
  manually_edited: Boolean,
  edited_by: ObjectId (ref to dealer),
  edit_reason: String,

  // Working hours
  total_hours: Number,
  overtime_hours: Number,

  // Notes
  notes: String,

  // Timestamps
  created_at: Date,
  updated_at: Date
}
```

### **Payroll Collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref to User - employee/serviceman),
  dealer_id: ObjectId (ref to User),
  month: String, // "2026-01"
  year: Number,

  // Attendance summary
  total_days: Number,
  present_days: Number,
  half_days: Number,
  absent_days: Number,
  leaves: Number,
  overtime_hours: Number,

  // Salary calculation
  base_salary: Number,
  per_day_salary: Number,
  earned_salary: Number,
  overtime_pay: Number,
  bonuses: Number,
  deductions: Number,
  net_salary: Number,

  // Payment
  payment_status: String, // "pending", "paid"
  payment_date: Date,
  payment_method: String,

  // Documents
  salary_slip_pdf: String (URL),

  // Timestamps
  generated_at: Date,
  paid_at: Date
}
```

### **Service Requests Collection (UPDATED):**

```javascript
{
  _id: ObjectId,
  request_number: String (unique, auto-generated),

  // Customer & Product
  customer_id: ObjectId (ref to User),
  customer: {
    name: String,
    phone: String,
    email: String,
    address: String
  },
  product_id: ObjectId (ref to Product),
  invoice_id: ObjectId (ref to Sale),

  // Service Number & Pricing (NEW)
  service_number: Number,  // 1, 2, 3, 4, 5, 6...
  is_free_service: Boolean,  // true for services 1-4, false for 5+
  service_charge: Number,  // 0 for free services, actual amount for paid
  display_label: String,  // e.g., "Service 1 - Free" or "Service 5 - ₹500"

  // Service details
  issue_type: String, // "maintenance", "repair", "warranty", "inspection"
  issue_description: String,
  priority: String, // "low", "medium", "high", "urgent"

  // Assignment
  dealer_id: ObjectId (ref to User),
  assigned_to: ObjectId (ref to serviceman),
  assigned_date: Date,

  // Status tracking
  status: String, // "pending", "assigned", "in_progress", "waiting_parts", "completed", "cancelled"
  status_history: [{
    status: String,
    timestamp: Date,
    updated_by: ObjectId,
    notes: String
  }],

  // Service work
  parts_used: [{
    part_name: String,
    quantity: Number,
    cost: Number
  }],
  service_notes: String,
  service_photos: [String] (URLs),
  service_time_minutes: Number,

  // Charges
  parts_cost: Number,
  total_cost: Number,  // service_charge + parts_cost
  payment_status: String,  // "free", "pending", "paid"

  // Scheduling
  scheduled_date: Date,
  started_at: Date,
  completed_at: Date,

  // Customer feedback
  customer_signature: String (image URL),
  rating: Number,
  feedback: String,

  // Timestamps
  created_at: Date,
  updated_at: Date
}
```

### **Service Warranty Tracker Collection (NEW):**

```javascript
{
  _id: ObjectId,
  invoice_id: ObjectId (ref to Sale),
  customer_id: ObjectId (ref to User),
  product_id: ObjectId (ref to Product),

  // Warranty details
  total_free_services: Number,  // 4
  services_used: [{
    service_request_id: ObjectId,
    service_number: Number,
    service_date: Date,
    service_type: String
  }],
  services_completed: Number,  // Count of completed services
  services_remaining: Number,  // total_free_services - services_completed

  // Status
  warranty_status: String,  // "active", "expired", "completed"
  warranty_expiry_date: Date,

  // Timestamps
  activated_at: Date,
  last_service_date: Date
}
```

### **Notifications Collection:**

```javascript
{
  _id: ObjectId,

  // Sender
  sent_by: ObjectId (ref to User - admin/dealer/employee),
  sender_role: String,

  // Recipients
  recipient_type: String, // "all", "role", "specific_users", "dealer_employees"
  recipient_roles: [String], // if type is "role"
  recipient_ids: [ObjectId], // if type is "specific_users"
  dealer_id: ObjectId, // if type is "dealer_employees"

  // Content
  title: String,
  message: String,
  notification_type: String, // "info", "warning", "success", "alert"
  priority: String, // "low", "medium", "high"

  // Links
  action_url: String,
  action_label: String,

  // Delivery tracking
  sent_at: Date,
  read_by: [{
    user_id: ObjectId,
    read_at: Date
  }],

  // Status
  is_active: Boolean,
  expires_at: Date
}
```

### **Stock Movements Collection (Audit Trail):**

```javascript
{
  _id: ObjectId,
  product_id: ObjectId (ref to Product),
  dealer_id: ObjectId (ref to User, nullable),

  movement_type: String, // "order_received", "sale", "return", "adjustment"
  quantity: Number (positive for additions, negative for deductions),

  reference_id: ObjectId, // order_id or invoice_id
  reference_type: String, // "dealer_order", "customer_sale", "manual_adjustment"

  performed_by: ObjectId (ref to User),
  notes: String,

  // Stock levels after movement
  previous_stock: Number,
  new_stock: Number,

  timestamp: Date
}
```

### **System Logs Collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref to User),
  action: String, // "login", "logout", "create_product", "approve_order", etc.
  resource_type: String, // "product", "order", "user", etc.
  resource_id: ObjectId,
  ip_address: String,
  user_agent: String,
  timestamp: Date
}
```

---

## 🔌 Complete API Endpoints

### **Authentication:**

```
POST   /api/auth/register/              # User registration (customer)
POST   /api/auth/login/                 # Login (returns JWT + role)
POST   /api/auth/logout/                # Logout
POST   /api/auth/refresh/               # Refresh JWT token
GET    /api/auth/user/                  # Get current user info
PUT    /api/auth/user/update/           # Update user profile
POST   /api/auth/change-password/       # Change password
```

### **Admin - User Management:**

```
GET    /api/admin/users/                # List all users (with filters)
POST   /api/admin/users/dealer/         # Add new dealer
POST   /api/admin/users/serviceman/     # Add serviceman to dealer
PUT    /api/admin/users/:id/            # Edit user details
DELETE /api/admin/users/:id/            # Deactivate user
GET    /api/admin/users/:id/activity/   # View user activity logs
```

### **Admin - Product Management:**

```
GET    /api/admin/products/             # List all products
POST   /api/admin/products/             # Add new product
GET    /api/admin/products/:id/         # Get product details
PUT    /api/admin/products/:id/         # Edit product
DELETE /api/admin/products/:id/         # Delete product
POST   /api/admin/products/bulk-upload/ # Bulk import products
GET    /api/admin/products/stock-overview/ # Master stock overview
PUT    /api/admin/products/:id/service-charges/  # Update service charges (NEW)
```

### **Admin - Order Approvals:**

```
GET    /api/admin/orders/               # List all dealer orders
GET    /api/admin/orders/pending/       # Pending approval orders
GET    /api/admin/orders/:id/           # Order details
POST   /api/admin/orders/:id/approve/   # Approve order
POST   /api/admin/orders/:id/reject/    # Reject order (with reason)
PUT    /api/admin/orders/:id/ship/      # Mark as shipped
```

### **Admin - Notifications:**

```
POST   /api/admin/notifications/send/   # Send notification
GET    /api/admin/notifications/        # Sent notifications history
GET    /api/admin/notifications/:id/stats/ # Delivery stats
```

### **Admin - Analytics:**

```
GET    /api/admin/analytics/dashboard/  # Overall dashboard stats
GET    /api/admin/analytics/sales/      # Sales reports
GET    /api/admin/analytics/dealers/    # Dealer performance
GET    /api/admin/analytics/products/   # Product analytics
GET    /api/admin/analytics/revenue/    # Revenue reports
GET    /api/admin/analytics/services/   # Service analytics (free vs paid) (NEW)
```

### **Dealer - Inventory:**

```
GET    /api/dealer/inventory/           # Current stock levels
POST   /api/dealer/inventory/order/     # Order products from admin
GET    /api/dealer/inventory/orders/    # Order history
GET    /api/dealer/inventory/orders/:id/ # Order details
GET    /api/dealer/inventory/low-stock/ # Low stock alerts
```

### **Dealer - Sales:**

```
POST   /api/dealer/sales/               # Create new sale/invoice (auto-activate warranty)
GET    /api/dealer/sales/               # Sales history
GET    /api/dealer/sales/:id/           # Invoice details
GET    /api/dealer/sales/:id/pdf/       # Download invoice PDF
GET    /api/dealer/sales/reports/       # Sales reports (daily/monthly)
```

### **Dealer - Employee Management:**

```
GET    /api/dealer/employees/           # List employees
POST   /api/dealer/employees/           # Add new employee
PUT    /api/dealer/employees/:id/       # Edit employee
DELETE /api/dealer/employees/:id/       # Deactivate employee
GET    /api/dealer/employees/:id/stats/ # Employee performance
```

### **Dealer - Attendance:**

```
GET    /api/dealer/attendance/          # Attendance overview
GET    /api/dealer/attendance/today/    # Today's attendance
GET    /api/dealer/attendance/:employee_id/ # Employee attendance history
PUT    /api/dealer/attendance/:id/edit/ # Edit attendance record
POST   /api/dealer/attendance/manual/   # Manual attendance entry
GET    /api/dealer/attendance/reports/  # Attendance reports
```

### **Dealer - Payroll:**

```
GET    /api/dealer/payroll/             # Payroll overview
POST   /api/dealer/payroll/calculate/:month/ # Calculate monthly payroll
GET    /api/dealer/payroll/:id/         # Payroll details
POST   /api/dealer/payroll/:id/pay/     # Mark as paid
GET    /api/dealer/payroll/:id/slip/    # Download salary slip
```

### **Dealer - Service Management:**

```
GET    /api/dealer/services/            # Service requests list
GET    /api/dealer/services/:id/        # Service details
POST   /api/dealer/services/:id/assign/ # Assign to serviceman
GET    /api/dealer/services/reports/    # Service reports
GET    /api/dealer/services/warranty/:invoice_id/  # Check warranty status (NEW)
```

### **Employee - Sales:**

```
POST   /api/employee/sales/             # Create sale (auto-activate warranty)
GET    /api/employee/sales/             # Own sales history
GET    /api/employee/sales/:id/         # Sale details
GET    /api/employee/stock/             # View current stock
```

### **Employee - Attendance:**

```
POST   /api/employee/attendance/login/  # Auto-login attendance
POST   /api/employee/attendance/logout/ # Manual logout
GET    /api/employee/attendance/        # Own attendance history
GET    /api/employee/attendance/summary/ # Monthly summary
```

### **Employee - Notifications:**

```
POST   /api/employee/notifications/send/ # Send to customers
GET    /api/employee/notifications/     # Received notifications
```

### **Serviceman:**

```
POST   /api/serviceman/login/           # Clock in
POST   /api/serviceman/logout/          # Clock out
GET    /api/serviceman/services/        # Assigned service requests
GET    /api/serviceman/services/:id/    # Service details
PUT    /api/serviceman/services/:id/    # Update service status
POST   /api/serviceman/services/:id/notes/ # Add service notes
POST   /api/serviceman/services/:id/photos/ # Upload photos
POST   /api/serviceman/services/:id/complete/ # Mark complete
```

### **Customer - Public:**

```
GET    /api/products/                   # Browse products
GET    /api/products/:id/               # Product details
GET    /api/products/search/            # Search products
GET    /api/dealers/locations/          # Dealer locator
```

### **Customer - Account:**

```
POST   /api/cart/add/                   # Add to cart
GET    /api/cart/                       # View cart
PUT    /api/cart/:id/                   # Update cart item
DELETE /api/cart/:id/                   # Remove from cart
POST   /api/orders/                     # Place order
GET    /api/orders/                     # Order history
GET    /api/orders/:id/                 # Order details
```

### **Customer - Service & Warranty (NEW):**

```
GET    /api/customer/bikes/             # My purchased bikes
GET    /api/customer/bikes/:invoice_id/ # Specific bike details
GET    /api/customer/bikes/:invoice_id/warranty/  # Warranty status
GET    /api/customer/bikes/:invoice_id/services/  # Service history
POST   /api/customer/service/book/      # Book service (checks if free/paid)
GET    /api/customer/service/           # All service requests
GET    /api/customer/service/:id/       # Service details
GET    /api/customer/service/calculate-charge/  # Get service charge (NEW)
```

### **Notifications (WebSocket):**

```
WS     /ws/notifications/:user_id/      # Real-time notifications
```

---

## ✨ Complete Feature Checklist

### **Admin Features:**

- [ ] **Dashboard** with overall analytics
- [ ] **Product Management**
  - [ ] Add products with images, specs, pricing
  - [ ] Configure service charges per product
  - [ ] Set warranty terms and free service count
  - [ ] Edit existing products
  - [ ] Delete/archive products
  - [ ] Bulk import CSV
  - [ ] Master inventory tracking
- [ ] **Order Management**
  - [ ] View all dealer orders
  - [ ] Filter by status, dealer, date
  - [ ] Approve orders
  - [ ] Reject orders with reason
  - [ ] Mark as shipped with tracking
- [ ] **User Management**
  - [ ] Add dealers with location
  - [ ] Add servicemen to dealers
  - [ ] View all users by role
  - [ ] Edit user details
  - [ ] Activate/deactivate accounts
  - [ ] View activity logs
- [ ] **Notification System**
  - [ ] Broadcast to all users
  - [ ] Target by role (all dealers, all employees)
  - [ ] Send to specific users
  - [ ] View delivery status
- [ ] **Analytics & Reports**
  - [ ] Sales dashboard
  - [ ] Dealer performance
  - [ ] Product popularity
  - [ ] Revenue charts
  - [ ] Free vs paid service analytics
  - [ ] Export reports (PDF/Excel)

### **Dealer Features:**

- [ ] **Dashboard** with dealer-specific metrics
- [ ] **Inventory Management**
  - [ ] View current stock
  - [ ] Order products from admin
  - [ ] Track order status
  - [ ] Low stock alerts
  - [ ] Stock movement history
- [ ] **Sales Module**
  - [ ] Create customer invoices
  - [ ] Auto-activate warranty on sale
  - [ ] Process payments (cash/card/UPI/EMI)
  - [ ] Print invoices
  - [ ] Download PDF invoices
  - [ ] Daily sales reports
  - [ ] Monthly/yearly analytics
- [ ] **Employee Management**
  - [ ] Add employees to dealership
  - [ ] Assign roles and permissions
  - [ ] View employee list
  - [ ] Edit employee details
  - [ ] Performance tracking
- [ ] **Attendance System**
  - [ ] View attendance calendar
  - [ ] Today's attendance dashboard
  - [ ] Edit attendance (present/absent/half-day/leave/off-day)
  - [ ] Manual entry for technical issues
  - [ ] Export attendance reports
- [ ] **Payroll Management**
  - [ ] Auto-calculate monthly salary
  - [ ] Factor in attendance
  - [ ] Add bonuses/deductions
  - [ ] Generate salary slips
  - [ ] Mark as paid
  - [ ] Payment history
- [ ] **Service Management**
  - [ ] View service requests
  - [ ] See free service eligibility
  - [ ] Assign to servicemen
  - [ ] Track service status
  - [ ] Service history
  - [ ] Service reports (free vs paid)

### **Employee Features:**

- [ ] **Dashboard** with today's tasks
- [ ] **Sales Operations**
  - [ ] Create customer sales
  - [ ] Auto-activate warranty
  - [ ] Generate invoices
  - [ ] Process payments
  - [ ] View own sales history
  - [ ] Daily sales target tracking
- [ ] **Stock Viewing**
  - [ ] View available stock
  - [ ] Check product details
  - [ ] Low stock indicators
- [ ] **Attendance**
  - [ ] Auto-login when accessing system
  - [ ] View own attendance
  - [ ] Monthly attendance summary
  - [ ] Calculated salary preview
  - [ ] Apply for leave
  - [ ] Auto-logout after 9 hours
- [ ] **Customer Management**
  - [ ] Add customer details
  - [ ] Send notifications to customers
  - [ ] View customer purchase history

### **Serviceman Features:**

- [ ] **Dashboard** with assigned services
- [ ] **Service Requests**
  - [ ] View assigned requests
  - [ ] See service number and pricing (free/paid)
  - [ ] Service details (customer, bike, issue)
  - [ ] Update status (pending → in progress → completed)
  - [ ] Add service notes
  - [ ] Upload service photos
  - [ ] Record parts used
  - [ ] Log service time
  - [ ] Customer signature capture
  - [ ] Complete service
- [ ] **Attendance**
  - [ ] Clock in/out
  - [ ] View own attendance

### **Customer Features (MAJOR UPDATE):**

- [ ] **Public Browsing**
  - [ ] View all products
  - [ ] Product details and specs
  - [ ] Compare bikes
  - [ ] Dealer locator map
- [ ] **Account**
  - [ ] Registration and login
  - [ ] Profile management
  - [ ] Shopping cart
  - [ ] Place orders
  - [ ] Order tracking
  - [ ] Download invoices
- [ ] **My Bikes Section (NEW)**
  - [ ] View all purchased bikes
  - [ ] Click on bike to access service dashboard
  - [ ] See warranty status
  - [ ] View free services remaining
- [ ] **Service Dashboard (NEW - Per Bike)**
  - [ ] Service history with labels:
    - ✅ **Service 1 - Free** (completed)
    - ✅ **Service 2 - Free** (completed)
    - ⏳ **Service 3 - Free** (upcoming)
    - ⏳ **Service 4 - Free** (upcoming)
    - 💰 **Service 5 - ₹500** (paid service)
    - 💰 **Service 6 - ₹500** (paid service)
  - [ ] Progress bar showing free services used (e.g., 2/4 used)
  - [ ] Warranty expiry date
  - [ ] "Book Service" button
- [ ] **Service Booking (NEW - Enhanced)**
  - [ ] Smart booking that detects service number
  - [ ] Shows "This is a FREE service" for services 1-4
  - [ ] Shows "Service charge: ₹500" for service 5+
  - [ ] Booking confirmation
  - [ ] Track service status
  - [ ] Rate completed services
- [ ] **Notifications**
  - [ ] Service reminders
  - [ ] Warranty expiry alerts
  - [ ] Service completion notifications

### **System-Wide Features:**

- [ ] **Authentication & Security**
  - [ ] JWT-based authentication
  - [ ] Role-based access control (RBAC)
  - [ ] Password hashing
  - [ ] Session management
  - [ ] Auto-logout on inactivity
- [ ] **Real-time Notifications**
  - [ ] WebSocket integration
  - [ ] Push notifications
  - [ ] In-app notification center
  - [ ] Email notifications
  - [ ] SMS alerts (optional)
- [ ] **Billing & Invoicing**
  - [ ] GST calculation
  - [ ] Professional invoice templates
  - [ ] Warranty activation on invoice
  - [ ] PDF generation
  - [ ] Invoice numbering system
  - [ ] Payment tracking
- [ ] **Warranty System (NEW)**
  - [ ] Auto-activate on purchase
  - [ ] Track free services (4 per bike)
  - [ ] Auto-calculate service charges
  - [ ] Warranty expiry tracking
  - [ ] Service history per bike
  - [ ] Notification system for reminders
- [ ] **Reporting**
  - [ ] Sales reports
  - [ ] Inventory reports
  - [ ] Attendance reports
  - [ ] Service reports (free vs paid)
  - [ ] Warranty utilization reports
  - [ ] Export to PDF/Excel
- [ ] **Audit Trail**
  - [ ] Activity logs
  - [ ] Stock movement tracking
  - [ ] User action logs
  - [ ] Service tracking logs
  - [ ] System logs
- [ ] **Mobile Responsive**
  - [ ] All pages mobile-optimized
  - [ ] Touch-friendly UI
  - [ ] PWA support

---

## 🎨 UI/UX Examples for Free Service Feature

### **Customer - My Bikes Page:**

```
┌─────────────────────────────────────────────────┐
│  My Bikes                                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Image]  E-Went JV Sea Green                   │
│           Invoice: #INV-2026-001234             │
│           Purchase Date: 15 Jan 2026            │
│           Warranty: Active (2/4 services used)  │
│           [View Service Dashboard] →            │
│                                                 │
│  ───────────────────────────────────────────    │
│                                                 │
│  [Image]  Super Bike LIGHTNING                  │
│           Invoice: #INV-2025-009876             │
│           Purchase Date: 10 Dec 2025            │
│           Warranty: Active (4/4 services used)  │
│           [View Service Dashboard] →            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **Customer - Service Dashboard (For Specific Bike):**

```
┌─────────────────────────────────────────────────┐
│  ← Back to My Bikes                             │
│                                                 │
│  E-Went JV Sea Green                            │
│  Invoice: #INV-2026-001234                      │
├─────────────────────────────────────────────────┤
│  Warranty Status                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│  Free Services: 2/4 used                        │
│  [██████░░░░] 50% Complete                      │
│  Expires: 15 Jan 2028                           │
├─────────────────────────────────────────────────┤
│  Service History                                │
│  ─────────────────────────────────────────────  │
│                                                 │
│  ✅ Service 1 - Free                            │
│     Date: 15 Feb 2026                           │
│     Type: First Service / Inspection            │
│     Status: Completed                           │
│     [View Details]                              │
│                                                 │
│  ✅ Service 2 - Free                            │
│     Date: 15 May 2026                           │
│     Type: General Maintenance                   │
│     Status: Completed                           │
│     [View Details]                              │
│                                                 │
│  ⏳ Service 3 - Free                            │
│     Available                                   │
│     [Book Now] ──────────────────────────────→  │
│                                                 │
│  ⏳ Service 4 - Free                            │
│     Available                                   │
│     [Book Now] ──────────────────────────────→  │
│                                                 │
│  💰 Service 5 - ₹500                            │
│     Not yet available                           │
│     (Complete free services first)              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **Customer - Service Booking Modal:**

```
┌─────────────────────────────────────────────────┐
│  Book Service - E-Went JV Sea Green             │
├─────────────────────────────────────────────────┤
│                                                 │
│  🎉 This is a FREE service!                     │
│                                                 │
│  Service Number: 3                              │
│  Service Type: ● Maintenance                    │
│                ○ Repair                         │
│                ○ Inspection                     │
│                                                 │
│  Describe Issue:                                │
│  ┌─────────────────────────────────────────┐    │
│  │ Battery not charging fully...           │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  Preferred Date: [Select Date]                  │
│                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│  Service Charge: FREE ✅                        │
│  Parts (if any): To be determined               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│                                                 │
│            [Cancel]  [Confirm Booking]          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **Customer - Service Booking Modal (After 4 Free Services):**

```
┌─────────────────────────────────────────────────┐
│  Book Service - E-Went JV Sea Green             │
├─────────────────────────────────────────────────┤
│                                                 │
│  💰 Paid Service                                │
│                                                 │
│  Service Number: 5                              │
│  Service Type: ● Maintenance                    │
│                ○ Repair                         │
│                ○ Inspection                     │
│                                                 │
│  Describe Issue:                                │
│  ┌─────────────────────────────────────────┐    │
│  │ Regular maintenance check...            │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  Preferred Date: [Select Date]                  │
│                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│  Service Charge: ₹500                           │
│  Parts (if any): To be determined               │
│  Total Estimated: ₹500+                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│                                                 │
│  ℹ️ Note: You've used all 4 free services.      │
│     Standard service charges apply.             │
│                                                 │
│            [Cancel]  [Confirm Booking]          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🚦 Updated Development Phases

### **Phase 1: Project Setup & Architecture (Days 1-3)**

- [ ] Initialize React + Vite project
- [ ] Set up Django project with apps structure
- [ ] Configure MongoDB with Djongo
- [ ] Design complete database schema (including warranty)
- [ ] Set up Git repository
- [ ] Configure Tailwind CSS
- [ ] Install all dependencies
- [ ] Set up Docker containers
- [ ] Plan role-based architecture
- [ ] Create permission matrix

### **Phase 2: Authentication & User Management (Days 4-7)**

- [ ] Implement JWT authentication
- [ ] Create user models (all roles)
- [ ] Build registration/login system
- [ ] Role-based routing in React
- [ ] Permission middleware in Django
- [ ] User CRUD operations (Admin)
- [ ] Profile management
- [ ] Password reset functionality

### **Phase 3: Admin Module (Days 8-12)**

- [ ] Admin dashboard with analytics
- [ ] Product management CRUD
- [ ] Service charges configuration
- [ ] Warranty settings
- [ ] Bulk product import
- [ ] Dealer order approval workflow
- [ ] User management interface
- [ ] Dealer management
- [ ] Notification sending system
- [ ] Analytics and reports

### **Phase 4: Dealer Module (Days 13-18)**

- [ ] Dealer dashboard
- [ ] Product ordering from admin
- [ ] Inventory management
- [ ] Sales/invoicing system with warranty activation
- [ ] Invoice PDF generation
- [ ] Employee management
- [ ] Attendance system
- [ ] Attendance editing interface
- [ ] Payroll calculator
- [ ] Salary slip generation
- [ ] Service request management
- [ ] Service assignment with warranty check

### **Phase 5: Employee Module (Days 19-21)**

- [ ] Employee dashboard
- [ ] Sales interface with warranty activation
- [ ] Stock viewing
- [ ] Auto-attendance on login
- [ ] Auto-logout after 9 hours
- [ ] Attendance viewing
- [ ] Customer management
- [ ] Send notifications feature

### **Phase 6: Serviceman Module (Days 22-23)**

- [ ] Serviceman dashboard
- [ ] View assigned services with free/paid indicator
- [ ] Update service status
- [ ] Add notes and photos
- [ ] Mark service complete
- [ ] Clock in/out system

### **Phase 7: Warranty & Service System (Days 24-27)** ⭐ NEW

- [ ] Warranty activation logic on sale
- [ ] Service warranty tracker
- [ ] Free service counter (1-4)
- [ ] Paid service calculator (5+)
- [ ] Service history tracking
- [ ] Warranty expiry system
- [ ] Service charge calculator API
- [ ] Notification triggers for warranty

### **Phase 8: Customer Module (Days 28-31)**

- [ ] Public product browsing
- [ ] Shopping cart
- [ ] Checkout process
- [ ] Order placement
- [ ] Order tracking
- [ ] **My Bikes page (NEW)**
- [ ] **Service Dashboard per bike (NEW)**
- [ ] **Free service progress indicator (NEW)**
- [ ] **Service booking with free/paid detection (NEW)**
- [ ] **Service history with labels (NEW)**
- [ ] Customer dashboard

### **Phase 9: Billing System (Days 32-34)**

- [ ] Invoice template design with warranty info
- [ ] PDF generation (ReportLab)
- [ ] GST calculation
- [ ] Payment processing
- [ ] Invoice numbering
- [ ] Download invoices
- [ ] Service billing (free vs paid)

### **Phase 10: Notifications & Real-time (Days 35-37)**

- [ ] WebSocket setup (Django Channels)
- [ ] Real-time notification system
- [ ] Notification center UI
- [ ] Email notifications (Celery)
- [ ] Service reminders
- [ ] Warranty expiry alerts
- [ ] SMS integration (optional)
- [ ] Push notifications

### **Phase 11: Reports & Analytics (Days 38-40)**

- [ ] Sales reports
- [ ] Inventory reports
- [ ] Attendance reports
- [ ] Service reports (free vs paid)
- [ ] Warranty utilization reports
- [ ] Charts and graphs (Recharts)
- [ ] Export functionality (PDF/Excel)

### **Phase 12: Attendance & Payroll (Days 41-43)**

- [ ] Attendance tracking system
- [ ] Auto-login attendance
- [ ] Auto-logout after 9 hours
- [ ] Manual attendance editing (Dealer)
- [ ] Payroll calculation logic
- [ ] Salary slip generation
- [ ] Payment tracking

### **Phase 13: Testing & Optimization (Days 44-47)**

- [ ] Unit tests for critical functions
- [ ] Test warranty logic thoroughly
- [ ] Test free service counter
- [ ] API testing (Postman)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Bug fixes
- [ ] Code refactoring

### **Phase 14: Deployment (Days 48-50)**

- [ ] Set up production environment
- [ ] Configure Nginx and Gunicorn
- [ ] Deploy backend to server
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] MongoDB Atlas setup
- [ ] SSL certificates
- [ ] Environment variables
- [ ] Monitoring setup (Sentry)
- [ ] Final testing
- [ ] Documentation

---

## 💻 Setup Instructions

### **Prerequisites:**

```bash
- Node.js 18+ and npm
- Python 3.10+
- MongoDB 6.0+
- Redis 7.0+
- Git
```

### **Frontend Setup:**

```bash
cd frontend
npm install
npm run dev
```

### **Backend Setup:**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### **Celery & Redis Setup:**

```bash
# Terminal 1: Start Redis
redis-server

# Terminal 2: Start Celery worker
celery -A ebikepoint worker -l info

# Terminal 3: Start Celery beat (for scheduled tasks)
celery -A ebikepoint beat -l info
```

### **Environment Variables:**

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
VITE_WHATSAPP_NUMBER=917980598210
VITE_FREE_SERVICES_COUNT=4
```

**Backend (.env):**

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MongoDB
MONGODB_NAME=ebikepoint_erp
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASSWORD=

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=60  # minutes
JWT_REFRESH_TOKEN_LIFETIME=7  # days

# File Storage (AWS S3 or Cloudinary)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=

# Auto-logout
AUTO_LOGOUT_HOURS=9

# Warranty Settings
FREE_SERVICES_COUNT=4
WARRANTY_MONTHS=24
```

---

## 📊 Success Metrics

### **Performance Targets:**

- Page load time: < 3 seconds
- API response time: < 500ms
- Lighthouse Performance score: > 90
- Mobile responsiveness: 100%
- SEO score: > 90
- Accessibility score: > 90

### **Feature Completion:**

- All original features: 100%
- New ERP features: 100%
- Warranty system: 100%
- Free service tracking: 100%
- Code quality: Clean, documented, maintainable
- Test coverage: > 70%

### **Business Metrics:**

- All user roles fully functional
- Complete order workflow (dealer → admin → approval)
- Automated attendance tracking
- Accurate payroll calculations
- Real-time notifications working
- Complete audit trail
- Warranty tracking 100% accurate
- Free service system working perfectly

---

## 🎓 Learning Objectives

This project demonstrates mastery of:

1. **React.js** - Advanced hooks, context, routing, state management
2. **Django** - REST APIs, authentication, permissions, WebSocket
3. **MongoDB** - Complex schema design, relationships, queries
4. **Role-Based Access Control** - Multi-level permissions
5. **Real-time Features** - WebSocket, notifications
6. **Business Logic** - Attendance, payroll, inventory, workflows, warranty
7. **Conditional Logic** - Free vs paid service calculations
8. **PDF Generation** - Invoices, reports, salary slips
9. **Performance Optimization** - Caching, lazy loading
10. **Security** - JWT, RBAC, input validation
11. **Full-stack Integration** - Complete ERP system with warranty management

---

## 📞 Original Website Contact

- **Phone**: +91 7980598210
- **Email**: enicontrol@yahoo.com
- **Website**: https://ebikepoint.co.in/

---

## 📝 Notes for AI Assistants

If this README is shared in a new chat session, please understand:

1. **Project Context**: Legitimate company ERP rebuild project with management authorization
2. **Tech Stack**: React + Django + MongoDB (mandatory)
3. **Scope**: Complete business management system with 5 user roles
4. **Key Features**:
   - Multi-role hierarchy (Admin → Dealer → Employee/Serviceman)
   - Order approval workflow
   - Attendance tracking with auto-login/logout
   - Payroll calculation
   - Service management
   - **Warranty system with 4 free services per purchase** ⭐
   - **Smart service pricing (free for 1-4, paid from 5+)** ⭐
   - Billing/invoicing
   - Real-time notifications
5. **Warranty Logic**:
   - Every product purchase includes 4 free services
   - Services labeled "Service 1 - Free" through "Service 4 - Free"
   - From service 5 onwards: "Service 5 - ₹X" (paid)
   - Accessible from customer's purchased bike page
6. **Assessment Purpose**: Skill demonstration project - quality and completeness are critical
7. **Assist With**: Code examples, best practices, architecture decisions, specific implementations, warranty logic

---

## 📄 License

Proprietary - E-Bike Point Company Project

---

**Last Updated**: January 2026
**Project Status**: In Development
**Expected Completion**: 50 days from start
**Complexity Level**: Advanced ERP System with Warranty Management

---

## 🎯 Quick Reference: Role Permissions Matrix

| Feature              | Admin | Dealer | Employee | Serviceman | Customer |
| -------------------- | ----- | ------ | -------- | ---------- | -------- |
| Add Products         | ✅    | ❌     | ❌       | ❌         | ❌       |
| Edit Products        | ✅    | ❌     | ❌       | ❌         | ❌       |
| Set Service Charges  | ✅    | ❌     | ❌       | ❌         | ❌       |
| Order Products       | ❌    | ✅     | ❌       | ❌         | ❌       |
| Approve Orders       | ✅    | ❌     | ❌       | ❌         | ❌       |
| Sell Products        | ❌    | ✅     | ✅       | ❌         | ❌       |
| Activate Warranty    | ❌    | ✅     | ✅       | ❌         | ❌       |
| View Stock           | ✅    | ✅     | ✅       | ❌         | ❌       |
| Add Users            | ✅    | ✅     | ❌       | ❌         | ❌       |
| Edit Attendance      | ❌    | ✅     | ❌       | ❌         | ❌       |
| Calculate Payroll    | ❌    | ✅     | ❌       | ❌         | ❌       |
| Assign Services      | ❌    | ✅     | ❌       | ❌         | ❌       |
| Update Services      | ❌    | ❌     | ❌       | ✅         | ❌       |
| View Warranty Status | ✅    | ✅     | ✅       | ✅         | ✅       |
| Book Services        | ❌    | ❌     | ❌       | ❌         | ✅       |
| View Free Services   | ❌    | ✅     | ❌       | ✅         | ✅       |
| Send Notifications   | ✅    | ✅     | ✅       | ❌         | ❌       |
| Place Orders         | ❌    | ❌     | ❌       | ❌         | ✅       |

> Dealer can only add employees to their own dealership

---

## 🎁 Warranty Policy Summary

### **Standard Warranty:**

- **4 FREE services** included with every bike purchase
- Warranty valid for **24 months** from purchase date
- Services must be booked through authorized dealers

### **Free Services Include:**

1. **Service 1** - First inspection (30-45 days after purchase)
2. **Service 2** - General maintenance (3-4 months)
3. **Service 3** - Mid-term service (6-8 months)
4. **Service 4** - Annual service (12 months)

### **After Free Services:**

- **Service 5 onwards**: Standard service charges apply
- Charges vary by service type:
  - Maintenance: ₹500
  - Repair: Variable (based on issue)
  - Inspection: ₹300
  - Major Service: ₹1000

### **Parts & Labor:**

- Free services include labor only
- Parts replacement charged separately (if needed)
- Genuine parts only

---

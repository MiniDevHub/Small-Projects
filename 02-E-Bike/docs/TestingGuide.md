# 🧪 E-Bike Point ERP - Complete Testing Guide

## 📋 Table of Contents

- [Overview](#overview)
- [Pre-Testing Checklist](#pre-testing-checklist)
- [Testing Environment Setup](#testing-environment-setup)
- [Phase 1: System Setup & Super Admin](#phase-1-system-setup--super-admin)
- [Phase 2: Admin Creation & Configuration](#phase-2-admin-creation--configuration)
- [Phase 3: Dealer Network Setup](#phase-3-dealer-network-setup)
- [Phase 4: Dealer Operations](#phase-4-dealer-operations)
- [Phase 5: Customer Journey](#phase-5-customer-journey)
- [Phase 6: Service Workflow](#phase-6-service-workflow)
- [Phase 7: Complete System Test](#phase-7-complete-system-test)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Test Scenarios Checklist](#test-scenarios-checklist)

---

## 📖 Overview

This guide provides a **complete end-to-end testing workflow** for the E-Bike Point ERP system, following the hierarchical role structure and permissions matrix.

### **Role Hierarchy:**

```
Super Admin (System Root)
    └── Admin (Business Manager)
        └── Dealer (Dealership Owner)
            ├── Employee (Sales Staff)
            └── Serviceman (Technician)

Customer (Independent User)
```

### **Cyclic Dependencies:**

- **Super Admin** must create **Admin** first
- **Admin** must create **Dealers** & **Products** before dealers can operate
- **Dealers** must create **Employees/Servicemen** before they can sell/service
- **Customers** need **Dealers** to purchase bikes & book services

---

## ✅ Pre-Testing Checklist

### **System Requirements:**

- [ ] Python 3.10+ installed
- [ ] Node.js 18+ installed
- [ ] MongoDB 6.0+ installed & running
- [ ] Redis 5.0+ installed & running (optional for full features)
- [ ] Git installed
- [ ] Postman installed (for API testing)

### **Repository Setup:**

- [ ] Project cloned from repository
- [ ] Both `client/` and `server/` directories exist
- [ ] `.env` files created in both directories

---

## 🚀 Testing Environment Setup

### **Step 1: Verify System Services**

```bash
# Check MongoDB
mongosh
# Should connect successfully
# Type: exit

# Check Redis (optional)
redis-cli ping
# Should return: PONG

# Check Node.js
node --version
# Should be 18+

# Check Python
python3 --version
# Should be 3.10+
```

### **Step 2: Backend Setup**

```bash
cd server

# Check what needs to be done
make status

# Install backend (creates .venv, installs deps)
make install

# Verify installation
make check-services
make check-env

# Expected output:
# ✓ MongoDB running
# ✓ Redis running (or warning if optional)
# ✓ .env file exists
```

### **Step 3: Frontend Setup**

```bash
cd ../client

# Install frontend
make install

# Verify
make check-env
make check-backend

# Expected output:
# ✓ node_modules installed
# ✓ .env file exists
# ✓ Backend accessible
```

### **Step 4: Start Both Servers**

**Terminal 1 - Backend:**

```bash
cd server
make dev

# Should see:
# 🚀 Starting Django Server
# http://127.0.0.1:8000
# Django version 5.0.1
```

**Terminal 2 - Frontend:**

```bash
cd client
make dev

# Should see:
# 🚀 Starting Vite Dev Server
# http://localhost:5173
```

**Verification:**

- Open: http://localhost:8000/api/ → Should see API root
- Open: http://localhost:5173 → Should see E-Bike homepage

---

## 📊 Phase 1: System Setup & Super Admin

### **1.1: Create Super Admin (MongoDB)**

**Method 1: Using Django Shell (Recommended)**

```bash
cd server
source .venv/bin/activate
python manage.py shell
```

```python
from apps.users.models import User

# Create Super Admin
super_admin = User.create_superuser(
    email="superadmin@ebike.com",
    password="SuperAdmin@123",
    first_name="Super",
    last_name="Admin",
    phone="9999999999"
)

print(f"✅ Super Admin created: {super_admin.email}")
print(f"   Role: {super_admin.role}")
print(f"   ID: {super_admin.id}")

exit()
```

**Method 2: Using Management Command**

```bash
cd server
make createsuperuser

# Follow prompts:
# Email: superadmin@ebike.com
# Password: SuperAdmin@123
# First name: Super
# Last name: Admin
# Phone: 9999999999
```

### **1.2: Test Super Admin Login**

**Frontend Test:**

1. Open: http://localhost:5173/login
2. Click: **"Administrative Access"** link at bottom
3. Select: **"Super Admin"** card
4. Enter credentials:
   - Email: `superadmin@ebike.com`
   - Password: `SuperAdmin@123`
5. Click: **"Login"**

**Expected Result:**

- ✅ Redirects to `/super-admin/dashboard`
- ✅ Shows Super Admin dashboard
- ✅ Navigation shows: Dashboard, Admins, System, Logs

**API Test (Postman):**

```http
POST http://localhost:8000/api/auth/login/
Content-Type: application/json

{
  "email": "superadmin@ebike.com",
  "password": "SuperAdmin@123"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "tokens": {
    "access": "eyJ0eXAiOiJKV1...",
    "refresh": "eyJ0eXAiOiJKV1..."
  },
  "user": {
    "id": "...",
    "email": "superadmin@ebike.com",
    "role": "super_admin",
    "full_name": "Super Admin"
  }
}
```

**Save the access token** for subsequent API requests.

---

## 👨‍💼 Phase 2: Admin Creation & Configuration

### **2.1: Super Admin Creates Admin**

**Frontend Test:**

1. Login as Super Admin
2. Navigate to: **"Admins"** page
3. Click: **"Create Admin"** button
4. Fill form:
   - First Name: `John`
   - Last Name: `Admin`
   - Email: `admin@ebike.com`
   - Phone: `9876543210`
   - Password: `Admin@1234`
   - Confirm Password: `Admin@1234`
5. Click: **"Create Admin"**

**Expected Result:**

- ✅ Success toast: "Admin created successfully"
- ✅ New admin appears in admins list
- ✅ Admin has active status

**API Test (Postman):**

```http
POST http://localhost:8000/api/auth/admins/register/
Authorization: Bearer {super_admin_access_token}
Content-Type: application/json

{
  "email": "admin@ebike.com",
  "password": "Admin@1234",
  "confirm_password": "Admin@1234",
  "first_name": "John",
  "last_name": "Admin",
  "phone": "9876543210"
}
```

### **2.2: Test Admin Login**

**Frontend:**

1. Logout
2. Go to Login page
3. Click: **"Administrative Access"**
4. Select: **"Admin Portal"**
5. Login with:
   - Email: `admin@ebike.com`
   - Password: `Admin@1234`

**Expected:**

- ✅ Redirects to `/admin/dashboard`
- ✅ Shows: Products, Orders, Users, Analytics

### **2.3: Admin Creates Products**

**This is CRITICAL before dealers can operate!**

**Frontend:**

1. Login as Admin
2. Navigate to: **"Products"** → **"Create Product"**
3. Create Product #1:
   ```
   Name: Super Bike LIGHTNING
   Slug: super-bike-lightning
   Model: LIGHTNING
   Category: electric-scooter
   Base Price: ₹45,000
   Dealer Price: ₹40,000
   MRP: ₹50,000
   Total Stock: 100
   Is Featured: Yes
   ```

**OR Use Seed Command (Faster):**

```bash
cd server
make seed

# This creates all 6 bikes:
# 1. LIGHTNING
# 2. MARIUM
# 3. RABBITOR
# 4. SSUP
# 5. JV
# 6. MAKI
```

**Verify Products:**

```bash
# Frontend
http://localhost:5173/products
# Should show 6 products

# API
GET http://localhost:8000/api/products/
# Should return 6 products
```

---

## 🏪 Phase 3: Dealer Network Setup

### **3.1: Admin Creates Dealer**

**Frontend:**

1. Login as Admin
2. Navigate to: **"Users"** → **"Dealers"** tab
3. Click: **"Add Dealer"**
4. Fill form:

   ```
   First Name: Rahul
   Last Name: Sharma
   Email: dealer@ebike.com
   Phone: 9988776655
   Password: Dealer@1234
   Confirm Password: Dealer@1234

   Dealership Name: Sharma E-Bike Store
   Address: Shop 12, MG Road
   City: Bangalore
   State: Karnataka
   Pincode: 560001
   ```

5. Submit

**API Test:**

```http
POST http://localhost:8000/api/auth/dealers/register/
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "email": "dealer@ebike.com",
  "password": "Dealer@1234",
  "confirm_password": "Dealer@1234",
  "first_name": "Rahul",
  "last_name": "Sharma",
  "phone": "9988776655",
  "dealership_name": "Sharma E-Bike Store",
  "address": "Shop 12, MG Road",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560001"
}
```

### **3.2: Test Dealer Login**

**Frontend:**

1. Logout
2. Login page → Select **"Dealer Portal"**
3. Credentials:
   - Email: `dealer@ebike.com`
   - Password: `Dealer@1234`

**Expected:**

- ✅ Redirects to `/dealer/dashboard`
- ✅ Shows: Orders, Sales, Inventory, Employees
- ⚠️ **Inventory initially empty** (until dealer orders from admin)

### **3.3: Dealer Orders Products from Admin**

**Frontend:**

1. Login as Dealer
2. Navigate to: **"Orders"** → **"Place Order"**
3. Create order:

   ```
   Products:
   - LIGHTNING × 5 units
   - RABBITOR × 3 units

   Notes: Initial stock for store opening
   ```

4. Submit order

**API Test:**

```http
POST http://localhost:8000/api/orders/dealer/create/
Authorization: Bearer {dealer_access_token}
Content-Type: application/json

{
  "items": [
    {
      "product_id": "{lightning_product_id}",
      "quantity": 5
    },
    {
      "product_id": "{rabbitor_product_id}",
      "quantity": 3
    }
  ],
  "dealer_notes": "Initial stock for store opening",
  "shipping_address": "Shop 12, MG Road, Bangalore"
}
```

**Expected:**

- ✅ Order created with status: **"pending"**
- ✅ Order appears in dealer's orders list
- ⏳ Inventory NOT updated yet (needs admin approval)

### **3.4: Admin Approves Dealer Order**

**Frontend:**

1. Logout dealer
2. Login as Admin
3. Navigate to: **"Orders"** → **"Pending Orders"**
4. Find dealer's order
5. Click: **"Approve"**
6. Add notes: "Order approved. Will ship tomorrow."

**API Test:**

```http
POST http://localhost:8000/api/orders/dealer/{order_id}/approve/
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "admin_notes": "Order approved. Will ship tomorrow."
}
```

**Expected:**

- ✅ Order status → **"approved"**
- ✅ Dealer inventory INCREASES by ordered quantity
- ✅ Admin total stock DECREASES

**Verify Dealer Inventory:**

```bash
# Login as dealer and check inventory
GET http://localhost:8000/api/inventory/
Authorization: Bearer {dealer_access_token}

# Should show:
# LIGHTNING: 5 units
# RABBITOR: 3 units
```

---

## 👥 Phase 4: Dealer Operations

### **4.1: Dealer Creates Employee**

**Frontend:**

1. Login as Dealer
2. Navigate to: **"Employees"** → **"Add Employee"**
3. Fill form:
   ```
   First Name: Amit
   Last Name: Kumar
   Email: employee@ebike.com
   Phone: 9887766554
   Password: Employee@1234
   Confirm Password: Employee@1234
   Joining Date: 2026-02-01
   Salary: ₹25,000
   ```
4. Submit

**API Test:**

```http
POST http://localhost:8000/api/auth/employees/register/
Authorization: Bearer {dealer_access_token}
Content-Type: application/json

{
  "email": "employee@ebike.com",
  "password": "Employee@1234",
  "confirm_password": "Employee@1234",
  "first_name": "Amit",
  "last_name": "Kumar",
  "phone": "9887766554",
  "joining_date": "2026-02-01",
  "salary": 25000
}
```

### **4.2: Dealer Creates Serviceman**

```http
POST http://localhost:8000/api/auth/servicemen/register/
Authorization: Bearer {dealer_access_token}
Content-Type: application/json

{
  "email": "serviceman@ebike.com",
  "password": "Service@1234",
  "confirm_password": "Service@1234",
  "first_name": "Ravi",
  "last_name": "Mechanic",
  "phone": "9776655443",
  "joining_date": "2026-02-01",
  "salary": 20000
}
```

### **4.3: Test Employee Login**

**Frontend:**

1. Login page → Select **"Staff Login"**
2. Credentials:
   - Email: `employee@ebike.com`
   - Password: `Employee@1234`

**Expected:**

- ✅ Redirects to `/employee/dashboard`
- ✅ Shows: Sales, Attendance, Profile
- ✅ Can view dealer's inventory
- ✅ Can create sales

### **4.4: Employee/Dealer Creates Sale**

**Frontend:**

1. Login as Employee
2. Navigate to: **"Sales"** → **"New Sale"**
3. Create sale:

   ```
   Customer Type: Walk-in

   Customer Details:
   - Name: Rajesh Kumar
   - Phone: 9123456789
   - Email: rajesh@example.com
   - Address: 123 Street, Bangalore

   Products:
   - LIGHTNING × 1 (₹45,000)

   Payment Method: UPI
   Transaction ID: UPI123456789
   ```

4. Submit

**API Test:**

```http
POST http://localhost:8000/api/billing/sales/create/
Authorization: Bearer {employee_access_token}
Content-Type: application/json

{
  "customer": {
    "name": "Rajesh Kumar",
    "phone": "9123456789",
    "email": "rajesh@example.com",
    "address": "123 Street, Bangalore"
  },
  "items": [
    {
      "product_id": "{lightning_product_id}",
      "quantity": 1
    }
  ],
  "payment_method": "upi",
  "payment_details": {
    "transaction_id": "UPI123456789"
  }
}
```

**Expected:**

- ✅ Sale created with invoice number
- ✅ **Warranty activated automatically:**
  - Free services: 4
  - Warranty period: 24 months
- ✅ Dealer inventory decreases: LIGHTNING (5 → 4)
- ✅ Invoice can be downloaded

**Verify Warranty:**

```http
GET http://localhost:8000/api/service/warranty/{invoice_id}/
Authorization: Bearer {dealer_access_token}
```

**Expected Response:**

```json
{
  "success": true,
  "warranty": {
    "is_active": true,
    "expiry_date": "2028-02-04",
    "free_services_total": 4,
    "free_services_used": 0,
    "free_services_remaining": 4
  }
}
```

---

## 🛵 Phase 5: Customer Journey

### **5.1: Customer Registration**

**Frontend:**

1. Open: http://localhost:5173/register
2. Select: **"Customer Account"**
3. Fill form:
   ```
   First Name: Priya
   Last Name: Sharma
   Email: customer@ebike.com
   Phone: 9012345678
   Password: Customer@1234
   Confirm Password: Customer@1234
   ```
4. Submit

**Expected:**

- ✅ Auto-login after registration
- ✅ Redirects to `/customer/dashboard`

### **5.2: Customer Places Order**

**Frontend:**

1. Login as Customer
2. Browse: **"Products"** page
3. Select: **"RABBITOR"**
4. Click: **"Place Order"**
5. Fill form:
   ```
   Dealer: Sharma E-Bike Store (Bangalore)
   Quantity: 1
   Delivery Address: 456 New Road, Bangalore
   Home Delivery: Yes
   Payment Method: Advance
   Amount Paid: ₹5,000
   ```
6. Submit

**API Test:**

```http
POST http://localhost:8000/api/orders/customer/create/
Authorization: Bearer {customer_access_token}
Content-Type: application/json

{
  "dealer_id": "{dealer_id}",
  "items": [
    {
      "product_id": "{rabbitor_product_id}",
      "quantity": 1
    }
  ],
  "customer_name": "Priya Sharma",
  "customer_phone": "9012345678",
  "customer_email": "customer@ebike.com",
  "delivery_address": "456 New Road, Bangalore",
  "is_home_delivery": true,
  "amount_paid": 5000,
  "payment_method": "advance",
  "customer_notes": "Please deliver on weekend"
}
```

**Expected:**

- ✅ Order created with status: **"pending"**
- ✅ Customer can track order
- ⏳ Dealer needs to confirm

### **5.3: Dealer Confirms Customer Order**

**Frontend:**

1. Login as Dealer
2. Navigate to: **"Orders"** → **"Customer Orders"**
3. Find Priya's order
4. Click: **"Confirm"**
5. Add notes

**API Test:**

```http
PATCH http://localhost:8000/api/orders/customer/{order_id}/status/
Authorization: Bearer {dealer_access_token}
Content-Type: application/json

{
  "status": "confirmed",
  "dealer_notes": "Order confirmed. Will deliver on Saturday."
}
```

**Expected:**

- ✅ Order status → **"confirmed"**
- ✅ Customer receives notification
- ✅ Order appears in dealer's pending deliveries

---

## 🔧 Phase 6: Service Workflow

### **6.1: Customer Books Service**

**Scenario:** Rajesh Kumar (who bought LIGHTNING) needs first free service.

**Frontend:**

1. Login as Customer
2. Navigate to: **"Services"** → **"Book Service"**
3. Fill form:
   ```
   Invoice/Purchase: Select LIGHTNING purchase
   Issue Type: Maintenance
   Description: First free service - Battery check
   Scheduled Date: 2026-02-10 10:00 AM
   ```
4. Submit

**API Test:**

```http
POST http://localhost:8000/api/service/request/create/
Authorization: Bearer {customer_access_token}
Content-Type: application/json

{
  "invoice_id": "{sale_invoice_id}",
  "issue_type": "maintenance",
  "issue_description": "First free service - Battery check",
  "scheduled_date": "2026-02-10T10:00:00Z"
}
```

**Expected:**

- ✅ Service request created
- ✅ Status: **"pending"**
- ✅ **Is free service:** true
- ✅ **Warranty check:** free_services_remaining: 4 → 3

### **6.2: Dealer Assigns Serviceman**

**Frontend:**

1. Login as Dealer
2. Navigate to: **"Services"** → **"Pending Requests"**
3. Find Rajesh's service request
4. Click: **"Assign"**
5. Select: **"Ravi Mechanic"** (serviceman)

**API Test:**

```http
POST http://localhost:8000/api/service/requests/{service_id}/assign/
Authorization: Bearer {dealer_access_token}
Content-Type: application/json

{
  "serviceman_id": "{serviceman_user_id}"
}
```

**Expected:**

- ✅ Status → **"assigned"**
- ✅ Serviceman receives notification
- ✅ Appears in serviceman's dashboard

### **6.3: Serviceman Completes Service**

**Frontend:**

1. Login as Serviceman
2. Navigate to: **"Services"** → **"My Services"**
3. Find Rajesh's service
4. Click: **"Start Service"**
5. Update status to **"in_progress"**
6. After work, click: **"Complete Service"**
7. Fill details:

   ```
   Parts Used:
   - Brake Pads × 2 (₹500)

   Service Time: 45 minutes
   Notes: Battery checked. Brake pads replaced.
   ```

8. Submit

**API Test:**

```http
PATCH http://localhost:8000/api/service/requests/{service_id}/status/
Authorization: Bearer {serviceman_access_token}
Content-Type: application/json

{
  "status": "completed",
  "parts_used": [
    {
      "part_name": "Brake Pads",
      "quantity": 2,
      "cost": 500
    }
  ],
  "service_time_minutes": 45,
  "notes": "Battery checked. Brake pads replaced. All OK."
}
```

**Expected:**

- ✅ Status → **"completed"**
- ✅ **Free services used:** 1
- ✅ **Free services remaining:** 3
- ✅ **Completion date** recorded
- ✅ Customer notified

**Verify Updated Warranty:**

```http
GET http://localhost:8000/api/service/warranty/{invoice_id}/
```

**Should show:**

```json
{
  "warranty": {
    "is_active": true,
    "free_services_total": 4,
    "free_services_used": 1,
    "free_services_remaining": 3
  }
}
```

---

## 🧪 Phase 7: Complete System Test

### **7.1: Attendance System Test**

**Employee Attendance:**

```http
# Employee clocks in
POST http://localhost:8000/api/attendance/clock-in/
Authorization: Bearer {employee_access_token}

# Expected: Attendance record created

# Check today's status
GET http://localhost:8000/api/attendance/today/
Authorization: Bearer {employee_access_token}

# Expected: Shows clock-in time, status: present

# Clock out
POST http://localhost:8000/api/attendance/clock-out/
Authorization: Bearer {employee_access_token}

{
  "notes": "Completed all tasks"
}

# Expected: Clock-out time recorded, hours calculated
```

**Dealer Edits Attendance:**

```http
# Dealer can edit employee attendance
PATCH http://localhost:8000/api/attendance/{attendance_id}/edit/
Authorization: Bearer {dealer_access_token}

{
  "status": "half_day",
  "edit_reason": "Employee left early due to medical emergency",
  "notes": "Approved - Medical certificate submitted"
}
```

### **7.2: Analytics Test**

**Admin Analytics:**

```http
GET http://localhost:8000/api/analytics/admin/dashboard/
Authorization: Bearer {admin_access_token}
```

**Expected Response:**

```json
{
  "success": true,
  "overview": {
    "total_dealers": 1,
    "total_products": 6,
    "pending_orders": 0,
    "total_sales_amount": 45000,
    "low_stock_products": 0
  },
  "recent_orders": [...],
  "sales_trend": [...]
}
```

**Dealer Analytics:**

```http
GET http://localhost:8000/api/analytics/dealer/dashboard/
Authorization: Bearer {dealer_access_token}
```

**Expected:**

```json
{
  "success": true,
  "overview": {
    "total_sales": 1,
    "total_revenue": 45000,
    "pending_customer_orders": 1,
    "low_stock_count": 0,
    "active_employees": 1,
    "active_servicemen": 1
  }
}
```

### **7.3: Notifications Test**

**Admin Creates Announcement:**

```http
POST http://localhost:8000/api/notifications/create/
Authorization: Bearer {admin_access_token}

{
  "title": "New Year Sale - 10% Off",
  "message": "Special discount on all bikes this month!",
  "recipient_type": "role",
  "recipient_roles": ["dealer", "customer"],
  "notification_type": "success",
  "priority": "high",
  "expires_in_days": 30
}
```

**Users Check Notifications:**

```http
# Dealer checks notifications
GET http://localhost:8000/api/notifications/my/
Authorization: Bearer {dealer_access_token}

# Should see the announcement
```

---

## 📋 Test Scenarios Checklist

### **Super Admin Tests:**

- [x] Create super admin user
- [x] Login as super admin
- [x] Create admin user
- [x] View all admins
- [x] Update admin details
- [x] Delete admin
- [x] View system logs
- [x] Access analytics

### **Admin Tests:**

- [x] Login as admin
- [x] Create products (all 6 bikes)
- [x] Update product details
- [x] Manage stock
- [x] Create dealer
- [x] View all dealers
- [x] Approve dealer orders
- [x] Reject dealer orders
- [x] Mark orders as shipped
- [x] View analytics

### **Dealer Tests:**

- [x] Login as dealer
- [x] Place order to admin
- [x] View inventory (after order approval)
- [x] Create employee
- [x] Create serviceman
- [x] View/Edit attendance
- [x] Confirm customer orders
- [x] Assign services to serviceman
- [x] View sales reports

### **Employee Tests:**

- [x] Login as employee
- [x] Clock in/out attendance
- [x] Create sales (walk-in customer)
- [x] Create sales (registered customer)
- [x] View own sales
- [x] View dealer inventory

### **Serviceman Tests:**

- [x] Login as serviceman
- [x] Clock in/out attendance
- [x] View assigned services
- [x] Update service status
- [x] Complete services
- [x] Add service notes & parts

### **Customer Tests:**

- [x] Register account
- [x] Login
- [x] Browse products
- [x] Place order
- [x] Track order status
- [x] Book service (free)
- [x] Book service (paid)
- [x] View warranty status
- [x] View purchase history

### **System Integration Tests:**

- [x] Order flow: Dealer → Admin approval → Inventory update
- [x] Sale flow: Employee sale → Inventory decrease → Warranty activation
- [x] Service flow: Customer → Dealer → Serviceman → Completion
- [x] Warranty tracking: Free services decrementation
- [x] Attendance: Clock in/out → Auto-logout after 9 hours
- [x] Notifications: Admin broadcast → Role-based delivery

---

## 🚨 Troubleshooting Guide

### **Issue: "MongoDB not connected"**

```bash
# Check MongoDB status
brew services list | grep mongodb
# If not running:
brew services start mongodb-community@6.0

# Verify connection
mongosh
```

### **Issue: "400 Bad Request on admin creation"**

**Check:**

1. Missing `confirm_password` field
2. Password doesn't meet requirements (8+ chars, uppercase, lowercase, number)
3. Email already exists

**Solution:**

```bash
# Check existing admins
mongosh ebikepoint_erp
db.users.find({role: "admin"})
```

### **Issue: "Inventory not updating after order approval"**

**Check:**

1. Order status is "approved"
2. Dealer ID matches
3. Product IDs are correct

**Verify:**

```http
GET http://localhost:8000/api/inventory/
Authorization: Bearer {dealer_access_token}
```

### **Issue: "Service not marked as free"**

**Check:**

1. Invoice has warranty activated
2. Free services remaining > 0
3. Service is within warranty period (24 months)

**Verify:**

```http
GET http://localhost:8000/api/service/warranty/{invoice_id}/
```

---

## 🎯 Success Criteria

**✅ System is working correctly if:**

1. **Role Hierarchy:**
   - Super Admin can create Admins ✓
   - Admin can create Dealers & Products ✓
   - Dealer can create Employees & Servicemen ✓
   - Customer can self-register ✓

2. **Order Workflow:**
   - Dealer orders → Pending ✓
   - Admin approves → Inventory updates ✓
   - Customer orders → Dealer confirms ✓

3. **Sales & Warranty:**
   - Sale creates invoice ✓
   - Warranty auto-activates (4 free services, 24 months) ✓
   - Inventory decreases ✓

4. **Service Workflow:**
   - Customer books → Pending ✓
   - Dealer assigns → Serviceman ✓
   - Serviceman completes → Free service count decreases ✓

5. **Permissions:**
   - Each role can ONLY access their permitted features ✓
   - Unauthorized access returns 403 Forbidden ✓

---

# 🧪 E-Bike Point - Comprehensive Testing Guide

This guide will help you test the complete E-Bike Point ERP system end-to-end.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup & Testing](#backend-setup--testing)
3. [Frontend Setup & Testing](#frontend-setup--testing)
4. [User Flow Testing](#user-flow-testing)
5. [API Testing with Postman](#api-testing-with-postman)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## ✅ Prerequisites

### Required Software

- **Python 3.10+** installed
- **Node.js 18+** and npm installed
- **MongoDB 6.0+** running
- **Git** installed
- **Postman** (optional, for API testing)

### Check Installations

```bash
# Check Python
python --version  # Should show 3.10 or higher

# Check Node.js
node --version    # Should show 18 or higher
npm --version

# Check MongoDB
mongosh --version # Or mongo --version

# Check Git
git --version
```

---

## 🔧 Backend Setup & Testing

### 1. Start MongoDB

**macOS/Linux:**

```bash
# Start MongoDB service
sudo systemctl start mongod

# Or if using Homebrew (macOS)
brew services start mongodb-community
```

**Windows:**

```bash
# MongoDB should auto-start as a service
# Or manually start from Services app
```

**Verify MongoDB is running:**

```bash
mongosh
# Should connect successfully
# Type 'exit' to quit
```

---

### 2. Backend Installation

```bash
# Navigate to backend directory
cd server

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# macOS/Linux:
source .venv/bin/activate

# Windows:
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

### 3. Configure Environment Variables

Create `.env` file in `server/` directory:

```bash
# server/.env
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
AUTO_LOGOUT_HOURS=9
FREE_SERVICES_COUNT=4
WARRANTY_MONTHS=24
```

---

### 4. Create Admin User

```bash
# Start Django shell
python manage.py shell
```

```python
# In Python shell
from apps.users.models import User

# Create admin user
admin = User.create_superuser(
    email="admin@ebike.com",
    password="Admin@1234",
    first_name="Admin",
    last_name="User",
    phone="9999999999"
)

print(f"✅ Admin created: {admin.email}")
exit()
```

---

### 5. Start Backend Server

```bash
# Make sure you're in server/ directory with venv activated
python manage.py runserver

# Should see:
# Starting development server at http://127.0.0.1:8000/
```

**Test Backend is Running:**

Open browser and visit:

- http://localhost:8000/api/ → Should show Django REST framework page
- http://localhost:8000/admin/ → Should show Django admin (won't work with MongoDB, but endpoint exists)

---

### 6. Backend API Tests

**Test 1: Health Check**

```bash
curl http://localhost:8000/api/
# Should return API root response
```

**Test 2: Login Admin**

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ebike.com",
    "password": "Admin@1234"
  }'

# Should return:
# {
#   "access": "eyJ...",
#   "refresh": "eyJ...",
#   "user": { ... }
# }
```

**Test 3: Get Products (Public)**

```bash
curl http://localhost:8000/api/products/

# Should return products list (may be empty initially)
```

✅ **Backend is ready if all tests pass!**

---

## ⚛️ Frontend Setup & Testing

### 1. Frontend Installation

```bash
# Open NEW terminal (keep backend running)
# Navigate to frontend directory
cd client

# Install dependencies
npm install
```

---

### 2. Configure Environment Variables

Create `.env` file in `client/` directory:

```bash
# client/.env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=E-Bike Point
VITE_AUTO_LOGOUT_HOURS=9
VITE_FREE_SERVICES_COUNT=4
VITE_WARRANTY_MONTHS=24
```

---

### 3. Start Frontend Development Server

```bash
# Make sure you're in client/ directory
npm run dev

# Should see:
# VITE vX.X.X  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

**Open Browser:**

- Visit: http://localhost:5173/

✅ **Frontend is running if you see the homepage!**

---

## 🧑‍💻 User Flow Testing

### Test Flow 1: Admin Workflow

#### Step 1: Login as Admin

1. Go to http://localhost:5173/login
2. Enter credentials:
   - Email: `admin@ebike.com`
   - Password: `Admin@1234`
3. Click "Login"
4. ✅ Should redirect to `/admin/dashboard`

#### Step 2: Create a Product

1. Navigate to "Products" from sidebar
2. Click "+ Add Product"
3. Fill in product details:

   ```
   Name: Test Bike Lightning
   Slug: test-bike-lightning
   Model: LIGHTNING
   Base Price: 45000
   Dealer Price: 40000
   MRP: 50000
   Total Stock: 100

   Specifications:
   Range: 50-60 KM
   Battery: Lithium-ion 48V 24Ah
   Top Speed: 50 km/h
   Motor Power: 1000W
   ```

4. Click "Create Product"
5. ✅ Should see success message and product in list

#### Step 3: Create a Dealer

1. Navigate to "Users" from sidebar
2. Click "+ Add Dealer"
3. Fill in dealer details:
   ```
   Email: dealer@test.com
   Password: Dealer@1234
   First Name: Test
   Last Name: Dealer
   Phone: 9876543210
   Dealership Name: Test Dealership
   City: Mumbai
   State: Maharashtra
   ```
4. Click "Create Dealer"
5. ✅ Should see success message

#### Step 4: Logout

1. Click logout icon in header
2. ✅ Should redirect to login page

---

### Test Flow 2: Dealer Workflow

#### Step 1: Login as Dealer

1. Go to http://localhost:5173/login
2. Enter credentials:
   - Email: `dealer@test.com`
   - Password: `Dealer@1234`
3. Click "Login"
4. ✅ Should redirect to `/dealer/dashboard`

#### Step 2: View Inventory

1. Navigate to "Inventory" from sidebar
2. ✅ Should show empty inventory (no orders approved yet)

#### Step 3: Order Products from Admin

1. Navigate to "Order Products" from sidebar
2. Click "+ Create Order"
3. Add items:
   - Select "Test Bike Lightning"
   - Quantity: 5
   - Click "Add Item" if you want more
4. Add notes: "Urgent order for festival season"
5. Click "Create Order"
6. ✅ Should see order in "Pending" status

#### Step 4: Wait for Admin Approval

1. Logout dealer
2. Login as Admin
3. Go to "Order Approvals"
4. Find the dealer order
5. Click "Approve" button
6. Add admin notes (optional)
7. Click "Approve Order"
8. ✅ Order status changes to "Approved"

#### Step 5: Dealer Creates Sale

1. Logout admin, login as dealer
2. Navigate to "Create Sale"
3. Fill in customer details:
   ```
   Name: John Doe
   Phone: 9988776655
   Email: john@example.com
   Address: 123 Main St, Mumbai
   ```
4. Add sale items:
   - Select product
   - Quantity: 1
5. Select payment method: Cash
6. Click "Create Sale & Activate Warranty"
7. ✅ Should see success message and warranty activated

---

### Test Flow 3: Customer Workflow

#### Step 1: Customer Registration

1. Go to http://localhost:5173/register
2. Fill in registration form:
   ```
   Email: customer@test.com
   First Name: Test
   Last Name: Customer
   Phone: 9898989898
   Password: Customer@1234
   Confirm Password: Customer@1234
   ```
3. Click "Create Account"
4. ✅ Should auto-login and redirect to customer dashboard

#### Step 2: Browse Products

1. Navigate to "Products" (public page)
2. Click on a product
3. ✅ Should see product details page

#### Step 3: View My Bikes (if purchased)

1. Go to "My Bikes" from dashboard
2. ✅ Should see purchased bikes with warranty info

---

### Test Flow 4: Employee Workflow

#### Step 1: Create Employee (as Dealer)

1. Login as dealer
2. Navigate to "Employees"
3. Click "+ Add Employee"
4. Fill details:
   ```
   Email: employee@test.com
   Password: Employee@1234
   First Name: Test
   Last Name: Employee
   Phone: 9191919191
   Role: Employee
   ```
5. ✅ Employee created

#### Step 2: Login as Employee

1. Logout dealer
2. Login with employee credentials
3. ✅ Should see employee dashboard

#### Step 3: Clock In/Out

1. Navigate to "My Attendance"
2. Click "Clock In"
3. ✅ Should show clocked in status
4. Click "Clock Out"
5. ✅ Should show clocked out with hours worked

---

### Test Flow 5: Serviceman Workflow

#### Step 1: Create Serviceman (as Dealer)

1. Login as dealer
2. Create serviceman user (similar to employee)
3. ✅ Serviceman created

#### Step 2: Customer Books Service

1. Login as customer
2. Navigate to "Book Service"
3. Select bike
4. Fill service details:
   ```
   Service Type: Maintenance
   Issue: Regular service needed
   Preferred Date: Tomorrow
   ```
5. Click "Book Service"
6. ✅ Service request created

#### Step 3: Dealer Assigns Service

1. Login as dealer
2. Navigate to "Services"
3. Find pending service
4. Click "Assign"
5. Select serviceman
6. ✅ Service assigned

#### Step 4: Serviceman Updates Status

1. Login as serviceman
2. Navigate to "My Services"
3. Find assigned service
4. Click "Update Status"
5. Change status to "In Progress"
6. Add notes: "Started work on battery"
7. ✅ Status updated

---

## 📮 API Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import"
3. Select the file: `E-Bike Point ERP - Complete API Collection (Updated).postman_collection.json`
4. ✅ Collection imported with 38+ endpoints

### Test Endpoints

**Test Authentication:**

1. Open "1. Authentication" folder
2. Run "Login" request
   - Should auto-save tokens to collection variables
3. Run "Get Current User"
   - Should return user details

**Test Products:**

1. Run "Admin Login" first
2. Run "Create Product (Admin)"
3. Run "List All Products (Public)"

**Test Orders:**

1. Run "Login Dealer"
2. Run "Create Order (Dealer)"
3. Login as admin
4. Run "Approve Order (Admin Only)"

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend won't start

**Error:** `ModuleNotFoundError: No module named 'mongoengine'`

**Solution:**

```bash
# Make sure virtual environment is activated
source .venv/bin/activate  # macOS/Linux
# or
.venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

---

### Issue 2: MongoDB connection error

**Error:** `ServerSelectionTimeoutError: localhost:27017`

**Solution:**

```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
# Windows: Start from Services app
```

---

### Issue 3: CORS errors in browser

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**

Check `server/config/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]
```

Restart backend server after changes.

---

### Issue 4: Frontend can't connect to backend

**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Solution:**

1. Check backend is running: http://localhost:8000/api/
2. Check `.env` file in client:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
3. Restart frontend: `npm run dev`

---

### Issue 5: Login returns 401 Unauthorized

**Error:** `Invalid credentials`

**Solution:**

1. Verify user exists in database:

   ```bash
   python manage.py shell
   ```

   ```python
   from apps.users.models import User
   User.objects.all()
   ```

2. Reset admin password:
   ```python
   admin = User.objects.get(email="admin@ebike.com")
   admin.set_password("Admin@1234")
   admin.save()
   ```

---

### Issue 6: JWT token expired

**Error:** `Token is invalid or expired`

**Solution:**

Frontend should auto-refresh tokens. If not:

1. Clear localStorage in browser
2. Login again
3. Tokens refresh automatically

---

### Issue 7: Product images not showing

**Issue:** Placeholder images display

**Solution:**

Images are currently placeholders. To add real images:

1. Add image URLs to product creation
2. Or upload images to a CDN
3. Update product image URLs

---

## 🧪 Automated Testing Checklist

### Backend Tests

- [ ] Admin can login
- [ ] Admin can create products
- [ ] Admin can approve orders
- [ ] Dealer can register (via admin)
- [ ] Dealer can order products
- [ ] Dealer can create sales
- [ ] Employee can clock in/out
- [ ] Customer can register
- [ ] Service requests work
- [ ] Warranty activation works

### Frontend Tests

- [ ] Homepage loads
- [ ] Login/Register works
- [ ] Product listing shows
- [ ] Product details display
- [ ] Admin dashboard accessible
- [ ] Dealer dashboard accessible
- [ ] Customer dashboard accessible
- [ ] Navigation works
- [ ] Logout works
- [ ] Role-based routing works

### Integration Tests

- [ ] Create product → Order → Approve → Sell flow
- [ ] Customer purchase → Warranty activation
- [ ] Service booking → Assignment → Completion
- [ ] Employee attendance tracking
- [ ] Inventory updates after orders

---

## 📊 Test Data Setup Script

Create test data quickly:

**server/setup_test_data.py:**

```python
from apps.users.models import User
from apps.products.models import Product

# Create admin
admin = User.create_superuser(
    email="admin@ebike.com",
    password="Admin@1234",
    first_name="Admin",
    last_name="User",
    phone="9999999999"
)

# Create dealer
dealer = User.create_user(
    email="dealer@ebike.com",
    password="Dealer@1234",
    first_name="Test",
    last_name="Dealer",
    phone="9876543210",
    role="dealer",
    dealership_name="Test Dealership",
    city="Mumbai",
    state="Maharashtra"
)

# Create product
product = Product(
    name="Test Bike Lightning",
    slug="test-bike-lightning",
    model="LIGHTNING",
    base_price=45000,
    dealer_price=40000,
    mrp=50000,
    total_stock=100,
    is_available=True,
    created_by=str(admin.id)
)
product.save()

print("✅ Test data created successfully!")
```

**Run:**

```bash
python manage.py shell < setup_test_data.py
```

---

## 🎯 Final Testing Checklist

### Before Deployment

- [ ] All API endpoints working
- [ ] All user roles tested
- [ ] All workflows tested
- [ ] No console errors
- [ ] No API errors
- [ ] Responsive design works
- [ ] Forms validate correctly
- [ ] Error messages display
- [ ] Success messages display
- [ ] Loading states work
- [ ] Empty states display

### Performance Tests

- [ ] Page load < 3 seconds
- [ ] API responses < 1 second
- [ ] Image loading optimized
- [ ] No memory leaks
- [ ] Smooth animations

### Security Tests

- [ ] Protected routes work
- [ ] Unauthorized access blocked
- [ ] XSS protection works
- [ ] CSRF protection enabled
- [ ] Passwords hashed
- [ ] JWT tokens secure

---

## 🚀 Next Steps After Testing

1. **Fix any bugs found**
2. **Optimize performance**
3. **Add production environment configs**
4. **Setup CI/CD pipeline**
5. **Deploy to production**

---

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review error logs in:
   - Backend: Terminal running Django
   - Frontend: Browser console
3. Check API responses in Network tab
4. Review Postman collection for working examples

---

**Happy Testing! 🎉**

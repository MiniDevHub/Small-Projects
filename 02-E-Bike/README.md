# 🚲 E-Bike Point - Backend API

Django REST API for E-Bike Point ERP System

## 📊 Project Status: **90% Complete** ✅

### ✅ **Completed Modules:**

1. **Authentication System** (100%)
2. **User Management** (100%)
3. **Products Module** (100%)
4. **Orders Module** (100%)
5. **Inventory Module** (100%)
6. **Billing/Sales Module** (100%)
7. **Attendance Module** (90%)
8. **Service Module** (85%)

### 🚧 **Remaining Work (10%):**

- Notifications module implementation
- Analytics/reporting endpoints
- WebSocket integration for real-time features
- Advanced filtering and search
- File upload optimization

---

## 🛠️ Tech Stack

- **Framework:** Django 5.0.1
- **API:** Django REST Framework
- **Authentication:** JWT (djangorestframework-simplejwt)
- **Database:** MongoDB (with MongoEngine)
- **Python:** 3.14.0

---

## 📁 Project Structure

```

server/
├── apps/
│ ├── users/ # ✅ User authentication & management
│ ├── products/ # ✅ Product CRUD & stock management
│ ├── orders/ # ✅ Dealer orders & admin approval
│ ├── billing/ # ✅ Sales/invoicing with warranty
│ ├── inventory/ # ✅ Dealer inventory tracking
│ ├── attendance/ # ✅ Employee attendance & payroll
│ ├── service/ # ✅ Service requests & warranty
│ ├── notifications/ # 🚧 In progress
│ └── analytics/ # 🚧 Planned
├── config/
│ ├── settings.py # Django settings
│ ├── urls.py # Main URL routing
│ └── wsgi.py
├── manage.py
├── requirements.txt
└── README.md (this file)

```

---

## 🗄️ Database Schema (MongoDB Collections)

### **Users Collection:**

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed with bcrypt),
  first_name: String,
  last_name: String,
  phone: String,
  role: String,  // "admin", "dealer", "employee", "serviceman", "customer"
  dealership_name: String,  // For dealers
  dealer_id: String,  // For employees/servicemen
  address: String,
  city: String,
  state: String,
  pincode: String,
  is_active: Boolean,
  is_approved: Boolean,
  date_joined: Date
}
```

### **Products Collection:**

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  model: String,
  description: String,
  specifications: {
    range_km: String,
    battery_type: String,
    top_speed: String,
    // ... more specs
  },
  base_price: Number,
  dealer_price: Number,
  mrp: Number,
  tax_rate: Number,
  service_charges: {
    standard_service: Number,
    major_service: Number,
    repair: Number
  },
  warranty: {
    free_services: Number,  // Default: 4
    warranty_period_months: Number  // 24
  },
  images: [{ url: String, is_primary: Boolean }],
  total_stock: Number,
  is_available: Boolean
}
```

### **Orders Collection (Dealer → Admin):**

```javascript
{
  _id: ObjectId,
  order_number: String,
  dealer_id: String,
  items: [{
    product_id: String,
    quantity: Number,
    unit_price: Number
  }],
  status: String,  // "pending", "approved", "rejected", "shipped"
  approved_by: String,
  approval_date: Date
}
```

### **Sales Collection (Customer Purchases):**

```javascript
{
  _id: ObjectId,
  invoice_number: String,
  dealer_id: String,
  employee_id: String,
  customer_id: String,
  items: [{
    product_id: String,
    quantity: Number,
    unit_price: Number
  }],
  warranty: {
    is_activated: Boolean,
    free_services_total: Number,
    free_services_used: Number,
    free_services_remaining: Number
  },
  payment_method: String,
  grand_total: Number
}
```

---

## 🔌 API Endpoints (Completed)

### **1. Authentication** ✅

```
POST   /api/auth/register/              # Customer registration
POST   /api/auth/register-dealer/       # Admin creates dealer (requires admin token)
POST   /api/auth/login/                 # Login (all roles)
POST   /api/auth/logout/                # Logout
POST   /api/auth/token/refresh/         # Refresh JWT token
GET    /api/auth/me/                    # Get current user
PUT    /api/auth/profile/               # Update profile
POST   /api/auth/change-password/       # Change password
DELETE /api/auth/delete-account/        # Delete own account
```

### **2. Products** ✅

```
# Public
GET    /api/products/                   # List all products (public)
GET    /api/products/:id/               # Get product by ID
GET    /api/products/slug/:slug/        # Get product by slug

# Admin Only
POST   /api/products/admin/create/      # Create product
PUT    /api/products/admin/:id/update/  # Update product
DELETE /api/products/admin/:id/delete/  # Delete product
GET    /api/products/admin/stock/overview/  # Stock overview
```

### **3. Orders (Dealer → Admin)** ✅

```
# Dealer
POST   /api/orders/create/              # Create order (dealer only)
GET    /api/orders/                     # List orders (filtered by role)
GET    /api/orders/:id/                 # Order details

# Admin
POST   /api/orders/:id/approve/         # Approve order
POST   /api/orders/:id/reject/          # Reject order
POST   /api/orders/:id/ship/            # Mark as shipped
```

### **4. Billing/Sales** ✅

```
POST   /api/billing/sales/create/       # Create sale (dealer/employee)
GET    /api/billing/sales/              # List sales
GET    /api/billing/sales/:id/          # Sale details
GET    /api/billing/customer/purchases/ # Customer's purchases
```

### **5. Inventory** ✅

```
GET    /api/inventory/                  # Dealer inventory
GET    /api/inventory/low-stock/        # Low stock alerts
```

### **6. Attendance** ✅

```
POST   /api/attendance/clock-in/        # Clock in (employee/serviceman)
POST   /api/attendance/clock-out/       # Clock out
GET    /api/attendance/my/              # Own attendance
PUT    /api/attendance/:id/edit/        # Edit attendance (dealer only)
```

### **7. Service** ✅

```
POST   /api/service/request/create/     # Create service request (customer)
GET    /api/service/requests/           # List service requests
GET    /api/service/requests/:id/       # Service details
POST   /api/service/requests/:id/assign/  # Assign to serviceman (dealer)
POST   /api/service/requests/:id/update-status/  # Update status (serviceman)
GET    /api/service/warranty/:invoice_id/  # Check warranty status
```

---

## 🚀 Setup Instructions

### **Prerequisites:**

- Python 3.10+
- MongoDB 6.0+
- pip (Python package manager)

### **1. Clone & Navigate:**

```bash
cd server
```

### **2. Create Virtual Environment:**

```bash
python -m venv .venv

# Activate:
# macOS/Linux:
source .venv/bin/activate
# Windows:
.venv\Scripts\activate
```

### **3. Install Dependencies:**

```bash
pip install -r requirements.txt
```

### **4. Environment Variables:**

Create `.env` file in `server/` directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MongoDB
MONGODB_NAME=ebikepoint_erp
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASSWORD=

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=60  # minutes
JWT_REFRESH_TOKEN_LIFETIME=7   # days

# Business Settings
AUTO_LOGOUT_HOURS=9
FREE_SERVICES_COUNT=4
WARRANTY_MONTHS=24
```

### **5. Run MongoDB:**

```bash
# Make sure MongoDB is running
mongosh  # Test connection
```

### **6. Run Server:**

```bash
python manage.py runserver
```

Server runs at: `http://localhost:8000`

---

## 🧪 Testing

### **Using Postman:**

Import the Postman collection (provided separately) with all endpoints configured.

### **Test Flow:**

1. **Create Admin** (Django shell):

```python
python manage.py shell

from apps.users.models import User
admin = User.create_superuser(
    email="admin@ebike.com",
    password="Admin@1234",
    first_name="Admin",
    last_name="User",
    phone="9999999999"
)
```

2. **Login as Admin** → Get token

3. **Create Product** → Use admin token

4. **Register Dealer** → Use admin token

5. **Login as Dealer** → Get dealer token

6. **Create Order** → Use dealer token

7. **Approve Order** → Use admin token

---

## 🔐 Authentication Flow

### **JWT Token System:**

1. **Login** returns:

```json
{
  "access": "eyJ...",
  "refresh": "eyJ...",
  "user": {
    "id": "...",
    "email": "...",
    "role": "admin"
  }
}
```

2. **Use access token** in Authorization header:

```
Authorization: Bearer eyJ...
```

3. **Token lifetime:**
   - Access: 1 hour
   - Refresh: 7 days

4. **Refresh token** when access expires:

```
POST /api/auth/token/refresh/
Body: { "refresh": "..." }
```

---

## 🎯 User Roles & Permissions

| Role           | Can Do                                                          |
| -------------- | --------------------------------------------------------------- |
| **Admin**      | Manage products, approve orders, manage all users               |
| **Dealer**     | Order products, sell to customers, manage employees, attendance |
| **Employee**   | Sell products, clock in/out, view stock                         |
| **Serviceman** | Update service requests, clock in/out                           |
| **Customer**   | Browse products, place orders, book services                    |

---

## 📝 Management Commands

### **Delete All Users:**

```bash
python manage.py delete_all_users

# With confirmation:
python manage.py delete_all_users --confirm

# By role:
python manage.py delete_all_users --role customer --confirm
```

### **Create Admin:**

```bash
python manage.py create_admin \
  --email admin@ebike.com \
  --password Admin@1234 \
  --first-name Admin \
  --last-name User \
  --phone 9999999999
```

### **Create Dealer:**

```bash
python manage.py create_dealer \
  --email dealer@ebike.com \
  --password Dealer@1234 \
  --first-name Rahul \
  --last-name Sharma \
  --phone 9988776655 \
  --dealership "Sharma E-Bike Store" \
  --city Bangalore
```

---

## 🐛 Common Issues & Solutions

### **1. MongoDB Connection Error:**

```
✅ Solution: Make sure MongoDB is running
mongod --dbpath /path/to/data
```

### **2. "User has no attribute 'username'" Error:**

```
✅ Solution: Add to User model:
@property
def username(self):
    return self.email
```

### **3. "StringField only accepts string values" Error:**

```
✅ Solution: Convert ObjectId to string:
user_id = str(request.user.id)
```

### **4. Token expired:**

```
✅ Solution: Use refresh token to get new access token
POST /api/auth/token/refresh/
```

---

## 📊 Current Progress

### **Completed Features:**

- ✅ Full authentication system with JWT
- ✅ Role-based access control (5 roles)
- ✅ Product management (CRUD)
- ✅ Order workflow (dealer → admin approval)
- ✅ Sales/billing with warranty activation
- ✅ Inventory tracking
- ✅ Attendance system
- ✅ Service request management
- ✅ Warranty system (4 free services)

### **API Endpoints Count:**

- Authentication: 9 endpoints
- Products: 7 endpoints
- Orders: 6 endpoints
- Billing: 4 endpoints
- Inventory: 2 endpoints
- Attendance: 4 endpoints
- Service: 6 endpoints
- **Total: 38+ endpoints** ✅

---

## 🔜 Next Steps (Frontend)

With backend 90% complete, next phase is **Frontend Development**:

1. **Setup React project**
2. **Implement authentication UI**
3. **Create role-based dashboards**
4. **Build product management interface**
5. **Integrate with backend APIs**

See root README for frontend setup instructions.

---

## 📚 Dependencies

Key packages in `requirements.txt`:

```
Django==5.0.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
mongoengine==0.28.2
django-cors-headers==4.3.1
python-decouple==3.8
bcrypt==4.1.2
```

---

## 🎓 What This Backend Demonstrates

- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Role-based permissions
- ✅ MongoDB integration with Django
- ✅ Complex business logic (orders, warranty, attendance)
- ✅ Error handling and validation
- ✅ Clean code structure
- ✅ Management commands
- ✅ Multi-role system architecture

---

## 📞 Support

For issues or questions:

- Check the root README
- Review API documentation
- Test with Postman collection
- Check MongoDB data directly

---

**Backend Status:** 90% Complete ✅
**Last Updated:** January 2026
**Next Phase:** Frontend Development 🚀

# E-Bike Point - Website Rebuild Project

## 🎯 Project Overview

This is a complete rebuild of the E-Bike Point website (https://ebikepoint.co.in/) - an electric bike/scooter dealership platform in India. The original site is built with PHP, and this project recreates it from scratch using modern technologies with significant improvements.

**Context**: This is a skill assessment and improvement project assigned by management. The goal is to recreate the company's existing website with better performance, UX, and functionality while demonstrating technical capabilities.

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

```

#### **Database:**

```

- MongoDB (primary database)
- Djongo (Django-MongoDB connector)
- PyMongo (MongoDB driver)

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

## ✨ Required Features (Parity with Original)

### **User Features:**

- [ ] User registration and authentication
- [ ] Login/Logout functionality
- [ ] User dashboard
- [ ] Shopping cart
- [ ] Product browsing and viewing
- [ ] Service booking (for customers with/without previous purchases)
- [ ] Dealer application form

### **Product Features:**

- [ ] Product catalog with 6 bike models
- [ ] Product detail pages
- [ ] Product images and specifications
- [ ] "Buy Now" functionality
- [ ] Product categories/filtering

### **General Features:**

- [ ] Responsive navigation menu
- [ ] Contact information display
- [ ] FAQ section with expandable questions
- [ ] Social media links (Facebook, Instagram, YouTube, LinkedIn, WhatsApp)
- [ ] Footer with product links
- [ ] About Us page
- [ ] Contact Us page

---

## 🚀 Improvements to Implement

### **1. Design & UX Enhancements**

- [ ] Modern, clean UI with professional color scheme
- [ ] High-quality product images (WebP format, optimized)
- [ ] Smooth animations and transitions (Framer Motion)
- [ ] Better typography and spacing
- [ ] Improved mobile responsiveness (mobile-first approach)
- [ ] Product card hover effects
- [ ] Loading states and skeletons
- [ ] Toast notifications for user actions
- [ ] Breadcrumb navigation
- [ ] Sticky header on scroll

### **2. Performance Improvements**

- [ ] Image lazy loading
- [ ] Code splitting and lazy loading of components
- [ ] Optimized bundle size (< 200KB initial load)
- [ ] Server-side rendering or Static Site Generation (if using Next.js)
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] CDN integration for static assets
- [ ] Caching strategies (Redis)

### **3. New Functionality**

- [ ] **Product Comparison** - Compare up to 3 bikes side-by-side
- [ ] **Advanced Filtering** - Filter by range, price, battery type, color
- [ ] **Search functionality** - Search products with autocomplete
- [ ] **EMI Calculator** - Calculate monthly payment options
- [ ] **Test Ride Booking** - Book test rides at dealerships
- [ ] **Dealer Locator** - Interactive map to find nearest dealers
- [ ] **Live Chat** - WhatsApp integration or chatbot
- [ ] **Product Reviews** - Customer ratings and reviews
- [ ] **Wishlist/Favorites** - Save favorite products
- [ ] **Blog Section** - EV news, tips, and articles
- [ ] **Newsletter Subscription**
- [ ] **Dealer Dashboard** - Track applications, inventory, sales
- [ ] **Admin Panel** - Manage products, users, orders, dealers
- [ ] **Order Tracking** - Track order status
- [ ] **Email Notifications** - Order confirmations, booking updates
- [ ] **Video Gallery** - Bike demo videos

### **4. SEO & Marketing**

- [ ] SEO-friendly URLs
- [ ] Meta tags for all pages
- [ ] Open Graph tags for social sharing
- [ ] Schema markup (Product, Organization)
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Google Analytics integration
- [ ] Alt texts for all images
- [ ] Testimonials section
- [ ] Trust badges and certifications

### **5. Security Enhancements**

- [ ] JWT-based authentication
- [ ] Password hashing (Django built-in)
- [ ] CSRF protection
- [ ] XSS protection
- [ ] SQL injection prevention (MongoDB)
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization
- [ ] HTTPS enforcement
- [ ] Secure headers (CORS, CSP)
- [ ] File upload validation

### **6. Content Improvements**

- [ ] Detailed product specifications table
- [ ] Battery life calculator
- [ ] Comparison charts (petrol vs electric)
- [ ] Customer success stories
- [ ] Dealer testimonials
- [ ] Warranty information
- [ ] Maintenance guides
- [ ] Company statistics (dealers count, bikes sold)

---

## 📁 Project Structure

```

ebikepoint-rebuild/
├── frontend/ # React application
│ ├── public/
│ │ ├── index.html
│ │ └── assets/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ │ ├── common/ # Button, Input, Card, etc.
│ │ │ ├── layout/ # Header, Footer, Sidebar
│ │ │ └── features/ # ProductCard, FAQ, etc.
│ │ ├── pages/ # Page components
│ │ │ ├── Home.jsx
│ │ │ ├── Products.jsx
│ │ │ ├── ProductDetail.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Cart.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── ServiceBooking.jsx
│ │ │ ├── DealerApplication.jsx
│ │ │ ├── About.jsx
│ │ │ └── Contact.jsx
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API service functions
│ │ ├── utils/ # Helper functions
│ │ ├── context/ # React Context providers
│ │ ├── routes/ # Route configuration
│ │ ├── styles/ # Global styles
│ │ ├── assets/ # Images, icons
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ ├── vite.config.js # Vite configuration
│ ├── tailwind.config.js
│ └── .env
│
├── backend/ # Django application
│ ├── ebikepoint/ # Project directory
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── apps/
│ │ ├── users/ # User management
│ │ │ ├── models.py
│ │ │ ├── serializers.py
│ │ │ ├── views.py
│ │ │ └── urls.py
│ │ ├── products/ # Product management
│ │ ├── orders/ # Order management
│ │ ├── dealers/ # Dealer management
│ │ ├── bookings/ # Service bookings
│ │ └── cart/ # Shopping cart
│ ├── media/ # Uploaded files
│ ├── static/ # Static files
│ ├── requirements.txt
│ ├── manage.py
│ └── .env
│
├── docker/ # Docker configuration
│ ├── frontend.Dockerfile
│ ├── backend.Dockerfile
│ └── docker-compose.yml
│
├── docs/ # Documentation
│ ├── api-documentation.md
│ ├── setup-guide.md
│ └── deployment.md
│
├── .gitignore
├── README.md
└── LICENSE

```

---

## 🗄️ Database Schema (MongoDB Collections)

### **Users Collection:**

```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  first_name: String,
  last_name: String,
  phone: String,
  role: String, // "customer", "dealer", "admin"
  created_at: Date,
  updated_at: Date
}
```

### **Products Collection:**

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  model: String, // "LIGHTNING", "MARIUM", etc.
  description: String,
  specifications: {
    range: String, // "50-60 KM"
    battery_type: String,
    top_speed: String,
    charging_time: String,
    motor_power: String,
    weight: String,
    colors: [String]
  },
  price: Number,
  images: [String], // URLs
  is_available: Boolean,
  featured: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### **Orders Collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  products: [{
    product_id: ObjectId,
    quantity: Number,
    price: Number
  }],
  total_amount: Number,
  status: String, // "pending", "confirmed", "shipped", "delivered"
  shipping_address: Object,
  created_at: Date,
  updated_at: Date
}
```

### **Service Bookings Collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  booking_type: String, // "purchase_customer" or "non_purchase"
  product_id: ObjectId (if applicable),
  service_type: String,
  scheduled_date: Date,
  status: String,
  notes: String,
  created_at: Date
}
```

### **Dealer Applications Collection:**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  business_name: String,
  location: {
    city: String,
    state: String,
    pincode: String
  },
  status: String, // "pending", "approved", "rejected"
  created_at: Date
}
```

### **Cart Collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  items: [{
    product_id: ObjectId,
    quantity: Number
  }],
  updated_at: Date
}
```

---

## 🔌 API Endpoints (Django REST Framework)

### **Authentication:**

```
POST   /api/auth/register/          # User registration
POST   /api/auth/login/             # Login (returns JWT)
POST   /api/auth/logout/            # Logout
POST   /api/auth/refresh/           # Refresh JWT token
GET    /api/auth/user/              # Get current user
PUT    /api/auth/user/update/       # Update user profile
```

### **Products:**

```
GET    /api/products/               # List all products
GET    /api/products/:id/           # Get product details
GET    /api/products/search/        # Search products
GET    /api/products/featured/      # Get featured products
POST   /api/products/compare/       # Compare products
```

### **Cart:**

```
GET    /api/cart/                   # Get user's cart
POST   /api/cart/add/               # Add item to cart
PUT    /api/cart/update/:id/        # Update cart item
DELETE /api/cart/remove/:id/        # Remove from cart
DELETE /api/cart/clear/             # Clear cart
```

### **Orders:**

```
GET    /api/orders/                 # Get user's orders
POST   /api/orders/create/          # Create new order
GET    /api/orders/:id/             # Get order details
PUT    /api/orders/:id/cancel/      # Cancel order
```

### **Service Bookings:**

```
GET    /api/bookings/               # Get user's bookings
POST   /api/bookings/create/        # Create booking
GET    /api/bookings/:id/           # Get booking details
PUT    /api/bookings/:id/cancel/    # Cancel booking
```

### **Dealers:**

```
POST   /api/dealers/apply/          # Submit dealer application
GET    /api/dealers/locations/      # Get dealer locations (map)
```

### **Contact & Forms:**

```
POST   /api/contact/                # Contact form submission
POST   /api/newsletter/subscribe/   # Newsletter subscription
```

---

## 🚦 Development Phases

### **Phase 1: Project Setup (Days 1-2)**

- [ ] Initialize React project with Vite
- [ ] Set up Django project structure
- [ ] Configure MongoDB connection with Djongo
- [ ] Set up Git repository
- [ ] Create project documentation
- [ ] Design database schema
- [ ] Set up Tailwind CSS
- [ ] Install all dependencies

### **Phase 2: Backend Development (Days 3-6)**

- [ ] Create Django apps (users, products, orders, etc.)
- [ ] Define MongoDB models
- [ ] Implement authentication (JWT)
- [ ] Create serializers for all models
- [ ] Build API endpoints
- [ ] Add validation and error handling
- [ ] Test APIs with Postman
- [ ] Set up admin panel

### **Phase 3: Frontend - Core Pages (Days 7-10)**

- [ ] Set up routing
- [ ] Create layout components (Header, Footer)
- [ ] Build Home page with hero section
- [ ] Create Products listing page
- [ ] Build Product detail page
- [ ] Implement Login/Register pages
- [ ] Create user dashboard
- [ ] Build cart page

### **Phase 4: Frontend - Additional Features (Days 11-13)**

- [ ] Service booking pages
- [ ] Dealer application form
- [ ] FAQ component with accordion
- [ ] Contact page
- [ ] About page
- [ ] Search and filtering
- [ ] Product comparison

### **Phase 5: Integration (Days 14-15)**

- [ ] Connect frontend to backend APIs
- [ ] Implement authentication flow
- [ ] Add cart functionality
- [ ] Order placement flow
- [ ] Service booking flow
- [ ] Form submissions
- [ ] Error handling and loading states

### **Phase 6: Enhancements (Days 16-18)**

- [ ] Add animations (Framer Motion)
- [ ] Implement EMI calculator
- [ ] Add dealer locator map
- [ ] Integrate WhatsApp
- [ ] Add testimonials section
- [ ] Create blog section
- [ ] Product reviews system
- [ ] Email notifications

### **Phase 7: Testing & Optimization (Days 19-21)**

- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] API testing
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Security audit
- [ ] Bug fixes
- [ ] Code cleanup

### **Phase 8: Deployment (Days 22-23)**

- [ ] Set up production environment
- [ ] Configure Nginx and Gunicorn
- [ ] Deploy backend to server
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Set up MongoDB Atlas (cloud)
- [ ] Configure SSL certificates
- [ ] Set up monitoring
- [ ] Final testing

---

## 💻 Setup Instructions

### **Prerequisites:**

```bash
- Node.js 18+ and npm
- Python 3.10+
- MongoDB 6.0+
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

### **Environment Variables:**

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:8000/api
VITE_WHATSAPP_NUMBER=917980598210
```

**Backend (.env):**

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MONGODB_NAME=ebikepoint
MONGODB_HOST=localhost
MONGODB_PORT=27017
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-password
```

---

## 📊 Success Metrics

### **Performance Targets:**

- Page load time: < 3 seconds
- Lighthouse Performance score: > 90
- Mobile responsiveness: 100%
- SEO score: > 90
- Accessibility score: > 90

### **Feature Completion:**

- All original features: 100%
- New improvements: At least 80%
- Code quality: Clean, documented, maintainable

### **Testing Coverage:**

- Unit tests: > 70%
- Integration tests: All critical flows
- E2E tests: Main user journeys

---

## 🎓 Learning Objectives (For Assessment)

This project demonstrates proficiency in:

1. **React.js** - Modern hooks, context, routing, state management
2. **Django** - REST APIs, authentication, ORM (with MongoDB)
3. **MongoDB** - NoSQL database design and queries
4. **Full-stack integration** - Frontend-backend communication
5. **UI/UX design** - Modern, responsive interfaces
6. **Performance optimization** - Fast, efficient applications
7. **Security** - Authentication, validation, protection
8. **DevOps basics** - Deployment, environment management

---

## 📞 Original Website Contact

- **Phone**: +91 7980598210
- **Email**: enicontrol@yahoo.com
- **Website**: https://ebikepoint.co.in/

---

## 📝 Notes for AI Assistants

If this README is shared in a new chat session, please:

1. Understand this is a legitimate company rebuild project
2. The developer has authorization from management
3. Tech stack is mandated: React + Django + MongoDB
4. Focus on implementing improvements listed above
5. Provide code examples, best practices, and guidance
6. Help with specific components, APIs, or features as needed
7. Consider this a skill assessment project - quality matters

---

## 📄 License

Proprietary - E-Bike Point Company Project

---

**Last Updated**: January 2026
**Project Status**: In Development
**Expected Completion**: 23 days from start

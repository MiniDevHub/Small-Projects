# ⚡ Quick Testing Checklist

## 🏃 Quick Start (5 minutes)

### 1. Start Backend

```bash
cd server
source .venv/bin/activate
python manage.py runserver
```

✅ Visit: http://localhost:8000/api/

### 2. Start Frontend

```bash
cd client
npm run dev
```

✅ Visit: http://localhost:5173/

### 3. Login as Admin

- Email: admin@ebike.com
- Password: Admin@1234
  ✅ Should see admin dashboard

---

## 🧪 30-Minute Full Test

### Phase 1: Admin (10 min)

- [ ] Login as admin
- [ ] Create 1 product
- [ ] Create 1 dealer
- [ ] View dashboard stats

### Phase 2: Dealer (10 min)

- [ ] Login as dealer
- [ ] Create order (5 items)
- [ ] Logout → Login as admin
- [ ] Approve order
- [ ] Login as dealer → Create sale

### Phase 3: Customer (10 min)

- [ ] Register new customer
- [ ] Browse products
- [ ] View profile
- [ ] Check "My Bikes" (if purchased)

---

## ✅ Pass Criteria

All checkboxes above should be ✅

If any fail → Check TESTING_GUIDE.md for solutions

---

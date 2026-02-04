# Commands for Deleting Users

## 🔍 View Statistics First

Before deleting, you can see all users categorized by role:

```bash
python manage.py delete_all_users
```

This will show:

- ⚡ Super Admins
- 👑 Admins
- 🏪 Dealers
- 💼 Employees
- 🔧 Servicemen
- 🛍️ Customers

---

## 🗑️ Delete All Users

### With Confirmation Prompt (Safer)

```bash
python manage.py delete_all_users
```

You'll be asked to type `DELETE` to confirm.

### Without Confirmation (Dangerous!)

```bash
python manage.py delete_all_users --confirm
```

---

## 🎯 Delete by Role

### Delete Only Super Admins

```bash
python manage.py delete_all_users --role super_admin
```

### Delete Only Admins

```bash
python manage.py delete_all_users --role admin
```

### Delete Only Dealers

```bash
python manage.py delete_all_users --role dealer
```

### Delete Only Employees

```bash
python manage.py delete_all_users --role employee
```

### Delete Only Servicemen

```bash
python manage.py delete_all_users --role serviceman
```

### Delete Only Customers

```bash
python manage.py delete_all_users --role customer
```

---

## 🎭 Fun Mode (Same as Delete All)

```bash
python manage.py delete_all_users --destroy-humanity
```

Shows a dramatic "Human Extinction Protocol" message 😄

---

## 📊 Example Output

```
============================================================
🗑️  DELETE USERS FROM DATABASE
============================================================

📊 CURRENT POPULATION STATISTICS:
────────────────────────────────────────
   ⚡ Super Admins   :   1 user(s)
   👑 Admins         :   2 user(s)
   🏪 Dealers        :   5 user(s)
   💼 Employees      :   8 user(s)
   🔧 Servicemen     :   3 user(s)
   🛍️ Customers      :  15 user(s)
────────────────────────────────────────
   🌍 Total Humans    :  34 user(s)

⚠️  🌍 DELETING ALL HUMANS

📋 Found 34 user(s) (ALL USERS):

   ⚡ Super Admins:
       1. super@admin.com - Super Admin

   👑 Admins:
       2. admin@test.com - Admin User
       3. admin2@test.com - Admin Two

   🏪 Dealers:
       4. dealer@test.com - Dealer One
       ...

────────────────────────────────────────
🚨 WARNING: This will PERMANENTLY DELETE 34 user(s)!
    There is no undo! Think twice! 🤔

👉 Type 'DELETE' to confirm (or anything else to cancel):
```

---

## ⚠️ Important Notes

1. **No Undo**: Once deleted, users cannot be recovered
2. **Use `--role`**: To delete specific user types only
3. **Test First**: Run without `--confirm` to see what will be deleted
4. **Backup**: Always backup your database before mass deletions

---

## 🚀 Quick Reference

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `delete_all_users`   | Show stats + prompt for deletion |
| `--confirm`          | Skip confirmation prompt         |
| `--role super_admin` | Delete only super admins         |
| `--role admin`       | Delete only admins               |
| `--role dealer`      | Delete only dealers              |
| `--role employee`    | Delete only employees            |
| `--role serviceman`  | Delete only servicemen           |
| `--role customer`    | Delete only customers            |
| `--destroy-humanity` | Fun dramatic message             |

---

## 🎯 Common Use Cases

### Clear Test Data

```bash
# Delete all test customers
python manage.py delete_all_users --role customer --confirm

# Delete all test employees
python manage.py delete_all_users --role employee --confirm
```

### Complete Database Reset

```bash
# Delete everyone (with confirmation)
python manage.py delete_all_users

# Then recreate super admin
python manage.py create_default_users
```

### Safe Testing

```bash
# See what would be deleted (no actual deletion)
python manage.py delete_all_users --role dealer
# Then cancel when prompted
```

---

**Remember**: With great power comes great responsibility! 🦸‍♂️

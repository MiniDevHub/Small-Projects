from django.core.management.base import BaseCommand
from apps.users.models import User


class Command(BaseCommand):
    help = "Create a Super Admin user (highest privilege level)"

    def add_arguments(self, parser):
        parser.add_argument("--email", type=str, help="Super Admin email")
        parser.add_argument("--password", type=str, help="Super Admin password")
        parser.add_argument("--first-name", type=str, help="First name")
        parser.add_argument("--last-name", type=str, help="Last name")
        parser.add_argument("--phone", type=str, help="Phone number")

    def handle(self, *args, **options):
        self.stdout.write("\n" + "=" * 60)
        self.stdout.write(self.style.SUCCESS("👑 CREATE SUPER ADMIN USER"))
        self.stdout.write("=" * 60 + "\n")

        self.stdout.write(
            self.style.WARNING(
                "⚠️  Super Admin has the highest privileges:\n"
                "   - Can manage Admins\n"
                "   - Full system access\n"
                "   - Cannot be created from the application\n"
            )
        )
        self.stdout.write("\n" + "-" * 60 + "\n")

        # Get data from options or prompt
        email = options.get("email") or input("📧 Email: ")
        password = options.get("password") or input("🔐 Password: ")
        first_name = options.get("first_name") or input("👤 First Name: ")
        last_name = options.get("last_name") or input("👤 Last Name: ")
        phone = options.get("phone") or input("📱 Phone: ")

        # Validate inputs
        if not all([email, password, first_name, last_name, phone]):
            self.stdout.write(self.style.ERROR("\n❌ All fields are required!\n"))
            return

        # Check if user already exists
        existing_user = User.objects(email=email.lower()).first()
        if existing_user:
            self.stdout.write(
                self.style.ERROR(
                    f"\n❌ User with email {email} already exists!\n"
                    f"   Role: {existing_user.role}\n"
                    f"   Name: {existing_user.get_full_name()}\n"
                )
            )
            return

        # Create Super Admin
        try:
            super_admin = User.create_superuser(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                phone=phone,
            )

            self.stdout.write("\n" + "=" * 60)
            self.stdout.write(
                self.style.SUCCESS("✅ Super Admin created successfully!\n")
            )
            self.stdout.write("-" * 60)
            self.stdout.write(f"   📧 Email:        {super_admin.email}")
            self.stdout.write(f"   👤 Name:         {super_admin.get_full_name()}")
            self.stdout.write(f"   📱 Phone:        {super_admin.phone}")
            self.stdout.write(f"   🎭 Role:         {super_admin.role}")
            self.stdout.write(f"   👑 Is Super Admin: {super_admin.is_super_admin}")
            self.stdout.write(f"   ⚡ Is Superuser:   {super_admin.is_superuser}")
            self.stdout.write(f"   🔧 Is Staff:       {super_admin.is_staff}")
            self.stdout.write(f"   ✅ Is Active:      {super_admin.is_active}")
            self.stdout.write(f"   ✓  Is Approved:    {super_admin.is_approved}")
            self.stdout.write("-" * 60)
            self.stdout.write(
                self.style.WARNING(
                    "\n⚠️  IMPORTANT: Store these credentials securely!\n"
                    "   This Super Admin can manage all Admins in the system.\n"
                )
            )
            self.stdout.write("=" * 60 + "\n")

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"\n❌ Failed to create Super Admin: {str(e)}\n")
            )

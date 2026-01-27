from django.core.management.base import BaseCommand
from apps.users.models import User


class Command(BaseCommand):
    help = "Create an admin user"

    def add_arguments(self, parser):
        parser.add_argument("--email", type=str, help="Admin email")
        parser.add_argument("--password", type=str, help="Admin password")
        parser.add_argument("--first-name", type=str, help="First name")
        parser.add_argument("--last-name", type=str, help="Last name")
        parser.add_argument("--phone", type=str, help="Phone number")

    def handle(self, *args, **options):
        self.stdout.write("\n" + "=" * 50)
        self.stdout.write(self.style.SUCCESS("🔐 CREATE ADMIN USER"))
        self.stdout.write("=" * 50 + "\n")

        # Get data from options or prompt
        email = options.get("email") or input("Email: ")
        password = options.get("password") or input("Password: ")
        first_name = options.get("first_name") or input("First Name: ")
        last_name = options.get("last_name") or input("Last Name: ")
        phone = options.get("phone") or input("Phone: ")

        # Check if user already exists
        if User.objects(email=email.lower()).first():
            self.stdout.write(
                self.style.ERROR(f"\n❌ User with email {email} already exists!\n")
            )
            return

        # Create admin
        try:
            admin = User.create_superuser(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                phone=phone,
            )

            self.stdout.write(
                self.style.SUCCESS(f"\n✅ Admin user created successfully!\n")
            )
            self.stdout.write(f"   📧 Email: {admin.email}")
            self.stdout.write(f"   👤 Name: {admin.get_full_name()}")
            self.stdout.write(f"   🎭 Role: {admin.role}")
            self.stdout.write(f"   ⚡ Is Admin: {admin.is_admin}")
            self.stdout.write(f"   🔧 Is Staff: {admin.is_staff}")
            self.stdout.write(f"   👑 Is Superuser: {admin.is_superuser}")
            self.stdout.write("\n" + "=" * 50 + "\n")

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"\n❌ Failed to create admin: {str(e)}\n")
            )

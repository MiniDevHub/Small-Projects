from django.core.management.base import BaseCommand
from apps.users.models import User
from collections import defaultdict


class Command(BaseCommand):
    help = (
        "Delete all users from MongoDB (and potentially all humans on this planet 🌍)"
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--confirm",
            action="store_true",
            help="Confirm deletion without prompting",
        )
        parser.add_argument(
            "--role",
            type=str,
            help="Delete only users with specific role (admin, dealer, employee, serviceman, customer)",
        )
        parser.add_argument(
            "--destroy-humanity",
            action="store_true",
            help="☠️ DANGER: Delete all humans on this planet (just kidding, same as no role filter)",
        )

    def handle(self, *args, **options):
        self.stdout.write("\n" + "=" * 60)

        if options.get("destroy_humanity"):
            self.stdout.write(
                self.style.ERROR("☠️  INITIATING HUMAN EXTINCTION PROTOCOL ☠️")
            )
            self.stdout.write(
                self.style.WARNING("Just kidding... deleting all users 😅")
            )
        else:
            self.stdout.write(self.style.WARNING("🗑️  DELETE USERS FROM DATABASE"))

        self.stdout.write("=" * 60 + "\n")

        # All possible roles
        all_roles = {
            User.ROLE_ADMIN: {"emoji": "👑", "name": "Admins"},
            User.ROLE_DEALER: {"emoji": "🏪", "name": "Dealers"},
            User.ROLE_EMPLOYEE: {"emoji": "💼", "name": "Employees"},
            User.ROLE_SERVICEMAN: {"emoji": "🔧", "name": "Servicemen"},
            User.ROLE_CUSTOMER: {"emoji": "🛍️", "name": "Customers"},
        }

        # Get all users and count by role
        all_users = User.objects.all()
        role_counts = defaultdict(int)

        for user in all_users:
            role_counts[user.role] += 1

        # Show current user statistics
        self.stdout.write(self.style.SUCCESS("\n📊 CURRENT POPULATION STATISTICS:"))
        self.stdout.write("─" * 40 + "\n")

        total_users = sum(role_counts.values())

        for role_key, role_info in all_roles.items():
            count = role_counts.get(role_key, 0)
            emoji = role_info["emoji"]
            name = role_info["name"]

            if count > 0:
                self.stdout.write(
                    self.style.SUCCESS(f"   {emoji} {name:15} : {count:3d} user(s)")
                )
            else:
                # Use plain text for zero counts (no MIGRATE style)
                self.stdout.write(f"   {emoji} {name:15} : {count:3d} (none found)")

        self.stdout.write("─" * 40)
        self.stdout.write(
            self.style.SUCCESS(f"   🌍 Total Humans    : {total_users:3d} user(s)\n")
        )

        # Get users to delete based on filter
        if options["role"]:
            users = User.objects(role=options["role"])
            user_type = f"with role '{options['role']}'"
            role_emoji = all_roles.get(options["role"], {}).get("emoji", "👤")
            delete_message = f"{role_emoji} DELETING ONLY {options['role'].upper()}S"
        else:
            users = User.objects.all()
            user_type = "(ALL USERS)"
            delete_message = "🌍 DELETING ALL HUMANS"

        user_count = users.count()

        if user_count == 0:
            self.stdout.write("\n" + "=" * 60)
            self.stdout.write(self.style.SUCCESS("\n✨ No users found to delete!"))
            self.stdout.write("\n🎉 The database is already clean!\n")
            self.stdout.write("=" * 60 + "\n")
            return

        # Show users to be deleted
        self.stdout.write(self.style.ERROR(f"\n⚠️  {delete_message}"))
        self.stdout.write(f"\n📋 Found {user_count} user(s) {user_type}:\n")

        # Group users by role for display
        users_by_role = defaultdict(list)
        for user in users:
            users_by_role[user.role].append(user)

        user_number = 1
        for role_key in [
            User.ROLE_ADMIN,
            User.ROLE_DEALER,
            User.ROLE_EMPLOYEE,
            User.ROLE_SERVICEMAN,
            User.ROLE_CUSTOMER,
        ]:
            if role_key in users_by_role:
                role_info = all_roles[role_key]
                self.stdout.write(f"\n   {role_info['emoji']} {role_info['name']}:")
                for user in users_by_role[role_key]:
                    self.stdout.write(
                        f"      {user_number:2d}. {user.email} - {user.get_full_name()}"
                    )
                    user_number += 1

        # Confirm deletion
        if not options["confirm"]:
            self.stdout.write("\n" + "─" * 60)
            self.stdout.write(
                self.style.ERROR(
                    f"\n🚨 WARNING: This will PERMANENTLY DELETE {user_count} user(s)!"
                )
            )
            self.stdout.write(
                self.style.WARNING("    There is no undo! Think twice! 🤔\n")
            )

            confirm = input(
                "👉 Type 'DELETE' to confirm (or anything else to cancel): "
            )

            if confirm != "DELETE":
                self.stdout.write(self.style.SUCCESS("\n😅 Phew! Deletion cancelled!"))
                self.stdout.write("\n💚 All users are safe!\n")
                self.stdout.write("=" * 60 + "\n")
                return

        # Delete users with dramatic effect
        self.stdout.write("\n" + "=" * 60)
        self.stdout.write(self.style.ERROR("\n💀 INITIATING DELETION SEQUENCE...\n"))

        deleted_by_role = defaultdict(int)
        deleted_count = 0

        for user in users:
            email = user.email
            role = user.role
            role_info = all_roles.get(role, {"emoji": "👤", "name": role})

            user.delete()
            deleted_count += 1
            deleted_by_role[role] += 1

            self.stdout.write(
                f"   {role_info['emoji']} Deleted: {email} ({role_info['name'][:-1]})"
            )

        # Show deletion summary
        self.stdout.write("\n" + "─" * 60)
        self.stdout.write(self.style.SUCCESS("\n🎯 DELETION SUMMARY:"))
        self.stdout.write("─" * 40 + "\n")

        for role_key, role_info in all_roles.items():
            count = deleted_by_role.get(role_key, 0)
            emoji = role_info["emoji"]
            name = role_info["name"]

            if count > 0:
                self.stdout.write(
                    self.style.SUCCESS(f"   {emoji} {name:15} : {count:3d} deleted")
                )
            else:
                # Plain text for zero counts
                self.stdout.write(f"   {emoji} {name:15} :   0 deleted")

        self.stdout.write("─" * 40)
        self.stdout.write(
            self.style.SUCCESS(f"\n✅ TOTAL ELIMINATED: {deleted_count} user(s)!")
        )

        if deleted_count == total_users and not options["role"]:
            self.stdout.write(self.style.ERROR("\n🌍 ALL HUMANS HAVE BEEN DELETED!"))
            self.stdout.write(
                self.style.WARNING("    The database is now a lonely place... 😢")
            )

        self.stdout.write("\n" + "=" * 60 + "\n")

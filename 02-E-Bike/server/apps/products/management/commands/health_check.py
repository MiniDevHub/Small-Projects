from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = "Check database health"

    def handle(self, *args, **options):
        # Ensure Django is set up
        import django

        if not settings.configured:
            django.setup()

        try:
            # Import and use Product model
            from apps.products.models import Product

            # This will use Django's existing connection
            count = Product.objects.count()

            # Success
            print("  MongoDB:       ✓ Connected")
            print(f"  Products:      {count} in database")

        except Exception as e:
            # Error
            print("  MongoDB:       ✗ Connection failed")
            print(f"                 {str(e)[:60]}")

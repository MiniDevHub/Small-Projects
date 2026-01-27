from django.core.management.base import BaseCommand
from apps.products.models import (
    Product,
    ProductSpecifications,
    ServiceCharges,
    Warranty,
    ProductImage,
)


class Command(BaseCommand):
    help = "Seed database with sample e-bike products"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear existing products before seeding",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            self.stdout.write(self.style.WARNING("🗑️  Clearing existing products..."))
            Product.objects.delete()
            self.stdout.write(self.style.SUCCESS("✓ Existing products cleared"))
            self.stdout.write("")

        self.stdout.write(self.style.HTTP_INFO("🌱 Seeding sample products..."))
        self.stdout.write("")

        # Sample products data
        products_data = [
            {
                "name": "Super Bike LIGHTNING",
                "slug": "super-bike-lightning",
                "model": "LIGHTNING",
                "description": "High-speed electric bike with advanced features and long range. Perfect for daily commuting with powerful motor and extended battery life.",
                "base_price": 45000,
                "dealer_price": 40000,
                "mrp": 50000,
                "category": "electric-scooter",
                "is_featured": True,
                "total_stock": 50,
                "specs": {
                    "range": "50-60 KM",
                    "battery": "Lithium-ion 48V 30Ah",
                    "top_speed": "55 km/h",
                    "charging_time": "4-5 hours",
                    "motor": "1200W BLDC",
                    "weight": "85 kg",
                    "colors": ["Black", "Red", "Silver"],
                },
            },
            {
                "name": "MARIUM Electric Scooter",
                "slug": "marium-electric-scooter",
                "model": "MARIUM",
                "description": "Stylish and efficient electric scooter designed for urban commuting. Compact design with excellent maneuverability.",
                "base_price": 42000,
                "dealer_price": 38000,
                "mrp": 47000,
                "category": "electric-scooter",
                "is_featured": True,
                "total_stock": 40,
                "specs": {
                    "range": "45-55 KM",
                    "battery": "Lithium-ion 48V 26Ah",
                    "top_speed": "50 km/h",
                    "charging_time": "4-6 hours",
                    "motor": "1000W BLDC",
                    "weight": "78 kg",
                    "colors": ["White", "Blue", "Grey"],
                },
            },
            {
                "name": "Rabbitor Blue",
                "slug": "rabbitor-blue",
                "model": "RABBITOR",
                "description": "Entry-level electric scooter with robust build quality and reliable performance. Great for beginners.",
                "base_price": 38000,
                "dealer_price": 35000,
                "mrp": 43000,
                "category": "electric-scooter",
                "is_featured": False,
                "total_stock": 60,
                "specs": {
                    "range": "40-50 KM",
                    "battery": "Lithium-ion 48V 24Ah",
                    "top_speed": "45 km/h",
                    "charging_time": "5-6 hours",
                    "motor": "800W BLDC",
                    "weight": "75 kg",
                    "colors": ["Blue", "Black"],
                },
            },
            {
                "name": "E-Went SSUP",
                "slug": "e-went-ssup",
                "model": "SSUP",
                "description": "Premium electric scooter with advanced features and superior comfort. Dual color options available.",
                "base_price": 48000,
                "dealer_price": 43000,
                "mrp": 53000,
                "category": "electric-scooter",
                "is_featured": True,
                "total_stock": 35,
                "specs": {
                    "range": "50-70 KM",
                    "battery": "Lithium-ion 60V 28Ah",
                    "top_speed": "60 km/h",
                    "charging_time": "4-5 hours",
                    "motor": "1500W BLDC",
                    "weight": "90 kg",
                    "colors": ["Red", "White"],
                },
            },
            {
                "name": "E-Went JV Sea Green",
                "slug": "e-went-jv-sea-green",
                "model": "JV",
                "description": "Eco-friendly electric scooter with lead acid battery option. Affordable and reliable for daily use.",
                "base_price": 35000,
                "dealer_price": 32000,
                "mrp": 40000,
                "category": "electric-scooter",
                "is_featured": False,
                "total_stock": 70,
                "specs": {
                    "range": "50-80 KM",
                    "battery": "Lead Acid 6032",
                    "top_speed": "45 km/h",
                    "charging_time": "6-8 hours",
                    "motor": "1000W BLDC",
                    "weight": "95 kg",
                    "colors": ["Sea Green", "Black"],
                },
            },
            {
                "name": "MAKI Electric Bike",
                "slug": "maki-electric-bike",
                "model": "MAKI",
                "description": "Compact electric bike perfect for city riding. Lightweight and easy to handle with efficient performance.",
                "base_price": 40000,
                "dealer_price": 36000,
                "mrp": 45000,
                "category": "electric-bike",
                "is_featured": False,
                "total_stock": 45,
                "specs": {
                    "range": "45-60 KM",
                    "battery": "Lithium-ion 48V 25Ah",
                    "top_speed": "50 km/h",
                    "charging_time": "4-6 hours",
                    "motor": "1000W BLDC",
                    "weight": "80 kg",
                    "colors": ["Black", "Red", "Blue"],
                },
            },
        ]

        created_count = 0
        updated_count = 0

        for data in products_data:
            # Check if product already exists
            existing_product = Product.objects(slug=data["slug"]).first()

            # Create specifications
            specs = ProductSpecifications(
                range_km=data["specs"]["range"],
                battery_type=data["specs"]["battery"],
                battery_capacity=data["specs"]["battery"],
                top_speed=data["specs"]["top_speed"],
                charging_time=data["specs"]["charging_time"],
                motor_power=data["specs"]["motor"],
                weight=data["specs"]["weight"],
                load_capacity="150 kg",
                colors=data["specs"]["colors"],
                length="180 cm",
                width="70 cm",
                height="110 cm",
            )

            # Create service charges
            service_charges = ServiceCharges(
                standard_service=500.0,
                major_service=1000.0,
                repair=500.0,
                inspection=300.0,
            )

            # Create warranty
            warranty = Warranty(
                free_services=4,
                warranty_period_months=24,
                terms="2 years comprehensive warranty with 4 free service sessions",
            )

            # Create sample images
            images = [
                ProductImage(
                    url=f'https://example.com/images/{data["slug"]}-1.jpg',
                    alt=f'{data["name"]} - Front View',
                    is_primary=True,
                ),
                ProductImage(
                    url=f'https://example.com/images/{data["slug"]}-2.jpg',
                    alt=f'{data["name"]} - Side View',
                    is_primary=False,
                ),
            ]

            if existing_product:
                # Update existing product
                existing_product.name = data["name"]
                existing_product.description = data["description"]
                existing_product.specifications = specs
                existing_product.base_price = data["base_price"]
                existing_product.dealer_price = data["dealer_price"]
                existing_product.mrp = data["mrp"]
                existing_product.service_charges = service_charges
                existing_product.warranty = warranty
                existing_product.images = images
                existing_product.total_stock = data["total_stock"]
                existing_product.is_featured = data["is_featured"]
                existing_product.category = data["category"]
                existing_product.save()

                self.stdout.write(self.style.WARNING(f'  ↻ Updated: {data["name"]}'))
                updated_count += 1
            else:
                # Create new product
                product = Product(
                    name=data["name"],
                    slug=data["slug"],
                    model=data["model"],
                    description=data["description"],
                    specifications=specs,
                    base_price=data["base_price"],
                    dealer_price=data["dealer_price"],
                    mrp=data["mrp"],
                    tax_rate=18.0,
                    service_charges=service_charges,
                    warranty=warranty,
                    images=images,
                    total_stock=data["total_stock"],
                    low_stock_threshold=10,
                    is_available=True,
                    is_featured=data["is_featured"],
                    category=data["category"],
                    meta_title=f'{data["name"]} - Buy Online | E-Bike Point',
                    meta_description=f'Buy {data["name"]} with best price, {data["specs"]["range"]} range, and 2 years warranty with 4 free services',
                )
                product.save()

                self.stdout.write(self.style.SUCCESS(f'  ✓ Created: {data["name"]}'))
                created_count += 1

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS("═" * 50))
        self.stdout.write(self.style.SUCCESS("✅ Seeding completed successfully!"))
        self.stdout.write("")

        if created_count > 0:
            self.stdout.write(
                self.style.SUCCESS(f"  • Created: {created_count} products")
            )
        if updated_count > 0:
            self.stdout.write(
                self.style.WARNING(f"  • Updated: {updated_count} products")
            )

        total_products = Product.objects.count()
        self.stdout.write(
            self.style.HTTP_INFO(f"  • Total products in database: {total_products}")
        )
        self.stdout.write("")

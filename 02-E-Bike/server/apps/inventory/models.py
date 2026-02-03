from mongoengine import Document, StringField, IntField, DateTimeField, BooleanField
from datetime import datetime


class DealerInventory(Document):
    """
    Dealer inventory model.
    Tracks stock levels for each product at each dealer.
    """

    dealer_id = StringField(required=True, max_length=24)
    dealer_name = StringField()

    product_id = StringField(required=True, max_length=24)
    product_name = StringField()
    product_model = StringField()

    # Stock levels
    quantity = IntField(default=0)
    reserved_quantity = IntField(default=0)
    low_stock_threshold = IntField(default=5)

    # Tracking
    last_restocked = DateTimeField()
    last_sold = DateTimeField()
    low_stock_alert = BooleanField(default=False)

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "dealer_inventory",
        "indexes": [
            ("dealer_id", "product_id"),
            "dealer_id",
            "product_id",
            "low_stock_alert",
        ],
        "ordering": ["-updated_at"],
    }

    def __str__(self):
        return f"Inventory: {self.dealer_name} - {self.product_name} ({self.quantity})"

    def save(self, *args, **kwargs):
        """Override save to update timestamp and check low stock"""
        self.updated_at = datetime.utcnow()

        # Check low stock alert
        if self.available_quantity <= self.low_stock_threshold:
            self.low_stock_alert = True
        else:
            self.low_stock_alert = False

        return super(DealerInventory, self).save(*args, **kwargs)

    @property
    def available_quantity(self):
        """Get available quantity (total - reserved)"""
        return max(0, self.quantity - self.reserved_quantity)

    def reserve_stock(self, quantity):
        """Reserve stock for an order"""
        if self.available_quantity >= quantity:
            self.reserved_quantity += quantity
            self.save()
            return True
        return False

    def release_stock(self, quantity):
        """Release reserved stock"""
        self.reserved_quantity = max(0, self.reserved_quantity - quantity)
        self.save()

    def deduct_stock(self, quantity):
        """Deduct stock after sale"""
        if self.quantity >= quantity:
            self.quantity -= quantity
            self.reserved_quantity = max(0, self.reserved_quantity - quantity)
            self.last_sold = datetime.utcnow()
            self.save()
            return True
        return False

    def add_stock(self, quantity):
        """Add stock (restocking)"""
        self.quantity += quantity
        self.last_restocked = datetime.utcnow()
        self.save()


class InventoryTransaction(Document):
    """
    Track inventory changes for audit trail.
    """

    TRANSACTION_TYPES = (
        ("restock", "Restock"),
        ("sale", "Sale"),
        ("adjustment", "Manual Adjustment"),
        ("return", "Return"),
        ("damage", "Damage/Loss"),
    )

    dealer_id = StringField(required=True, max_length=24)
    product_id = StringField(required=True, max_length=24)
    product_name = StringField()

    transaction_type = StringField(choices=TRANSACTION_TYPES, required=True)
    quantity_change = IntField(required=True)
    quantity_before = IntField(required=True)
    quantity_after = IntField(required=True)

    # References
    order_id = StringField(max_length=24)
    performed_by = StringField(max_length=24)
    performed_by_name = StringField()

    notes = StringField()
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "inventory_transactions",
        "indexes": [
            "dealer_id",
            "product_id",
            "-timestamp",
        ],
        "ordering": ["-timestamp"],
    }

    def __str__(self):
        return f"{self.transaction_type}: {self.product_name} ({self.quantity_change})"

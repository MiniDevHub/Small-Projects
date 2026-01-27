from mongoengine import Document, StringField, IntField, DateTimeField, BooleanField
from datetime import datetime


class DealerInventory(Document):
    """Dealer inventory model"""

    dealer_id = StringField(required=True)
    product_id = StringField(required=True)
    quantity = IntField(default=0)
    reserved_quantity = IntField(default=0)
    last_restocked = DateTimeField()
    low_stock_alert = BooleanField(default=False)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "dealer_inventory",
        "indexes": [
            ("dealer_id", "product_id"),
            "dealer_id",
            "product_id",
        ],
    }

    def __str__(self):
        return f"Inventory: Dealer {self.dealer_id} - Product {self.product_id}"

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(DealerInventory, self).save(*args, **kwargs)

    @property
    def available_quantity(self):
        """Get available quantity (total - reserved)"""
        return self.quantity - self.reserved_quantity

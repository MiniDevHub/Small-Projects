from celery import shared_task
from .models import ServiceWarrantyTracker
from apps.billing.models import Sale
from datetime import datetime, timedelta


@shared_task
def send_warranty_reminders():
    """Send warranty expiry reminders"""
    # Get warranties expiring in 30 days
    thirty_days_from_now = datetime.utcnow() + timedelta(days=30)

    warranties = ServiceWarrantyTracker.objects(
        warranty_status=ServiceWarrantyTracker.WARRANTY_ACTIVE,
        warranty_expiry_date__lte=thirty_days_from_now,
    )

    for warranty in warranties:
        # TODO: Send email/notification to customer
        print(f"Reminder: Warranty for invoice {warranty.invoice_id} expiring soon")

    return f"Sent {warranties.count()} warranty reminders"


@shared_task
def send_service_reminders():
    """Send service reminders to customers"""
    # Get customers who haven't used all free services
    warranties = ServiceWarrantyTracker.objects(
        warranty_status=ServiceWarrantyTracker.WARRANTY_ACTIVE, services_remaining__gt=0
    )

    for warranty in warranties:
        # Check if last service was more than 90 days ago or no service yet
        if not warranty.last_service_date:
            # TODO: Send reminder
            print(
                f"Reminder: {warranty.services_remaining} free services remaining for {warranty.invoice_id}"
            )
        else:
            days_since_service = (datetime.utcnow() - warranty.last_service_date).days
            if days_since_service > 90:
                # TODO: Send reminder
                print(f"Reminder: Time for next service for {warranty.invoice_id}")

    return f"Sent {warranties.count()} service reminders"

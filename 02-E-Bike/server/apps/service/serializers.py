from rest_framework import serializers
from .models import (
    ServiceRequest,
    ServiceWarrantyTracker,
    PartUsed,
    StatusHistory,
    CustomerInfo,
)


class PartUsedSerializer(serializers.Serializer):
    part_name = serializers.CharField()
    quantity = serializers.IntegerField()
    cost = serializers.FloatField()


class StatusHistorySerializer(serializers.Serializer):
    status = serializers.CharField()
    timestamp = serializers.DateTimeField()
    updated_by = serializers.CharField(required=False)
    notes = serializers.CharField(required=False)


class CustomerInfoSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    address = serializers.CharField(required=False)


class ServiceRequestSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    request_number = serializers.CharField()
    customer_id = serializers.CharField()
    customer = CustomerInfoSerializer(required=False)
    product_id = serializers.CharField()
    invoice_id = serializers.CharField(required=False)
    service_number = serializers.IntegerField()
    is_free_service = serializers.BooleanField()
    service_charge = serializers.FloatField()
    display_label = serializers.CharField()
    issue_type = serializers.ChoiceField(choices=ServiceRequest.ISSUE_TYPE_CHOICES)
    issue_description = serializers.CharField(required=False)
    priority = serializers.ChoiceField(choices=ServiceRequest.PRIORITY_CHOICES)
    dealer_id = serializers.CharField()
    assigned_to = serializers.CharField(required=False, allow_null=True)
    assigned_date = serializers.DateTimeField(required=False, allow_null=True)
    status = serializers.ChoiceField(choices=ServiceRequest.STATUS_CHOICES)
    status_history = StatusHistorySerializer(many=True, required=False)
    parts_used = PartUsedSerializer(many=True, required=False)
    service_notes = serializers.CharField(required=False, allow_blank=True)
    service_photos = serializers.ListField(
        child=serializers.CharField(), required=False
    )
    service_time_minutes = serializers.IntegerField()
    parts_cost = serializers.FloatField()
    total_cost = serializers.FloatField()
    payment_status = serializers.ChoiceField(
        choices=ServiceRequest.PAYMENT_STATUS_CHOICES
    )
    scheduled_date = serializers.DateTimeField(required=False, allow_null=True)
    started_at = serializers.DateTimeField(required=False, allow_null=True)
    completed_at = serializers.DateTimeField(required=False, allow_null=True)
    customer_signature = serializers.CharField(required=False, allow_blank=True)
    rating = serializers.IntegerField(required=False, allow_null=True)
    feedback = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)


class CreateServiceRequestSerializer(serializers.Serializer):
    invoice_id = serializers.CharField()
    issue_type = serializers.ChoiceField(choices=ServiceRequest.ISSUE_TYPE_CHOICES)
    issue_description = serializers.CharField()
    scheduled_date = serializers.DateTimeField(required=False)


class ServiceWarrantyTrackerSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    invoice_id = serializers.CharField()
    customer_id = serializers.CharField()
    product_id = serializers.CharField()
    total_free_services = serializers.IntegerField()
    services_completed = serializers.IntegerField()
    services_remaining = serializers.IntegerField()
    service_request_ids = serializers.ListField(child=serializers.CharField())
    warranty_status = serializers.ChoiceField(
        choices=ServiceWarrantyTracker.WARRANTY_STATUS_CHOICES
    )
    warranty_expiry_date = serializers.DateTimeField()
    activated_at = serializers.DateTimeField()
    last_service_date = serializers.DateTimeField(required=False, allow_null=True)

    def get_id(self, obj):
        return str(obj.id)

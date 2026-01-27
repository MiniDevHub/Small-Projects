from rest_framework import serializers
from .models import Attendance


class AttendanceSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    user_id = serializers.CharField()
    dealer_id = serializers.CharField()
    date = serializers.DateField()
    login_time = serializers.DateTimeField(allow_null=True)
    logout_time = serializers.DateTimeField(allow_null=True)
    auto_logout = serializers.BooleanField()
    status = serializers.ChoiceField(choices=Attendance.STATUS_CHOICES)
    manually_edited = serializers.BooleanField()
    edited_by = serializers.CharField(required=False, allow_blank=True)
    edit_reason = serializers.CharField(required=False, allow_blank=True)
    total_hours = serializers.FloatField()
    overtime_hours = serializers.FloatField()
    notes = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)

from rest_framework import serializers


class NotificationSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    sent_by = serializers.CharField()
    sender_role = serializers.CharField(required=False)
    recipient_type = serializers.CharField()
    recipient_roles = serializers.ListField(
        child=serializers.CharField(), required=False
    )
    recipient_ids = serializers.ListField(child=serializers.CharField(), required=False)
    dealer_id = serializers.CharField(required=False)
    title = serializers.CharField()
    message = serializers.CharField()
    notification_type = serializers.CharField()
    priority = serializers.CharField()
    action_url = serializers.CharField(required=False)
    action_label = serializers.CharField(required=False)
    sent_at = serializers.DateTimeField()
    is_active = serializers.BooleanField()
    expires_at = serializers.DateTimeField(required=False, allow_null=True)

    def get_id(self, obj):
        return str(obj.id)

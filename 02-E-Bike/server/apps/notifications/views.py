"""
Notifications views - Real-time alerts and messaging.
Supports targeted notifications, read receipts, and auto-triggers.
"""

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from datetime import datetime, timedelta

from .models import Notification, ReadReceipt
from .serializers import NotificationSerializer
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication


class NotificationPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


# ============================================
# CREATE NOTIFICATIONS
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_notification(request):
    """
    Create notification (Admin/Dealer).
    Admin can send to all, Dealer can send to their staff.

    POST /api/notifications/create/
    """
    try:
        user = request.user

        if user.role not in [User.ROLE_ADMIN, User.ROLE_DEALER]:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        title = request.data.get("title")
        message = request.data.get("message")
        recipient_type = request.data.get("recipient_type")

        if not all([title, message, recipient_type]):
            return Response(
                {
                    "success": False,
                    "message": "title, message, and recipient_type are required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate recipient_type permissions
        if user.role == User.ROLE_DEALER:
            if recipient_type not in [
                Notification.RECIPIENT_DEALER_EMPLOYEES,
                Notification.RECIPIENT_SPECIFIC,
            ]:
                return Response(
                    {
                        "success": False,
                        "message": "Dealers can only send to their employees",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        notification = Notification(
            sent_by=str(user.id),
            sender_role=user.role,
            recipient_type=recipient_type,
            title=title,
            message=message,
            notification_type=request.data.get(
                "notification_type", Notification.TYPE_INFO
            ),
            priority=request.data.get("priority", Notification.PRIORITY_MEDIUM),
            action_url=request.data.get("action_url", ""),
            action_label=request.data.get("action_label", ""),
        )

        # Set recipients based on type
        if recipient_type == Notification.RECIPIENT_ALL:
            # Admin only
            pass
        elif recipient_type == Notification.RECIPIENT_ROLE:
            notification.recipient_roles = request.data.get("recipient_roles", [])
        elif recipient_type == Notification.RECIPIENT_SPECIFIC:
            notification.recipient_ids = request.data.get("recipient_ids", [])
        elif recipient_type == Notification.RECIPIENT_DEALER_EMPLOYEES:
            notification.dealer_id = str(user.id)

        # Set expiry
        expires_in_days = request.data.get("expires_in_days", 30)
        notification.expires_at = datetime.utcnow() + timedelta(days=expires_in_days)

        notification.save()

        serializer = NotificationSerializer(notification)
        return Response(
            {
                "success": True,
                "message": "Notification created successfully",
                "notification": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Notification creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# VIEW NOTIFICATIONS
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_my_notifications(request):
    """
    Get user's notifications.

    GET /api/notifications/my/
    Query params: unread_only (true/false)
    """
    try:
        user = request.user
        user_id = str(user.id)
        unread_only = request.GET.get("unread_only", "false").lower() == "true"

        # Get active notifications
        current_time = datetime.utcnow()

        # Build query for notifications targeted to this user
        notifications = Notification.objects(
            is_active=True, expires_at__gte=current_time
        )

        # Filter by recipient
        user_notifications = []
        for notif in notifications:
            is_recipient = False

            if notif.recipient_type == Notification.RECIPIENT_ALL:
                is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_ROLE:
                if user.role in notif.recipient_roles:
                    is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_SPECIFIC:
                if user_id in notif.recipient_ids:
                    is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_DEALER_EMPLOYEES:
                if user.dealer_id == notif.dealer_id:
                    is_recipient = True

            if is_recipient:
                # Check if unread
                read_by_ids = [r.user_id for r in notif.read_by]
                is_read = user_id in read_by_ids

                if unread_only and is_read:
                    continue

                user_notifications.append(
                    {
                        "notification": notif,
                        "is_read": is_read,
                    }
                )

        # Sort by sent_at (newest first)
        user_notifications.sort(key=lambda x: x["notification"].sent_at, reverse=True)

        # Pagination
        paginator = NotificationPagination()

        # Prepare response data
        notifications_data = []
        for item in user_notifications:
            notif_dict = NotificationSerializer(item["notification"]).data
            notif_dict["is_read"] = item["is_read"]
            notifications_data.append(notif_dict)

        # Manual pagination
        page = paginator.paginate_queryset(notifications_data, request)
        return paginator.get_paginated_response(page)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve notifications",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def mark_as_read(request, notification_id):
    """
    Mark notification as read.

    POST /api/notifications/<notification_id>/read/
    """
    try:
        user = request.user
        notification = Notification.objects.get(id=notification_id)

        # Check if already read
        read_by_ids = [r.user_id for r in notification.read_by]
        if str(user.id) not in read_by_ids:
            notification.read_by.append(
                ReadReceipt(user_id=str(user.id), read_at=datetime.utcnow())
            )
            notification.save()

        return Response(
            {"success": True, "message": "Notification marked as read"},
            status=status.HTTP_200_OK,
        )

    except Notification.DoesNotExist:
        return Response(
            {"success": False, "message": "Notification not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to mark notification as read",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def mark_all_as_read(request):
    """
    Mark all notifications as read.

    POST /api/notifications/read-all/
    """
    try:
        user = request.user
        user_id = str(user.id)

        # Get all active notifications
        notifications = Notification.objects(is_active=True)

        marked_count = 0
        for notif in notifications:
            # Check if user is recipient
            is_recipient = False

            if notif.recipient_type == Notification.RECIPIENT_ALL:
                is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_ROLE:
                if user.role in notif.recipient_roles:
                    is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_SPECIFIC:
                if user_id in notif.recipient_ids:
                    is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_DEALER_EMPLOYEES:
                if user.dealer_id == notif.dealer_id:
                    is_recipient = True

            if is_recipient:
                # Check if already read
                read_by_ids = [r.user_id for r in notif.read_by]
                if user_id not in read_by_ids:
                    notif.read_by.append(
                        ReadReceipt(user_id=user_id, read_at=datetime.utcnow())
                    )
                    notif.save()
                    marked_count += 1

        return Response(
            {
                "success": True,
                "message": f"Marked {marked_count} notifications as read",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to mark all as read",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_unread_count(request):
    """
    Get unread notifications count.

    GET /api/notifications/unread-count/
    """
    try:
        user = request.user
        user_id = str(user.id)

        notifications = Notification.objects(
            is_active=True, expires_at__gte=datetime.utcnow()
        )

        unread_count = 0
        for notif in notifications:
            is_recipient = False

            if notif.recipient_type == Notification.RECIPIENT_ALL:
                is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_ROLE:
                if user.role in notif.recipient_roles:
                    is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_SPECIFIC:
                if user_id in notif.recipient_ids:
                    is_recipient = True
            elif notif.recipient_type == Notification.RECIPIENT_DEALER_EMPLOYEES:
                if user.dealer_id == notif.dealer_id:
                    is_recipient = True

            if is_recipient:
                read_by_ids = [r.user_id for r in notif.read_by]
                if user_id not in read_by_ids:
                    unread_count += 1

        return Response(
            {"success": True, "unread_count": unread_count},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to get unread count",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

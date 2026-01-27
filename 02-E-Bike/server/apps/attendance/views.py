from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Attendance
from .serializers import AttendanceSerializer
from apps.users.models import User
from datetime import datetime, date, timedelta
from django.conf import settings


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def clock_in(request):
    """Clock in (auto-login)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not (user.is_employee or user.is_serviceman):
            return Response(
                {"error": "Only employees and servicemen can clock in"},
                status=status.HTTP_403_FORBIDDEN,
            )

        today = date.today()

        # Check if already clocked in today
        existing = Attendance.objects(user_id=user_id, date=today).first()
        if existing and existing.login_time:
            return Response(
                {
                    "error": "Already clocked in today",
                    "attendance": AttendanceSerializer(existing).data,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create or update attendance
        if existing:
            existing.login_time = datetime.utcnow()
            existing.status = Attendance.STATUS_PRESENT
            existing.save()
            attendance = existing
        else:
            attendance = Attendance(
                user_id=user_id,
                dealer_id=user.dealer_id,
                date=today,
                login_time=datetime.utcnow(),
                status=Attendance.STATUS_PRESENT,
            )
            attendance.save()

        # Update user last login
        user.last_login = datetime.utcnow()
        user.save()

        serializer = AttendanceSerializer(attendance)
        return Response(
            {"message": "Clocked in successfully", "attendance": serializer.data},
            status=status.HTTP_200_OK,
        )

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def clock_out(request):
    """Clock out (manual logout)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not (user.is_employee or user.is_serviceman):
            return Response(
                {"error": "Only employees and servicemen can clock out"},
                status=status.HTTP_403_FORBIDDEN,
            )

        today = date.today()
        attendance = Attendance.objects(user_id=user_id, date=today).first()

        if not attendance or not attendance.login_time:
            return Response(
                {"error": "Not clocked in today"}, status=status.HTTP_400_BAD_REQUEST
            )

        if attendance.logout_time:
            return Response(
                {"error": "Already clocked out today"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        attendance.logout_time = datetime.utcnow()
        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(
            {"message": "Clocked out successfully", "attendance": serializer.data},
            status=status.HTTP_200_OK,
        )

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_attendance(request):
    """Get own attendance records"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        # Get month parameter
        month = request.GET.get("month", datetime.now().strftime("%Y-%m"))
        year, month_num = month.split("-")

        # Get attendance for the month
        start_date = date(int(year), int(month_num), 1)
        if int(month_num) == 12:
            end_date = date(int(year) + 1, 1, 1)
        else:
            end_date = date(int(year), int(month_num) + 1, 1)

        attendance = Attendance.objects(
            user_id=user_id, date__gte=start_date, date__lt=end_date
        ).order_by("-date")

        serializer = AttendanceSerializer(attendance, many=True)

        # Calculate summary
        total_days = attendance.count()
        present_days = len(
            [a for a in attendance if a.status == Attendance.STATUS_PRESENT]
        )
        half_days = len(
            [a for a in attendance if a.status == Attendance.STATUS_HALF_DAY]
        )
        leaves = len([a for a in attendance if a.status == Attendance.STATUS_LEAVE])

        return Response(
            {
                "attendance": serializer.data,
                "summary": {
                    "total_days": total_days,
                    "present_days": present_days,
                    "half_days": half_days,
                    "leaves": leaves,
                },
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_attendance(request, attendance_id):
    """Edit attendance (Dealer only)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_dealer:
            return Response(
                {"error": "Only dealers can edit attendance"},
                status=status.HTTP_403_FORBIDDEN,
            )

        attendance = Attendance.objects.get(id=attendance_id)

        # Check if dealer owns this employee
        if attendance.dealer_id != str(user.id):
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        # Update attendance
        new_status = request.data.get("status")
        if new_status in dict(Attendance.STATUS_CHOICES):
            attendance.status = new_status
            attendance.manually_edited = True
            attendance.edited_by = user_id
            attendance.edit_reason = request.data.get("edit_reason", "")
            attendance.save()

            serializer = AttendanceSerializer(attendance)
            return Response(
                {
                    "message": "Attendance updated successfully",
                    "attendance": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    except Attendance.DoesNotExist:
        return Response(
            {"error": "Attendance record not found"}, status=status.HTTP_404_NOT_FOUND
        )

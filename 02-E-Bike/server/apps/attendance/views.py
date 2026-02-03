"""
Attendance management views.
- Employee/Serviceman: Clock in/out, view own attendance
- Dealer: View all staff attendance, edit attendance
- Admin: View all attendance (oversight)
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
from datetime import datetime, date, timedelta

from .models import Attendance
from .serializers import AttendanceSerializer
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication


class AttendancePagination(PageNumberPagination):
    page_size = 31  # Default to one month
    page_size_query_param = "page_size"
    max_page_size = 365


# ============================================
# EMPLOYEE/SERVICEMAN ENDPOINTS (Clock In/Out ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def clock_in(request):
    """
    Clock in (Employee/Serviceman only).
    Auto-login when employee/serviceman starts work.

    POST /api/attendance/clock-in/
    """
    try:
        user = request.user

        # Check if user is Employee or Serviceman
        if user.role not in [User.ROLE_EMPLOYEE, User.ROLE_SERVICEMAN]:
            return Response(
                {
                    "success": False,
                    "message": "Only Employees and Servicemen can clock in",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Check if dealer_id exists
        if not user.dealer_id:
            return Response(
                {
                    "success": False,
                    "message": "No dealer associated with your account",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        today = date.today()

        # Check if already clocked in today
        existing = Attendance.objects(user_id=str(user.id), date=today).first()

        if existing and existing.login_time:
            return Response(
                {
                    "success": False,
                    "message": "Already clocked in today",
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
                user_id=str(user.id),
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
            {
                "success": True,
                "message": "Clocked in successfully",
                "attendance": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Clock in failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def clock_out(request):
    """
    Clock out (Employee/Serviceman only).
    Manual logout when employee/serviceman finishes work.

    POST /api/attendance/clock-out/
    """
    try:
        user = request.user

        # Check if user is Employee or Serviceman
        if user.role not in [User.ROLE_EMPLOYEE, User.ROLE_SERVICEMAN]:
            return Response(
                {
                    "success": False,
                    "message": "Only Employees and Servicemen can clock out",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        today = date.today()
        attendance = Attendance.objects(user_id=str(user.id), date=today).first()

        if not attendance or not attendance.login_time:
            return Response(
                {
                    "success": False,
                    "message": "Not clocked in today. Please clock in first.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if attendance.logout_time:
            return Response(
                {
                    "success": False,
                    "message": "Already clocked out today",
                    "attendance": AttendanceSerializer(attendance).data,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        attendance.logout_time = datetime.utcnow()
        attendance.notes = request.data.get("notes", attendance.notes or "")
        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(
            {
                "success": True,
                "message": "Clocked out successfully",
                "attendance": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Clock out failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_my_attendance(request):
    """
    Get own attendance records (Employee/Serviceman).

    GET /api/attendance/my/
    Query params: month (YYYY-MM)
    """
    try:
        user = request.user

        # Check if user is Employee or Serviceman
        if user.role not in [User.ROLE_EMPLOYEE, User.ROLE_SERVICEMAN]:
            return Response(
                {
                    "success": False,
                    "message": "Only Employees and Servicemen can view attendance",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get month parameter (default to current month)
        month_str = request.GET.get("month", datetime.now().strftime("%Y-%m"))

        try:
            year, month_num = map(int, month_str.split("-"))
            start_date = date(year, month_num, 1)

            # Calculate end date
            if month_num == 12:
                end_date = date(year + 1, 1, 1)
            else:
                end_date = date(year, month_num + 1, 1)

        except ValueError:
            return Response(
                {
                    "success": False,
                    "message": "Invalid month format. Use YYYY-MM",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get attendance for the month
        attendance_records = Attendance.objects(
            user_id=str(user.id), date__gte=start_date, date__lt=end_date
        ).order_by("-date")

        serializer = AttendanceSerializer(attendance_records, many=True)

        # Calculate summary
        total_days = attendance_records.count()
        present_days = attendance_records.filter(
            status=Attendance.STATUS_PRESENT
        ).count()
        half_days = attendance_records.filter(status=Attendance.STATUS_HALF_DAY).count()
        leaves = attendance_records.filter(status=Attendance.STATUS_LEAVE).count()
        absents = attendance_records.filter(status=Attendance.STATUS_ABSENT).count()

        total_hours = sum([a.total_hours for a in attendance_records])
        overtime_hours = sum([a.overtime_hours for a in attendance_records])

        return Response(
            {
                "success": True,
                "month": month_str,
                "attendance": serializer.data,
                "summary": {
                    "total_days": total_days,
                    "present_days": present_days,
                    "half_days": half_days,
                    "leaves": leaves,
                    "absents": absents,
                    "total_hours": round(total_hours, 2),
                    "overtime_hours": round(overtime_hours, 2),
                },
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve attendance",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_today_status(request):
    """
    Get today's attendance status (Employee/Serviceman).

    GET /api/attendance/today/
    """
    try:
        user = request.user

        # Check if user is Employee or Serviceman
        if user.role not in [User.ROLE_EMPLOYEE, User.ROLE_SERVICEMAN]:
            return Response(
                {
                    "success": False,
                    "message": "Access denied",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        today = date.today()
        attendance = Attendance.objects(user_id=str(user.id), date=today).first()

        if not attendance:
            return Response(
                {
                    "success": True,
                    "clocked_in": False,
                    "attendance": None,
                },
                status=status.HTTP_200_OK,
            )

        serializer = AttendanceSerializer(attendance)
        return Response(
            {
                "success": True,
                "clocked_in": attendance.login_time is not None,
                "clocked_out": attendance.logout_time is not None,
                "attendance": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve today's status",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# DEALER ENDPOINTS (Edit Attendance ✅)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_staff_attendance(request):
    """
    List staff attendance (Dealer only).
    View all employee/serviceman attendance at dealership.

    GET /api/attendance/
    Query params: user_id, month (YYYY-MM), status
    """
    try:
        user = request.user

        # Check if user is Dealer
        if user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can view staff attendance",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get filters
        user_id = request.GET.get("user_id", "")
        month_str = request.GET.get("month", datetime.now().strftime("%Y-%m"))
        attendance_status = request.GET.get("status", "")

        try:
            year, month_num = map(int, month_str.split("-"))
            start_date = date(year, month_num, 1)

            if month_num == 12:
                end_date = date(year + 1, 1, 1)
            else:
                end_date = date(year, month_num + 1, 1)

        except ValueError:
            return Response(
                {
                    "success": False,
                    "message": "Invalid month format. Use YYYY-MM",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Build query
        query = {
            "dealer_id": str(user.id),
            "date__gte": start_date,
            "date__lt": end_date,
        }

        if user_id:
            query["user_id"] = user_id

        if attendance_status:
            query["status"] = attendance_status

        attendance_records = Attendance.objects(**query).order_by("-date")

        # Pagination
        paginator = AttendancePagination()
        paginated_records = paginator.paginate_queryset(attendance_records, request)

        serializer = AttendanceSerializer(paginated_records, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve staff attendance",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def edit_attendance(request, attendance_id):
    """
    Edit attendance (Dealer only).

    PATCH /api/attendance/<attendance_id>/edit/
    """
    try:
        user = request.user

        # Check if user is Dealer
        if user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can edit attendance",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        attendance = Attendance.objects.get(id=attendance_id)

        # Check if dealer owns this employee
        if attendance.dealer_id != str(user.id):
            return Response(
                {
                    "success": False,
                    "message": "You can only edit attendance at your dealership",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Update attendance
        new_status = request.data.get("status")
        if not new_status:
            return Response(
                {"success": False, "message": "status is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate status
        valid_statuses = [choice[0] for choice in Attendance.STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {"success": False, "message": f"Invalid status: {new_status}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        attendance.status = new_status
        attendance.manually_edited = True
        attendance.edited_by = str(user.id)
        attendance.edit_reason = request.data.get("edit_reason", "")
        attendance.notes = request.data.get("notes", attendance.notes or "")
        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(
            {
                "success": True,
                "message": "Attendance updated successfully",
                "attendance": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Attendance.DoesNotExist:
        return Response(
            {"success": False, "message": "Attendance record not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Attendance update failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def mark_attendance(request):
    """
    Manually mark attendance (Dealer only).
    For marking past dates or bulk marking.

    POST /api/attendance/mark/
    """
    try:
        user = request.user

        # Check if user is Dealer
        if user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can mark attendance",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        user_id = request.data.get("user_id")
        attendance_date = request.data.get("date")  # YYYY-MM-DD
        attendance_status = request.data.get("status")

        if not all([user_id, attendance_date, attendance_status]):
            return Response(
                {
                    "success": False,
                    "message": "user_id, date, and status are required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verify user belongs to dealer
        try:
            staff_user = User.objects.get(id=user_id)
            if staff_user.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "User does not belong to your dealership",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Parse date
        try:
            attendance_date_obj = datetime.strptime(attendance_date, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {
                    "success": False,
                    "message": "Invalid date format. Use YYYY-MM-DD",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate status
        valid_statuses = [choice[0] for choice in Attendance.STATUS_CHOICES]
        if attendance_status not in valid_statuses:
            return Response(
                {"success": False, "message": f"Invalid status: {attendance_status}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if attendance already exists
        existing = Attendance.objects(user_id=user_id, date=attendance_date_obj).first()

        if existing:
            # Update existing
            existing.status = attendance_status
            existing.manually_edited = True
            existing.edited_by = str(user.id)
            existing.edit_reason = request.data.get("edit_reason", "Manually marked")
            existing.notes = request.data.get("notes", existing.notes or "")
            existing.save()
            attendance = existing
        else:
            # Create new
            attendance = Attendance(
                user_id=user_id,
                dealer_id=str(user.id),
                date=attendance_date_obj,
                status=attendance_status,
                manually_edited=True,
                edited_by=str(user.id),
                edit_reason=request.data.get("edit_reason", "Manually marked"),
                notes=request.data.get("notes", ""),
            )
            attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(
            {
                "success": True,
                "message": "Attendance marked successfully",
                "attendance": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Attendance marking failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_attendance_report(request):
    """
    Get attendance report (Dealer only).
    Summary of all staff attendance.

    GET /api/attendance/report/
    Query params: month (YYYY-MM)
    """
    try:
        user = request.user

        # Check if user is Dealer
        if user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can view attendance report",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get month parameter
        month_str = request.GET.get("month", datetime.now().strftime("%Y-%m"))

        try:
            year, month_num = map(int, month_str.split("-"))
            start_date = date(year, month_num, 1)

            if month_num == 12:
                end_date = date(year + 1, 1, 1)
            else:
                end_date = date(year, month_num + 1, 1)

        except ValueError:
            return Response(
                {
                    "success": False,
                    "message": "Invalid month format. Use YYYY-MM",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get all staff
        staff = User.objects(
            dealer_id=str(user.id),
            role__in=[User.ROLE_EMPLOYEE, User.ROLE_SERVICEMAN],
        )

        report = []
        for staff_member in staff:
            attendance_records = Attendance.objects(
                user_id=str(staff_member.id), date__gte=start_date, date__lt=end_date
            )

            total_days = attendance_records.count()
            present = attendance_records.filter(
                status=Attendance.STATUS_PRESENT
            ).count()
            half_days = attendance_records.filter(
                status=Attendance.STATUS_HALF_DAY
            ).count()
            leaves = attendance_records.filter(status=Attendance.STATUS_LEAVE).count()
            absents = attendance_records.filter(status=Attendance.STATUS_ABSENT).count()

            total_hours = sum([a.total_hours for a in attendance_records])
            overtime_hours = sum([a.overtime_hours for a in attendance_records])

            report.append(
                {
                    "user_id": str(staff_member.id),
                    "name": staff_member.get_full_name(),
                    "role": staff_member.role,
                    "total_days": total_days,
                    "present_days": present,
                    "half_days": half_days,
                    "leaves": leaves,
                    "absents": absents,
                    "total_hours": round(total_hours, 2),
                    "overtime_hours": round(overtime_hours, 2),
                }
            )

        return Response(
            {
                "success": True,
                "month": month_str,
                "report": report,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to generate attendance report",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

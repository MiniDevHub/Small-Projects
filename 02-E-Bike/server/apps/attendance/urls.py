from django.urls import path
from . import views

app_name = "attendance"

urlpatterns = [
    # ============================================
    # EMPLOYEE/SERVICEMAN ENDPOINTS (Clock In/Out ✅)
    # ============================================
    path("clock-in/", views.clock_in, name="clock-in"),
    path("clock-out/", views.clock_out, name="clock-out"),
    path("my/", views.get_my_attendance, name="my-attendance"),
    path("today/", views.get_today_status, name="today-status"),
    # ============================================
    # DEALER ENDPOINTS (Edit Attendance ✅)
    # ============================================
    path("", views.list_staff_attendance, name="list-staff-attendance"),
    path("<str:attendance_id>/edit/", views.edit_attendance, name="edit-attendance"),
    path("mark/", views.mark_attendance, name="mark-attendance"),
    path("report/", views.get_attendance_report, name="attendance-report"),
]

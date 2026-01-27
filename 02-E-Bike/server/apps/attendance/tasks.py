from celery import shared_task
from .models import Attendance
from datetime import datetime, date, timedelta
from django.conf import settings


@shared_task
def auto_logout_employees():
    """Auto logout employees after configured hours"""
    today = date.today()
    auto_logout_hours = settings.AUTO_LOGOUT_HOURS

    # Get all attendance records with login but no logout for today
    attendances = Attendance.objects(date=today, login_time__ne=None, logout_time=None)

    for attendance in attendances:
        # Check if logged in for more than configured hours
        time_since_login = datetime.utcnow() - attendance.login_time
        hours_logged_in = time_since_login.total_seconds() / 3600

        if hours_logged_in >= auto_logout_hours:
            # Auto logout
            attendance.logout_time = attendance.login_time + timedelta(
                hours=auto_logout_hours
            )
            attendance.auto_logout = True
            attendance.save()

            print(f"Auto logged out user {attendance.user_id}")

    return f"Auto logout completed for {attendances.count()} records"

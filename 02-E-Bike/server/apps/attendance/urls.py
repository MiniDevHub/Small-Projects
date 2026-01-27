from django.urls import path
from . import views

app_name = "attendance"

urlpatterns = [
    path("clock-in/", views.clock_in, name="clock_in"),
    path("clock-out/", views.clock_out, name="clock_out"),
    path("my/", views.get_my_attendance, name="my_attendance"),
    path("<str:attendance_id>/edit/", views.edit_attendance, name="edit_attendance"),
]

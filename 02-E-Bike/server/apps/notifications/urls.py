from django.urls import path
from . import views

app_name = "notifications"

urlpatterns = [
    # Create
    path("create/", views.create_notification, name="create-notification"),
    # View
    path("my/", views.get_my_notifications, name="my-notifications"),
    path("unread-count/", views.get_unread_count, name="unread-count"),
    # Actions
    path("<str:notification_id>/read/", views.mark_as_read, name="mark-as-read"),
    path("read-all/", views.mark_all_as_read, name="mark-all-as-read"),
]

"""
Django settings for E-Bike Point ERP project.
Multi-database setup: SQLite for Django admin, MongoDB for business data.
"""

import os
from pathlib import Path
from decouple import config
from datetime import timedelta
import mongoengine

BASE_DIR = Path(__file__).resolve().parent.parent

# Security Settings
SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1,*").split(",")

# Application definition
INSTALLED_APPS = [
    "daphne",  # WebSocket support (optional for future real-time features)
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "channels",
    # Local apps
    "apps.users",
    "apps.products",
    "apps.orders",
    "apps.billing",
    "apps.inventory",
    "apps.attendance",
    "apps.service",
    "apps.notifications",
    "apps.analytics",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# ============================================
# DATABASE CONFIGURATION
# ============================================

# SQLite Database (for Django admin and sessions only)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# MongoDB Connection with MongoEngine
MONGODB_SETTINGS = {
    "db": config("MONGODB_NAME", default="ebikepoint_erp"),
    "host": config("MONGODB_HOST", default="localhost"),
    "port": int(config("MONGODB_PORT", default=27017)),
    "username": config("MONGODB_USER", default=None),
    "password": config("MONGODB_PASSWORD", default=None),
    "authentication_source": "admin",
    "connect": False,  # Connect on first operation
}


# Initialize MongoEngine connection
def connect_mongodb():
    """Initialize MongoDB connection"""
    try:
        connection_params = {
            "db": MONGODB_SETTINGS["db"],
            "host": MONGODB_SETTINGS["host"],
            "port": MONGODB_SETTINGS["port"],
            "authentication_source": MONGODB_SETTINGS.get(
                "authentication_source", "admin"
            ),
            "connect": MONGODB_SETTINGS.get("connect", False),
        }

        # Add username and password only if provided
        if MONGODB_SETTINGS.get("username"):
            connection_params["username"] = MONGODB_SETTINGS["username"]
        if MONGODB_SETTINGS.get("password"):
            connection_params["password"] = MONGODB_SETTINGS["password"]

        mongoengine.connect(**connection_params)
        print("✅ MongoDB connected successfully!")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        raise


# Connect to MongoDB
connect_mongodb()

# ============================================
# AUTHENTICATION
# ============================================

# Authentication backends
AUTHENTICATION_BACKENDS = [
    "apps.users.backends.MongoEngineBackend",
]

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ============================================
# INTERNATIONALIZATION
# ============================================

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

# ============================================
# STATIC & MEDIA FILES
# ============================================

# Static files
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = (
    [os.path.join(BASE_DIR, "static")]
    if os.path.exists(os.path.join(BASE_DIR, "static"))
    else []
)

# Media files (uploads)
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Create media directory structure
MEDIA_DIRS = {
    "PRODUCTS": os.path.join(MEDIA_ROOT, "products"),
    "PROFILES": os.path.join(MEDIA_ROOT, "profiles"),
    "INVOICES": os.path.join(MEDIA_ROOT, "invoices"),
    "SERVICE_PHOTOS": os.path.join(MEDIA_ROOT, "service_photos"),
}

# Ensure media directories exist
for dir_path in MEDIA_DIRS.values():
    os.makedirs(dir_path, exist_ok=True)

# Max upload size (10MB)
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB

# Allowed image formats
ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"]
ALLOWED_VIDEO_EXTENSIONS = ["mp4", "avi", "mov", "webm"]

# ============================================
# REST FRAMEWORK CONFIGURATION
# ============================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.users.backends.MongoEngineJWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "EXCEPTION_HANDLER": "rest_framework.views.exception_handler",
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

# Add BrowsableAPIRenderer in debug mode
if DEBUG:
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"].append(
        "rest_framework.renderers.BrowsableAPIRenderer"
    )

# ============================================
# JWT SETTINGS
# ============================================

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),  # 12 hours for convenience
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),  # 30 days
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}

# ============================================
# CORS SETTINGS
# ============================================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

# Add production frontend URLs if not in debug mode
if not DEBUG:
    PRODUCTION_FRONTEND = config("PRODUCTION_FRONTEND_URL", default="")
    if PRODUCTION_FRONTEND:
        CORS_ALLOWED_ORIGINS.append(PRODUCTION_FRONTEND)

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# ============================================
# CHANNELS (WebSocket) CONFIGURATION
# ============================================

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",  # Use in-memory for development
    },
}

# Use Redis in production
if not DEBUG:
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "channels_redis.core.RedisChannelLayer",
            "CONFIG": {
                "hosts": [
                    (
                        config("REDIS_HOST", default="127.0.0.1"),
                        int(config("REDIS_PORT", default=6379)),
                    )
                ],
            },
        },
    }

# ============================================
# CELERY CONFIGURATION (Optional - for background tasks)
# ============================================

CELERY_BROKER_URL = f'redis://{config("REDIS_HOST", default="127.0.0.1")}:{config("REDIS_PORT", default=6379)}/0'
CELERY_RESULT_BACKEND = f'redis://{config("REDIS_HOST", default="127.0.0.1")}:{config("REDIS_PORT", default=6379)}/0'
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = TIME_ZONE
CELERY_ENABLE_UTC = True

# ============================================
# EMAIL CONFIGURATION
# ============================================

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER or "noreply@ebikepoint.com"

# Use console backend in development if no email credentials
if DEBUG and not EMAIL_HOST_USER:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# ============================================
# BUSINESS LOGIC SETTINGS
# ============================================

# Attendance
AUTO_LOGOUT_HOURS = config("AUTO_LOGOUT_HOURS", default=9, cast=int)

# Service & Warranty
FREE_SERVICES_COUNT = config("FREE_SERVICES_COUNT", default=4, cast=int)
WARRANTY_MONTHS = config("WARRANTY_MONTHS", default=24, cast=int)

# Inventory
LOW_STOCK_THRESHOLD = config("LOW_STOCK_THRESHOLD", default=5, cast=int)

# Notifications
NOTIFICATION_EXPIRY_DAYS = config("NOTIFICATION_EXPIRY_DAYS", default=30, cast=int)

# ============================================
# SECURITY SETTINGS (Production)
# ============================================

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "DENY"
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

# ============================================
# LOGGING CONFIGURATION
# ============================================

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "logs", "debug.log"),
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"] if DEBUG else ["file"],
            "level": "INFO",
        },
        "apps": {
            "handlers": ["console", "file"] if DEBUG else ["file"],
            "level": "DEBUG" if DEBUG else "INFO",
        },
    },
}

# Create logs directory
os.makedirs(os.path.join(BASE_DIR, "logs"), exist_ok=True)

# ============================================
# DEFAULT PRIMARY KEY FIELD TYPE
# ============================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

print("✅ Django settings loaded successfully!")

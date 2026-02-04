.PHONY: help install clean dev stop restart check-env check-versions check-services migrate createsuperuser shell seed test logs audit

# Colors
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
CYAN := \033[0;36m
PURPLE := \033[0;35m
BLUE := \033[0;34m
WHITE := \033[1;37m
NC := \033[0m

# Emojis for better visual feedback
CHECK := ✓
CROSS := ✗
ARROW := →
STAR := ★

# Variables
PYTHON := python3
PYTHON_MIN_VERSION := 3.10
BACKEND_PORT := 8000
BACKEND_URL := http://127.0.0.1:$(BACKEND_PORT)
API_URL := $(BACKEND_URL)/api
ADMIN_URL := $(BACKEND_URL)/admin
MONGODB_PORT := 27017
REDIS_PORT := 6379
VENV := .venv
VENV_BIN := $(VENV)/bin

# OS Detection for cross-platform commands
UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
    OPEN_CMD := open
else ifeq ($(UNAME), Linux)
    OPEN_CMD := xdg-open
else
    OPEN_CMD := start
endif

# Default target
.DEFAULT_GOAL := help

help:
	@echo ""
	@echo "$(CYAN)╔═══════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║       🚴 E-Bike Point ERP - Backend Commands          ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BLUE)Usage: make <command>$(NC)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🚀 Quick Start Commands$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)setup$(NC)                $(ARROW) 🎯 Complete setup (install + check)"
	@echo "  $(CYAN)dev$(NC)                  $(ARROW) 🔧 Start Django server only"
	@echo "  $(CYAN)dev-open$(NC)             $(ARROW) 🌐 Start Django + open browser"
	@echo "  $(CYAN)dev-all$(NC)              $(ARROW) 🚀 Start Django + Celery + Beat"
	@echo "  $(CYAN)stop$(NC)                 $(ARROW) 🛑 Stop all services"
	@echo "  $(CYAN)restart$(NC)              $(ARROW) 🔄 Clean restart everything"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)💻 Development$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)dev$(NC)                  $(ARROW) 🌐 Start Django server"
	@echo "  $(CYAN)dev-open$(NC)             $(ARROW) 🌐 Django + auto-open browser"
	@echo "  $(CYAN)dev-plus$(NC)             $(ARROW) 📊 Django with Django Debug Toolbar"
	@echo "  $(CYAN)celery$(NC)               $(ARROW) 🔄 Start Celery worker"
	@echo "  $(CYAN)celery-beat$(NC)          $(ARROW) ⏰ Start Celery beat"
	@echo "  $(CYAN)flower$(NC)               $(ARROW) 🌺 Start Flower (Celery monitor)"
	@echo "  $(CYAN)shell$(NC)                $(ARROW) 🐚 Django shell"
	@echo "  $(CYAN)shell-plus$(NC)           $(ARROW) 🐚 Enhanced shell"
	@echo "  $(CYAN)dbshell$(NC)              $(ARROW) 🗄️  MongoDB shell"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🌐 Browser & Navigation$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)open$(NC)                 $(ARROW) 🌐 Open API root"
	@echo "  $(CYAN)open-admin$(NC)           $(ARROW) 👨‍💼 Open Django admin"
	@echo "  $(CYAN)open-api$(NC)             $(ARROW) 📡 Open API documentation"
	@echo "  $(CYAN)open-flower$(NC)          $(ARROW) 🌺 Open Celery monitor"
	@echo "  $(CYAN)open-docs$(NC)            $(ARROW) 📚 Open project documentation"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🗄️  Database$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)migrate$(NC)              $(ARROW) 📊 Run migrations"
	@echo "  $(CYAN)makemigrations$(NC)       $(ARROW) 📝 Create migrations"
	@echo "  $(CYAN)createsuperuser$(NC)      $(ARROW) 👤 Create super admin"
	@echo "  $(CYAN)seed$(NC)                 $(ARROW) 🌱 Seed sample data"
	@echo "  $(CYAN)seed-all$(NC)             $(ARROW) 🌱 Seed complete test data"
	@echo "  $(CYAN)backup$(NC)               $(ARROW) 💾 Backup database"
	@echo "  $(CYAN)restore$(NC)              $(ARROW) 📥 Restore from backup"
	@echo "  $(CYAN)flush-db$(NC)             $(ARROW) $(RED)⚠️  Clear entire database$(NC)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🧪 Testing & Quality$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)test$(NC)                 $(ARROW) 🧪 Run all tests"
	@echo "  $(CYAN)test-fast$(NC)            $(ARROW) ⚡ Run tests (parallel)"
	@echo "  $(CYAN)test-coverage$(NC)        $(ARROW) 📊 Generate coverage report"
	@echo "  $(CYAN)test-api$(NC)             $(ARROW) 🔌 Test API endpoints"
	@echo "  $(CYAN)lint$(NC)                 $(ARROW) 🔍 Run linters"
	@echo "  $(CYAN)format$(NC)               $(ARROW) ✨ Format code"
	@echo "  $(CYAN)quality$(NC)              $(ARROW) 🏆 Run all quality checks"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🏥 Health & Monitoring$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)health$(NC)               $(ARROW) 🏥 Complete health check"
	@echo "  $(CYAN)check-all$(NC)            $(ARROW) 🔍 Run all checks"
	@echo "  $(CYAN)monitor$(NC)              $(ARROW) 📊 Live service monitoring"
	@echo "  $(CYAN)logs$(NC)                 $(ARROW) 📋 View Django logs"
	@echo "  $(CYAN)logs-celery$(NC)          $(ARROW) 📋 View Celery logs"
	@echo "  $(CYAN)logs-error$(NC)           $(ARROW) 🚨 View error logs"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🔧 Utilities$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)clean$(NC)                $(ARROW) 🧹 Clean temp files"
	@echo "  $(CYAN)clean-all$(NC)            $(ARROW) 🧹 Deep clean (includes .venv)"
	@echo "  $(CYAN)reset$(NC)                $(ARROW) 🔄 Complete reset"
	@echo "  $(CYAN)update-deps$(NC)          $(ARROW) ⬆️  Update dependencies"
	@echo "  $(CYAN)show-urls$(NC)            $(ARROW) 📋 List all URLs"
	@echo ""
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)$(STAR) Quick Start:$(NC) make setup"
	@echo "$(YELLOW)$(STAR) Development:$(NC) make dev-open"
	@echo "$(YELLOW)$(STAR) Full Stack:$(NC)  make dev-all"
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo ""

# ============================================
# 🚀 Quick Start Commands
# ============================================

setup: install check-all seed
	@echo ""
	@echo "$(GREEN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║     $(CHECK) Setup Complete!                    ║$(NC)"
	@echo "$(GREEN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Next steps:$(NC)"
	@echo "  1. $(YELLOW)make createsuperuser$(NC)  $(ARROW) Create admin"
	@echo "  2. $(YELLOW)make dev-open$(NC)         $(ARROW) Start development"
	@echo "  3. $(YELLOW)make open-admin$(NC)       $(ARROW) Access admin panel"
	@echo ""

# ============================================
# 💻 Development Commands
# ============================================

dev: check-services
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║      🚀 Starting Django Server            ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)  URL:$(NC) $(WHITE)$(BACKEND_URL)$(NC)"
	@echo "$(CYAN)  API:$(NC) $(WHITE)$(API_URL)$(NC)"
	@echo "$(CYAN)  Admin:$(NC) $(WHITE)$(ADMIN_URL)$(NC)"
	@echo ""
	@echo "$(YELLOW)  Press Ctrl+C to stop$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py runserver $(BACKEND_PORT)

dev-open: check-services
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║   🚀 Starting Django (Auto-Open)          ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@$(MAKE) open-api-delay &
	@$(VENV_BIN)/python manage.py runserver $(BACKEND_PORT)

dev-plus: check-services
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║   📊 Django + Debug Toolbar               ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@$(VENV_BIN)/pip show django-debug-toolbar >/dev/null 2>&1 || { \
		echo "$(YELLOW)Installing Debug Toolbar...$(NC)"; \
		$(VENV_BIN)/pip install django-debug-toolbar; \
	}
	@$(MAKE) dev

dev-all: check-services
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║   🚀 Starting All Services                ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@if [[ "$(UNAME)" == "Darwin" ]]; then \
		echo "$(CYAN)Opening Django in new tab...$(NC)"; \
		osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)\" && make runserver"' >/dev/null; \
		sleep 1; \
		echo "$(CYAN)Opening Celery worker in new tab...$(NC)"; \
		osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)\" && make celery"' >/dev/null; \
		sleep 1; \
		echo "$(CYAN)Opening Celery beat in new tab...$(NC)"; \
		osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)\" && make celery-beat"' >/dev/null; \
	else \
		echo "$(YELLOW)Starting services in background...$(NC)"; \
		$(MAKE) runserver & \
		$(MAKE) celery & \
		$(MAKE) celery-beat & \
		wait; \
	fi
	@echo ""
	@echo "$(GREEN)$(CHECK) All services starting!$(NC)"
	@echo ""
	@sleep 3
	@$(MAKE) open-api
	@echo ""
	@echo "$(YELLOW)Use 'make stop' to stop all services$(NC)"

runserver:
	@echo "$(CYAN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║       🔧 Django Development Server        ║$(NC)"
	@echo "$(CYAN)║         http://127.0.0.1:$(BACKEND_PORT)             ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py runserver $(BACKEND_PORT)

celery: celery-worker

celery-worker:
	@echo "$(CYAN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║          🔄 Celery Worker                 ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/celery -A config worker -l info

celery-beat:
	@echo "$(CYAN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║          ⏰ Celery Beat                   ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/celery -A config beat -l info

flower:
	@echo "$(CYAN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║          🌺 Flower Monitor                ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════╝$(NC)"
	@$(VENV_BIN)/pip show flower >/dev/null 2>&1 || { \
		echo "$(YELLOW)Installing Flower...$(NC)"; \
		$(VENV_BIN)/pip install flower; \
	}
	@echo "$(CYAN)Opening http://localhost:5555$(NC)"
	@$(VENV_BIN)/celery -A config flower

# ============================================
# 🌐 Browser Commands
# ============================================

open: open-api

open-api:
	@echo "$(CYAN)📡 Opening API documentation...$(NC)"
	@$(OPEN_CMD) $(API_URL) 2>/dev/null || { \
		echo "$(YELLOW)  Trying alternative...$(NC)"; \
		python3 -m webbrowser $(API_URL) 2>/dev/null || \
		echo "$(CYAN)  Please open: $(WHITE)$(API_URL)$(NC)"; \
	}

open-api-delay:
	@sleep 3 && $(MAKE) open-api

open-admin:
	@echo "$(CYAN)👨‍💼 Opening Django admin...$(NC)"
	@$(OPEN_CMD) $(ADMIN_URL)

open-flower:
	@echo "$(CYAN)🌺 Opening Flower monitor...$(NC)"
	@$(OPEN_CMD) http://localhost:5555

open-docs:
	@echo "$(CYAN)📚 Opening documentation...$(NC)"
	@if [ -f "docs/index.html" ]; then \
		$(OPEN_CMD) docs/index.html; \
	else \
		echo "$(YELLOW)No documentation found$(NC)"; \
		echo "$(CYAN)Generate with: make docs$(NC)"; \
	fi

# ============================================
# 🗄️ Database Commands
# ============================================

migrate:
	@echo "$(YELLOW)📊 Running migrations...$(NC)"
	@$(VENV_BIN)/python manage.py migrate
	@echo "$(GREEN)$(CHECK) Migrations completed$(NC)"

makemigrations:
	@echo "$(YELLOW)📝 Creating migrations...$(NC)"
	@$(VENV_BIN)/python manage.py makemigrations
	@echo "$(GREEN)$(CHECK) Migrations created$(NC)"
	@echo "$(CYAN)Run 'make migrate' to apply$(NC)"

createsuperuser:
	@echo "$(CYAN)👤 Creating Super Admin...$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py createsuperuser_mongo || { \
		echo "$(YELLOW)Using standard createsuperuser...$(NC)"; \
		$(VENV_BIN)/python manage.py createsuperuser; \
	}

create-admin:
	@echo "$(YELLOW)👨‍💼 Quick Admin Creation...$(NC)"
	@$(VENV_BIN)/python manage.py shell -c " \
		from apps.users.models import User; \
		try: \
			admin = User.create_superuser( \
				'admin@ebike.com', \
				'Admin@1234', \
				'Admin', \
				'User', \
				'9999999999' \
			); \
			print('\n$(GREEN)$(CHECK) Admin created successfully!$(NC)'); \
			print('  Email: admin@ebike.com'); \
			print('  Password: Admin@1234'); \
		except Exception as e: \
			print('$(RED)$(CROSS) Error:$(NC)', str(e))"

seed:
	@echo "$(YELLOW)🌱 Seeding sample products...$(NC)"
	@$(VENV_BIN)/python manage.py seed_products
	@echo "$(GREEN)$(CHECK) Database seeded$(NC)"

seed-all: seed
	@echo "$(YELLOW)🌱 Creating complete test data...$(NC)"
	@$(VENV_BIN)/python manage.py shell -c " \
		print('Creating test users...'); \
		# Add more seeding logic here \
	"
	@echo "$(GREEN)$(CHECK) Complete test data created$(NC)"

backup: backup-db

backup-db:
	@echo "$(YELLOW)💾 Creating database backup...$(NC)"
	@mkdir -p backups
	@TIMESTAMP=$$(date +%Y%m%d_%H%M%S); \
	mongodump --db=ebikepoint_erp --out=backups/backup_$$TIMESTAMP && \
	echo "$(GREEN)$(CHECK) Backup created: backups/backup_$$TIMESTAMP$(NC)"

restore: restore-db

restore-db:
	@echo "$(YELLOW)📥 Available backups:$(NC)"
	@echo ""
	@ls -1 backups/ 2>/dev/null | sort -r | head -10 || echo "$(RED)No backups found$(NC)"
	@echo ""
	@echo "$(CYAN)Enter backup name (or 'cancel'):$(NC)"
	@read -p "$(ARROW) " backup; \
	if [ "$$backup" = "cancel" ]; then \
		echo "$(YELLOW)Cancelled$(NC)"; \
	elif [ -d "backups/$$backup" ]; then \
		echo "$(YELLOW)Restoring from $$backup...$(NC)"; \
		mongorestore --db=ebikepoint_erp --drop backups/$$backup/ebikepoint_erp && \
		echo "$(GREEN)$(CHECK) Database restored$(NC)"; \
	else \
		echo "$(RED)$(CROSS) Backup not found$(NC)"; \
	fi

flush-db:
	@echo "$(RED)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(RED)║     ⚠️  WARNING: DELETE ALL DATA          ║$(NC)"
	@echo "$(RED)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Type 'DELETE ALL' to confirm:$(NC)"
	@read -p "$(ARROW) " confirm; \
	if [ "$$confirm" = "DELETE ALL" ]; then \
		echo "$(RED)Deleting all data...$(NC)"; \
		$(VENV_BIN)/python manage.py shell -c " \
			from mongoengine import connection; \
			connection.get_db().client.drop_database('ebikepoint_erp')"; \
		echo "$(GREEN)$(CHECK) Database flushed$(NC)"; \
		echo "$(CYAN)Run 'make migrate' to recreate$(NC)"; \
	else \
		echo "$(GREEN)Cancelled - database unchanged$(NC)"; \
	fi

# ============================================
# 🏥 Health & Monitoring Commands
# ============================================

health: check-all
	@echo ""
	@echo "$(GREEN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║       🏥 Backend Health Report            ║$(NC)"
	@echo "$(GREEN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Django Status:$(NC)"
	@if lsof -Pi :$(BACKEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "  Server:        $(GREEN)$(CHECK) Running on port $(BACKEND_PORT)$(NC)"; \
		echo "  Access URLs:"; \
		echo "    API:         $(CYAN)$(API_URL)$(NC)"; \
		echo "    Admin:       $(CYAN)$(ADMIN_URL)$(NC)"; \
	else \
		echo "  Server:        $(YELLOW)○ Not running$(NC)"; \
		echo "                 $(CYAN)Run: make dev-open$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Background Services:$(NC)"
	@if pgrep -f 'celery.*worker' >/dev/null 2>&1; then \
		echo "  Celery Worker: $(GREEN)$(CHECK) Running$(NC)"; \
	else \
		echo "  Celery Worker: $(YELLOW)○ Not running$(NC)"; \
	fi
	@if pgrep -f 'celery.*beat' >/dev/null 2>&1; then \
		echo "  Celery Beat:   $(GREEN)$(CHECK) Running$(NC)"; \
	else \
		echo "  Celery Beat:   $(YELLOW)○ Not running$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Database Connection:$(NC)"
	@if [ -d $(VENV) ]; then \
		$(VENV_BIN)/python manage.py health_check 2>/dev/null || \
		echo "  MongoDB:       $(YELLOW)○ Cannot check$(NC)"; \
	else \
		echo "  MongoDB:       $(YELLOW)○ .venv not found$(NC)"; \
	fi
	@echo ""

check-all: check-versions check-env check-services
	@echo ""
	@echo "$(GREEN)$(CHECK) All checks passed!$(NC)"

check-versions:
	@echo "$(YELLOW)🔍 Checking system requirements...$(NC)"
	@command -v $(PYTHON) >/dev/null 2>&1 || { \
		echo "$(RED)  $(CROSS) Python not found!$(NC)"; \
		exit 1; \
	}
	@PYTHON_VERSION=$$($(PYTHON) -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"); \
	PYTHON_MAJOR=$$(echo $$PYTHON_VERSION | cut -d. -f1); \
	PYTHON_MINOR=$$(echo $$PYTHON_VERSION | cut -d. -f2); \
	if [ $$PYTHON_MAJOR -lt 3 ] || ([ $$PYTHON_MAJOR -eq 3 ] && [ $$PYTHON_MINOR -lt 10 ]); then \
		echo "$(RED)  $(CROSS) Python 3.10+ required!$(NC)"; \
		echo "$(YELLOW)  Current: Python $$PYTHON_VERSION$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)  $(CHECK) Python: $$($(PYTHON) --version)$(NC)"
	@command -v mongod >/dev/null 2>&1 && echo "$(GREEN)  $(CHECK) MongoDB: found$(NC)" || \
		echo "$(YELLOW)  ⚠️  MongoDB: not in PATH (may be service)$(NC)"

check-env:
	@echo "$(YELLOW)🔍 Checking environment...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)  ⚠️  .env file not found$(NC)"; \
		if [ -f .env.example ]; then \
			cp .env.example .env; \
			echo "$(GREEN)  $(CHECK) Created .env from template$(NC)"; \
			echo "$(YELLOW)  ⚠️  Update .env with your values!$(NC)"; \
		else \
			echo "$(CYAN)  Creating default .env...$(NC)"; \
			echo "SECRET_KEY=your-secret-key-change-in-production" > .env; \
			echo "DEBUG=True" >> .env; \
			echo "MONGODB_NAME=ebikepoint_erp" >> .env; \
			echo "MONGODB_HOST=localhost" >> .env; \
			echo "MONGODB_PORT=27017" >> .env; \
			echo "$(GREEN)  $(CHECK) Created default .env$(NC)"; \
		fi \
	else \
		echo "$(GREEN)  $(CHECK) .env exists$(NC)"; \
	fi

check-services:
	@echo "$(YELLOW)🔍 Checking required services...$(NC)"
	@echo ""
	@echo "$(CYAN)MongoDB:$(NC)"
	@if lsof -Pi :$(MONGODB_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "  Status:        $(GREEN)$(CHECK) Running on port $(MONGODB_PORT)$(NC)"; \
	else \
		echo "  Status:        $(RED)$(CROSS) Not running$(NC)"; \
		echo "  $(YELLOW)Start with:$(NC)"; \
		if [[ "$(UNAME)" == "Darwin" ]]; then \
			echo "    brew services start mongodb-community"; \
		else \
			echo "    sudo systemctl start mongod"; \
		fi \
	fi
	@echo ""
	@echo "$(CYAN)Redis (optional):$(NC)"
	@if lsof -Pi :$(REDIS_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "  Status:        $(GREEN)$(CHECK) Running on port $(REDIS_PORT)$(NC)"; \
	else \
		echo "  Status:        $(YELLOW)○ Not running (optional)$(NC)"; \
	fi
	@echo ""

monitor:
	@echo "$(CYAN)📊 Live Monitoring (Press Ctrl+C to exit)...$(NC)"
	@echo ""
	@while true; do \
		clear; \
		echo "$(CYAN)╔═══════════════════════════════════════════╗$(NC)"; \
		echo "$(CYAN)║       📊 E-Bike Backend Monitor           ║$(NC)"; \
		echo "$(CYAN)╚═══════════════════════════════════════════╝$(NC)"; \
		echo ""; \
		echo "$(WHITE)Time: $$(date '+%H:%M:%S')$(NC)"; \
		echo ""; \
		echo -n "MongoDB    ($(MONGODB_PORT)): "; \
		lsof -Pi :$(MONGODB_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(RED)○ Stopped$(NC)"; \
		echo -n "Redis      ($(REDIS_PORT)): "; \
		lsof -Pi :$(REDIS_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(YELLOW)○ Stopped$(NC)"; \
		echo -n "Django     ($(BACKEND_PORT)): "; \
		lsof -Pi :$(BACKEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(RED)○ Stopped$(NC)"; \
		echo -n "Celery Worker:      "; \
		pgrep -f 'celery.*worker' >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(YELLOW)○ Stopped$(NC)"; \
		echo -n "Celery Beat:        "; \
		pgrep -f 'celery.*beat' >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(YELLOW)○ Stopped$(NC)"; \
		echo ""; \
		if [ -d $(VENV) ]; then \
			REQUESTS=$$(lsof -i :$(BACKEND_PORT) 2>/dev/null | grep -c ESTABLISHED || echo "0"); \
			echo "$(CYAN)Active Connections: $$REQUESTS$(NC)"; \
		fi; \
		echo ""; \
		echo "$(CYAN)Press Ctrl+C to exit$(NC)"; \
		sleep 2; \
	done

# ============================================
# 📦 Installation Commands
# ============================================

install: check-versions
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║     🔧 Installing Backend                 ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(RED)  $(CROSS) Please deactivate venv first!$(NC)"; \
		echo "$(CYAN)  Run: deactivate$(NC)"; \
		exit 1; \
	fi
	@$(MAKE) check-services
	@echo ""
	@echo "$(YELLOW)Creating virtual environment...$(NC)"
	@$(PYTHON) -m venv $(VENV)
	@echo "$(GREEN)$(CHECK) Virtual environment created$(NC)"
	@echo ""
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	@$(VENV_BIN)/pip install --upgrade pip --quiet
	@$(VENV_BIN)/pip install -r requirements.txt --progress-bar off
	@echo "$(GREEN)$(CHECK) Dependencies installed$(NC)"
	@echo ""
	@$(MAKE) check-env
	@echo ""
	@echo "$(YELLOW)Setting up database...$(NC)"
	@$(VENV_BIN)/python manage.py migrate --noinput || { \
		echo "$(RED)$(CROSS) Migration failed!$(NC)"; \
		echo "$(YELLOW)Check MongoDB connection$(NC)"; \
		exit 1; \
	}
	@echo "$(GREEN)$(CHECK) Database migrated$(NC)"
	@echo ""
	@echo "$(YELLOW)Collecting static files...$(NC)"
	@mkdir -p static staticfiles media
	@$(VENV_BIN)/python manage.py collectstatic --noinput --clear >/dev/null 2>&1
	@echo "$(GREEN)$(CHECK) Static files collected$(NC)"
	@echo ""
	@echo "$(GREEN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║     $(CHECK) Installation Complete!              ║$(NC)"
	@echo "$(GREEN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Run 'make setup' for complete setup$(NC)"

# ============================================
# 🧪 Testing & Quality Commands
# ============================================

test:
	@echo "$(YELLOW)🧪 Running tests...$(NC)"
	@$(VENV_BIN)/python manage.py test --verbosity=2

test-fast:
	@echo "$(YELLOW)⚡ Running tests (parallel)...$(NC)"
	@$(VENV_BIN)/python manage.py test --parallel

test-coverage:
	@echo "$(YELLOW)📊 Running tests with coverage...$(NC)"
	@$(VENV_BIN)/pip show coverage >/dev/null 2>&1 || { \
		echo "$(YELLOW)Installing coverage...$(NC)"; \
		$(VENV_BIN)/pip install coverage; \
	}
	@$(VENV_BIN)/coverage run --source='.' manage.py test
	@$(VENV_BIN)/coverage report
	@$(VENV_BIN)/coverage html
	@echo "$(GREEN)$(CHECK) Coverage report: htmlcov/index.html$(NC)"
	@echo "$(CYAN)Run 'make open-coverage' to view$(NC)"

test-api:
	@echo "$(YELLOW)🔌 Testing API endpoints...$(NC)"
	@$(VENV_BIN)/python manage.py test apps.users apps.products apps.orders --verbosity=2

lint:
	@echo "$(YELLOW)🔍 Running linters...$(NC)"
	@$(VENV_BIN)/pip show flake8 >/dev/null 2>&1 || { \
		echo "$(YELLOW)Installing flake8...$(NC)"; \
		$(VENV_BIN)/pip install flake8; \
	}
	@$(VENV_BIN)/flake8 . --exclude=$(VENV),migrations --max-line-length=120

format:
	@echo "$(YELLOW)✨ Formatting code...$(NC)"
	@$(VENV_BIN)/pip show black >/dev/null 2>&1 || { \
		echo "$(YELLOW)Installing black...$(NC)"; \
		$(VENV_BIN)/pip install black; \
	}
	@$(VENV_BIN)/black . --exclude=$(VENV)
	@echo "$(GREEN)$(CHECK) Code formatted$(NC)"

quality: lint test
	@echo ""
	@echo "$(GREEN)$(CHECK) All quality checks passed!$(NC)"

audit:
	@echo "$(YELLOW)🔒 Running security audit...$(NC)"
	@echo ""
	@echo "$(CYAN)Package compatibility:$(NC)"
	@$(VENV_BIN)/pip check || echo "$(YELLOW)Some issues found$(NC)"
	@echo ""
	@echo "$(CYAN)Security vulnerabilities:$(NC)"
	@$(VENV_BIN)/pip show pip-audit >/dev/null 2>&1 && \
		$(VENV_BIN)/pip-audit || { \
		echo "$(YELLOW)Install pip-audit for security scanning$(NC)"; \
		echo "$(CYAN)Run: $(VENV_BIN)/pip install pip-audit$(NC)"; \
	}

# ============================================
# 🧹 Cleanup Commands
# ============================================

clean:
	@echo "$(RED)🧹 Cleaning temporary files...$(NC)"
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@find . -name "*.pyo" -delete 2>/dev/null || true
	@rm -rf .pytest_cache .coverage htmlcov
	@rm -f celerybeat-schedule celerybeat-schedule.db
	@echo "$(GREEN)$(CHECK) Temporary files cleaned$(NC)"

clean-all: clean
	@echo "$(RED)🧹 Deep cleaning...$(NC)"
	@rm -rf $(VENV) staticfiles
	@echo "$(GREEN)$(CHECK) Deep clean complete$(NC)"

reset: stop clean-all
	@echo "$(RED)🔄 Resetting project...$(NC)"
	@echo "$(GREEN)$(CHECK) Reset complete$(NC)"
	@echo "$(CYAN)Run 'make setup' to reinstall$(NC)"

# ============================================
# 🛠️ Utility Commands
# ============================================

stop:
	@echo "$(RED)🛑 Stopping all services...$(NC)"
	@pkill -f "manage.py runserver" 2>/dev/null || true
	@pkill -f "celery.*worker" 2>/dev/null || true
	@pkill -f "celery.*beat" 2>/dev/null || true
	@lsof -ti:$(BACKEND_PORT) | xargs kill -9 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) All services stopped$(NC)"

restart: stop dev

status:
	@echo ""
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║        📊 Backend Status                  ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Environment:$(NC)"
	@echo "  Python:        $$($(PYTHON) --version 2>&1)"
	@echo "  Virtualenv:    $$([ -d $(VENV) ] && echo '$(GREEN)$(CHECK) Installed$(NC)' || echo '$(RED)$(CROSS) Not installed$(NC)')"
	@if [ -d $(VENV) ]; then \
		PACKAGES=$$($(VENV_BIN)/pip list --format=freeze | wc -l); \
		echo "  Packages:      $(CYAN)$$PACKAGES installed$(NC)"; \
		DJANGO=$$($(VENV_BIN)/python -c 'import django; print(django.get_version())' 2>/dev/null || echo "Not installed"); \
		echo "  Django:        $(CYAN)$$DJANGO$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Configuration:$(NC)"
	@echo "  .env file:     $$([ -f .env ] && echo '$(GREEN)$(CHECK) Present$(NC)' || echo '$(RED)$(CROSS) Missing$(NC)')"
	@echo ""
	@echo "$(CYAN)Services:$(NC)"
	@echo -n "  MongoDB:       "
	@lsof -Pi :$(MONGODB_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
		echo "$(GREEN)$(CHECK) Running on port $(MONGODB_PORT)$(NC)" || echo "$(RED)$(CROSS) Not running$(NC)"
	@echo -n "  Redis:         "
	@lsof -Pi :$(REDIS_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
		echo "$(GREEN)$(CHECK) Running on port $(REDIS_PORT)$(NC)" || echo "$(YELLOW)○ Not running$(NC)"
	@echo -n "  Django:        "
	@lsof -Pi :$(BACKEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
		echo "$(GREEN)$(CHECK) Running on port $(BACKEND_PORT)$(NC)" || echo "$(YELLOW)○ Not running$(NC)"
	@echo -n "  Celery:        "
	@pgrep -f 'celery.*worker' >/dev/null 2>&1 && \
		echo "$(GREEN)$(CHECK) Worker running$(NC)" || echo "$(YELLOW)○ Worker not running$(NC)"
	@echo ""
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(YELLOW)⚠️  Virtual environment is active$(NC)"; \
		echo "$(CYAN)   Run 'deactivate' when done$(NC)"; \
		echo ""; \
	fi

quick-status:
	@echo -n "MongoDB: "; \
	lsof -Pi :$(MONGODB_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
		echo "$(GREEN)●$(NC)" || echo "$(RED)○$(NC)"
	@echo -n "Django:  "; \
	lsof -Pi :$(BACKEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
		echo "$(GREEN)●$(NC)" || echo "$(RED)○$(NC)"
	@echo -n "Celery:  "; \
	pgrep -f 'celery.*worker' >/dev/null 2>&1 && \
		echo "$(GREEN)●$(NC)" || echo "$(YELLOW)○$(NC)"

shell:
	@echo "$(CYAN)🐚 Opening Django shell...$(NC)"
	@$(VENV_BIN)/python manage.py shell

shell-plus:
	@echo "$(CYAN)🐚 Opening enhanced shell...$(NC)"
	@$(VENV_BIN)/pip show django-extensions >/dev/null 2>&1 && \
		$(VENV_BIN)/python manage.py shell_plus || { \
		echo "$(YELLOW)Installing django-extensions...$(NC)"; \
		$(VENV_BIN)/pip install django-extensions; \
		$(VENV_BIN)/python manage.py shell_plus; \
	}

dbshell:
	@echo "$(CYAN)🗄️  Opening MongoDB shell...$(NC)"
	@mongosh ebikepoint_erp || mongo ebikepoint_erp

show-urls:
	@echo "$(CYAN)📋 Available URLs:$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py show_urls 2>/dev/null || \
		$(VENV_BIN)/python manage.py shell -c " \
			from django.urls import get_resolver; \
			resolver = get_resolver(); \
			for pattern in resolver.url_patterns: \
				print(f'  {pattern.pattern}')"

logs:
	@echo "$(CYAN)📋 Recent Django logs:$(NC)"
	@if [ -f logs/django.log ]; then \
		tail -n 50 logs/django.log; \
	else \
		echo "$(YELLOW)No logs found$(NC)"; \
		echo "$(CYAN)Logs appear after running server$(NC)"; \
	fi

logs-celery:
	@echo "$(CYAN)📋 Recent Celery logs:$(NC)"
	@if [ -f logs/celery.log ]; then \
		tail -n 50 logs/celery.log; \
	else \
		echo "$(YELLOW)No Celery logs found$(NC)"; \
	fi

logs-error:
	@echo "$(RED)🚨 Recent errors:$(NC)"
	@if [ -f logs/error.log ]; then \
		tail -n 50 logs/error.log; \
	else \
		echo "$(GREEN)No errors logged$(NC)"; \
	fi

logs-live:
	@echo "$(CYAN)📋 Live logs (Ctrl+C to exit)...$(NC)"
	@tail -f logs/*.log 2>/dev/null || echo "$(YELLOW)No logs to follow$(NC)"

collectstatic:
	@echo "$(YELLOW)📁 Collecting static files...$(NC)"
	@$(VENV_BIN)/python manage.py collectstatic --noinput
	@echo "$(GREEN)$(CHECK) Static files collected$(NC)"

requirements:
	@echo "$(YELLOW)📦 Updating requirements.txt...$(NC)"
	@$(VENV_BIN)/pip freeze > requirements.txt
	@echo "$(GREEN)$(CHECK) requirements.txt updated$(NC)"

update-deps:
	@echo "$(YELLOW)⬆️  Updating dependencies...$(NC)"
	@$(VENV_BIN)/pip install --upgrade -r requirements.txt
	@echo "$(GREEN)$(CHECK) Dependencies updated$(NC)"
	@echo "$(CYAN)Run 'make audit' to check security$(NC)"

info:
	@echo "$(CYAN)E-Bike Point ERP - Backend$(NC)"
	@echo "========================"
	@echo "Framework:     Django REST Framework"
	@echo "Database:      MongoDB (MongoEngine)"
	@echo "Task Queue:    Celery + Redis"
	@echo "Auth:          JWT (Simple JWT)"
	@echo "API Port:      $(BACKEND_PORT)"
	@echo "MongoDB Port:  $(MONGODB_PORT)"
	@echo "Redis Port:    $(REDIS_PORT)"

version:
	@echo "$(CYAN)Version Information:$(NC)"
	@echo "==================="
	@echo "Backend:       1.0.0"
	@if [ -d $(VENV) ]; then \
		echo "Python:        $$($(PYTHON) --version)"; \
		DJANGO=$$($(VENV_BIN)/python -c 'import django; print(django.get_version())'); \
		echo "Django:        $$DJANGO"; \
		DRF=$$($(VENV_BIN)/python -c 'import rest_framework; print(rest_framework.VERSION)'); \
		echo "DRF:           $$DRF"; \
	else \
		echo "Python:        $$($(PYTHON) --version)"; \
		echo "Django:        (install first)"; \
	fi

# ============================================
# Aliases for convenience
# ============================================

s: setup
d: dev
do: dev-open
da: dev-all
c: celery
cs: createsuperuser
ca: create-admin
m: migrate
mm: makemigrations
t: test
tc: test-coverage
h: health
st: status
qs: quick-status

# Common typos
sever: dev
srever: dev
runserve: runserver
mirgrate: migrate
suerpuser: createsuperuser

# Shortcuts
run: dev
start: dev
serve: dev
server: dev
open-coverage:
	@$(OPEN_CMD) htmlcov/index.html

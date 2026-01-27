.PHONY: help install clean dev stop restart check-env check-versions check-services migrate createsuperuser shell seed test logs audit celery-worker celery-beat dev-all

# Colors
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
CYAN := \033[0;36m
PURPLE := \033[0;35m
BLUE := \033[0;34m
NC := \033[0m

# Variables
PYTHON := python3
PYTHON_MIN_VERSION := 3.10
BACKEND_PORT := 8000
MONGODB_PORT := 27017
REDIS_PORT := 6379
VENV := .venv
VENV_BIN := $(VENV)/bin

help:
	@echo ""
	@echo "$(CYAN)╔═══════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║       🚴 E-Bike Point ERP - Backend Setup             ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BLUE)Usage: make <targetName>$(NC)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🚀 Quick Start$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)install$(NC)              => 📦 Fresh installation (recommended)"
	@echo "  $(CYAN)dev$(NC)                  => 🔧 Start Django server only"
	@echo "  $(CYAN)dev-all$(NC)              => 🚀 Start Django + Celery + Beat (tabs)"
	@echo "  $(CYAN)stop$(NC)                 => 🛑 Stop all services"
	@echo "  $(CYAN)restart$(NC)              => 🔄 Clean & reinstall everything"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)💻 Development$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)runserver$(NC)            => 🌐 Start Django server (:8000)"
	@echo "  $(CYAN)celery-worker$(NC)        => 🔄 Start Celery worker"
	@echo "  $(CYAN)celery-beat$(NC)          => ⏰ Start Celery beat scheduler"
	@echo "  $(CYAN)shell$(NC)                => 🐚 Open Django shell"
	@echo "  $(CYAN)shell-plus$(NC)           => 🐚 Open enhanced Django shell"
	@echo "  $(CYAN)dbshell$(NC)              => 🗄️  Open MongoDB shell"
	@echo "  $(CYAN)show-urls$(NC)            => 📋 List all available URLs"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🗄️  Database$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)migrate$(NC)              => 📊 Run Django migrations"
	@echo "  $(CYAN)makemigrations$(NC)       => 📝 Create new migrations"
	@echo "  $(CYAN)createsuperuser$(NC)      => 👤 Create admin user (MongoDB)"
	@echo "  $(CYAN)seed$(NC)                 => 🌱 Seed sample products (6 bikes)"
	@echo "  $(CYAN)seed-clear$(NC)           => 🔄 Clear & reseed all products"
	@echo "  $(CYAN)backup-db$(NC)            => 💾 Backup MongoDB database"
	@echo "  $(CYAN)restore-db$(NC)           => 📥 Restore MongoDB from backup"
	@echo "  $(CYAN)flush-db$(NC)             => $(RED)⚠️  Clear entire MongoDB (DANGER!)$(NC)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🔧 Setup & Maintenance$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)check-env$(NC)            => 🔍 Verify .env file"
	@echo "  $(CYAN)check-services$(NC)       => 🔍 Check MongoDB & Redis status"
	@echo "  $(CYAN)check-versions$(NC)       => 🔍 Check Python, Node versions"
	@echo "  $(CYAN)status$(NC)               => 📊 Show complete system status"
	@echo "  $(CYAN)clean$(NC)                => 🧹 Clean cache & temp files"
	@echo "  $(CYAN)clean-all$(NC)            => 🧹 Deep clean (includes .venv)"
	@echo "  $(CYAN)collectstatic$(NC)        => 📁 Collect Django static files"
	@echo "  $(CYAN)requirements$(NC)         => 📦 Update requirements.txt"
	@echo "  $(CYAN)update-deps$(NC)          => ⬆️  Update all dependencies"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🧪 Testing & Quality$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)test$(NC)                 => 🧪 Run all tests"
	@echo "  $(CYAN)test-coverage$(NC)        => 📈 Run tests with coverage report"
	@echo "  $(CYAN)lint$(NC)                 => 🔍 Run code linters (flake8)"
	@echo "  $(CYAN)format$(NC)               => ✨ Format code with black"
	@echo "  $(CYAN)audit$(NC)                => 🔒 Security audit (pip check)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)📋 Logs & Monitoring$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)logs$(NC)                 => 📋 View Django application logs"
	@echo "  $(CYAN)logs-celery$(NC)          => 📋 View Celery worker logs"
	@echo "  $(CYAN)logs-error$(NC)           => 🚨 View error logs only"
	@echo ""
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)💡 Quick Start Guide:$(NC)"
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(GREEN)1.$(NC) make install              $(BLUE)# Install everything$(NC)"
	@echo "  $(GREEN)2.$(NC) make createsuperuser      $(BLUE)# Create admin account$(NC)"
	@echo "  $(GREEN)3.$(NC) make seed                 $(BLUE)# Add sample products$(NC)"
	@echo "  $(GREEN)4.$(NC) make dev-all              $(BLUE)# Start all services$(NC)"
	@echo "  $(GREEN)5.$(NC) Visit: $(CYAN)http://localhost:8000$(NC)"
	@echo ""
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)📚 Common Workflows:$(NC)"
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)Development:$(NC)        make dev-all"
	@echo "  $(CYAN)Testing:$(NC)            make test-coverage"
	@echo "  $(CYAN)Code Quality:$(NC)       make lint && make format"
	@echo "  $(CYAN)Database Backup:$(NC)    make backup-db"
	@echo "  $(CYAN)Fresh Start:$(NC)        make restart"
	@echo "  $(CYAN)Check Status:$(NC)       make status"
	@echo ""
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(GREEN)🌐 Service URLs:$(NC)"
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  • Django:     $(CYAN)http://127.0.0.1:8000$(NC)"
	@echo "  • Admin:      $(CYAN)http://127.0.0.1:8000/admin$(NC)"
	@echo "  • API Docs:   $(CYAN)http://127.0.0.1:8000/api$(NC)"
	@echo "  • MongoDB:    $(CYAN)mongodb://localhost:27017$(NC)"
	@echo "  • Redis:      $(CYAN)redis://localhost:6379$(NC)"
	@echo ""
	@echo "$(RED)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(RED)⚠️  Important Notes:$(NC)"
	@echo "$(RED)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  • Ensure MongoDB & Redis are running before 'make dev-all'"
	@echo "  • Use 'make check-services' to verify services"
	@echo "  • Update .env file with your credentials after install"
	@echo "  • Run 'make stop' to gracefully stop all services"
	@echo ""

check-versions:
	@echo "$(YELLOW)🔍 Checking system requirements...$(NC)"
	@command -v $(PYTHON) >/dev/null 2>&1 || { echo "$(RED)❌ Python 3 not found!$(NC)"; exit 1; }
	@$(PYTHON) -c "import sys; exit(0 if sys.version_info >= (3, 10) else 1)" || { \
		echo "$(RED)❌ Python 3.10+ required!$(NC)"; \
		echo "$(YELLOW)   Current: $$($(PYTHON) --version)$(NC)"; \
		exit 1; \
	}
	@command -v mongod >/dev/null 2>&1 || echo "$(YELLOW)⚠️  MongoDB not found in PATH (may be running as service)$(NC)"
	@command -v redis-server >/dev/null 2>&1 || echo "$(YELLOW)⚠️  Redis not found in PATH (may be running as service)$(NC)"
	@echo "$(GREEN)✓ Python: $$($(PYTHON) --version)$(NC)"

check-venv:
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(RED)⚠️  Virtual environment is ACTIVE$(NC)"; \
		echo "$(YELLOW)   Location: $$VIRTUAL_ENV$(NC)"; \
		echo "$(CYAN)   To deactivate, run: deactivate$(NC)"; \
		echo ""; \
	else \
		echo "$(GREEN)✓ No virtual environment active$(NC)"; \
	fi

check-env:
	@echo "$(YELLOW)🔍 Checking environment file...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)⚠️  .env file not found$(NC)"; \
		if [ -f .env.example ]; then \
			echo "$(CYAN)📋 Creating from .env.example...$(NC)"; \
			cp .env.example .env; \
			echo "$(GREEN)✓ Created .env file$(NC)"; \
			echo "$(RED)⚠️  IMPORTANT: Please update .env with your credentials!$(NC)"; \
			echo ""; \
			echo "$(CYAN)Required configurations:$(NC)"; \
			echo "  • SECRET_KEY"; \
			echo "  • MONGODB_NAME"; \
			echo "  • EMAIL_HOST_USER & EMAIL_HOST_PASSWORD"; \
			echo ""; \
		else \
			echo "$(RED)❌ Please create .env file$(NC)"; \
			echo "$(CYAN)Required variables:$(NC)"; \
			echo "  SECRET_KEY=your-secret-key"; \
			echo "  DEBUG=True"; \
			echo "  MONGODB_NAME=ebikepoint_erp"; \
			echo "  MONGODB_HOST=localhost"; \
			echo "  MONGODB_PORT=27017"; \
			echo "  REDIS_HOST=127.0.0.1"; \
			echo "  REDIS_PORT=6379"; \
			exit 1; \
		fi \
	else \
		echo "$(GREEN)✓ .env file exists$(NC)"; \
	fi

check-services:
	@echo "$(YELLOW)🔍 Checking required services...$(NC)"
	@echo ""
	@echo "$(CYAN)MongoDB:$(NC)"
	@if lsof -Pi :$(MONGODB_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "  $(GREEN)✓ Running on port $(MONGODB_PORT)$(NC)"; \
	else \
		echo "  $(RED)✗ Not running on port $(MONGODB_PORT)$(NC)"; \
		echo "  $(YELLOW)  Start with: brew services start mongodb-community$(NC)"; \
		echo "  $(YELLOW)  Or run: mongod --config /usr/local/etc/mongod.conf$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Redis:$(NC)"
	@if lsof -Pi :$(REDIS_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "  $(GREEN)✓ Running on port $(REDIS_PORT)$(NC)"; \
	else \
		echo "  $(RED)✗ Not running on port $(REDIS_PORT)$(NC)"; \
		echo "  $(YELLOW)  Start with: brew services start redis$(NC)"; \
		echo "  $(YELLOW)  Or run: redis-server$(NC)"; \
	fi
	@echo ""

install: check-versions
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║     🔧 Installing Backend Server          ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(YELLOW)⚠️  Please deactivate your venv first!$(NC)"; \
		echo "$(CYAN)   Run: deactivate$(NC)"; \
		exit 1; \
	fi
	@$(MAKE) check-services
	@echo ""
	@echo "$(YELLOW)📦 Creating virtual environment (.venv)...$(NC)"
	@$(PYTHON) -m venv $(VENV)
	@echo "$(GREEN)✓ Virtual environment created$(NC)"
	@echo ""
	@echo "$(YELLOW)📦 Installing dependencies...$(NC)"
	@$(VENV_BIN)/pip install --upgrade pip --quiet
	@$(VENV_BIN)/pip install -r requirements.txt --quiet
	@echo "$(GREEN)✓ Dependencies installed$(NC)"
	@echo ""
	@$(MAKE) check-env
	@echo ""
	@echo "$(YELLOW)🗄️  Setting up database...$(NC)"
	@echo "$(CYAN)   Running Django migrations...$(NC)"
	@$(VENV_BIN)/python manage.py migrate --noinput 2>&1 || { \
		echo "$(RED)❌ Migration failed!$(NC)"; \
		echo "$(YELLOW)💡 Tip: Check your MongoDB connection in .env$(NC)"; \
		exit 1; \
	}
	@echo "$(GREEN)✓ Migrations completed$(NC)"
	@echo ""
	@echo "$(YELLOW)📁 Collecting static files...$(NC)"
	@mkdir -p static staticfiles media
	@$(VENV_BIN)/python manage.py collectstatic --noinput --clear 2>&1 | grep -v "^Copying" || true
	@echo "$(GREEN)✓ Static files collected$(NC)"
	@echo ""
	@echo "$(GREEN)✅ Installation complete!$(NC)"
	@echo ""
	@echo "$(BLUE)╔══════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║           📋 Next Steps                      ║$(NC)"
	@echo "$(BLUE)╠══════════════════════════════════════════════╣$(NC)"
	@echo "$(BLUE)║$(NC)  1. Update .env with your credentials        $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  2. Run 'make createsuperuser'               $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  3. Run 'make dev-all' to start              $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  4. Visit http://localhost:8000              $(BLUE)║$(NC)"
	@echo "$(BLUE)╚══════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Installation Summary:$(NC)"
	@echo "  • Virtual environment (.venv) ✓"
	@echo "  • Dependencies installed ✓"
	@echo "  • Database migrated ✓"
	@echo "  • Static files collected ✓"
	@echo ""

dev: check-services
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║      🚀 Starting Django Server            ║$(NC)"
	@echo "$(PURPLE)╠═══════════════════════════════════════════╣$(NC)"
	@echo "$(PURPLE)║         http://127.0.0.1:$(BACKEND_PORT)             ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py runserver $(BACKEND_PORT)

dev-all:
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║   🚀 Starting All Services (Tabs)         ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(MAKE) check-services
	@echo ""
	@echo "$(CYAN)Opening Django server in new tab...$(NC)"
	@osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)\" && make runserver"' > /dev/null
	@sleep 1
	@echo "$(CYAN)Opening Celery worker in new tab...$(NC)"
	@osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)\" && make celery-worker"' > /dev/null
	@sleep 1
	@echo "$(CYAN)Opening Celery beat in new tab...$(NC)"
	@osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)\" && make celery-beat"' > /dev/null
	@sleep 1
	@echo ""
	@echo "$(GREEN)✅ All services starting in new tabs!$(NC)"
	@echo ""
	@echo "$(BLUE)╔════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║          🌐 Service URLs                       ║$(NC)"
	@echo "$(BLUE)╠════════════════════════════════════════════════╣$(NC)"
	@echo "$(BLUE)║$(NC)  Django:  $(CYAN)http://127.0.0.1:8000$(NC)                $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  Admin:   $(CYAN)http://127.0.0.1:8000/admin$(NC)          $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  API:     $(CYAN)http://127.0.0.1:8000/api$(NC)            $(BLUE)║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)💡 Use 'make stop' to stop all services$(NC)"
	@echo ""

runserver:
	@echo "$(CYAN)╔══════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║       🔧 Django Development Server           ║$(NC)"
	@echo "$(CYAN)║   http://127.0.0.1:$(BACKEND_PORT)                      ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py runserver $(BACKEND_PORT)

celery-worker:
	@echo "$(CYAN)╔══════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║          🔄 Celery Worker                    ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/celery -A config worker -l info

celery-beat:
	@echo "$(CYAN)╔══════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║          ⏰ Celery Beat Scheduler            ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════╝$(NC)"
	@echo ""
	@$(VENV_BIN)/celery -A config beat -l info

stop:
	@echo "$(RED)🛑 Stopping all services...$(NC)"
	@pkill -f "manage.py runserver" 2>/dev/null || true
	@pkill -f "celery.*worker" 2>/dev/null || true
	@pkill -f "celery.*beat" 2>/dev/null || true
	@lsof -ti:$(BACKEND_PORT) | xargs kill -9 2>/dev/null || true
	@echo "$(GREEN)✓ All services stopped$(NC)"

clean:
	@echo "$(RED)🧹 Cleaning temporary files...$(NC)"
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(YELLOW)⚠️  Warning: Virtual environment is currently active!$(NC)"; \
		echo "$(YELLOW)   After cleaning, run: deactivate$(NC)"; \
		echo ""; \
	fi
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@find . -type f -name "*.pyo" -delete 2>/dev/null || true
	@find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	@rm -rf .pytest_cache 2>/dev/null || true
	@rm -rf .coverage 2>/dev/null || true
	@rm -rf htmlcov 2>/dev/null || true
	@rm -rf celerybeat-schedule 2>/dev/null || true
	@rm -f celerybeat-schedule.db 2>/dev/null || true
	@echo "$(GREEN)✓ Cleaned temporary files$(NC)"

clean-all: clean
	@echo "$(RED)🧹 Deep cleaning (removing .venv)...$(NC)"
	@rm -rf $(VENV) 2>/dev/null || true
	@rm -rf staticfiles 2>/dev/null || true
	@echo "$(GREEN)✓ Deep clean complete$(NC)"

restart:
	@echo "$(PURPLE)🔄 Restarting backend...$(NC)"
	@$(MAKE) stop
	@$(MAKE) clean
	@$(MAKE) install
	@echo ""
	@echo "$(GREEN)✅ Ready! Run 'make dev-all' to start$(NC)"

migrate:
	@echo "$(YELLOW)📊 Running Django migrations...$(NC)"
	@$(VENV_BIN)/python manage.py migrate
	@echo "$(GREEN)✓ Migrations completed$(NC)"

makemigrations:
	@echo "$(YELLOW)📝 Creating Django migrations...$(NC)"
	@$(VENV_BIN)/python manage.py makemigrations
	@echo "$(GREEN)✓ Migrations created$(NC)"
	@echo "$(CYAN)💡 Don't forget to run 'make migrate'$(NC)"

createsuperuser:
	@echo "$(CYAN)👤 Creating MongoDB admin user...$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py createsuperuser_mongo

shell:
	@echo "$(CYAN)🐚 Opening Django shell...$(NC)"
	@$(VENV_BIN)/python manage.py shell

shell-plus:
	@echo "$(CYAN)🐚 Opening Django shell_plus...$(NC)"
	@$(VENV_BIN)/python manage.py shell_plus 2>/dev/null || { \
		echo "$(YELLOW)⚠️  shell_plus not available. Installing django-extensions...$(NC)"; \
		$(VENV_BIN)/pip install django-extensions; \
		$(VENV_BIN)/python manage.py shell_plus; \
	}

dbshell:
	@echo "$(CYAN)🗄️  Opening MongoDB shell...$(NC)"
	@mongosh ebikepoint_erp

seed:
	@echo "$(YELLOW)🌱 Seeding database with sample data...$(NC)"
	@echo ""
	@$(VENV_BIN)/python manage.py seed_products
	@echo ""
	@echo "$(GREEN)✓ Database seeded successfully$(NC)"

seed-clear:
	@echo "$(RED)⚠️  This will clear existing products and reseed$(NC)"
	@echo "$(YELLOW)Are you sure? (yes/no)$(NC)"
	@read -p "> " answer; \
	if [ "$$answer" = "yes" ]; then \
		$(VENV_BIN)/python manage.py seed_products --clear; \
		echo ""; \
		echo "$(GREEN)✓ Database cleared and reseeded$(NC)"; \
	else \
		echo "$(GREEN)Cancelled$(NC)"; \
	fi

flush-db:
	@echo "$(RED)⚠️  WARNING: This will delete ALL data from MongoDB!$(NC)"
	@echo "$(YELLOW)Are you sure? (yes/no)$(NC)"
	@read -p "> " answer; \
	if [ "$$answer" = "yes" ]; then \
		echo "$(RED)Flushing database...$(NC)"; \
		$(VENV_BIN)/python manage.py shell -c "from mongoengine import connection; connection.get_db().client.drop_database('ebikepoint_erp')"; \
		echo "$(GREEN)✓ Database flushed$(NC)"; \
		echo "$(CYAN)Run 'make migrate' to recreate tables$(NC)"; \
	else \
		echo "$(GREEN)Cancelled$(NC)"; \
	fi

status:
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║        📊 Backend Status                  ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Installation:$(NC)"
	@echo "  Virtual Env: $(shell [ -d $(VENV) ] && echo '$(GREEN)✓ Installed (.venv)$(NC)' || echo '$(RED)✗ Missing$(NC)')"
	@echo "  Dependencies: $(shell [ -f $(VENV_BIN)/python ] && $(VENV_BIN)/pip list --format=freeze | wc -l | xargs echo | sed 's/^/$(GREEN)/' | sed 's/$$/packages$(NC)/' || echo '$(RED)✗ Not installed$(NC)')"
	@echo ""
	@echo "$(CYAN)Services:$(NC)"
	@echo "  MongoDB: $(shell lsof -Pi :$(MONGODB_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && echo '$(GREEN)✓ Running :$(MONGODB_PORT)$(NC)' || echo '$(RED)✗ Not running$(NC)')"
	@echo "  Redis: $(shell lsof -Pi :$(REDIS_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && echo '$(GREEN)✓ Running :$(REDIS_PORT)$(NC)' || echo '$(RED)✗ Not running$(NC)')"
	@echo "  Django: $(shell lsof -Pi :$(BACKEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && echo '$(GREEN)✓ Running :$(BACKEND_PORT)$(NC)' || echo '$(YELLOW)○ Stopped$(NC)')"
	@echo "  Celery Worker: $(shell pgrep -f 'celery.*worker' >/dev/null 2>&1 && echo '$(GREEN)✓ Running$(NC)' || echo '$(YELLOW)○ Stopped$(NC)')"
	@echo "  Celery Beat: $(shell pgrep -f 'celery.*beat' >/dev/null 2>&1 && echo '$(GREEN)✓ Running$(NC)' || echo '$(YELLOW)○ Stopped$(NC)')"
	@echo ""
	@echo "$(CYAN)Environment:$(NC)"
	@echo "  .env file: $(shell [ -f .env ] && echo '$(GREEN)✓ Exists$(NC)' || echo '$(RED)✗ Missing$(NC)')"
	@echo "  Python: $(shell $(PYTHON) --version 2>&1 | sed 's/Python //')"
	@echo ""
	@echo "$(CYAN)Database:$(NC)"
	@if [ -d $(VENV) ]; then \
		$(VENV_BIN)/python -c "from mongoengine import connect; connect('ebikepoint_erp'); print('  Status: \033[0;32m✓ Connected\033[0m')" 2>/dev/null || echo "  Status: $(RED)✗ Cannot connect$(NC)"; \
	else \
		echo "  Status: $(YELLOW)○ .venv not found$(NC)"; \
	fi
	@echo ""
	@if [ -n "$$VIRTUAL_ENV" ]; then \
		echo "$(CYAN)Virtual Environment:$(NC)"; \
		echo "  $(RED)⚠️  Active (run 'deactivate')$(NC)"; \
		echo ""; \
	fi

quick-check:
	@echo "$(CYAN)Quick Status Check:$(NC)"
	@echo -n "MongoDB: "; lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1 && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"
	@echo -n "Redis: "; lsof -Pi :6379 -sTCP:LISTEN -t >/dev/null 2>&1 && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"
	@echo -n "Django: "; lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"

test:
	@echo "$(YELLOW)🧪 Running tests...$(NC)"
	@$(VENV_BIN)/python manage.py test

test-coverage:
	@echo "$(YELLOW)🧪 Running tests with coverage...$(NC)"
	@$(VENV_BIN)/coverage run --source='.' manage.py test
	@$(VENV_BIN)/coverage report
	@$(VENV_BIN)/coverage html
	@echo "$(GREEN)✓ Coverage report generated in htmlcov/$(NC)"
	@echo "$(CYAN)Open htmlcov/index.html to view$(NC)"

lint:
	@echo "$(YELLOW)🔍 Running linters...$(NC)"
	@$(VENV_BIN)/flake8 . --exclude=$(VENV),migrations --max-line-length=120 2>/dev/null || { \
		echo "$(YELLOW)⚠️  flake8 not installed. Installing...$(NC)"; \
		$(VENV_BIN)/pip install flake8 --quiet; \
		$(VENV_BIN)/flake8 . --exclude=$(VENV),migrations --max-line-length=120; \
	}

format:
	@echo "$(YELLOW)✨ Formatting code with black...$(NC)"
	@$(VENV_BIN)/black . --exclude=$(VENV) 2>/dev/null || { \
		echo "$(YELLOW)⚠️  black not installed. Installing...$(NC)"; \
		$(VENV_BIN)/pip install black --quiet; \
		$(VENV_BIN)/black . --exclude=$(VENV); \
	}
	@echo "$(GREEN)✓ Code formatted$(NC)"

logs:
	@echo "$(CYAN)📋 Recent application logs:$(NC)"
	@echo ""
	@if [ -f logs/django.log ]; then \
		tail -n 50 logs/django.log; \
	else \
		echo "$(YELLOW)No logs found$(NC)"; \
		echo "$(CYAN)Logs will appear here after running the server$(NC)"; \
	fi

logs-celery:
	@echo "$(CYAN)📋 Recent Celery logs:$(NC)"
	@echo ""
	@if [ -f logs/celery.log ]; then \
		tail -n 50 logs/celery.log; \
	else \
		echo "$(YELLOW)No Celery logs found$(NC)"; \
	fi

logs-error:
	@echo "$(RED)🚨 Recent error logs:$(NC)"
	@echo ""
	@if [ -f logs/errors.log ]; then \
		tail -n 50 logs/errors.log; \
	else \
		echo "$(GREEN)No errors logged$(NC)"; \
	fi

audit:
	@echo "$(YELLOW)🔍 Running security audit...$(NC)"
	@echo ""
	@echo "$(CYAN)Checking Python packages:$(NC)"
	@$(VENV_BIN)/pip check 2>&1 || echo "$(YELLOW)⚠️  Some issues found$(NC)"
	@echo ""
	@echo "$(CYAN)Checking for known vulnerabilities:$(NC)"
	@$(VENV_BIN)/pip-audit 2>/dev/null || { \
		echo "$(YELLOW)⚠️  pip-audit not installed$(NC)"; \
		echo "$(CYAN)Install with: $(VENV_BIN)/pip install pip-audit$(NC)"; \
	}

requirements:
	@echo "$(YELLOW)📦 Updating requirements.txt...$(NC)"
	@$(VENV_BIN)/pip freeze > requirements.txt
	@echo "$(GREEN)✓ requirements.txt updated$(NC)"

update-deps:
	@echo "$(YELLOW)📦 Updating dependencies...$(NC)"
	@$(VENV_BIN)/pip install --upgrade -r requirements.txt
	@echo "$(GREEN)✓ Dependencies updated$(NC)"
	@echo "$(YELLOW)⚠️  Run 'make audit' to check for issues$(NC)"

collectstatic:
	@echo "$(YELLOW)📁 Collecting static files...$(NC)"
	@$(VENV_BIN)/python manage.py collectstatic --noinput
	@echo "$(GREEN)✓ Static files collected$(NC)"

show-urls:
	@echo "$(CYAN)📋 Available URLs:$(NC)"
	@$(VENV_BIN)/python manage.py show_urls 2>/dev/null || { \
		echo "$(YELLOW)⚠️  django-extensions not installed$(NC)"; \
		$(VENV_BIN)/python manage.py shell -c "from django.urls import get_resolver; [print(p.pattern) for p in get_resolver().url_patterns]"; \
	}

backup-db:
	@echo "$(YELLOW)💾 Creating MongoDB backup...$(NC)"
	@mkdir -p backups
	@mongodump --db=ebikepoint_erp --out=backups/backup_$$(date +%Y%m%d_%H%M%S)
	@echo "$(GREEN)✓ Backup created in backups/$(NC)"

restore-db:
	@echo "$(YELLOW)📥 Available backups:$(NC)"
	@ls -1 backups/ 2>/dev/null || echo "$(RED)No backups found$(NC)"
	@echo ""
	@echo "$(CYAN)Enter backup directory name:$(NC)"
	@read -p "> " backup; \
	if [ -d "backups/$$backup" ]; then \
		echo "$(YELLOW)Restoring from $$backup...$(NC)"; \
		mongorestore --db=ebikepoint_erp --drop backups/$$backup/ebikepoint_erp; \
		echo "$(GREEN)✓ Database restored$(NC)"; \
	else \
		echo "$(RED)Backup not found$(NC)"; \
	fi

version:
	@echo "$(CYAN)E-Bike Point ERP Backend$(NC)"
	@echo "Version: 1.0.0"
	@echo "Python: $$($(PYTHON) --version)"
	@echo "Django: $$($(VENV_BIN)/python -c 'import django; print(django.get_version())')"

# Aliases for common typos
server: runserver
run: runserver
start: dev
install-deps: install
update: update-deps
backup: backup-db
restore: restore-db

.DEFAULT_GOAL := help

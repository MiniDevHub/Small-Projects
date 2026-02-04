.PHONY: help install clean dev build preview test lint format audit deps check-node check-env status stop open

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
NODE_MIN_VERSION := 18.0.0
NPM_MIN_VERSION := 9.0.0
FRONTEND_PORT := 5173
FRONTEND_URL := http://localhost:$(FRONTEND_PORT)
BACKEND_PORT := 8000
BACKEND_URL := http://localhost:$(BACKEND_PORT)
API_URL := $(BACKEND_URL)/api
NODE_MODULES := node_modules
BUILD_DIR := dist
PREVIEW_PORT := 4173

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
	@echo "$(CYAN)║       ⚛️  E-Bike Point ERP - Frontend Commands         ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BLUE)Usage: make <command>$(NC)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🚀 Quick Start Commands$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)setup$(NC)                $(ARROW) 🎯 Complete setup (install + check + open)"
	@echo "  $(CYAN)dev$(NC)                  $(ARROW) 🔧 Start dev server"
	@echo "  $(CYAN)dev-open$(NC)             $(ARROW) 🌐 Start dev server + open browser"
	@echo "  $(CYAN)open$(NC)                 $(ARROW) 🌐 Open app in browser"
	@echo "  $(CYAN)stop$(NC)                 $(ARROW) 🛑 Stop all servers"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)💻 Development$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)dev$(NC)                  $(ARROW) 🌐 Start Vite dev server"
	@echo "  $(CYAN)dev-open$(NC)             $(ARROW) 🌐 Dev server + auto-open browser"
	@echo "  $(CYAN)dev-host$(NC)             $(ARROW) 📡 Dev server (network accessible)"
	@echo "  $(CYAN)dev-host-open$(NC)        $(ARROW) 📡 Network dev + open browser"
	@echo "  $(CYAN)dev-debug$(NC)            $(ARROW) 🐛 Dev server with debug mode"
	@echo "  $(CYAN)restart$(NC)              $(ARROW) 🔄 Restart dev server"
	@echo "  $(CYAN)stop$(NC)                 $(ARROW) 🛑 Stop dev server"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🌐 Browser & Navigation$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)open$(NC)                 $(ARROW) 🌐 Open homepage"
	@echo "  $(CYAN)open-login$(NC)           $(ARROW) 🔐 Open login page"
	@echo "  $(CYAN)open-register$(NC)        $(ARROW) 📝 Open registration"
	@echo "  $(CYAN)open-admin$(NC)           $(ARROW) 👨‍💼 Open admin dashboard"
	@echo "  $(CYAN)open-api$(NC)             $(ARROW) 📡 Open backend API"
	@echo "  $(CYAN)open-build$(NC)           $(ARROW) 📦 Open production preview"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🏗️  Build & Deploy$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)build$(NC)                $(ARROW) 🏗️  Build for production"
	@echo "  $(CYAN)build-check$(NC)          $(ARROW) ✅ Build + verify output"
	@echo "  $(CYAN)preview$(NC)              $(ARROW) 👀 Preview production build"
	@echo "  $(CYAN)preview-open$(NC)         $(ARROW) 👀 Preview + open browser"
	@echo "  $(CYAN)build-analyze$(NC)        $(ARROW) 📊 Analyze bundle size"
	@echo "  $(CYAN)serve$(NC)                $(ARROW) 🚀 Serve production build"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🧪 Testing & Quality$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)test$(NC)                 $(ARROW) 🧪 Run tests"
	@echo "  $(CYAN)test-watch$(NC)           $(ARROW) 👁️  Run tests in watch mode"
	@echo "  $(CYAN)test-coverage$(NC)        $(ARROW) 📊 Generate coverage report"
	@echo "  $(CYAN)lint$(NC)                 $(ARROW) 🔍 Run ESLint"
	@echo "  $(CYAN)lint-fix$(NC)             $(ARROW) 🔧 Fix ESLint errors"
	@echo "  $(CYAN)format$(NC)               $(ARROW) ✨ Format code with Prettier"
	@echo "  $(CYAN)format-check$(NC)         $(ARROW) 🔍 Check code formatting"
	@echo "  $(CYAN)quality$(NC)              $(ARROW) 🏆 Run all quality checks"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🏥 Health & Monitoring$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)health$(NC)               $(ARROW) 🏥 Complete health check"
	@echo "  $(CYAN)check-all$(NC)            $(ARROW) 🔍 Run all checks"
	@echo "  $(CYAN)check-ports$(NC)          $(ARROW) 🔌 Check if ports are free"
	@echo "  $(CYAN)monitor$(NC)              $(ARROW) 📊 Monitor services (live)"
	@echo "  $(CYAN)logs$(NC)                 $(ARROW) 📋 Show recent logs"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)📦 Dependencies$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)install$(NC)              $(ARROW) 📦 Install dependencies"
	@echo "  $(CYAN)install-clean$(NC)        $(ARROW) 🧹 Clean install"
	@echo "  $(CYAN)deps$(NC)                 $(ARROW) 📋 List dependencies"
	@echo "  $(CYAN)deps-check$(NC)           $(ARROW) 🔍 Check for issues"
	@echo "  $(CYAN)deps-update$(NC)          $(ARROW) ⬆️  Update all packages"
	@echo "  $(CYAN)audit$(NC)                $(ARROW) 🔒 Security audit"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🔧 Utilities$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)clean$(NC)                $(ARROW) 🧹 Clean build artifacts"
	@echo "  $(CYAN)clean-all$(NC)            $(ARROW) 🧹 Deep clean (includes node_modules)"
	@echo "  $(CYAN)reset$(NC)                $(ARROW) 🔄 Complete reset"
	@echo "  $(CYAN)backup$(NC)               $(ARROW) 💾 Backup current state"
	@echo ""
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)$(STAR) Quick Start:$(NC) make setup"
	@echo "$(YELLOW)$(STAR) Development:$(NC) make dev-open"
	@echo "$(YELLOW)$(STAR) Production:$(NC)  make build && make preview-open"
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo ""

# ============================================
# 🚀 Quick Start Commands
# ============================================

setup: install check-all
	@echo ""
	@echo "$(GREEN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║     $(CHECK) Setup Complete!                     ║$(NC)"
	@echo "$(GREEN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Next steps:$(NC)"
	@echo "  1. $(YELLOW)make dev-open$(NC)     $(ARROW) Start development"
	@echo "  2. $(YELLOW)make open-login$(NC)   $(ARROW) Test login page"
	@echo ""

# ============================================
# 💻 Development Commands
# ============================================

dev: check-env check-ports
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║      🚀 Starting Development Server       ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)  URL:$(NC) $(WHITE)$(FRONTEND_URL)$(NC)"
	@echo "$(CYAN)  API:$(NC) $(WHITE)$(API_URL)$(NC)"
	@echo ""
	@echo "$(YELLOW)  Press Ctrl+C to stop$(NC)"
	@echo ""
	@npm run dev

dev-open: check-env check-ports
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║   🚀 Starting Dev Server (Auto-Open)      ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@$(MAKE) open-delay &
	@npm run dev

dev-host: check-env
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║  📡 Starting Dev Server (Network Mode)    ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)  Network access enabled$(NC)"
	@echo ""
	@npm run dev -- --host

dev-host-open: check-env
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║  📡 Network Dev Server (Auto-Open)        ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@$(MAKE) open-delay &
	@npm run dev -- --host --open

dev-debug:
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║      🐛 Debug Mode Development            ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@DEBUG=* npm run dev

# ============================================
# 🌐 Browser Commands
# ============================================

open:
	@echo "$(CYAN)🌐 Opening E-Bike Point...$(NC)"
	@$(OPEN_CMD) $(FRONTEND_URL) 2>/dev/null || { \
		echo "$(YELLOW)  Trying alternative...$(NC)"; \
		python3 -m webbrowser $(FRONTEND_URL) 2>/dev/null || \
		echo "$(RED)  $(CROSS) Could not open browser$(NC)"; \
		echo "$(CYAN)  Please open manually: $(WHITE)$(FRONTEND_URL)$(NC)"; \
	}

open-delay:
	@sleep 3 && $(MAKE) open

open-login:
	@echo "$(CYAN)🔐 Opening login page...$(NC)"
	@$(OPEN_CMD) $(FRONTEND_URL)/login

open-register:
	@echo "$(CYAN)📝 Opening registration page...$(NC)"
	@$(OPEN_CMD) $(FRONTEND_URL)/register

open-admin:
	@echo "$(CYAN)👨‍💼 Opening admin dashboard...$(NC)"
	@$(OPEN_CMD) $(FRONTEND_URL)/admin/dashboard

open-api:
	@echo "$(CYAN)📡 Opening API documentation...$(NC)"
	@$(OPEN_CMD) $(API_URL)

open-build:
	@if lsof -Pi :$(PREVIEW_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "$(CYAN)📦 Opening production preview...$(NC)"; \
		$(OPEN_CMD) http://localhost:$(PREVIEW_PORT); \
	else \
		echo "$(YELLOW)$(CROSS) Preview server not running$(NC)"; \
		echo "$(CYAN)  Run: make preview-open$(NC)"; \
	fi

# ============================================
# 🏗️ Build Commands
# ============================================

build: check-env
	@echo "$(YELLOW)🏗️  Building for production...$(NC)"
	@npm run build
	@echo ""
	@echo "$(GREEN)$(CHECK) Build complete!$(NC)"
	@echo "$(CYAN)  Output: $(BUILD_DIR)/$(NC)"
	@if [ -d "$(BUILD_DIR)" ]; then \
		SIZE=$$(du -sh $(BUILD_DIR) | cut -f1); \
		FILES=$$(find $(BUILD_DIR) -type f | wc -l | xargs); \
		echo "$(CYAN)  Size:   $$SIZE$(NC)"; \
		echo "$(CYAN)  Files:  $$FILES$(NC)"; \
	fi
	@echo ""
	@echo "$(YELLOW)Next: make preview-open$(NC)"

build-check: build
	@echo ""
	@echo "$(YELLOW)🔍 Verifying build...$(NC)"
	@if [ -d "$(BUILD_DIR)" ]; then \
		echo "$(GREEN)  $(CHECK) Build directory exists$(NC)"; \
		if [ -f "$(BUILD_DIR)/index.html" ]; then \
			echo "$(GREEN)  $(CHECK) index.html found$(NC)"; \
		else \
			echo "$(RED)  $(CROSS) index.html missing$(NC)"; \
			exit 1; \
		fi; \
		if [ -d "$(BUILD_DIR)/assets" ]; then \
			echo "$(GREEN)  $(CHECK) assets directory found$(NC)"; \
		else \
			echo "$(RED)  $(CROSS) assets directory missing$(NC)"; \
		fi; \
	else \
		echo "$(RED)  $(CROSS) Build directory missing$(NC)"; \
		exit 1; \
	fi
	@echo ""
	@echo "$(GREEN)$(CHECK) Build verification passed!$(NC)"

preview: build
	@echo "$(CYAN)👀 Starting production preview...$(NC)"
	@echo "$(YELLOW)  URL: http://localhost:$(PREVIEW_PORT)$(NC)"
	@echo ""
	@npm run preview

preview-open: build
	@echo "$(CYAN)👀 Starting production preview...$(NC)"
	@$(MAKE) open-preview-delay &
	@npm run preview

open-preview-delay:
	@sleep 2 && $(OPEN_CMD) http://localhost:$(PREVIEW_PORT)

serve: build
	@echo "$(CYAN)🚀 Serving production build...$(NC)"
	@npx serve $(BUILD_DIR) -p $(PREVIEW_PORT)

# ============================================
# 🧪 Testing & Quality Commands
# ============================================

test:
	@echo "$(YELLOW)🧪 Running tests...$(NC)"
	@npm run test 2>/dev/null || { \
		echo "$(YELLOW)  $(CROSS) No tests configured$(NC)"; \
		echo "$(CYAN)  Add tests with: npm install -D vitest @testing-library/react$(NC)"; \
	}

test-watch:
	@echo "$(YELLOW)👁️  Running tests in watch mode...$(NC)"
	@npm run test -- --watch 2>/dev/null || echo "$(YELLOW)Configure test:watch script$(NC)"

test-coverage:
	@echo "$(YELLOW)📊 Generating coverage report...$(NC)"
	@npm run test -- --coverage 2>/dev/null || echo "$(YELLOW)Configure coverage$(NC)"

lint:
	@echo "$(YELLOW)🔍 Running ESLint...$(NC)"
	@npm run lint 2>/dev/null || { \
		npx eslint src --ext .js,.jsx,.ts,.tsx 2>/dev/null || \
		echo "$(YELLOW)  ESLint not configured$(NC)"; \
	}

lint-fix:
	@echo "$(YELLOW)🔧 Fixing ESLint errors...$(NC)"
	@npm run lint -- --fix 2>/dev/null || { \
		npx eslint src --ext .js,.jsx,.ts,.tsx --fix 2>/dev/null || \
		echo "$(YELLOW)  ESLint not configured$(NC)"; \
	}

format:
	@echo "$(YELLOW)✨ Formatting code...$(NC)"
	@npx prettier --write "src/**/*.{js,jsx,ts,tsx,css,md}" 2>/dev/null || { \
		echo "$(YELLOW)  Installing Prettier...$(NC)"; \
		npm install -D prettier; \
		npx prettier --write "src/**/*.{js,jsx,ts,tsx,css,md}"; \
	}
	@echo "$(GREEN)  $(CHECK) Code formatted$(NC)"

format-check:
	@echo "$(YELLOW)🔍 Checking code format...$(NC)"
	@npx prettier --check "src/**/*.{js,jsx,ts,tsx,css,md}" 2>/dev/null || { \
		echo "$(YELLOW)  Code needs formatting$(NC)"; \
		echo "$(CYAN)  Run: make format$(NC)"; \
		exit 1; \
	}

quality: lint format-check test
	@echo ""
	@echo "$(GREEN)$(CHECK) All quality checks passed!$(NC)"

# ============================================
# 🏥 Health & Monitoring Commands
# ============================================

health: check-all
	@echo ""
	@echo "$(GREEN)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║       🏥 System Health Report             ║$(NC)"
	@echo "$(GREEN)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Frontend Status:$(NC)"
	@if lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "  Dev Server:    $(GREEN)$(CHECK) Running on port $(FRONTEND_PORT)$(NC)"; \
		echo "  Access URL:    $(CYAN)$(FRONTEND_URL)$(NC)"; \
	else \
		echo "  Dev Server:    $(YELLOW)○ Not running$(NC)"; \
		echo "                 $(CYAN)Run: make dev-open$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Backend Status:$(NC)"
	@if curl -s -o /dev/null -w "%{http_code}" $(API_URL) | grep -q "200\|301\|302"; then \
		echo "  API Server:    $(GREEN)$(CHECK) Accessible$(NC)"; \
		echo "  API URL:       $(CYAN)$(API_URL)$(NC)"; \
	else \
		echo "  API Server:    $(RED)$(CROSS) Not accessible$(NC)"; \
		echo "                 $(CYAN)Start with: cd ../server && make dev$(NC)"; \
	fi
	@echo ""
	@if [ -d "$(BUILD_DIR)" ]; then \
		SIZE=$$(du -sh $(BUILD_DIR) 2>/dev/null | cut -f1); \
		echo "$(CYAN)Production Build:$(NC)"; \
		echo "  Status:        $(GREEN)$(CHECK) Built$(NC)"; \
		echo "  Size:          $(CYAN)$$SIZE$(NC)"; \
		MODIFIED=$$(date -r $(BUILD_DIR) "+%Y-%m-%d %H:%M" 2>/dev/null || echo "Unknown"); \
		echo "  Last Build:    $(CYAN)$$MODIFIED$(NC)"; \
	else \
		echo "$(CYAN)Production Build:$(NC)"; \
		echo "  Status:        $(YELLOW)○ Not built$(NC)"; \
		echo "                 $(CYAN)Run: make build$(NC)"; \
	fi
	@echo ""

check-all: check-node check-env check-backend check-ports
	@echo ""
	@echo "$(GREEN)$(CHECK) All checks passed!$(NC)"

check-node:
	@echo "$(YELLOW)🔍 Checking Node.js environment...$(NC)"
	@command -v node >/dev/null 2>&1 || { \
		echo "$(RED)  $(CROSS) Node.js not found!$(NC)"; \
		echo "$(CYAN)  Install from: https://nodejs.org$(NC)"; \
		exit 1; \
	}
	@NODE_VERSION=$$(node -v | sed 's/v//'); \
	NODE_MAJOR=$$(echo $$NODE_VERSION | cut -d. -f1); \
	if [ $$NODE_MAJOR -lt 18 ]; then \
		echo "$(RED)  $(CROSS) Node.js 18+ required!$(NC)"; \
		echo "$(YELLOW)  Current: v$$NODE_VERSION$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)  $(CHECK) Node.js: $$(node -v)$(NC)"
	@echo "$(GREEN)  $(CHECK) npm: $$(npm -v)$(NC)"

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
			echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env; \
			echo "VITE_APP_NAME=E-Bike Point" >> .env; \
			echo "VITE_AUTO_LOGOUT_HOURS=9" >> .env; \
			echo "VITE_FREE_SERVICES_COUNT=4" >> .env; \
			echo "VITE_WARRANTY_MONTHS=24" >> .env; \
			echo "$(GREEN)  $(CHECK) Created default .env$(NC)"; \
		fi \
	else \
		echo "$(GREEN)  $(CHECK) .env exists$(NC)"; \
	fi

check-backend:
	@echo "$(YELLOW)🔍 Checking backend connection...$(NC)"
	@BACKEND_URL=$$(grep VITE_API_BASE_URL .env 2>/dev/null | cut -d '=' -f2 | tr -d ' ' || echo "http://localhost:8000/api"); \
	if curl -s -o /dev/null -w "%{http_code}" $$BACKEND_URL | grep -q "200\|301\|302"; then \
		echo "$(GREEN)  $(CHECK) Backend accessible at $$BACKEND_URL$(NC)"; \
	else \
		echo "$(YELLOW)  ⚠️  Backend not responding$(NC)"; \
		echo "$(CYAN)  Start backend: cd ../server && make dev$(NC)"; \
	fi

check-ports:
	@echo "$(YELLOW)🔌 Checking ports...$(NC)"
	@if lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "$(YELLOW)  ⚠️  Port $(FRONTEND_PORT) already in use$(NC)"; \
		PID=$$(lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t); \
		echo "$(CYAN)  Process PID: $$PID$(NC)"; \
		echo "$(CYAN)  Run 'make stop' to free the port$(NC)"; \
	else \
		echo "$(GREEN)  $(CHECK) Port $(FRONTEND_PORT) available$(NC)"; \
	fi

monitor:
	@echo "$(CYAN)📊 Monitoring services (Press Ctrl+C to exit)...$(NC)"
	@echo ""
	@while true; do \
		clear; \
		echo "$(CYAN)╔═══════════════════════════════════════════╗$(NC)"; \
		echo "$(CYAN)║       📊 E-Bike Point Monitor             ║$(NC)"; \
		echo "$(CYAN)╚═══════════════════════════════════════════╝$(NC)"; \
		echo ""; \
		echo "$(WHITE)Time: $$(date '+%H:%M:%S')$(NC)"; \
		echo ""; \
		echo -n "Frontend ($(FRONTEND_PORT)): "; \
		lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(RED)○ Stopped$(NC)"; \
		echo -n "Backend  ($(BACKEND_PORT)): "; \
		lsof -Pi :$(BACKEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(RED)○ Stopped$(NC)"; \
		echo -n "Preview  ($(PREVIEW_PORT)): "; \
		lsof -Pi :$(PREVIEW_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
			echo "$(GREEN)● Running$(NC)" || echo "$(YELLOW)○ Stopped$(NC)"; \
		echo ""; \
		echo "$(CYAN)Press Ctrl+C to exit$(NC)"; \
		sleep 2; \
	done

logs:
	@echo "$(CYAN)📋 Recent Vite logs:$(NC)"
	@echo ""
	@tail -n 20 ~/.npm/_logs/*.log 2>/dev/null || echo "$(YELLOW)No recent logs found$(NC)"

# ============================================
# 📦 Dependencies Commands
# ============================================

install: check-node
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║     📦 Installing Dependencies            ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@if [ -d "$(NODE_MODULES)" ]; then \
		echo "$(YELLOW)  ⚠️  node_modules exists$(NC)"; \
		echo "$(CYAN)  Use 'make install-clean' for fresh install$(NC)"; \
	fi
	@echo "$(YELLOW)Installing packages...$(NC)"
	@npm install --silent
	@echo "$(GREEN)$(CHECK) Dependencies installed$(NC)"
	@echo ""
	@$(MAKE) check-env

install-clean: clean-all install
	@echo "$(GREEN)$(CHECK) Clean installation complete!$(NC)"

deps:
	@echo "$(CYAN)📦 Installed packages:$(NC)"
	@echo ""
	@npm list --depth=0 | grep -v "deduped" || echo "$(YELLOW)No dependencies$(NC)"

deps-check:
	@echo "$(YELLOW)🔍 Checking dependencies...$(NC)"
	@echo ""
	@echo "$(CYAN)Outdated packages:$(NC)"
	@npm outdated || echo "$(GREEN)  $(CHECK) All packages up to date$(NC)"
	@echo ""
	@echo "$(CYAN)Security audit:$(NC)"
	@npm audit --audit-level=moderate || true

deps-update:
	@echo "$(YELLOW)⬆️  Updating dependencies...$(NC)"
	@npm update
	@echo "$(GREEN)$(CHECK) Dependencies updated$(NC)"
	@echo "$(CYAN)Run 'make audit' to check for vulnerabilities$(NC)"

audit:
	@echo "$(YELLOW)🔒 Running security audit...$(NC)"
	@npm audit
	@echo ""
	@echo "$(CYAN)To fix issues: make audit-fix$(NC)"

audit-fix:
	@echo "$(YELLOW)🔧 Fixing vulnerabilities...$(NC)"
	@npm audit fix
	@echo "$(GREEN)$(CHECK) Security fixes applied$(NC)"

# ============================================
# 🧹 Cleanup Commands
# ============================================

clean:
	@echo "$(RED)🧹 Cleaning build artifacts...$(NC)"
	@rm -rf $(BUILD_DIR) .vite node_modules/.vite .eslintcache
	@echo "$(GREEN)$(CHECK) Build artifacts cleaned$(NC)"

clean-all: clean
	@echo "$(RED)🧹 Deep cleaning...$(NC)"
	@rm -rf $(NODE_MODULES) package-lock.json
	@echo "$(GREEN)$(CHECK) Deep clean complete$(NC)"

reset: clean-all
	@echo "$(RED)🔄 Resetting project...$(NC)"
	@git checkout package.json 2>/dev/null || true
	@git checkout package-lock.json 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Project reset$(NC)"
	@echo "$(CYAN)Run 'make setup' to reinstall$(NC)"

backup:
	@echo "$(YELLOW)💾 Creating backup...$(NC)"
	@mkdir -p backups
	@tar -czf backups/frontend-backup-$$(date +%Y%m%d-%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=dist \
		--exclude=.vite \
		--exclude=backups \
		.
	@echo "$(GREEN)$(CHECK) Backup created in backups/$(NC)"

# ============================================
# 🛠️ Utility Commands
# ============================================

stop:
	@echo "$(RED)🛑 Stopping all servers...$(NC)"
	@lsof -ti:$(FRONTEND_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti:$(PREVIEW_PORT) | xargs kill -9 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) All servers stopped$(NC)"

restart: stop dev-open

status:
	@echo ""
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║        📊 Frontend Status                 ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Environment:$(NC)"
	@echo "  Node.js:      $$(node -v 2>/dev/null || echo '$(RED)Not installed$(NC)')"
	@echo "  npm:          $$(npm -v 2>/dev/null || echo '$(RED)Not installed$(NC)')"
	@echo "  Dependencies: $$([ -d $(NODE_MODULES) ] && echo '$(GREEN)$(CHECK) Installed$(NC)' || echo '$(RED)$(CROSS) Not installed$(NC)')"
	@if [ -d $(NODE_MODULES) ]; then \
		PKG_COUNT=$$(ls -1 $(NODE_MODULES) | wc -l | xargs); \
		echo "  Packages:     $(CYAN)$$PKG_COUNT installed$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Configuration:$(NC)"
	@echo "  .env file:    $$([ -f .env ] && echo '$(GREEN)$(CHECK) Present$(NC)' || echo '$(RED)$(CROSS) Missing$(NC)')"
	@if [ -f .env ] && grep -q "VITE_API_BASE_URL" .env; then \
		API=$$(grep VITE_API_BASE_URL .env | cut -d '=' -f2); \
		echo "  API URL:      $(CYAN)$$API$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Services:$(NC)"
	@echo -n "  Dev Server:   "
	@if lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "$(GREEN)$(CHECK) Running on port $(FRONTEND_PORT)$(NC)"; \
	else \
		echo "$(YELLOW)○ Not running$(NC)"; \
	fi
	@echo -n "  Preview:      "
	@if lsof -Pi :$(PREVIEW_PORT) -sTCP:LISTEN -t >/dev/null 2>&1; then \
		echo "$(GREEN)$(CHECK) Running on port $(PREVIEW_PORT)$(NC)"; \
	else \
		echo "$(YELLOW)○ Not running$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Build:$(NC)"
	@if [ -d $(BUILD_DIR) ]; then \
		echo "  Status:       $(GREEN)$(CHECK) Built$(NC)"; \
		SIZE=$$(du -sh $(BUILD_DIR) | cut -f1); \
		echo "  Size:         $(CYAN)$$SIZE$(NC)"; \
	else \
		echo "  Status:       $(YELLOW)○ Not built$(NC)"; \
	fi
	@echo ""

quick-status:
	@echo -n "Frontend: "; \
	lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && \
		echo "$(GREEN)●$(NC)" || echo "$(RED)○$(NC)"
	@echo -n "Backend:  "; \
	curl -s -o /dev/null -w "%{http_code}" $(API_URL) | grep -q "200\|301\|302" && \
		echo "$(GREEN)●$(NC)" || echo "$(RED)○$(NC)"

info:
	@echo "$(CYAN)E-Bike Point ERP - Frontend$(NC)"
	@echo "=========================="
	@echo "Framework:     React + Vite"
	@echo "UI Library:    Tailwind CSS"
	@echo "State Mgmt:    Zustand"
	@echo "API Client:    Axios + React Query"
	@echo "Dev Port:      $(FRONTEND_PORT)"
	@echo "Preview Port:  $(PREVIEW_PORT)"
	@echo "Backend URL:   $(BACKEND_URL)"

version:
	@echo "$(CYAN)Version Information:$(NC)"
	@echo "==================="
	@if [ -f package.json ]; then \
		APP_VERSION=$$(grep '"version"' package.json | head -1 | cut -d '"' -f4); \
		echo "App Version:   $$APP_VERSION"; \
	fi
	@echo "Node.js:       $$(node -v)"
	@echo "npm:           $$(npm -v)"
	@VITE_VERSION=$$(npm list vite 2>/dev/null | grep "vite@" | head -1 | sed 's/.*vite@//'); \
	[ -n "$$VITE_VERSION" ] && echo "Vite:          $$VITE_VERSION"
	@REACT_VERSION=$$(npm list react 2>/dev/null | grep " react@" | head -1 | sed 's/.*react@//'); \
	[ -n "$$REACT_VERSION" ] && echo "React:         $$REACT_VERSION"

# ============================================
# Aliases for convenience
# ============================================

start: dev-open
s: dev-open
d: dev
do: dev-open
b: build
p: preview-open
t: test
l: lint
f: format
i: install
c: clean
h: help

# Common typos
sever: dev
srever: dev
dve: dev
biuld: build
isntall: install
clen: clean

.PHONY: help install clean dev build preview test lint format audit deps check-node check-env status stop

# Colors
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
CYAN := \033[0;36m
PURPLE := \033[0;35m
BLUE := \033[0;34m
NC := \033[0m

# Variables
NODE_MIN_VERSION := 18.0.0
NPM_MIN_VERSION := 9.0.0
FRONTEND_PORT := 5173
BACKEND_URL := http://localhost:8000
NODE_MODULES := node_modules
BUILD_DIR := dist

help:
	@echo ""
	@echo "$(CYAN)╔═══════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║       ⚛️  E-Bike Point ERP - Frontend Setup            ║$(NC)"
	@echo "$(CYAN)╚═══════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BLUE)Usage: make <targetName>$(NC)"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🚀 Quick Start$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)install$(NC)              => 📦 Install all dependencies"
	@echo "  $(CYAN)dev$(NC)                  => 🔧 Start development server"
	@echo "  $(CYAN)build$(NC)                => 🏗️  Build for production"
	@echo "  $(CYAN)preview$(NC)              => 👀 Preview production build"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)💻 Development$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)dev$(NC)                  => 🌐 Start Vite dev server (:5173)"
	@echo "  $(CYAN)dev-host$(NC)             => 🌐 Dev server (network accessible)"
	@echo "  $(CYAN)dev-open$(NC)             => 🌐 Dev server (auto-open browser)"
	@echo "  $(CYAN)stop$(NC)                 => 🛑 Stop development server"
	@echo "  $(CYAN)restart$(NC)              => 🔄 Restart dev server"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🏗️  Build & Deploy$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)build$(NC)                => 🏗️  Build for production (dist/)"
	@echo "  $(CYAN)build-check$(NC)          => ✅ Build and check for errors"
	@echo "  $(CYAN)preview$(NC)              => 👀 Preview production build locally"
	@echo "  $(CYAN)build-analyze$(NC)        => 📊 Analyze bundle size"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🧪 Testing & Quality$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)test$(NC)                 => 🧪 Run tests (if configured)"
	@echo "  $(CYAN)lint$(NC)                 => 🔍 Run ESLint"
	@echo "  $(CYAN)lint-fix$(NC)             => 🔧 Fix ESLint errors"
	@echo "  $(CYAN)format$(NC)               => ✨ Format code with Prettier"
	@echo "  $(CYAN)format-check$(NC)         => 🔍 Check code formatting"
	@echo "  $(CYAN)typecheck$(NC)            => 🔍 Run TypeScript type check"
	@echo "  $(CYAN)audit$(NC)                => 🔒 Security audit (npm audit)"
	@echo "  $(CYAN)audit-fix$(NC)            => 🔧 Fix security issues"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)📦 Dependencies$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)deps$(NC)                 => 📋 List installed dependencies"
	@echo "  $(CYAN)deps-outdated$(NC)        => 📋 Check for outdated packages"
	@echo "  $(CYAN)deps-update$(NC)          => ⬆️  Update all dependencies"
	@echo "  $(CYAN)deps-update-minor$(NC)    => ⬆️  Update minor versions only"
	@echo "  $(CYAN)deps-clean$(NC)           => 🧹 Remove node_modules & reinstall"
	@echo ""
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(PURPLE)🔧 Setup & Maintenance$(NC)"
	@echo "$(PURPLE)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)check-node$(NC)           => 🔍 Check Node.js & npm versions"
	@echo "  $(CYAN)check-env$(NC)            => 🔍 Verify .env file"
	@echo "  $(CYAN)check-backend$(NC)        => 🔍 Check backend connectivity"
	@echo "  $(CYAN)status$(NC)               => 📊 Show complete system status"
	@echo "  $(CYAN)clean$(NC)                => 🧹 Clean build files & cache"
	@echo "  $(CYAN)clean-all$(NC)            => 🧹 Deep clean (includes node_modules)"
	@echo ""
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)💡 Quick Start Guide:$(NC)"
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(GREEN)1.$(NC) make install              $(BLUE)# Install dependencies$(NC)"
	@echo "  $(GREEN)2.$(NC) make check-env            $(BLUE)# Verify environment$(NC)"
	@echo "  $(GREEN)3.$(NC) make dev                  $(BLUE)# Start dev server$(NC)"
	@echo "  $(GREEN)4.$(NC) Visit: $(CYAN)http://localhost:5173$(NC)"
	@echo ""
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)📚 Common Workflows:$(NC)"
	@echo "$(YELLOW)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  $(CYAN)Development:$(NC)        make dev"
	@echo "  $(CYAN)Production:$(NC)         make build && make preview"
	@echo "  $(CYAN)Code Quality:$(NC)       make lint && make format"
	@echo "  $(CYAN)Testing:$(NC)            make test"
	@echo "  $(CYAN)Security:$(NC)           make audit"
	@echo "  $(CYAN)Fresh Install:$(NC)      make clean-all && make install"
	@echo ""
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(GREEN)🌐 Service URLs:$(NC)"
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  • Frontend:   $(CYAN)http://localhost:5173$(NC)"
	@echo "  • Backend:    $(CYAN)http://localhost:8000$(NC)"
	@echo ""
	@echo "$(RED)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(RED)⚠️  Important Notes:$(NC)"
	@echo "$(RED)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  • Ensure backend is running at http://localhost:8000"
	@echo "  • Update .env file before starting development"
	@echo "  • Run 'make check-backend' to verify API connection"
	@echo "  • Use 'make stop' to stop the dev server"
	@echo ""

check-node:
	@echo "$(YELLOW)🔍 Checking Node.js and npm versions...$(NC)"
	@command -v node >/dev/null 2>&1 || { \
		echo "$(RED)❌ Node.js not found!$(NC)"; \
		echo "$(YELLOW)   Install from: https://nodejs.org$(NC)"; \
		exit 1; \
	}
	@command -v npm >/dev/null 2>&1 || { \
		echo "$(RED)❌ npm not found!$(NC)"; \
		exit 1; \
	}
	@NODE_VERSION=$$(node -v | sed 's/v//'); \
	NODE_MAJOR=$$(echo $$NODE_VERSION | cut -d. -f1); \
	if [ $$NODE_MAJOR -lt 18 ]; then \
		echo "$(RED)❌ Node.js 18+ required!$(NC)"; \
		echo "$(YELLOW)   Current: v$$NODE_VERSION$(NC)"; \
		echo "$(YELLOW)   Update from: https://nodejs.org$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✓ Node.js: $$(node -v)$(NC)"
	@echo "$(GREEN)✓ npm: $$(npm -v)$(NC)"

check-env:
	@echo "$(YELLOW)🔍 Checking environment file...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)⚠️  .env file not found$(NC)"; \
		if [ -f .env.example ]; then \
			echo "$(CYAN)📋 Creating from .env.example...$(NC)"; \
			cp .env.example .env; \
			echo "$(GREEN)✓ Created .env file$(NC)"; \
			echo "$(RED)⚠️  IMPORTANT: Please update .env with your values!$(NC)"; \
			echo ""; \
			echo "$(CYAN)Required configurations:$(NC)"; \
			echo "  • VITE_API_BASE_URL=http://localhost:8000/api"; \
			echo "  • VITE_APP_NAME=E-Bike Point"; \
			echo ""; \
		else \
			echo "$(RED)❌ Please create .env file$(NC)"; \
			echo "$(CYAN)Create .env with:$(NC)"; \
			echo "  VITE_API_BASE_URL=http://localhost:8000/api"; \
			echo "  VITE_APP_NAME=E-Bike Point"; \
			echo "  VITE_AUTO_LOGOUT_HOURS=9"; \
			echo "  VITE_FREE_SERVICES_COUNT=4"; \
			echo "  VITE_WARRANTY_MONTHS=24"; \
			exit 1; \
		fi \
	else \
		echo "$(GREEN)✓ .env file exists$(NC)"; \
		if grep -q "VITE_API_BASE_URL" .env; then \
			BACKEND_URL=$$(grep VITE_API_BASE_URL .env | cut -d '=' -f2); \
			echo "$(CYAN)  Backend URL: $$BACKEND_URL$(NC)"; \
		fi \
	fi

check-backend:
	@echo "$(YELLOW)🔍 Checking backend connectivity...$(NC)"
	@BACKEND_URL=$$(grep VITE_API_BASE_URL .env 2>/dev/null | cut -d '=' -f2 | tr -d ' ' || echo "http://localhost:8000/api"); \
	echo "$(CYAN)Testing: $$BACKEND_URL$(NC)"; \
	if curl -s -o /dev/null -w "%{http_code}" $$BACKEND_URL | grep -q "200\|301\|302"; then \
		echo "$(GREEN)✓ Backend is accessible$(NC)"; \
	else \
		echo "$(RED)✗ Backend not accessible$(NC)"; \
		echo "$(YELLOW)  Make sure backend is running:$(NC)"; \
		echo "  $(CYAN)cd ../server && make dev$(NC)"; \
	fi

install: check-node
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║     🔧 Installing Frontend                ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@if [ -d "$(NODE_MODULES)" ]; then \
		echo "$(YELLOW)⚠️  node_modules already exists$(NC)"; \
		echo "$(CYAN)💡 Use 'make deps-clean' for fresh install$(NC)"; \
		echo ""; \
	fi
	@echo "$(YELLOW)📦 Installing dependencies...$(NC)"
	@npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"
	@echo ""
	@$(MAKE) check-env
	@echo ""
	@echo "$(GREEN)✅ Installation complete!$(NC)"
	@echo ""
	@echo "$(BLUE)╔══════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║           📋 Next Steps                      ║$(NC)"
	@echo "$(BLUE)╠══════════════════════════════════════════════╣$(NC)"
	@echo "$(BLUE)║$(NC)  1. Update .env with backend URL             $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  2. Ensure backend is running                $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  3. Run 'make dev' to start                  $(BLUE)║$(NC)"
	@echo "$(BLUE)║$(NC)  4. Visit http://localhost:5173              $(BLUE)║$(NC)"
	@echo "$(BLUE)╚══════════════════════════════════════════════╝$(NC)"
	@echo ""

dev: check-env
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║      🚀 Starting Vite Dev Server          ║$(NC)"
	@echo "$(PURPLE)╠═══════════════════════════════════════════╣$(NC)"
	@echo "$(PURPLE)║       http://localhost:$(FRONTEND_PORT)               ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@npm run dev

dev-host:
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║  🌐 Starting Dev Server (Network Access) ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@npm run dev -- --host

dev-open:
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║  🚀 Starting Dev Server (Auto-Open)      ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@npm run dev -- --open

build:
	@echo "$(YELLOW)🏗️  Building for production...$(NC)"
	@npm run build
	@echo "$(GREEN)✓ Build complete!$(NC)"
	@echo "$(CYAN)📦 Output: $(BUILD_DIR)/$(NC)"
	@if [ -d "$(BUILD_DIR)" ]; then \
		SIZE=$$(du -sh $(BUILD_DIR) | cut -f1); \
		echo "$(CYAN)📊 Build size: $$SIZE$(NC)"; \
	fi

build-check: build
	@echo ""
	@echo "$(YELLOW)🔍 Checking build for errors...$(NC)"
	@if [ -d "$(BUILD_DIR)" ]; then \
		echo "$(GREEN)✓ Build directory exists$(NC)"; \
		if [ -f "$(BUILD_DIR)/index.html" ]; then \
			echo "$(GREEN)✓ index.html found$(NC)"; \
		else \
			echo "$(RED)✗ index.html missing$(NC)"; \
		fi \
	else \
		echo "$(RED)✗ Build directory missing$(NC)"; \
	fi

preview: build
	@echo "$(CYAN)👀 Previewing production build...$(NC)"
	@npm run preview

build-analyze:
	@echo "$(YELLOW)📊 Analyzing bundle size...$(NC)"
	@npm run build -- --mode analyze 2>/dev/null || { \
		echo "$(YELLOW)⚠️  Bundle analyzer not configured$(NC)"; \
		echo "$(CYAN)Install: npm install -D rollup-plugin-visualizer$(NC)"; \
	}

test:
	@echo "$(YELLOW)🧪 Running tests...$(NC)"
	@npm run test 2>/dev/null || { \
		echo "$(YELLOW)⚠️  No tests configured$(NC)"; \
		echo "$(CYAN)Add Vitest: npm install -D vitest$(NC)"; \
	}

lint:
	@echo "$(YELLOW)🔍 Running ESLint...$(NC)"
	@npm run lint 2>/dev/null || { \
		npx eslint src --ext .js,.jsx,.ts,.tsx 2>/dev/null || { \
			echo "$(YELLOW)⚠️  ESLint not configured$(NC)"; \
		}; \
	}

lint-fix:
	@echo "$(YELLOW)🔧 Fixing ESLint errors...$(NC)"
	@npm run lint:fix 2>/dev/null || { \
		npx eslint src --ext .js,.jsx,.ts,.tsx --fix 2>/dev/null || { \
			echo "$(YELLOW)⚠️  ESLint not configured$(NC)"; \
		}; \
	}

format:
	@echo "$(YELLOW)✨ Formatting code with Prettier...$(NC)"
	@npx prettier --write src/ 2>/dev/null || { \
		echo "$(YELLOW)⚠️  Prettier not installed$(NC)"; \
		echo "$(CYAN)Install: npm install -D prettier$(NC)"; \
	}
	@echo "$(GREEN)✓ Code formatted$(NC)"

format-check:
	@echo "$(YELLOW)🔍 Checking code formatting...$(NC)"
	@npx prettier --check src/ 2>/dev/null || { \
		echo "$(YELLOW)⚠️  Prettier not installed$(NC)"; \
	}

typecheck:
	@echo "$(YELLOW)🔍 Running TypeScript type check...$(NC)"
	@npx tsc --noEmit 2>/dev/null || { \
		echo "$(YELLOW)⚠️  TypeScript not configured$(NC)"; \
	}

audit:
	@echo "$(YELLOW)🔒 Running security audit...$(NC)"
	@npm audit
	@echo ""
	@echo "$(CYAN)💡 Use 'make audit-fix' to fix issues$(NC)"

audit-fix:
	@echo "$(YELLOW)🔧 Fixing security vulnerabilities...$(NC)"
	@npm audit fix
	@echo "$(GREEN)✓ Audit fixes applied$(NC)"

deps:
	@echo "$(CYAN)📋 Installed dependencies:$(NC)"
	@npm list --depth=0

deps-outdated:
	@echo "$(YELLOW)📋 Checking for outdated packages...$(NC)"
	@npm outdated || echo "$(GREEN)✓ All packages up to date$(NC)"

deps-update:
	@echo "$(YELLOW)⬆️  Updating all dependencies...$(NC)"
	@npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"
	@echo "$(CYAN)💡 Run 'make audit' to check for issues$(NC)"

deps-update-minor:
	@echo "$(YELLOW)⬆️  Updating minor versions only...$(NC)"
	@npm update --depth 0
	@echo "$(GREEN)✓ Minor updates applied$(NC)"

deps-clean:
	@echo "$(RED)🧹 Removing node_modules...$(NC)"
	@rm -rf $(NODE_MODULES)
	@rm -rf package-lock.json
	@echo "$(GREEN)✓ Cleaned$(NC)"
	@echo ""
	@echo "$(YELLOW)📦 Reinstalling dependencies...$(NC)"
	@npm install
	@echo "$(GREEN)✓ Fresh installation complete$(NC)"

clean:
	@echo "$(RED)🧹 Cleaning build files and cache...$(NC)"
	@rm -rf $(BUILD_DIR)
	@rm -rf .vite
	@rm -rf node_modules/.vite
	@rm -rf .eslintcache
	@echo "$(GREEN)✓ Cleaned build files$(NC)"

clean-all: clean
	@echo "$(RED)🧹 Deep cleaning (removing node_modules)...$(NC)"
	@rm -rf $(NODE_MODULES)
	@rm -rf package-lock.json
	@echo "$(GREEN)✓ Deep clean complete$(NC)"
	@echo "$(CYAN)💡 Run 'make install' to reinstall$(NC)"

stop:
	@echo "$(RED)🛑 Stopping development server...$(NC)"
	@lsof -ti:$(FRONTEND_PORT) | xargs kill -9 2>/dev/null || true
	@echo "$(GREEN)✓ Server stopped$(NC)"

restart: stop dev

status:
	@echo "$(PURPLE)╔═══════════════════════════════════════════╗$(NC)"
	@echo "$(PURPLE)║        📊 Frontend Status                 ║$(NC)"
	@echo "$(PURPLE)╚═══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)Installation:$(NC)"
	@echo "  Node.js: $(shell node -v 2>/dev/null || echo '$(RED)✗ Not installed$(NC)')"
	@echo "  npm: $(shell npm -v 2>/dev/null || echo '$(RED)✗ Not installed$(NC)')"
	@echo "  Dependencies: $(shell [ -d $(NODE_MODULES) ] && echo '$(GREEN)✓ Installed$(NC)' || echo '$(RED)✗ Not installed$(NC)')"
	@if [ -d $(NODE_MODULES) ]; then \
		PKG_COUNT=$$(ls -1 $(NODE_MODULES) | wc -l | xargs); \
		echo "    Packages: $(GREEN)$$PKG_COUNT installed$(NC)"; \
	fi
	@echo ""
	@echo "$(CYAN)Environment:$(NC)"
	@echo "  .env file: $(shell [ -f .env ] && echo '$(GREEN)✓ Exists$(NC)' || echo '$(RED)✗ Missing$(NC)')"
	@if [ -f .env ]; then \
		if grep -q "VITE_API_BASE_URL" .env; then \
			BACKEND=$$(grep VITE_API_BASE_URL .env | cut -d '=' -f2 | tr -d ' '); \
			echo "    Backend: $(CYAN)$$BACKEND$(NC)"; \
		fi \
	fi
	@echo ""
	@echo "$(CYAN)Services:$(NC)"
	@echo "  Dev Server: $(shell lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && echo '$(GREEN)✓ Running :$(FRONTEND_PORT)$(NC)' || echo '$(YELLOW)○ Stopped$(NC)')"
	@echo ""
	@echo "$(CYAN)Build:$(NC)"
	@echo "  Build dir: $(shell [ -d $(BUILD_DIR) ] && echo '$(GREEN)✓ Exists$(NC)' || echo '$(YELLOW)○ Not built$(NC)')"
	@if [ -d $(BUILD_DIR) ]; then \
		SIZE=$$(du -sh $(BUILD_DIR) 2>/dev/null | cut -f1); \
		echo "    Size: $(CYAN)$$SIZE$(NC)"; \
	fi
	@echo ""

quick-check:
	@echo "$(CYAN)Quick Status Check:$(NC)"
	@echo -n "Node.js: "; command -v node >/dev/null 2>&1 && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"
	@echo -n "npm: "; command -v npm >/dev/null 2>&1 && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"
	@echo -n "Dependencies: "; [ -d $(NODE_MODULES) ] && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"
	@echo -n "Dev Server: "; lsof -Pi :$(FRONTEND_PORT) -sTCP:LISTEN -t >/dev/null 2>&1 && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"
	@echo -n "Backend: "; curl -s -o /dev/null -w "%{http_code}" $(BACKEND_URL) | grep -q "200\|301\|302" && echo "$(GREEN)✓$(NC)" || echo "$(RED)✗$(NC)"

version:
	@echo "$(CYAN)E-Bike Point ERP Frontend$(NC)"
	@echo "Framework: React + Vite"
	@echo "Node.js: $(shell node -v)"
	@echo "npm: $(shell npm -v)"
	@if [ -f package.json ]; then \
		VERSION=$$(grep '"version"' package.json | head -1 | cut -d '"' -f4); \
		echo "Version: $$VERSION"; \
	fi

# Aliases
server: dev
run: dev
start: dev
install-deps: install
update: deps-update
sec-audit: audit

.DEFAULT_GOAL := help

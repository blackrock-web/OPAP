#!/usr/bin/env sh
# ==============================================================================
# ARES-EMD-OPAP-INN — Linux Local & Container Startup Script
# Usage:
#   ./startup.sh                # Start dev server in background (idempotent)
#   ./startup.sh --foreground   # Start dev server in foreground (interactive)
#   ./startup.sh --test         # Run TypeScript & Python validation suites first
#   ./startup.sh --stop         # Stop any running dev/preview server
# ==============================================================================
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
LOG_FILE="${LOG_FILE:-/tmp/app-startup.log}"
MODE="background"
RUN_TESTS=0

for arg in "$@"; do
  case "$arg" in
    --foreground|-f)
      MODE="foreground"
      ;;
    --test|-t)
      RUN_TESTS=1
      ;;
    --stop)
      MODE="stop"
      ;;
  esac
done

# 1. Verify Node.js and npm are available on the Linux system
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] Node.js (>=20) and npm are required to run this project on Linux." >&2
  exit 1
fi

# 2. Handle --stop mode
if [ "$MODE" = "stop" ]; then
  node scripts/preview.mjs stop >/dev/null 2>&1 || true
  pkill -f "vite.*--port $PORT" >/dev/null 2>&1 || true
  echo "[OK] Stopped running ARES server instances."
  exit 0
fi

# 3. Stop stale preview server if running
if [ -f "scripts/preview.mjs" ]; then
  node scripts/preview.mjs stop >/dev/null 2>&1 || true
fi

# 4. Install dependencies automatically on first local run if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "[INFO] Installing npm dependencies..."
  npm install
fi

# 5. Optional: Run validation suites if --test was passed
if [ "$RUN_TESTS" = "1" ]; then
  echo "[INFO] Running TypeScript statistical & steganography test suite..."
  npx tsx src/lib/stats/stats.test.ts
  if command -v python3 >/dev/null 2>&1 && [ -d "ares_emd_opap" ]; then
    echo "[INFO] Running Python ARES-EMD-OPAP 15-point validation suite..."
    python3 -m ares_emd_opap.test_suite
  fi
fi

# 6. Check if server is already healthy and listening
if command -v curl >/dev/null 2>&1; then
  if curl -sf -o /dev/null --max-time 2 "http://127.0.0.1:${PORT}/"; then
    echo "[OK] ARES-EMD-OPAP-INN is already running at http://localhost:${PORT}/"
    exit 0
  fi
fi

# 7. Start the application
if [ "$MODE" = "foreground" ]; then
  echo "[INFO] Starting ARES-EMD-OPAP-INN in foreground on http://${HOST}:${PORT} ..."
  exec npm run dev
else
  echo "[INFO] Starting ARES-EMD-OPAP-INN in background (logs: ${LOG_FILE})..."
  nohup npm run dev >>"$LOG_FILE" 2>&1 &
  APP_PID=$!

  # Wait briefly for health probe on local Linux runs
  if command -v curl >/dev/null 2>&1; then
    i=0
    while [ "$i" -lt 10 ]; do
      if curl -sf -o /dev/null --max-time 1 "http://127.0.0.1:${PORT}/"; then
        echo "[OK] ARES-EMD-OPAP-INN is live at http://localhost:${PORT}/ (PID: ${APP_PID})"
        exit 0
      fi
      sleep 1
      i=$((i + 1))
    done
  fi

  echo "[INFO] Server process launched (PID: ${APP_PID}). Check ${LOG_FILE} for output."
fi


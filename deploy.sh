#!/usr/bin/env bash
#
# deploy.sh — Build & deploy Docker image to a VPS without a registry.
#
# Usage:
#   ./deploy.sh                          # uses defaults
#   VPS_USER=root VPS_HOST=1.2.3.4 ./deploy.sh
#
# Flow:
#   1. Build the Docker image locally.
#   2. Export it to a compressed tarball (docker save | gzip).
#   3. Transfer the tarball to the VPS via scp.
#   4. SSH into the VPS, load the image, and restart via docker compose.
#   5. Clean up the local tarball.

set -euo pipefail

# ─── Configuration ────────────────────────────────────────────────────────────
IMAGE_NAME="${IMAGE_NAME:-ecommerce-admin}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
FULL_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-your-vps-ip}"
VPS_PORT="${VPS_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/opt/ecommerce-admin}"
SSH_KEY="${SSH_KEY:-/home/ubuntu/.ssh/id_rsa}"

TARBALL="${IMAGE_NAME}-${IMAGE_TAG}.tar.gz"

# ─── Helpers ──────────────────────────────────────────────────────────────────
info()  { printf "\033[1;34m[INFO]\033[0m  %s\n" "$*"; }
ok()    { printf "\033[1;32m[OK]\033[0m    %s\n" "$*"; }
err()   { printf "\033[1;31m[ERR]\033[0m   %s\n" "$*" >&2; }

# ─── Pre-flight checks ───────────────────────────────────────────────────────
if [[ "$VPS_HOST" == "your-vps-ip" ]]; then
  err "Set VPS_HOST before running. Example:"
  err "  VPS_HOST=203.0.113.10 ./deploy.sh"
  exit 1
fi

for cmd in docker scp ssh; do
  if ! command -v "$cmd" &>/dev/null; then
    err "'$cmd' is required but not found in PATH."
    exit 1
  fi
done

# ─── Step 1: Build ────────────────────────────────────────────────────────────
info "Building Docker image: ${FULL_IMAGE}"
docker build -t "${FULL_IMAGE}" .
ok "Image built successfully."

# ─── Step 2: Export to tarball ────────────────────────────────────────────────
info "Saving image to ${TARBALL} ..."
docker save "${FULL_IMAGE}" | gzip > "${TARBALL}"
ok "Tarball created ($(du -h "${TARBALL}" | cut -f1))."

# ─── Step 3: Transfer to VPS ─────────────────────────────────────────────────
info "Transferring ${TARBALL} to ${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/"
ssh -p "${VPS_PORT}" -i "${SSH_KEY}" "${VPS_USER}@${VPS_HOST}" "mkdir -p ${REMOTE_DIR}"
scp -P "${VPS_PORT}" -i "${SSH_KEY}" "${TARBALL}" "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/${TARBALL}"
ok "Transfer complete."

# ─── Step 4: Load image & restart on VPS ──────────────────────────────────────
info "Loading image and restarting service on VPS ..."
ssh -p "${VPS_PORT}" -i "${SSH_KEY}" "${VPS_USER}@${VPS_HOST}" bash -s <<REMOTE
  set -euo pipefail
  cd "${REMOTE_DIR}"

  echo "Loading Docker image ..."
  sudo docker load < "${TARBALL}"

  echo "Restarting containers with docker compose ..."
  sudo docker compose up -d --force-recreate

  echo "Cleaning up remote tarball ..."
  rm -f "${TARBALL}"
REMOTE
ok "Deployment finished on ${VPS_HOST}."

# ─── Step 5: Local cleanup ───────────────────────────────────────────────────
info "Removing local tarball ..."
rm -f "${TARBALL}"
ok "Local cleanup done."
ok "🚀 ${FULL_IMAGE} deployed to ${VPS_HOST} successfully!"

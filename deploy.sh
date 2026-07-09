#!/usr/bin/env bash
# Publie le portfolio sur GitHub Pages (build local + push → déploiement automatique).
#
# Usage:
#   ./deploy.sh                      # message de commit par défaut
#   ./deploy.sh "Mise à jour talks"  # message personnalisé
#   ./deploy.sh --skip-build         # push sans rebuild (déconseillé)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

SKIP_BUILD=false
COMMIT_MSG=""

for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=true ;;
    -h|--help)
      echo "Usage: ./deploy.sh [message de commit] [--skip-build]"
      exit 0
      ;;
    *)
      if [[ -z "$COMMIT_MSG" ]]; then
        COMMIT_MSG="$arg"
      fi
      ;;
  esac
done

if [[ -z "$COMMIT_MSG" ]]; then
  COMMIT_MSG="Update site ($(date +%Y-%m-%d))"
fi

echo "▶ Portfolio — déploiement"
echo "  Dossier : $SCRIPT_DIR"
echo ""

# ── Dépendances ──────────────────────────────────────────────────────────────
if [[ ! -d node_modules ]]; then
  echo "▶ Installation des dépendances (npm install)…"
  npm install
else
  echo "▶ Vérification des dépendances (npm ci)…"
  npm ci
fi
echo ""

# ── Build ────────────────────────────────────────────────────────────────────
if [[ "$SKIP_BUILD" == true ]]; then
  echo "⚠ Build ignoré (--skip-build)"
else
  echo "▶ Build du site (npm run build)…"
  npm run build
  echo "✓ Build réussi"
fi
echo ""

# ── Git ────────────────────────────────────────────────────────────────────────
if [[ -z "$(git status --porcelain)" ]]; then
  echo "ℹ Aucun changement détecté — rien à publier."
  exit 0
fi

echo "▶ Changements détectés :"
git status --short
echo ""

BRANCH="$(git branch --show-current)"
if [[ "$BRANCH" != "main" ]]; then
  echo "✗ Erreur : tu es sur la branche « $BRANCH ». Passe sur main avant de publier."
  echo "  git checkout main"
  exit 1
fi

echo "▶ Commit : $COMMIT_MSG"
git add -A
git commit -m "$COMMIT_MSG"
echo ""

echo "▶ Push vers origin/main…"
git push origin main
echo ""

# ── Suivi du déploiement ─────────────────────────────────────────────────────
REPO_URL="https://github.com/sofianeazogagh/sofianeazogagh.github.io"
SITE_URL="https://sofianeazogagh.github.io"

echo "✓ Code poussé — GitHub Actions va déployer le site."
echo ""
echo "  Site      : $SITE_URL"
echo "  Actions   : $REPO_URL/actions"
echo ""

if command -v gh >/dev/null 2>&1; then
  echo "▶ Suivi du déploiement (Ctrl+C pour quitter)…"
  if gh run watch --repo sofianeazogagh/sofianeazogagh.github.io 2>/dev/null; then
    echo ""
    echo "✓ Déploiement terminé → $SITE_URL"
  else
    echo "  (Lance « gh auth login » pour suivre le déploiement en direct.)"
  fi
else
  echo "  Astuce : installe « gh » (GitHub CLI) pour suivre le déploiement en direct."
fi

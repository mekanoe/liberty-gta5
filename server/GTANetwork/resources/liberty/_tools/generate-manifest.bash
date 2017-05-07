#!/bin/bash
set -e

check_deps () {
  type jq >/dev/null 2>&1 || { echo >&2 "I require jq but it's not installed.  Aborting."; exit 1; }
}

main () {
  local originalWd="$CWD"
  cd "$(dirname $0)/.."

  check_deps

  local DIRS=$(find * -type dir -not -name "_*")
  jq -n --arg DIRS "${DIRS}" '{ modules: $DIRS | split("\n") }' | tee manifest.json
  echo "wrote to manifest.json"

  cd "$originalWd"
}

main "$@"
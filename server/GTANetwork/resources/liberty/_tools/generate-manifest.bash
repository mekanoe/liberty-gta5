#!/bin/bash
set -e

check_deps () {
  type jq >/dev/null 2>&1 || { echo >&2 "I require jq but it's not installed.  Aborting."; exit 1; }
}

main () {
  local originalWd="$CWD"
  cd "$(dirname $0)/.."

  check_deps

  find * -type dir -not -name "_*" | xargs -I '%' -- jq -n --arg DIRS "%" '{ modules: $DIRS | split("\n") }' > manifest.json
  echo "wrote to manifest.json"

  cd "$originalWd"
}

main "$@"
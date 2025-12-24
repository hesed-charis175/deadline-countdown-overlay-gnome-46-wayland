#!/bin/bash
set -e

EXT_NAME="deadline@overlay"
SRC_DIR="$(dirname "$0")"

DEST_DIR="$HOME/.local/share/gnome-shell/extensions/$EXT_NAME"
mkdir -p "$DEST_DIR"
cp -r "$SRC_DIR/"* "$DEST_DIR/"

mkdir -p "$HOME/.local/share/glib-2.0/schemas"
cp "$DEST_DIR/schemas/org.gnome.shell.extensions.deadline.gschema.xml" "$HOME/.local/share/glib-2.0/schemas/"

glib-compile-schemas "$HOME/.local/share/glib-2.0/schemas/"

echo "[=] Extension installed. Log out and log back in, then enable $EXT_NAME in Extensions app. Ohh BTW, if it doesn't work fine, it's not my fault."


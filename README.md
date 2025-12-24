# deadline-countdown-overlay-gnome-46-wayland

**A click-through GNOME Shell overlay that counts down to a configurable deadline. (Don't know if X11 compatible)**

![screenshot](screenshot.png)

---

## Features

- Top-left overlay on GNOME Shell (Didn't yet add configurable positioning)
- Editable **title** and **deadline** through Extension settings
---

## Installation

### Requirements

- GNOME Shell 46  
- `glib-compile-schemas` (usually included in GNOME/Ubuntu)  
- Wayland

### Steps

1. Download the zip.  
2. Unzip anywhere:

```bash
unzip deadline@overlay.zip -d ~/Downloads
cd ~/Downloads/deadline@overlay
```
3. Make the installation script executable and run it:
```bash
chmod +x install.sh
./install.sh
```
4. Log out and log back in.
5. Open Extensions app -> enable Deadline Countdown Overlay.

### Usage
- Open Preferences from Extensions app to set:
  - Deadline: ISO 8601 date-time string, e.g., 2025-12-25T20:00:00
  - Overlay title: custom text displayed above the countdown

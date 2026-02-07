# Demo Media Folder

This folder simulates the `/mnt/Lampadas` mount point on the Raspberry Pi for development and demonstration purposes.

When running `npm run dev:demo`, the application will read storage statistics from this directory instead of `process.cwd()` or the real mount.

## Contents
- **Projects/**: Dummy project files
- **Backups/**: Dummy backup files

Populate this folder with large dummy files if you want to test disk usage visualization (though `statfs` usually reports the stats of the *filesystem* the folder is on, not just the folder size).

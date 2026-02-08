# 🚀 Antigravity IDE Deployment Guide

### **Environment: Local Laptop ➔ Raspberry Pi (192.168.1.241)**

## ⚠️ Connectivity & Sync Warning

The **Antigravity IDE** operating on the local laptop does not have a "live-link" or "agent-load" capability when connected via SSH to the Raspberry Pi. Changes made in the IDE interface **will not** automatically reflect on the server.

To see updates, you must follow the **Commit-Pull-Build** workflow.

---

## 🛠 Deployment Workflow

Because the Pi hosts the live Docker containers, all code changes must be synchronized through GitHub.

### **1. On Local Laptop (AG IDE)**

1. Apply your UI changes (Red theme, click-counter logic, alignment).
2. **Commit** your changes to the `aeon-deployment` branch.
3. **Push** to GitHub:
```bash
git add .
git commit -m "Update: UI Red theme and secret bio entrance"
git push origin aeon-deployment
```

### **2. On Raspberry Pi (Terminal via SSH)**

Navigate to the project directory and synchronize the local files with the repository:

```bash
cd ~/docker-stacks/resume-website
git pull origin aeon-deployment
```

### **3. Rebuild & Refresh**

Since the container runs a compiled Next.js build, you must trigger a rebuild to see the changes:

```bash
docker compose up -d --build
```

---

## 📂 Server Inventory (Reference)

* **Host IP:** `192.168.1.241`
* **Path:** `~/docker-stacks/resume-website/`
* **Port:** `3000` (Local)
* **Storage (OS/SSD):** `917G Total / 663G Avail`
* **Storage (Data/HDD):** `/mnt/Lampadas` (Reserved for Arr Suite Media)

---

## 🔐 Future Security Implementation

The **Cloudflare Tunnel** connector is staged in `~/docker-stacks/management`.

* **Goal:** Map `resume.yourdomain.com` to `192.168.1.241:3000`.
* **Access Policy:** MFA will be handled via Cloudflare Zero Trust to protect the `/dashboard` route hidden behind the **10-click Bio-Data JPEG** trigger.

---

## 📝 Maintenance Commands

| Action | Command |
| --- | --- |
| **Check Health** | `docker ps` |
| **View Logs** | `docker logs -f resume-website` |
| **Clean Build** | `docker system prune -f` |
| **Switch Branch** | `git checkout aeon-deployment` |

---

## 🐳 Docker Configuration Reference

### Current `docker-compose.yml` Setup

```yaml
services:
  resume-website:
    build: .
    container_name: resume-website
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - /mnt/Lampadas:/media_data:ro  # Mount your NAS storage here
    env_file: .env
```

### Environment Variables (`.env`)

```env
# Node Environment
NODE_ENV=production

# Storage Mount (Argon EON / Lampadas)
STORAGE_PATH=/media_data

# Security Secrets (Admin access)
# In production, change these!
ADMIN_PASSWORD=admin123
TOTP_SECRET=KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP

# Cloudflare Tunnel Token (Get this from Zero Trust Dashboard)
# CF_TUNNEL_TOKEN=eyJhIjoi...
```

---

## 🔍 Verification Steps

After deploying changes, verify the application is running correctly:

1. **Check Container Status:**
   ```bash
   docker ps
   ```
   *The `resume-website` container should show as `Up`.*

2. **View Application Logs:**
   ```bash
   docker logs -f resume-website
   ```
   *Look for "Ready in XXXms" message from Next.js.*

3. **Test Local Access:**
   ```bash
   curl http://localhost:3000
   ```
   *Should return HTML content.*

4. **Test Network Access:**
   From your laptop, visit `http://192.168.1.241:3000` in a browser.

---

## 🌐 Cloudflare Zero Trust Setup (Future)

When ready to expose the site publicly:

1. Go to **Cloudflare Zero Trust Dashboard** > **Access** > **Tunnels**.
2. Select your tunnel (or create a new one).
3. **Public Hostname** tab > **Add Public Hostname**.
   * **Subdomain:** `resume` (e.g., `resume.yourdomain.com`)
   * **Service:** `http://192.168.1.241:3000`
4. Save and test access from external network.

---

## 🧠 Agent Notes

### For Future Antigravity Sessions:

* **Always check current branch** before making changes: `git branch`
* **Verify you're on `aeon-deployment`** for production deployments
* **Never edit files directly on the Pi** - always use the Git workflow
* **Test locally first** if possible, then deploy to Pi
* **Document breaking changes** in commit messages

### Common Pitfalls:

* ❌ Editing files in AG IDE and expecting immediate changes on Pi
* ❌ Forgetting to rebuild Docker after pulling changes
* ❌ Working on `main` branch instead of `aeon-deployment`
* ❌ Not checking Docker logs after deployment

---

## 📚 Additional Resources

* **Project Repository:** [CMBorjas/ResumeWebsite](https://github.com/CMBorjas/ResumeWebsite)
* **Branch:** `aeon-deployment`
* **Framework:** Next.js 16.0.1
* **Deployment:** Docker + Raspberry Pi 5 (Argon EON)

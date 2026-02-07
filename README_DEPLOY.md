#  Anti-Gravity Deployment Instructions: Resume-to-Pi

This document outlines the procedure for transitioning the **ResumeWebsite** from GitHub Pages to a self-hosted Docker environment on the Raspberry Pi 4 (Argon EON / Cold Storage Node).

## Prerequisites

* **Hardware:** Raspberry Pi 4 (8GB preferred) running Ubuntu/Debian.
* **Storage:** `/mnt/Lampadas` mounted and accessible.
* **Networking:** Cloudflare account with a managed domain.
* **Architecture:** Multi-arch builds required (Target: `linux/arm64`).

---

## Phase 1: The Multi-Arch Build (Gaming PC)

*To avoid thermal throttling on the Pi, we build on the Gaming PC and push to Docker Hub.*

1. **Initialize Buildx:**
```bash
docker buildx create --name gravity-builder --use
```

2. **Build and Push:**
Replace `your-docker-user` with your actual Docker Hub handle.
```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  -t your-docker-user/resume-website:latest --push .
```

---

## Phase 2: Server-Side Configuration (Raspberry Pi)

Create a directory at `~/projects/resume-site` and initialize the following `docker-compose.yml`:

```yaml
services:
  # The Resume Website Application
  resume:
    image: your-docker-user/resume-website:latest
    container_name: resume_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - /mnt/Lampadas:/media_data:ro # Proof of storage integration
    environment:
      - NODE_ENV=production
      - STORAGE_PATH=/media_data

  # Cloudflare Tunnel for secure bedroom-to-web access
  tunnel:
    image: cloudflare/cloudflared:latest
    container_name: cloudflare_tunnel
    restart: always
    command: tunnel --no-autoupdate run --token ${CF_TUNNEL_TOKEN}
```

---

##  Phase 3: Cloudflare Zero Trust Setup

1. **Create Tunnel:** Generate a new tunnel in the Cloudflare Dashboard named `Pi-Resume-Tunnel`.
2. **Public Hostname:**
   * "TBD."
   * **Domain:** `resume.yourdomain.com`
   * **Service:** `http://resume_app:3000` (Internal Docker network routing).

3. **Environment Variable:** Create a `.env` file on the Pi containing `CF_TUNNEL_TOKEN=your_token_here`.

---

## Phase 4: Showcasing the "Cold Storage"

To prove the "Storage" skill, the application should pull metadata from the volume mount.

* **Goal:** Display total capacity of the **Lampadas** drives on the "About" or "Skills" page.
* **Verification:** Run `docker exec -it resume_app ls /media_data` to ensure the container sees the NAS storage.

---

## Maintenance & Monitoring

* **Logs:** `docker compose logs -f`
* **Update:** `docker compose pull && docker compose up -d`
* **Thermal Check:** Monitor the Argon EON OLED to ensure the resume site isn't spiking bedroom temperatures.

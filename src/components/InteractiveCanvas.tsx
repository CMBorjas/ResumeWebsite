"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get current theme colors from CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    const colorCyan = rootStyles.getPropertyValue('--color-brand-cyan').trim() || '#00ffe1';
    const colorPink = rootStyles.getPropertyValue('--color-brand-pink').trim() || '#ff0f4d';

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 20) + 1;
        // Assign colors dynamically based on the current theme variables
        this.color = Math.random() > 0.8 ? colorPink : colorCyan;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = this.color;

        if (distance < mouse.radius) {
          const intensity = 1 - (distance / mouse.radius);
          // Increased brightness by ~50%
          ctx.shadowBlur = 25 * intensity;
          ctx.shadowColor = this.color;

          // Draw particle core
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * (1 + intensity * 2.25), 0, Math.PI * 2);
          ctx.fill();

          // Draw light star streaks (anamorphic flare style)
          const streakLength = 20 * intensity;
          ctx.beginPath();
          ctx.lineWidth = 1.5 * intensity;
          ctx.strokeStyle = this.color;

          // Horizontal streak (longer)
          ctx.moveTo(this.x - streakLength * 1.5, this.y);
          ctx.lineTo(this.x + streakLength * 1.5, this.y);
          // Vertical streak
          ctx.moveTo(this.x, this.y - streakLength);
          ctx.lineTo(this.x, this.y + streakLength);

          ctx.stroke();
        } else {
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Reset shadow for lines and other particles
        ctx.shadowBlur = 0;
      }

      update() {
        // Natural drift
        if (!canvas) return;
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges
        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const connect = () => {
      if (!ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            ctx.globalAlpha = opacityValue * 0.15;
            ctx.strokeStyle = colorCyan;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes!

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none transition-all duration-500 ${theme === 'corporate' ? 'bg-white opacity-100' : 'bg-transparent opacity-50'
        }`}
    />
  );
}

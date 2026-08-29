/**
 * 3D Particle System for BakaBoost
 * Elegant gradient-based particles that match the design theme
 */

import { useEffect, useRef, useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  "rgba(255, 77, 141, ",    // Pink
  "rgba(255, 121, 168, ",   // Light Pink
  "rgba(255, 200, 220, ",   // Blush
  "rgba(230, 150, 180, ",   // Mauve
  "rgba(194, 25, 91, ",     // Deep Pink
];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const particleCount = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 1024 ? 80 : 40;
    }
    return 60;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 300,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: Math.random() * 300 + 200,
      }));
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(247, 234, 240, 0.02)");
      gradient.addColorStop(1, "rgba(255, 240, 245, 0.02)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.life += 1;

        // Reset particle if life exceeded
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.z = Math.random() * 300;
          particle.life = 0;
          particle.opacity = Math.random() * 0.5 + 0.3;
        }

        // Mouse attraction (subtle)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            particle.vx += (dx / distance) * 0.2;
            particle.vy += (dy / distance) * 0.2;
          }
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Bounce/wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 300;
        if (particle.z > 300) particle.z = 0;

        // Dampen velocity
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        particle.vz *= 0.99;

        // Calculate opacity based on life cycle and z-depth
        const lifeProgress = particle.life / particle.maxLife;
        const lifeOpacity =
          lifeProgress < 0.2
            ? lifeProgress * 5
            : lifeProgress > 0.8
              ? (1 - lifeProgress) * 5
              : 1;
        const depthOpacity = particle.z / 300;
        particle.opacity = (Math.random() * 0.5 + 0.3) * lifeOpacity * depthOpacity;

        // Size based on depth (3D effect)
        const scale = 0.5 + (particle.z / 300) * 1.5;
        const drawSize = particle.size * scale;

        // Draw particle with glow
        ctx.fillStyle = particle.color + particle.opacity + ")";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, drawSize, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow
        ctx.strokeStyle = particle.color + (particle.opacity * 0.5) + ")";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Connect nearby particles with lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(
              0,
              `rgba(255, 77, 141, ${(p1.opacity * (1 - distance / 100)) * 0.3})`
            );
            gradient.addColorStop(
              1,
              `rgba(255, 121, 168, ${(p2.opacity * (1 - distance / 100)) * 0.3})`
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "linear-gradient(135deg, rgba(247, 234, 240, 0.5), rgba(255, 240, 245, 0.5))",
      }}
    />
  );
}

export default ParticleBackground;

"use client";

import { memo, useEffect, useRef } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const starDensity = 0.00009;
const twinkleProbability = 0.7;
const minTwinkleSpeed = 2;
const maxTwinkleSpeed = 4;
const starRegenerationInterval = 5000;
const percentToRegenerate = 0.15;

const targetFps = 16;
const frameInterval = 1000 / targetFps;

type BackgroundStar = {
  x: number;
  y: number;
  size: number;
  hero: boolean;
  baseOpacity: number;
  currentOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinkleDirection: number;
  twinkleTimer: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function resolveStarColor(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-text-primary")
    .trim();
  if (/^#[0-9a-fA-F]{3,6}$/.test(raw)) return hexToRgb(raw);
  return [245, 245, 247];
}

function makeStar(canvas: HTMLCanvasElement): BackgroundStar {
  const roll = Math.random();
  const hero = roll >= 0.97;
  const size = hero ? 4 + Math.floor(Math.random() * 2) : roll >= 0.82 ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);
  const baseOpacity = hero
    ? Math.random() * 0.1 + 0.9
    : size > 2
      ? Math.random() * 0.25 + 0.6
      : Math.random() * 0.3 + 0.3;
  return {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size,
    hero,
    baseOpacity,
    currentOpacity: baseOpacity,
    twinkle: hero || Math.random() < twinkleProbability,
    twinkleSpeed: hero
      ? minTwinkleSpeed + 2 + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
      : minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
    twinkleDirection: -1,
    twinkleTimer: 0,
  };
}

function initStars(canvas: HTMLCanvasElement): BackgroundStar[] {
  const area = canvas.width * canvas.height;
  const numStars = Math.floor(area * starDensity);
  const stars: BackgroundStar[] = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(makeStar(canvas));
  }
  return stars;
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  r: number,
  g: number,
  b: number,
  x: number,
  y: number,
  size: number,
  opacity: number,
): void {
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function renderStaticFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  stars: BackgroundStar[],
  color: [number, number, number],
): void {
  const [r, g, b] = color;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    drawStar(ctx, r, g, b, star.x, star.y, star.size, star.baseOpacity);
  });
}

function renderLiveFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  stars: BackgroundStar[],
  color: [number, number, number],
): void {
  const [r, g, b] = color;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    drawStar(ctx, r, g, b, star.x, star.y, star.size, star.currentOpacity);

    if (star.twinkle) {
      star.twinkleTimer += 1 / targetFps;
      if (star.twinkleTimer >= star.twinkleSpeed) {
        star.twinkleTimer = 0;
        star.twinkleDirection *= -1;
      }
      const progress = star.twinkleTimer / star.twinkleSpeed;
      if (progress < 0.5) {
        star.currentOpacity =
          star.twinkleDirection < 0 ? star.baseOpacity : star.baseOpacity * 0.3;
      } else {
        star.currentOpacity =
          star.twinkleDirection < 0 ? star.baseOpacity * 0.3 : star.baseOpacity;
      }
    }
  });
}

function BackgroundPixelStarsInner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars = initStars(canvas);
    const color = resolveStarColor();
    let raf: number | null = null;
    let lastRender = 0;

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = initStars(canvas);
      if (reduce || raf === null) {
        renderStaticFrame(ctx, canvas, stars, color);
      }
    };
    window.addEventListener("resize", handleResize);

    if (reduce) {
      renderStaticFrame(ctx, canvas, stars, color);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const regen = setInterval(() => {
      if (stars.length === 0) return;
      const n = Math.max(1, Math.floor(stars.length * percentToRegenerate));
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * stars.length);
        stars[idx] = makeStar(canvas);
      }
    }, starRegenerationInterval);

    const tick = (timestamp: number): void => {
      if (timestamp - lastRender >= frameInterval) {
        lastRender = timestamp;
        renderLiveFrame(ctx, canvas, stars, color);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      clearInterval(regen);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] print:hidden"
    />
  );
}

export const BackgroundPixelStars = memo(BackgroundPixelStarsInner, () => true);

export default BackgroundPixelStars;

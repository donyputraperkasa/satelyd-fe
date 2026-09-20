"use client";

import { useEffect, useRef } from "react";
import type { DeckCard } from "@/types";
import { WHEEL_COLORS, WHEEL_CONFIG } from "./wheels-constants";

interface WheelsCanvasProps {
  cards: DeckCard[];
  allCards: DeckCard[];
  currentAngle: number;
  isSpinning: boolean;
  onSpin: () => void;
  pointerBounce: number;
}

export function WheelsCanvas({
  cards,
  allCards,
  currentAngle,
  isSpinning,
  onSpin,
  pointerBounce,
}: WheelsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);

  // Trigger brief needle bounce on peg hit directly on DOM element
  useEffect(() => {
    if (pointerBounce > 0 && pointerRef.current) {
      pointerRef.current.style.transform =
        "translateX(-50%) rotate(-14deg) scale(1.05)";
      const t = setTimeout(() => {
        if (pointerRef.current) {
          pointerRef.current.style.transform =
            "translateX(-50%) rotate(0deg) scale(1)";
        }
      }, 70);
      return () => clearTimeout(t);
    }
  }, [pointerBounce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 520;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 24;

    ctx.clearRect(0, 0, size, size);

    // 1. Draw outer rim shadow & rim border
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 12, 0, Math.PI * 2);
    ctx.fillStyle = WHEEL_CONFIG.rimColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.fill();
    ctx.restore();

    // Outer rim gold border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 11, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = WHEEL_CONFIG.rimGoldBorder;
    ctx.stroke();

    // Inner rim line
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 1, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.stroke();

    // 2. Draw Wheel Segments rotated by currentAngle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((currentAngle * Math.PI) / 180);

    const count = Math.max(1, cards.length);
    const segAngleRad = (Math.PI * 2) / count;

    cards.forEach((card, i) => {
      let colorIndex = i % WHEEL_COLORS.length;
      if (i === count - 1 && count > 1 && colorIndex === 0) {
        colorIndex = 1;
      }
      const color = WHEEL_COLORS[colorIndex];
      const startAngle = i * segAngleRad;
      const endAngle = (i + 1) * segAngleRad;

      // Slice fill
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color.bg;
      ctx.fill();

      // Divider line
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.stroke();

      // Find original card index in deck
      const originalIdx = allCards.findIndex((c) => c.id === card.id);
      const cardNum = originalIdx >= 0 ? originalIdx + 1 : i + 1;

      // Label text
      ctx.save();
      ctx.rotate(startAngle + segAngleRad / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      const textDist = radius - 28;
      ctx.fillStyle = color.text;

      if (color.text === "#451420") {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      } else {
        ctx.shadowColor = "rgba(0,0,0,0.55)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
      }

      if (count <= 16) {
        ctx.font = "bold 16px Outfit, sans-serif";
        ctx.fillText(`Soal #${cardNum}`, textDist, 0);
      } else {
        ctx.font = "bold 14px Outfit, sans-serif";
        ctx.fillText(`#${cardNum}`, textDist, 0);
      }

      ctx.restore();
    });

    // 3. Draw Pegs / Pins on the outer rim
    const pegCount = Math.max(count, 12);
    const pegAngleRad = (Math.PI * 2) / pegCount;
    for (let p = 0; p < pegCount; p++) {
      const pAngle = p * pegAngleRad;
      const pegDist = radius + 6;
      const px = Math.cos(pAngle) * pegDist;
      const py = Math.sin(pAngle) * pegDist;

      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = WHEEL_CONFIG.pegColor;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 2;
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = WHEEL_CONFIG.rimGoldBorder;
      ctx.stroke();
    }

    ctx.restore(); // Restore wheel rotation

    // 4. Center Hub (Stationary relative to wheel spin for clean look)
    const hubRadius = 46;

    // Hub outer gold ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubRadius + 5, 0, Math.PI * 2);
    ctx.fillStyle = "#E9C46A";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fill();

    // Hub core circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubRadius, 0, Math.PI * 2);
    const hubGrad = ctx.createRadialGradient(
      centerX - 10,
      centerY - 10,
      5,
      centerX,
      centerY,
      hubRadius
    );
    hubGrad.addColorStop(0, "#5B1C2E");
    hubGrad.addColorStop(1, "#320B15");
    ctx.fillStyle = hubGrad;
    ctx.fill();

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    // Center text "SPIN"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 15px Outfit, sans-serif";
    ctx.fillStyle = "#FFFBEB";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 3;
    ctx.fillText("SPIN", centerX, centerY);
  }, [cards, allCards, currentAngle, pointerBounce]);

  return (
    <div className="relative flex items-center justify-center p-2 select-none">
      {/* Top Pointer Ticker Arrow (at 12 o'clock) */}
      <div
        ref={pointerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-transform duration-75 origin-top"
        style={{ marginTop: "2px" }}
      >
        <svg
          width="38"
          height="46"
          viewBox="0 0 38 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Outer Border */}
          <path
            d="M19 44L4 12C2 8 5 3 10 3H28C33 3 36 8 34 12L19 44Z"
            fill="#FFFFFF"
          />
          {/* Main Needle Body */}
          <path
            d="M19 41L6 13C4.8 10 7 6 10.5 6H27.5C31 6 33.2 10 32 13L19 41Z"
            fill="url(#needleGrad)"
          />
          {/* Inner Golden Accent */}
          <circle cx="19" cy="14" r="5" fill="#FFFBEB" opacity="0.9" />
          <defs>
            <linearGradient
              id="needleGrad"
              x1="19"
              y1="6"
              x2="19"
              y2="41"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#BE123C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Wheel Canvas */}
      <canvas
        ref={canvasRef}
        onClick={() => {
          if (!isSpinning) onSpin();
        }}
        className={`max-w-full h-auto w-[340px] sm:w-[440px] lg:w-[480px] aspect-square rounded-full transition-transform duration-200 cursor-pointer ${
          isSpinning ? "cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"
        }`}
        title={isSpinning ? "Roda sedang berputar..." : "Klik untuk memutar roda"}
      />

      {/* Interactive Center Hub Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!isSpinning) onSpin();
        }}
        disabled={isSpinning}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#5B1C2E] via-[#451420] to-[#2E0A14] border-[3.5px] border-[#E9C46A] shadow-2xl flex flex-col items-center justify-center transition-all duration-200 select-none ${
          isSpinning
            ? "cursor-not-allowed opacity-90 scale-95"
            : "hover:scale-108 active:scale-95 cursor-pointer shadow-[#451420]/50 hover:border-white animate-pulse"
        }`}
        title={isSpinning ? "Roda sedang berputar..." : "Klik untuk memutar roda (atau tekan Spasi)"}
      >
        <span className="font-black text-sm sm:text-base tracking-widest text-[#FFFBEB] drop-shadow-md">
          {isSpinning ? "..." : "SPIN"}
        </span>
      </button>
    </div>
  );
}

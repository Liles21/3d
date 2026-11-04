"use client";

import React, { useMemo, useEffect } from "react";
import * as THREE from "three";

interface StudentPresentationBoardProps {
  studentName: string;
  role: string;
  title: string;
  points: string[];
  slogan: string;
  questionNumber: number;
  isPresenter?: boolean;
}

export function StudentPresentationBoard({
  studentName,
  role,
  title,
  points,
  slogan,
  questionNumber,
  isPresenter = false,
}: StudentPresentationBoardProps) {
  // Generate crisp high-resolution 2D CanvasTexture
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Crisp White/Cream Paper Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 512, 640);

    // Subtle paper border
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 492, 620);

    // 2. Header Banner
    ctx.fillStyle = isPresenter ? "#0f172a" : "#059669";
    ctx.beginPath();
    ctx.roundRect(20, 36, 472, 54, 8);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      isPresenter ? "🎓 CLASSROOM MODERATOR AGENDA" : `🌿 CARAGA ECO-ICT FORUM • Q${questionNumber}`,
      256,
      70
    );

    // 3. Proponent / Speaker Badge Card
    ctx.fillStyle = isPresenter ? "#f1f5f9" : "#ecfdf5";
    ctx.strokeStyle = isPresenter ? "#94a3b8" : "#6ee7b7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(20, 100, 472, 64, 8);
    ctx.fill();
    ctx.stroke();

    // Student Name
    ctx.fillStyle = isPresenter ? "#0f172a" : "#065f46";
    ctx.font = "bold 21px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(studentName, 256, 128);

    // Student Role
    ctx.fillStyle = isPresenter ? "#475569" : "#047857";
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillText(role.toUpperCase(), 256, 150);

    // 4. Topic Title
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(title, 26, 196);

    // Decorative Emerald Underline
    ctx.fillStyle = isPresenter ? "#3b82f6" : "#10b981";
    ctx.fillRect(26, 206, 160, 4);

    // 5. 3 Discussion Points (Structured White Cards with Checkmark Icons)
    let cardY = 224;
    points.forEach((point) => {
      // Card Container
      ctx.fillStyle = "#f8fafc";
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(22, cardY, 468, 86, 8);
      ctx.fill();
      ctx.stroke();

      // Checkmark Circle Icon
      ctx.fillStyle = isPresenter ? "#2563eb" : "#059669";
      ctx.beginPath();
      ctx.arc(52, cardY + 43, 16, 0, Math.PI * 2);
      ctx.fill();

      // Checkmark Glyph
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✓", 52, cardY + 49);

      // Text Wrapping inside card
      ctx.fillStyle = "#1e293b";
      ctx.font = "600 15px system-ui, sans-serif";
      ctx.textAlign = "left";

      const words = point.split(" ");
      let line1 = "";
      let line2 = "";
      for (const w of words) {
        if (ctx.measureText(line1 + w + " ").width < 370) {
          line1 += w + " ";
        } else {
          line2 += w + " ";
        }
      }

      ctx.fillText(line1.trim(), 80, cardY + 36);
      if (line2) {
        ctx.fillStyle = "#475569";
        ctx.font = "500 13px system-ui, sans-serif";
        ctx.fillText(line2.trim(), 80, cardY + 60);
      }

      cardY += 98;
    });

    // 6. Slogan / Takeaway Bottom Banner
    ctx.fillStyle = isPresenter ? "#0f172a" : "#065f46";
    ctx.beginPath();
    ctx.roundRect(20, 532, 472, 54, 8);
    ctx.fill();

    ctx.fillStyle = "#fef08a";
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`★  ${slogan}  ★`, 256, 564);

    // 7. Footer Micro-Stamp
    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 10px system-ui, sans-serif";
    ctx.fillText("CARAGA ECO-ICT CLASSROOM • VERIFIED PROPOSAL DISCUSSION BOARD", 256, 608);

    const canvasTex = new THREE.CanvasTexture(canvas);
    canvasTex.anisotropy = 4;
    canvasTex.needsUpdate = true;
    return canvasTex;
  }, [studentName, role, title, points, slogan, questionNumber, isPresenter]);

  // Clean up texture when unmounted or changed
  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  return (
    <group position={[0, 1.05, 0.32]} rotation={[-0.15, 0, 0]}>
      {/* 1. Sturdy Dark Timber Clipboard Backing Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.52, 0.018]} />
        <meshStandardMaterial color={isPresenter ? "#1e293b" : "#78350f"} roughness={0.65} />
      </mesh>

      {/* 2. Printed Discussion Board Face with High-Resolution Canvas Texture */}
      {texture && (
        <mesh position={[0, 0, 0.01]} receiveShadow>
          <planeGeometry args={[0.37, 0.48]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      )}

      {/* 3. Top Metal Clamp / Clip */}
      <mesh position={[0, 0.24, 0.016]} castShadow>
        <boxGeometry args={[0.13, 0.035, 0.02]} />
        <meshStandardMaterial
          color={isPresenter ? "#e2e8f0" : "#94a3b8"}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* 4. Left and Right Hand Grip Tabs (Where student hands hold the board) */}
      <mesh position={[-0.205, -0.04, 0.005]}>
        <boxGeometry args={[0.015, 0.08, 0.018]} />
        <meshStandardMaterial color="#475569" roughness={0.5} />
      </mesh>
      <mesh position={[0.205, -0.04, 0.005]}>
        <boxGeometry args={[0.015, 0.08, 0.018]} />
        <meshStandardMaterial color="#475569" roughness={0.5} />
      </mesh>
    </group>
  );
}


"use client";

import { Html } from "@react-three/drei";
import React, { memo } from "react";
import { ZoneId } from "@/lib/types";

interface MarkerProps {
  position: [number, number, number];
  title: string;
  icon: string;
  zoneId: ZoneId;
  isActive: boolean;
  onSelect: (zoneId: ZoneId) => void;
  isModalOpen?: boolean;
}

export const Marker = memo(function Marker({
  position,
  title,
  icon,
  zoneId,
  isActive,
  onSelect,
  isModalOpen = false,
}: MarkerProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(zoneId);
  };

  return (
    <group position={position}>
      {!isModalOpen && (
        <Html
          center
          distanceFactor={9.5}
          occlude
          zIndexRange={[10, 0]}
          portal={{ current: (typeof document !== "undefined" ? document.body : null) as unknown as HTMLElement }}
          className="pointer-events-auto"
          style={{
            userSelect: "none",
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={handleClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 12px",
              minHeight: "30px",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              backgroundColor: isActive ? "#10b981" : "rgba(10, 18, 12, 0.9)",
              color: isActive ? "#022c22" : "#ecfdf5",
              border: isActive ? "1.5px solid #6ee7b7" : "1px solid rgba(52, 211, 153, 0.4)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "18px",
                height: "18px",
                borderRadius: "9999px",
                fontSize: "10px",
                backgroundColor: isActive ? "#022c22" : "rgba(16, 185, 129, 0.35)",
                color: isActive ? "#6ee7b7" : "#ffffff",
              }}
            >
              {icon}
            </span>
            <span style={{ fontSize: "10.5px", letterSpacing: "0.01em" }}>{title}</span>
          </button>
        </Html>
      )}
    </group>
  );
});

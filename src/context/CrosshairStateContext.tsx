import React, { createContext, useContext, useState } from "react";

export type CrosshairShape =
  | "cross"
  | "dot"
  | "circle"
  | "t-cross"
  | "box"
  | "diamond"
  | "precision";

export interface CrosshairColorOption {
  name: string;
  hex: string;
  glow: string;
}

export const COLOR_OPTIONS: CrosshairColorOption[] = [
  { name: "Lime Green", hex: "#69F0AE", glow: "rgba(105, 240, 174, 0.35)" },
  { name: "Cyber Cyan", hex: "#00E5FF", glow: "rgba(0, 229, 255, 0.35)" },
  { name: "Electric Violet", hex: "#8B5CF6", glow: "rgba(139, 92, 246, 0.35)" },
  { name: "Coral Red", hex: "#FF4655", glow: "rgba(255, 70, 85, 0.35)" },
  { name: "Sun Orange", hex: "#FF9100", glow: "rgba(255, 145, 0, 0.35)" },
  { name: "Pure White", hex: "#FFFFFF", glow: "rgba(255, 255, 255, 0.35)" },
];

interface CrosshairStateContextType {
  shape: CrosshairShape;
  setShape: (shape: CrosshairShape) => void;
  color: string;
  setColor: (hex: string) => void;
  size: number;
  setSize: (size: number) => void;
  thickness: number;
  setThickness: (thickness: number) => void;
  gap: number;
  setGap: (gap: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  outline: boolean;
  setOutline: (outline: boolean) => void;
  centerDot: boolean;
  setCenterDot: (centerDot: boolean) => void;
  activeColorOption: CrosshairColorOption;
  resetDefaults: () => void;
}

const CrosshairStateContext = createContext<CrosshairStateContextType | undefined>(undefined);

export const CrosshairStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shape, setShape] = useState<CrosshairShape>("cross");
  const [color, setColor] = useState<string>("#69F0AE");
  const [size, setSize] = useState<number>(6);
  const [thickness, setThickness] = useState<number>(2);
  const [gap, setGap] = useState<number>(3);
  const [opacity, setOpacity] = useState<number>(1);
  const [outline, setOutline] = useState<boolean>(true);
  const [centerDot, setCenterDot] = useState<boolean>(false);

  const activeColorOption =
    COLOR_OPTIONS.find((c) => c.hex.toLowerCase() === color.toLowerCase()) || COLOR_OPTIONS[0];

  const resetDefaults = () => {
    setShape("cross");
    setColor("#69F0AE");
    setSize(6);
    setThickness(2);
    setGap(3);
    setOpacity(1);
    setOutline(true);
    setCenterDot(false);
  };

  return (
    <CrosshairStateContext.Provider
      value={{
        shape,
        setShape,
        color,
        setColor,
        size,
        setSize,
        thickness,
        setThickness,
        gap,
        setGap,
        opacity,
        setOpacity,
        outline,
        setOutline,
        centerDot,
        setCenterDot,
        activeColorOption,
        resetDefaults,
      }}
    >
      {children}
    </CrosshairStateContext.Provider>
  );
};

export const useCrosshairState = (): CrosshairStateContextType => {
  const context = useContext(CrosshairStateContext);
  if (!context) {
    throw new Error("useCrosshairState must be used within a CrosshairStateProvider");
  }
  return context;
};

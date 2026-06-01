"use client";

import { useRef, useState, useEffect, Component, type ErrorInfo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MiniLogoFallback() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="20,2 38,11 38,29 20,38 2,29 2,11"
        stroke="#6C47FF"
        strokeWidth="1.5"
        fill="#6C47FF"
        fillOpacity="0.12"
      />
      <text
        x="20"
        y="24"
        textAnchor="middle"
        fill="#6C47FF"
        fontSize="12"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        HN
      </text>
    </svg>
  );
}

function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[Logo3DMini] Canvas error caught:", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function MiniGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={2} color="#6C47FF" />
      <pointLight position={[-2, -1, 2]} intensity={1} color="#00D9FF" />

      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#6C47FF"
          metalness={0.9}
          roughness={0.1}
          emissive="#6C47FF"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.0, 0.04, 6, 32]} />
        <meshStandardMaterial
          color="#00D9FF"
          metalness={1}
          roughness={0}
          emissive="#00D9FF"
          emissiveIntensity={0.6}
        />
      </mesh>
    </>
  );
}

export default function Logo3DMini() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebgl(canUseWebGL());
  }, []);

  if (!mounted) return <MiniLogoFallback />;
  if (!webgl) return <MiniLogoFallback />;

  const fallback = <MiniLogoFallback />;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false }}
        style={{ background: "transparent", width: 40, height: 40 }}
      >
        <MiniGeometry />
      </Canvas>
    </CanvasErrorBoundary>
  );
}

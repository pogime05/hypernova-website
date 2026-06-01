"use client";

import { useRef, useState, useEffect, Component, type ErrorInfo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// ── Fallback SVG shown before hydration or when WebGL is unavailable ──────────

function LogoFallback({ size = "100%" }: { size?: string | number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="50,4 96,28 96,72 50,96 4,72 4,28"
        stroke="#6C47FF"
        strokeWidth="1.5"
        fill="#6C47FF"
        fillOpacity="0.08"
      />
      <polygon
        points="50,18 82,36 82,64 50,82 18,64 18,36"
        fill="#6C47FF"
        fillOpacity="0.2"
      />
      <circle cx="50" cy="50" r="28" stroke="#00D9FF" strokeWidth="0.8" strokeDasharray="4 3" fill="none" opacity="0.5" />
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fill="#6C47FF"
        fontSize="22"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        HN
      </text>
    </svg>
  );
}

// ── WebGL capability check (client-only) ──────────────────────────────────────

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

// ── Error boundary wrapping Canvas ────────────────────────────────────────────

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
    console.warn("[Logo3D] Canvas error caught:", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ── 3D Scene geometry ─────────────────────────────────────────────────────────

function NovaGeometry({ hovered }: { hovered: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    const speed = hovered ? 1.8 : 0.4;

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * speed * 0.5;
      outerRef.current.rotation.x += delta * speed * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * speed * 0.7;
      innerRef.current.rotation.z += delta * speed * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.3;
    }
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(time.current * 1.2) * 3;
      lightRef.current.position.z = Math.cos(time.current * 1.2) * 3;
      lightRef.current.intensity = hovered
        ? 2 + Math.sin(time.current * 3) * 0.5
        : 1.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6C47FF" />
      <pointLight ref={lightRef} position={[3, 0, 3]} intensity={1.2} color="#00D9FF" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial
            color="#6C47FF"
            metalness={0.9}
            roughness={0.05}
            emissive="#6C47FF"
            emissiveIntensity={hovered ? 0.5 : 0.2}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.9, 0]} />
          <MeshDistortMaterial
            color="#6C47FF"
            metalness={0.9}
            roughness={0.05}
            emissive="#5533ee"
            emissiveIntensity={hovered ? 0.6 : 0.3}
            distort={hovered ? 0.3 : 0.1}
            speed={hovered ? 3 : 1}
          />
        </mesh>

        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.8, 0.03, 8, 64]} />
          <meshStandardMaterial
            color="#00D9FF"
            metalness={1}
            roughness={0}
            emissive="#00D9FF"
            emissiveIntensity={hovered ? 1 : 0.4}
          />
        </mesh>

        <mesh rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
          <torusGeometry args={[1.6, 0.02, 8, 64]} />
          <meshStandardMaterial
            color="#6C47FF"
            metalness={1}
            roughness={0}
            emissive="#6C47FF"
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </>
  );
}

// ── Exported component ────────────────────────────────────────────────────────

export default function Logo3D() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebgl(canUseWebGL());
  }, []);

  // Before hydration: render nothing (parent already reserves the space)
  if (!mounted) return <LogoFallback />;

  // WebGL unavailable: show SVG monogram
  if (!webgl) return <LogoFallback />;

  const fallback = <LogoFallback />;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <div
        style={{ width: "100%", height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false }}
          style={{ background: "transparent" }}
        >
          <NovaGeometry hovered={hovered} />
          <Environment preset="city" />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}

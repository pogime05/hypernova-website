"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent", width: 40, height: 40 }}
    >
      <MiniGeometry />
    </Canvas>
  );
}

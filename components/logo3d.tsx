"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

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

      {/* Outer icosahedron */}
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

        {/* Inner solid octahedron */}
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

        {/* Orbital ring */}
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

        {/* Second orbital ring */}
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

export default function Logo3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <NovaGeometry hovered={hovered} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

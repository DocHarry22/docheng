"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.08;
    }
    if (glowRef.current) {
      const s = 2.0 + Math.sin(clock.getElapsedTime() * 0.4) * 0.15;
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group scale={1.3}>
      {/* Inner wireframe core - more visible */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#60A5FA"
          emissiveIntensity={0.25}
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* Center bright point */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={1.2}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  nodeCount,
  lineOpacity = 0.1,
  nodeOpacity = 0.6,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  nodeCount: number;
  lineOpacity?: number;
  nodeOpacity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return positions;
  }, [radius, nodeCount]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <group rotation={tilt}>
      <group ref={groupRef}>
        {/* Orbit line - subtle */}
        <line>
          <bufferGeometry attach="geometry" {...lineGeometry} />
          <lineBasicMaterial color={color} transparent opacity={lineOpacity} />
        </line>
        {/* Orbit nodes - reduced */}
        {nodePositions.map((pos, i) => (
          <Float key={i} speed={1.5} floatIntensity={0.2}>
            <mesh position={pos}>
              <sphereGeometry args={[0.045, 10, 10]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
}

function ParticleField() {
  const count = 120; // Reduced from 200

  const pseudo = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  };

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudo(i + 1) - 0.5) * 25;
      pos[i * 3 + 1] = (pseudo(i + 101) - 0.5) * 25;
      pos[i * 3 + 2] = (pseudo(i + 1001) - 0.5) * 25;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#60A5FA"
        size={0.015}
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.7} color="#3B82F6" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#F59E0B" />

      <CoreSphere />

      <OrbitRing
        radius={2.2}
        tilt={[0.3, 0, 0]}
        speed={0.1}
        color="#3B82F6"
        nodeCount={2}
        lineOpacity={0.08}
        nodeOpacity={0.5}
      />
      <OrbitRing
        radius={3}
        tilt={[-0.2, 0.5, 0.1]}
        speed={-0.07}
        color="#F59E0B"
        nodeCount={3}
        lineOpacity={0.06}
        nodeOpacity={0.4}
      />
      <OrbitRing
        radius={3.8}
        tilt={[0.1, -0.3, -0.2]}
        speed={0.04}
        color="#8B5CF6"
        nodeCount={3}
        lineOpacity={0.04}
        nodeOpacity={0.35}
      />

      <ParticleField />
      <Stars
        radius={60}
        depth={60}
        count={600}
        factor={1.5}
        saturation={0}
        fade
        speed={0.3}
      />
    </>
  );
}

export default function OrbitScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

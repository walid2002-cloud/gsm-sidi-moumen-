"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c4b5fd"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Book({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={ref} position={position} rotation={[0.3, 0.4, 0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.72, 1.05, 0.14]} />
          <meshStandardMaterial color={color} metalness={0.15} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[0.58, 0.88]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.28, 0.08]}>
          <boxGeometry args={[0.38, 0.05, 0.01]} />
          <meshStandardMaterial color="#FFC502" />
        </mesh>
      </group>
    </Float>
  );
}

function AtomIcon({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.55;
  });

  return (
    <Float speed={1.8} floatIntensity={0.7} rotationIntensity={0.15}>
      <group ref={ref} position={position} scale={0.85}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#FFC502" emissive="#FFC502" emissiveIntensity={0.55} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[i * 0.95, i * 0.7, 0.2]}>
            <torusGeometry args={[0.52, 0.018, 10, 72]} />
            <meshStandardMaterial color="#8B47F5" metalness={0.4} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function MathIcon({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.6} floatIntensity={0.55} rotationIntensity={0.35}>
      <group position={position}>
        <mesh rotation={[0.4, 0.6, 0.2]}>
          <torusKnotGeometry args={[0.28, 0.08, 96, 16]} />
          <meshStandardMaterial color="#c4b5fd" metalness={0.35} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function FrenchIcon({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.35;
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <group ref={ref} position={position} rotation={[0.15, -0.3, 0]}>
        <mesh rotation={[0, 0, 0.35]} position={[-0.12, 0, 0]}>
          <boxGeometry args={[0.38, 0.52, 0.04]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh rotation={[0, 0, -0.35]} position={[0.12, 0, 0]}>
          <boxGeometry args={[0.38, 0.52, 0.04]} />
          <meshStandardMaterial color="#ede9fe" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.08, 0.54, 0.08]} />
          <meshStandardMaterial color="#6711EF" />
        </mesh>
      </group>
    </Float>
  );
}

function MovingLights() {
  const gold = useRef<THREE.PointLight>(null);
  const violet = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (gold.current) {
      gold.current.position.set(Math.sin(t) * 3.2, 1.4 + Math.cos(t * 0.8), 2);
    }
    if (violet.current) {
      violet.current.position.set(Math.cos(t * 0.7) * 3.4, Math.sin(t * 0.5) * 1.6, 1.5);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} color="#e2e8f0" />
      <pointLight ref={gold} color="#FFC502" intensity={18} distance={10} />
      <pointLight ref={violet} color="#6711EF" intensity={16} distance={11} />
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.55,
      0.045,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      0.2 + state.pointer.y * 0.25,
      0.045,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0 h-full w-full"
      aria-hidden
    >
      <MovingLights />
      <Particles />
      <Sparkles count={36} scale={[12, 7, 6]} size={2.4} speed={0.4} color="#FFD84A" />
      <Book position={[-2.7, 0.2, -0.5]} color="#4E0BB8" speed={0.22} />
      <Book position={[2.55, -0.35, 0.15]} color="#0f172a" speed={-0.18} />
      <Book position={[0.05, 1.45, -1.35]} color="#6711EF" speed={0.15} />
      <MathIcon position={[-1.15, -1.05, 0.55]} />
      <AtomIcon position={[1.45, 0.85, 0.1]} />
      <FrenchIcon position={[-2.05, 1.15, -0.15]} />
      <CameraRig />
    </Canvas>
  );
}

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface CubeGridProps {
  isDark: boolean;
}

function CubeGrid({ isDark }: CubeGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Rotación automática + manual
  useFrame(() => {
    if (!groupRef.current) return;

    // Rotación automática
    groupRef.current.rotation.x += 0.003;
    groupRef.current.rotation.y += 0.005;

    // Añadir rotación manual
    groupRef.current.rotation.x += rotation.x;
    groupRef.current.rotation.y += rotation.y;

    // Decay de la rotación manual
    setRotation(prev => ({
      x: prev.x * 0.95,
      y: prev.y * 0.95
    }));
  });

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.stopPropagation();
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation({
      x: deltaY * 0.002,
      y: deltaX * 0.002
    });

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const cubeColor = isDark ? '#666666' : '#999999';
  const cubes = [];
  const gap = 1.1;
  const size = 0.85;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push(
          <RoundedBox
            key={`${x}-${y}-${z}`}
            args={[size, size, size]}
            radius={0.08}
            smoothness={4}
            position={[x * gap, y * gap, z * gap]}
          >
            <meshStandardMaterial
              color={cubeColor}
              metalness={0.7}
              roughness={0.25}
            />
          </RoundedBox>
        );
      }
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {cubes}
    </group>
  );
}

interface Cube3DProps {
  isDark: boolean;
}

export function Cube3D({ isDark }: Cube3DProps) {
  return (
    <Canvas
      camera={{ position: [6, 4, 6], fov: 45 }}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
        background: isDark ? '#000000' : '#ffffff',
      }}
      onPointerDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onPointerUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={2} />
      <directionalLight position={[-5, -5, -5]} intensity={1} />
      <CubeGrid isDark={isDark} />
    </Canvas>
  );
}

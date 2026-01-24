import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SEPARATION = 80;
const AMOUNT_X = 50;
const AMOUNT_Y = 25;

interface ParticleWaveProps {
  isDark: boolean;
}

function ParticleWave({ isDark }: ParticleWaveProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Crear geometría y material
  const { geometry, material } = useMemo(() => {
    const numParticles = AMOUNT_X * AMOUNT_Y;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(isDark ? 0x888888 : 0x666666) },
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    return { geometry: geo, material: mat };
  }, []);

  // Actualizar color cuando cambia el tema
  useEffect(() => {
    material.uniforms.color.value = new THREE.Color(isDark ? 0x888888 : 0x666666);
  }, [isDark, material]);

  // Animación de partículas
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const scales = pointsRef.current.geometry.attributes.scale.array as Float32Array;
    const count = clock.getElapsedTime() * 0.8;

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions[i + 1] =
          Math.sin((ix + count) * 0.3) * 50 +
          Math.sin((iy + count) * 0.5) * 50;

        scales[j] =
          (Math.sin((ix + count) * 0.3) + 1) * 8 +
          (Math.sin((iy + count) * 0.5) + 1) * 8;

        i += 3;
        j++;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.scale.needsUpdate = true;
  });

  // Movimiento de cámara con mouse
  useFrame(({ camera }) => {
    camera.position.x += (mouse.x * viewport.width * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * viewport.height * 0.2 + 350 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

interface WaveEffectProps {
  isDark: boolean;
}

export function WaveEffect({ isDark }: WaveEffectProps) {
  return (
    <Canvas
      camera={{ position: [0, 350, 800], fov: 70, near: 1, far: 10000 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: isDark ? '#000000' : '#ffffff',
      }}
    >
      <ParticleWave isDark={isDark} />
    </Canvas>
  );
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WaveEffectProps {
  theme: 'dark' | 'light';
}

// Configuración optimizada - basada en ejemplo oficial Three.js
const SEPARATION = 28;
const AMOUNT_X = 100;
const AMOUNT_Y = 50;
const PARTICLE_COUNT = AMOUNT_X * AMOUNT_Y;

export function WaveEffect({ theme }: WaveEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    particles: THREE.Points;
    material: THREE.ShaderMaterial;
    count: number;
    animationId: number;
  } | null>(null);

  // Inicialización única
  useEffect(() => {
    const container = containerRef.current;
    if (!container || sceneRef.current) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Escena
    const scene = new THREE.Scene();

    // Cámara - vista elevada de las ondas
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 10000);
    camera.position.set(0, 350, 600);
    camera.lookAt(0, 0, 0);

    // Geometría con posiciones PRE-CALCULADAS (onda visible desde frame 0)
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    let idx = 0;
    let scaleIdx = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        const x = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;
        // Onda inicial ya calculada
        const y = (Math.sin(ix * 0.3) * 40) + (Math.sin(iy * 0.5) * 40);

        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        scales[scaleIdx] = (Math.sin(ix * 0.3) + 1) * 10 + (Math.sin(iy * 0.5) + 1) * 10;

        idx += 3;
        scaleIdx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Material con shaders del ejemplo oficial + mejoras visuales
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(theme === 'dark' ? 0xaaaaaa : 0x888888) },
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
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          // Círculo con borde suave
          float alpha = smoothstep(0.5, 0.2, dist) * 0.8;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Renderer optimizado
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Contador para animación
    let count = 0;
    let animationId = 0;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Loop de animación
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Suavizar movimiento del mouse (más lento y suave)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.02;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.02;

      const pos = geometry.attributes.position.array as Float32Array;
      const scl = geometry.attributes.scale.array as Float32Array;

      // Calcular posición del mouse en coordenadas del mundo
      const mouseWorldX = mouseRef.current.x * (AMOUNT_X * SEPARATION) * 0.5;
      const mouseWorldZ = mouseRef.current.y * (AMOUNT_Y * SEPARATION) * 0.5;

      let i = 0;
      let j = 0;

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          const x = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
          const z = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;

          // Ondas sinusoidales base
          const baseWave = (Math.sin((ix + count) * 0.3) * 40) +
                          (Math.sin((iy + count) * 0.5) * 40);

          // Efecto de onda del mouse (ripple) - más sutil
          const distToMouse = Math.sqrt(
            Math.pow(x - mouseWorldX, 2) + Math.pow(z - mouseWorldZ, 2)
          );
          const mouseWave = Math.sin(distToMouse * 0.015 - count * 1.5) *
                           Math.max(0, 25 - distToMouse * 0.05);

          pos[i + 1] = baseWave + mouseWave;

          // Escala también afectada por el mouse (más sutil)
          const baseScale = (Math.sin((ix + count) * 0.3) + 1) * 10 +
                           (Math.sin((iy + count) * 0.5) + 1) * 10;
          const mouseScale = Math.max(0, 8 - distToMouse * 0.02);

          scl[j] = baseScale + mouseScale;

          i += 3;
          j++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;

      // Mover cámara sutilmente con el mouse (más suave)
      camera.position.x += (mouseRef.current.x * 50 - camera.position.x) * 0.01;
      camera.lookAt(0, 0, 0);

      count += 0.06;

      renderer.render(scene, camera);
    };

    // Guardar referencias
    sceneRef.current = {
      renderer,
      scene,
      camera,
      particles,
      material,
      count: 0,
      animationId: 0,
    };

    // Iniciar animación inmediatamente
    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, []);

  // Actualizar color cuando cambia el tema (sin recrear escena)
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.material.uniforms.color.value = new THREE.Color(
        theme === 'dark' ? 0xaaaaaa : 0x888888
      );
    }
  }, [theme]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        background: theme === 'dark' ? '#0a0a0a' : '#fafafa',
      }}
    />
  );
}

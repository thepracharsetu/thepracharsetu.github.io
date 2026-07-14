import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Particle Bridge geometry (Wave of floating gold dust)
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color definitions
    const colorGoldLight = new THREE.Color('#D4AF37');
    const colorGoldDark = new THREE.Color('#AA7C11');

    for (let i = 0; i < particleCount; i++) {
      // Create a grid/bridge structure
      const u = i / particleCount;
      const x = (u - 0.5) * 35; // Spread on X axis
      const z = (Math.random() - 0.5) * 12; // Depth spread

      // Base sine wave representing the Setu (Bridge)
      const baseHeight = Math.sin(u * Math.PI * 2) * 2;
      const y = baseHeight + (Math.random() - 0.5) * 2.5; // Slight height spread

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation for gold feel
      const t = Math.random();
      const mixedColor = new THREE.Color().copy(colorGoldLight).lerp(colorGoldDark, t);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom round particle shape
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 5. Ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 6. Interactive states
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Map mouse coordinates to normalized device coords
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 3;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Render Loop with wave physics animation
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;

      // Update particle wave mathematics dynamically
      for (let i = 0; i < particleCount; i++) {
        const x = positionsAttr.getX(i);
        const z = positionsAttr.getZ(i);

        // Advanced fluid wave formula
        const wave1 = Math.sin(x * 0.2 + elapsedTime * 0.8) * 1.5;
        const wave2 = Math.cos(z * 0.3 + elapsedTime * 1.1) * 0.8;
        
        // Offset Y slightly based on time waves
        positionsAttr.setY(i, wave1 + wave2 + (Math.sin(elapsedTime * 0.5 + x * 0.05) * 0.5));
      }
      positionsAttr.needsUpdate = true;

      // Mouse interactive camera easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 2;
      camera.position.y = 5 - mouseY * 1.5;
      camera.lookAt(0, 0, 0);

      // Slow rotation over time
      particleSystem.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 8. Dynamic resize handling
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="3d-webgl-background"
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-85"
    />
  );
}

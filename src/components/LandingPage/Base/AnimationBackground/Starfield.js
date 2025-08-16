/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: black;
  pointer-events: none;
`;

export const Starfield = () => {
  const containerRef = useRef();

  useEffect(() => {
    const mount = containerRef.current;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      200, // ใกล้สุด
      2000, // ไกลสุด
    );
    camera.position.z = 1000;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    mount.appendChild(renderer.domElement);

    // 4. Texture
    const textureLoader = new THREE.TextureLoader();
    const circleTexture = textureLoader.load("/images/star.png");

    // 5. พาเลตสี
    const palette = [new THREE.Color(0xffffff), new THREE.Color(0x99ccff), new THREE.Color(0xff99cc)];

    // 6. จุดดาว
    const starCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const spreadXY = 2000;
    const minZ = 300;
    const maxZ = 1800;

    for (let i = 0; i < starCount; i++) {
      const w = i * 3;
      positions[w + 0] = (Math.random() - 0.5) * spreadXY;
      positions[w + 1] = (Math.random() - 0.5) * spreadXY;
      const r = minZ + Math.random() * (maxZ - minZ);
      positions[w + 2] = camera.position.z - r;

      const c = palette[(Math.random() * palette.length) | 0];
      colors[w + 0] = c.r;
      colors[w + 1] = c.g;
      colors[w + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    // 7. Material
    const material = new THREE.PointsMaterial({
      size: 2.5, // ปรับขนาดดาว
      map: circleTexture,
      transparent: true,
      alphaTest: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // -----------------------------
    // 🔥 Scroll Reactive Animation
    // -----------------------------
    const baseSpeedX = 0.00045; // ความเร็วพื้นฐาน
    const baseSpeedY = 0.00045;
    const boostFactor = 0.02; // ปรับความเร็วสกอ
    const maxBoost = 6; // คูณได้สูงสุดเท่ากับ 6x ของ base speed
    let velocity = 0; // ค่าความเร็วสะสม
    let lastY = window.scrollY || 0;
    let lastT = performance.now();
    let paused = prefersReduced; // ถ้า reduce motion ให้หยุดแต่แรก

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(now - lastT, 16);
      const v = (dy / dt) * 16;
      velocity += v * boostFactor;
      lastY = window.scrollY;
      lastT = now;
    };

    const decay = 0.92;

    const onVis = () => {
      paused = document.hidden || prefersReduced;
    };
    document.addEventListener("visibilitychange", onVis, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // 8. Loop
    const animate = () => {
      if (!paused) {
        const boost = Math.min(1 + velocity, maxBoost);
        stars.rotation.x += baseSpeedX * boost;
        stars.rotation.y += baseSpeedY * boost;
        velocity *= decay;
        if (velocity < 0.001) velocity = 0;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 9. Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };
    window.addEventListener("resize", handleResize);

    // 10. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      circleTexture.dispose?.();
    };
  }, []);

  return <Container ref={containerRef} />;
};

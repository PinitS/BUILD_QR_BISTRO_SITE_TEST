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

export const GradientFlow = ({ $color = ["#FAD0D7", "#FFFFFF"] }) => {
  const containerRef = useRef();

  useEffect(() => {
    const mount = containerRef.current;

    // ==== Scene / Camera ====
    const scene = new THREE.Scene();
    const makeCamera = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -10, 10);
    };
    let camera = makeCamera();

    // ==== Renderer ====
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // ==== ค่าคงที่ (2 สี) ====
    const COLORS = $color;
    const SPEED = 0.4; // ความเร็วพื้นฐาน
    const SCALE = 1.4; // ความถี่ลวดลาย
    const OPACITY = 1.0;

    // ==== Plane + Shader ====
    const w = window.innerWidth;
    const h = window.innerHeight;

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: SPEED },
        uScale: { value: SCALE },
        uOpacity: { value: OPACITY },
        uBoost: { value: 0 },
        uOffset: { value: 0 },
        uC0: { value: new THREE.Color(COLORS[0]) },
        uC1: { value: new THREE.Color(COLORS[1]) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime, uSpeed, uScale, uOpacity, uBoost, uOffset;
        uniform vec3 uC0, uC1;

        // บิด UV ให้รู้สึก "ไหล" ตาม boost (ตอนสกอ)
        vec2 distort(vec2 uv, float t, float boost){
          uv -= 0.5;
          float amp = mix(1.0, 1.0 + boost * 0.3, 0.8); // ลดผล boost ให้เนียน
          uv.x += amp * 0.06 * sin(uv.y*3.1415 + t*0.6);
          uv.y += amp * 0.05 * cos(uv.x*3.1415 - t*0.5);
          return uv + 0.5;
        }

        void main() {
          // ใช้เวลาเป็นฐาน + เพิ่มเฟสจาก uOffset (ไม่เด้งกลับ)
          float t = uTime * uSpeed;
          vec2 uv = distort(vUv, t, uBoost);

          // ใส่เฟส uOffset ลงในสัญญาณ ทำให้ลายเลื่อนไปเรื่อย ๆ อย่างต่อเนื่อง
          float g1 = 0.5 + 0.5 * sin((uv.x * uScale * 1.8) + t*1.0 + uOffset*0.9);
          float g2 = 0.5 + 0.5 * sin((uv.y * uScale * 1.6) - t*0.9 + uOffset*0.7);

          float mixVal = smoothstep(0.0, 1.0, 0.6*g1 + 0.4*g2);
          vec3 col = mix(uC0, uC1, mixVal);

          gl_FragColor = vec4(col, uOpacity);
        }
      `,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 1, 1), material);
    scene.add(plane);

    // ==== Scroll Physics: velocity + offset ====
    let vel = 0; // ความเร็วปัจจุบัน
    let offset = 0; // ระยะสะสม
    let lastY = window.scrollY || 0;
    let lastNow = performance.now();
    const boostFactor = 0.0025; // ปรับความเร็วสกอ
    const maxBoost = 1.6;
    const DAMP = 0.93;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      const target = Math.min(dy * boostFactor, maxBoost);
      vel = lerp(vel, target, 0.35);
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ==== Visibility ====
    let paused = false;
    const onVis = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis, { passive: true });

    // ==== Animate ====
    const clock = new THREE.Clock();
    const animate = () => {
      const now = performance.now();
      const dt = Math.max((now - lastNow) / 1000, 1 / 120);
      lastNow = now;

      if (!paused) {
        const t = clock.getElapsedTime();
        const friction = Math.pow(DAMP, dt * 60.0);
        vel *= friction;
        if (vel < 0.00008) vel = 0;
        offset += vel * dt * 60.0;

        material.uniforms.uBoost.value = vel;
        material.uniforms.uOffset.value = offset;
        material.uniforms.uTime.value = t;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ==== Resize ====
    const onResize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera = makeCamera();
      plane.geometry.dispose();
      plane.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 1, 1);
    };
    window.addEventListener("resize", onResize);

    // ==== Cleanup ====
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      plane.geometry.dispose();
      material.dispose();
    };
  }, [$color]);

  return <Container ref={containerRef} />;
};

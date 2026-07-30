"use client";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  /* vertex */
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
  }
  `,
  /* fragment */
  `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float dist = distance(uv, uMouse);
    uv.x += sin(dist * 12.0 - uTime * 2.0) * 0.03;
    uv.y += cos(dist * 12.0 - uTime * 2.0) * 0.03;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
  `
);

extend({ LiquidMaterial });

function Plane({ img }) {
  const mat = useRef();
  const texture = useTexture(img);
  const { mouse } = useThree();

  useFrame((_, delta) => {
    mat.current.uTime += delta;
    mat.current.uMouse.lerp(
      new THREE.Vector2(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5),
      0.08
    );
  });

  return (
    <mesh>
      <planeGeometry args={[3, 4, 64, 64]} />
      <liquidMaterial ref={mat} uTexture={texture} />
    </mesh>
  );
}

export default function LiquidImage({ img }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
    >
      <Plane img={img} />
    </Canvas>
  );
}

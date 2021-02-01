import React, { Suspense } from 'react';
import { Canvas, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';
import { useTweaks } from 'use-tweaks';

const Galaxy: React.FC = () => {
  const {
    count,
    colorInside,
    colorOutside,
    size,
    radius,
    branches,
    spin,
    randomnessPower,
  } = useTweaks('Galaxy', {
    count: {
      value: 100000,
      min: 50000,
      max: 200000,
      step: 1000,
    },
    colorInside: '#ff6030',
    colorOutside: '#1b3984',
    size: {
      value: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    radius: {
      value: 5,
      min: 0.01,
      max: 20,
      step: 0.001,
    },
    branches: {
      value: 3,
      min: 2,
      max: 20,
      step: 1,
    },
    spin: {
      value: 1,
      min: -5,
      max: 5,
      step: 0.001,
    },
    randomnessPower: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.001,
    },
  });

  const pointGeometryRef = useUpdate<THREE.BufferGeometry>(
    (self) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const colorI = new THREE.Color(colorInside);
      const colorO = new THREE.Color(colorOutside);

      for (let i = 0; i < count * 3; i++) {
        const i3 = i * 3;

        // Positions
        const rad = Math.random() * radius;
        const spinAngle = rad * spin;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const randomX =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);

        positions[i3] = Math.cos(branchAngle + spinAngle) * rad + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * rad + randomZ;

        // Color
        const mixedColor = colorI.clone();
        mixedColor.lerp(colorO, rad / radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      self.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      self.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    },
    [count, colorInside, colorOutside, radius, branches, spin, randomnessPower]
  );

  return (
    <points>
      <pointsMaterial
        args={[
          {
            size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
          },
        ]}
      />
      <bufferGeometry ref={pointGeometryRef} />
    </points>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      camera={{
        position: [3, 3, 3],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Stats />
      <Suspense fallback={null}>
        <Galaxy />
      </Suspense>
    </Canvas>
  );
};

export default App;

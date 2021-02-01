import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';

const Galaxy: React.FC = () => {
  const {
    count,
    size,
    radius,
    branches,
    spin,
    randomnessPower,
    insideColor,
    outsideColor,
  } = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
  };

  const positions = React.useMemo(() => new Float32Array(count * 3), [count]);
  const colors = React.useMemo(() => new Float32Array(count * 3), [count]);
  const colorInside = React.useMemo(() => new THREE.Color(insideColor), [
    insideColor,
  ]);
  const colorOutside = React.useMemo(() => new THREE.Color(outsideColor), [
    outsideColor,
  ]);

  React.useEffect(() => {
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
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, rad / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
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
      pixelRatio={Math.min(window.devicePixelRatio, 2)}>
      <color attach='background' args={[0, 0, 0]} />
      <OrbitControls />
      <Stats />
      <Suspense fallback={null}>
        <Galaxy />
      </Suspense>
    </Canvas>
  );
};

export default App;

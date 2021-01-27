import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'drei';
import { a, useSpring } from '@react-spring/three';
import { useTweaks, makeButton } from 'use-tweaks';

const Cube: React.FC = () => {
  const [rotationY, setRotationY] = React.useState(0);
  const CUBE_GROUP = 'Cube';

  const [texture] = React.useState(() => {
    const loader = new THREE.TextureLoader();
    const t = loader.load('/textures/minecraft.png');
    t.generateMipmaps = false;
    t.minFilter = THREE.NearestFilter;
    t.magFilter = THREE.NearestFilter;

    return t;
  });

  useTweaks(CUBE_GROUP, {
    ...makeButton('Spin', () => setRotationY((y) => y + Math.PI * 2)),
  });

  const { rotation } = useSpring({
    to: {
      rotation: rotationY,
    },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <a.mesh rotation-y={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" map={texture} />
    </a.mesh>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      camera={{
        position: [1, 1, 1],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Cube />
      </Suspense>
    </Canvas>
  );
};

export default App;

import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { a, useSpring } from '@react-spring/three';
import { useTweaks, makeButton, makeSeparator } from 'use-tweaks';

const Cube: React.FC = () => {
  const [rotationY, setRotationY] = React.useState(0);
  const CUBE_GROUP = 'Cube';

  const { x, y, wireframe, visibility, color: c } = useTweaks(CUBE_GROUP, {
    x: {
      value: 0,
      min: -3,
      max: 3,
    },
    y: {
      value: 0,
      min: -3,
      max: 3,
    },
    color: '#ff0000',
    wireframe: false,
    visibility: true,
    ...makeSeparator(),
    ...makeButton('Spin', () => setRotationY((y) => y + Math.PI * 2)),
  });

  const { rotation } = useSpring({
    to: {
      rotation: rotationY,
    },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <a.mesh position-x={x} position-y={y} rotation-y={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <a.meshBasicMaterial
        wireframe={wireframe}
        visible={visibility}
        attach="material"
        color={c}
      />
    </a.mesh>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 3],
        fov: 75,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Cube />
    </Canvas>
  );
};

export default App;

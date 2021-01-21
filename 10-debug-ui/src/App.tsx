import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';
import { OrbitControls } from 'drei';
import { withControls, Controls, useControl } from 'react-three-gui';
import { a, useSpring } from '@react-spring/three';

interface CubeProps {
  color: number | string;
}
const Cube: React.FC<CubeProps> = ({ color }) => {
  const mesh = React.useRef<Mesh>();
  const [rotationY, setRotationY] = React.useState(0);
  const CUBE_GROUP = 'Cube';

  const positionX = useControl('X', {
    group: CUBE_GROUP,
    min: -3,
    max: 3,
    type: 'number',
    spring: true,
  });

  const positionY = useControl('Y', {
    type: 'number',
    group: CUBE_GROUP,
    min: -3,
    max: 3,
    spring: true,
  });

  useControl('Spin cube', {
    group: CUBE_GROUP,
    type: 'button',
    onClick: () => setRotationY((y) => y + Math.PI * 2),
  });

  const wireframe = useControl('Wireframe', {
    group: CUBE_GROUP,
    type: 'boolean',
  });

  const visible = useControl('Visible', {
    group: CUBE_GROUP,
    type: 'boolean',
    value: true,
  });

  const { rotation } = useSpring({
    to: {
      rotation: rotationY,
    },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <a.mesh
      position-x={positionX}
      position-y={positionY}
      rotation-y={rotation}
      ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <a.meshBasicMaterial
        wireframe={wireframe}
        visible={visible}
        attach='material'
        color={color}
      />
    </a.mesh>
  );
};

const App: React.FC = () => {
  const AppCanvas = withControls(Canvas);
  return (
    <Controls.Provider>
      <AppCanvas
        camera={{
          position: [0, 0, 3],
          fov: 75,
        }}
        pixelRatio={Math.min(window.devicePixelRatio, 2)}>
        <color attach='background' args={[0, 0, 0]} />
        <OrbitControls />
        <Cube color={0xff0000} />
      </AppCanvas>
      <Controls title='Control panel' />
    </Controls.Provider>
  );
};

export default App;

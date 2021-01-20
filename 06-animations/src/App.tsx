import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';
import { a, useSpring } from '@react-spring/three';

const sizes = {
  width: 800,
  height: 600,
};

interface CubeProps {
  color: number | string;
  posX?: number;
}
const Cube: React.FC<CubeProps> = ({ color }) => {
  const mesh = React.useRef<Mesh>();
  const { position } = useSpring({
    loop: {
      reverse: true,
    },
    from: {
      position: [0, 0, 0],
    },
    to: {
      position: [2, 0, 0],
    },
  });

  return (
    //@ts-ignore - Vector3 type isn't supported by @react-spring/three yet...
    <a.mesh position={position} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </a.mesh>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      style={{ width: sizes.width, height: sizes.height }}
      gl={{ alpha: false }}
      camera={{
        position: [0, 0, 3],
        fov: 75,
        aspect: sizes.width / sizes.height,
      }}>
      <Cube color={0xff0000} />
    </Canvas>
  );
};

export default App;

import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';
import { OrbitControls } from 'drei';

const sizes = {
  width: 800,
  height: 600,
};

interface CubeProps {
  color: number | string;
}
const Cube: React.FC<CubeProps> = ({ color }) => {
  const mesh = React.useRef<Mesh>();
  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
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
      }}
    >
      <OrbitControls />
      <Cube color={0xff0000} />
    </Canvas>
  );
};

export default App;

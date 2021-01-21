import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';
import { OrbitControls } from 'drei';

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
      camera={{
        position: [0, 0, 3],
        fov: 75,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}>
      <color attach='background' args={[0, 0, 0]} />
      <OrbitControls />
      <Cube color={0xff0000} />
    </Canvas>
  );
};

export default App;

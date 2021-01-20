import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';

const sizes = {
  width: 800,
  height: 600,
};

interface CubeProps {
  color: number | string;
  posX: number;
}
const Cube: React.FC<CubeProps> = (props) => {
  const mesh = React.useRef<Mesh>();
  return (
    <mesh {...props} position={[props.posX, 0, 0]} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={props.color} />
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
      }}>
      <Cube color={0xff0000} posX={0} />
    </Canvas>
  );
};

export default App;

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

const Cubes: React.FC = (props) => {
  return (
    <group
      {...props}
      position={[0, 1, 0]}
      scale={[1, 2, 1]}
      rotation={[0, 1, 0]}
    >
      <Cube posX={0} color={0xff0000} />
      <Cube posX={-2} color={0x00ff00} />
      <Cube posX={2} color={0x0000ff} />
    </group>
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
      <Cubes />
    </Canvas>
  );
};

export default App;

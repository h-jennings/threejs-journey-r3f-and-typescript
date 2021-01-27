import React from 'react';
import { Canvas, MeshBasicMaterialProps } from 'react-three-fiber';
import { OrbitControls } from 'drei';

const sizes = {
  width: 800,
  height: 600,
};

const Cube: React.FC<Pick<MeshBasicMaterialProps, 'color'>> = ({ color }) => {
  return (
    <mesh position={[0, 0, 0]}>
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

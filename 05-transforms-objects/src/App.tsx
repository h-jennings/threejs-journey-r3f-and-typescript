import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh } from 'three';

const sizes = {
  width: 800,
  height: 600,
};

const Box: React.FC = (props) => {
  const mesh = React.useRef<Mesh>();
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};

function App() {
  return (
    <Canvas
      style={{ width: sizes.width, height: sizes.height }}
      gl={{ alpha: false }}
      camera={{
        position: [0, 0, 3],
        fov: 75,
      }}
    >
      <Box />
    </Canvas>
  );
}

export default App;

import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';

const CustomBufferGeometry: React.FC = () => {
  const count = 100;
  const positionsArray = React.useMemo(() => {
    return new Float32Array(count * 3 * 3).map(() => (Math.random() - 0.5) * 4);
  }, [count]);
  return (
    <mesh position={[0, 0, 0]}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positionsArray.length / 3}
          array={positionsArray}
          itemSize={3}
        />
      </bufferGeometry>
      <meshBasicMaterial color={0xff0000} wireframe />
    </mesh>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement
      camera={{
        position: [0, 0, 3],
        fov: 75,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}>
      <color attach='background' args={[0, 0, 0]} />
      <OrbitControls />
      <CustomBufferGeometry />
    </Canvas>
  );
};

export default App;

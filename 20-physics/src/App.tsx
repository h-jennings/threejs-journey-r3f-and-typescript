import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';
import { Physics, usePlane, useSphere } from 'use-cannon';
import { makeButton, useTweaks } from 'use-tweaks';

const Plane: React.FC = (props) => {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI * 0.5, 0, 0],
    ...props,
  }));
  return (
    <mesh receiveShadow ref={ref}>
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial color="#777777" metalness={0.3} roughness={0.4} />
    </mesh>
  );
};

const Sphere: React.FC = (props) => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: [(Math.random() - 0.5) * 3, 5, (Math.random() - 0.5) * 3],
    args: 0.5,
    ...props,
  }));
  return (
    <mesh ref={ref} castShadow>
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshStandardMaterial metalness={0.3} roughness={0.4} />
    </mesh>
  );
};

const Shapes: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      <Plane />
      <Suspense fallback={null}>
        {new Array(count).fill(null).map((_, idx) => (
          <Sphere key={`0${idx}`} />
        ))}
      </Suspense>
    </>
  );
};

const App: React.FC = () => {
  const [sphereCount, set] = React.useState(0);

  const resetSphereCount = () => {
    set(0);
  };

  useTweaks({
    ...makeButton('Reset', resetSphereCount),
    ...makeButton('Create Sphere', () => set((count) => count + 1)),
  });
  return (
    <Canvas
      colorManagement={false}
      shadowMap={{
        enabled: true,
        type: THREE.PCFSoftShadowMap,
      }}
      onCreated={({ gl }) => gl.setClearColor('#000000')}
      camera={{
        position: [-3, 3, 3],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <Physics
        defaultContactMaterial={{
          friction: 0.1,
          restitution: 0.7,
        }}
        allowSleep
        gravity={[0, -30, 0]}
        broadphase={'SAP'}
      >
        <OrbitControls />
        <Stats />
        <ambientLight args={['#ffffff', 0.7]} />
        <directionalLight
          castShadow
          shadow-mapSize-x={1024}
          shadow-mapSize-y={1024}
          shadow-camera-far={15}
          shadow-camera-left={-7}
          shadow-camera-top={7}
          shadow-camera-right={7}
          shadow-camera-bottom={-7}
          position={[5, 5, 5]}
          args={['#ffffff', 0.2]}
        />
        <Suspense fallback={null}>
          <Shapes count={sphereCount} />
        </Suspense>
      </Physics>
    </Canvas>
  );
};

export default App;

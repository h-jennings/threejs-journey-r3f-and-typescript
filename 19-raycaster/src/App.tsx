import React, { Suspense } from 'react';
import { Canvas, MeshProps, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';

const Obj = React.forwardRef<THREE.Mesh, MeshProps>((props, ref) => {
  const [isHovered, set] = React.useState(false);

  return (
    <mesh
      ref={ref}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
      {...props}
    >
      <sphereBufferGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={isHovered ? '#000fff' : '#ff0000'} />
    </mesh>
  );
});

const Objs: React.FC = () => {
  const obj1 = React.useRef<any>();
  const obj2 = React.useRef<any>();
  const obj3 = React.useRef<any>();

  const { clock } = useThree();

  useFrame(() => {
    const { elapsedTime } = clock;

    // Animating objects
    obj1.current &&
      (obj1.current.position.y = Math.sin(elapsedTime * 0.3) * 1.5);
    obj2.current &&
      (obj2.current.position.y = Math.sin(elapsedTime * 0.8) * 1.5);
    obj3.current &&
      (obj3.current.position.y = Math.sin(elapsedTime * 1.4) * 1.5);
  });
  return (
    <group>
      <Obj ref={obj1} position-x={-2} />
      <Obj ref={obj2} />
      <Obj ref={obj3} position-x={2} />
    </group>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      camera={{
        position: [0, 0, 3],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Stats />
      <Suspense fallback={null}>
        <Objs />
      </Suspense>
    </Canvas>
  );
};

export default App;

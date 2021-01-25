import React, { Suspense } from 'react';
import {
  Canvas,
  useResource,
  useUpdate,
  useThree,
  MeshProps,
  useFrame,
} from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

interface SharedMeshProps {
  material: THREE.Material;
}
const MeshWithRotation: React.FC<MeshProps & SharedMeshProps> = (props) => {
  const { material } = props;
  const ref = React.useRef<THREE.Mesh>();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.1 * delta;
      ref.current.rotation.x += 0.15 * delta;
    }
  });
  return <mesh {...props} ref={ref} material={material} />;
};

const Objects: React.FC = () => {
  const material = useResource<THREE.MeshStandardMaterial>();

  return (
    <mesh>
      <meshStandardMaterial ref={material} roughness={0.4} />
      {material.current ? (
        <group>
          <MeshWithRotation material={material.current} position={[-1.5, 0, 0]}>
            <sphereBufferGeometry args={[0.5, 32, 32]} />
          </MeshWithRotation>
          <MeshWithRotation material={material.current}>
            <boxBufferGeometry args={[0.75, 0.75, 0.75]} />
          </MeshWithRotation>
          <MeshWithRotation material={material.current} position={[1.5, 0, 0]}>
            <torusBufferGeometry args={[0.3, 0.2, 32, 64]} />
          </MeshWithRotation>
          <mesh
            material={material.current}
            position={[0, -0.65, 0]}
            rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeBufferGeometry args={[5, 5]} />
          </mesh>
        </group>
      ) : null}
    </mesh>
  );
};

const Lights: React.FC = () => {
  const { scene } = useThree();

  const directionalLightRef = useResource<THREE.DirectionalLight>();

  const ral = useUpdate<THREE.RectAreaLight>((self) => {
    self.lookAt(new THREE.Vector3());
  }, []);
  const sl = useUpdate<THREE.SpotLight>((self) => {
    self.target.position.x = -0.75;
    scene.add(self.target);
  }, []);

  React.useEffect(() => {
    let request: number;

    if (sl.current) {
      // * Creating helper
      const spotLightHelper = new THREE.SpotLightHelper(sl.current);
      scene.add(spotLightHelper);

      // * SpolightHelper is weird and needs to be updated next frame
      // * in order to have the correct position.
      request = requestAnimationFrame(() => spotLightHelper.update());
    }

    // * Clean up RAF
    return () => cancelAnimationFrame(request);
  }, [sl, scene]);

  return (
    <>
      <ambientLight args={[0xffffff, 0.5]} />
      <directionalLight
        ref={directionalLightRef}
        args={[0x00ffcc, 0.3]}
        position={[1, 0.25, 0]}
      />
      {directionalLightRef.current && (
        <directionalLightHelper args={[directionalLightRef.current, 0.2]} />
      )}
      <hemisphereLight args={[0xff0000, 0x0000ff, 0.3]} />
      <pointLight args={[0xff9000, 0.5, 10, 2]} position={[1, -0.5, 1]} />
      <rectAreaLight
        ref={ral}
        args={[0x4e00ff, 2, 1, 1]}
        position={[-1.5, 0, 1.5]}
      />
      <spotLight
        ref={sl}
        args={[0x78ff00, 0.5, 6, Math.PI * 0.1, 0.25, 1]}
        position={[0, 2, 3]}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      camera={{
        position: [1, 1, 2],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}>
      <color attach='background' args={[0, 0, 0]} />
      <OrbitControls />
      <Lights />
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default App;

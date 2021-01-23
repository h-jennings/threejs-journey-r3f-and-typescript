import React, { Suspense } from 'react';
import { Canvas, useResource, useFrame } from 'react-three-fiber';
import { Mesh, CubeTextureLoader, MeshStandardMaterial, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useTweaks } from 'use-tweaks';

const SharedMaterial = React.forwardRef<MeshStandardMaterial>((_props, ref) => {
  // * `useCubeTexture` would be preferred but has a bug at time of writing
  // const envMapTexture = useCubeTexture(
  //   ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
  //   { path: '/textures/environmentMaps/3/' },
  // );
  const [envMap] = React.useState(() => {
    const loader = new CubeTextureLoader();
    const envMap = loader.load([
      '/textures/environmentMaps/3/px.jpg',
      '/textures/environmentMaps/3/nx.jpg',
      '/textures/environmentMaps/3/py.jpg',
      '/textures/environmentMaps/3/ny.jpg',
      '/textures/environmentMaps/3/pz.jpg',
      '/textures/environmentMaps/3/nz.jpg',
    ]);
    return envMap;
  });
  const { metalness, roughness } = useTweaks('Material', {
    metalness: {
      value: 0.7,
      min: 0,
      max: 1,
    },
    roughness: {
      value: 0.2,
      min: 0,
      max: 1,
    },
  });
  return (
    <meshStandardMaterial
      ref={ref}
      metalness={metalness}
      roughness={roughness}
      envMap={envMap}
    />
  );
});

interface SharedMeshProps {
  material: MeshStandardMaterial;
  position?: Vector3 | [x: number, y: number, z: number] | undefined;
}
const SharedMesh: React.FC<SharedMeshProps> = ({
  children,
  material,
  position,
}) => {
  const ref = React.useRef<Mesh>();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.1 * delta;
      ref.current.rotation.x += 0.15 * delta;
    }
  });
  return (
    <mesh ref={ref} position={position} material={material}>
      {children}
    </mesh>
  );
};

const Sphere: React.FC = () => {
  return <sphereBufferGeometry args={[0.5, 64, 64]} />;
};

const Plane: React.FC = () => {
  return <planeBufferGeometry args={[1, 1, 100, 100]} />;
};

const Torus: React.FC = () => {
  return <torusBufferGeometry args={[0.3, 0.2, 64, 128]} />;
};

const Shapes: React.FC = () => {
  const material = useResource<MeshStandardMaterial>();
  return (
    <mesh>
      <SharedMaterial ref={material} />
      {material.current ? (
        <>
          <SharedMesh material={material.current} position={[-1.5, 0, 0]}>
            <Sphere />
          </SharedMesh>
          <SharedMesh material={material.current}>
            <Plane />
          </SharedMesh>
          <SharedMesh material={material.current} position={[1.5, 0, 0]}>
            <Torus />
          </SharedMesh>
        </>
      ) : null}
    </mesh>
  );
};

const App: React.FC = () => {
  const { ambientIntensity, pointIntensity, position } = useTweaks('Lights', {
    ambientIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
    },
    pointIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
    },
    position: {
      x: 2,
      y: 3,
    },
  });

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
      <ambientLight args={[0xffffff, ambientIntensity]} />
      <pointLight
        args={[0xffffff, pointIntensity]}
        position={[position.x, position.y, 4]}
      />
      <Suspense fallback={null}>
        <Shapes />
      </Suspense>
    </Canvas>
  );
};

export default App;

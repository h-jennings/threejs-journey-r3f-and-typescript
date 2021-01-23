import React, { Suspense } from 'react';
import { Canvas, useResource, useUpdate, useLoader } from 'react-three-fiber';
import {
  FontLoader,
  MeshStandardMaterial,
  TextBufferGeometry,
  TextureLoader,
  TorusBufferGeometry,
} from 'three';
import { OrbitControls } from '@react-three/drei';

const SharedMaterial = React.forwardRef<MeshStandardMaterial>((_props, ref) => {
  const [texture] = React.useState(() => {
    const loader = new TextureLoader();
    return loader.load('/textures/matcaps/8.png');
  });
  return <meshMatcapMaterial matcap={texture} ref={ref} />;
});

interface TextProps {
  material: any;
}
const Text: React.FC<TextProps> = ({ children, material }) => {
  const font = useLoader(FontLoader, '/fonts/helvetiker_regular.typeface.json');
  const config = React.useMemo(
    () => ({
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }),
    [font],
  );
  const geometry = useUpdate<TextBufferGeometry>(
    (self) => {
      self?.center();
    },
    [children],
  );
  return (
    <mesh material={material}>
      <textBufferGeometry ref={geometry} args={[String(children), config]} />
    </mesh>
  );
};
interface DonutsProps {
  material: MeshStandardMaterial;
}
const Donuts: React.FC<DonutsProps> = ({ material }) => {
  const geometry = useResource<TorusBufferGeometry>();
  const [torus] = React.useState(() => {
    return new TorusBufferGeometry(0.3, 0.2, 20, 45);
  });
  React.useEffect(() => {
    geometry.current = torus;
  }, [geometry, torus]);
  return (
    <>
      {geometry.current ? (
        <>
          {Array(500)
            .fill(null)
            .map((_, idx) => {
              const scale = Math.random();
              return (
                <mesh
                  position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                  ]}
                  rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0,
                  ]}
                  scale={[scale, scale, scale]}
                  key={idx}
                  geometry={geometry.current}
                  material={material}
                />
              );
            })}
        </>
      ) : null}
    </>
  );
};

const Objects: React.FC = () => {
  const material = useResource<MeshStandardMaterial>();
  return (
    <mesh>
      <SharedMaterial ref={material} />
      {material.current ? (
        <>
          <Text material={material.current}>Ayo!</Text>
          <Donuts material={material.current} />
        </>
      ) : null}
    </mesh>
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
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default App;

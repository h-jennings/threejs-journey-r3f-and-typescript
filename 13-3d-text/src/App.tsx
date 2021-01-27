import React, { Suspense } from 'react';
import {
  Canvas,
  useResource,
  useUpdate,
  useLoader,
  MeshProps,
} from 'react-three-fiber';
import {
  FontLoader,
  MeshStandardMaterial,
  TextBufferGeometry,
  TextureLoader,
  TorusBufferGeometry,
} from 'three';
import { OrbitControls } from '@react-three/drei';

const Text: React.FC<Pick<MeshProps, 'material'>> = ({
  children,
  material,
}) => {
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
    [font]
  );
  const geometry = useUpdate<TextBufferGeometry>(
    (self) => {
      self?.center();
    },
    [children]
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
const torus = new TorusBufferGeometry(0.3, 0.2, 20, 45);
const Donuts: React.FC<DonutsProps> = ({ material }) => {
  return (
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
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
              scale={[scale, scale, scale]}
              key={idx}
              geometry={torus}
              material={material}
            />
          );
        })}
    </>
  );
};

const Objects: React.FC = () => {
  const material = useResource<MeshStandardMaterial>();
  const matcap = useLoader(TextureLoader, '/textures/matcaps/8.png');
  return (
    <mesh>
      <meshMatcapMaterial ref={material} matcap={matcap} />
      {material.current ? (
        <group>
          <Text material={material.current}>Ayo!</Text>
          <Donuts material={material.current} />
        </group>
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
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default App;

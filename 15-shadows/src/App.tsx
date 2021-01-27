import React, { Suspense } from 'react';
import {
  Canvas,
  useResource,
  useThree,
  MeshProps,
  useFrame,
} from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';

const Sphere: React.FC<MeshProps> = (props) => {
  const simpleShadow = useTexture('/textures/simpleShadow.jpg');
  const sphereRef = useResource<THREE.Mesh>();
  const sphereShadowRef = useResource<THREE.Mesh>();
  const sphereShadowMaterialRef = useResource<THREE.MeshBasicMaterial>();
  const { clock } = useThree();

  useFrame(() => {
    if (
      sphereRef.current &&
      sphereShadowRef.current &&
      sphereShadowMaterialRef.current
    ) {
      // Animating Sphere
      sphereRef.current.position.x = Math.cos(clock.elapsedTime) * 1.5;
      sphereRef.current.position.z = Math.sin(clock.elapsedTime) * 1.5;
      sphereRef.current.position.y = Math.abs(Math.sin(clock.elapsedTime * 3));

      // Animating Sphere Shadow
      sphereShadowRef.current.position.x = sphereRef.current.position.x;
      sphereShadowRef.current.position.z = sphereRef.current.position.z;
      sphereShadowMaterialRef.current.opacity =
        (1 - sphereRef.current.position.y) * 0.3;
    }
  });
  return (
    <group>
      <mesh {...props} ref={sphereRef}>
        <sphereBufferGeometry args={[0.5, 32, 32]} />
      </mesh>
      <mesh
        ref={sphereShadowRef}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, planePositionY + 0.01, 0]}
      >
        <planeBufferGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          ref={sphereShadowMaterialRef}
          alphaMap={simpleShadow}
          color={0x000000}
          transparent
        />
      </mesh>
    </group>
  );
};

const planePositionY = -0.5;
const Objects: React.FC = () => {
  const material = useResource<THREE.MeshStandardMaterial>();

  return (
    <mesh>
      <meshStandardMaterial ref={material} roughness={0.7} />
      {material.current ? (
        <group>
          <Sphere castShadow material={material.current} />
          <mesh
            receiveShadow
            material={material.current}
            position={[0, planePositionY, 0]}
            rotation={[-Math.PI * 0.5, 0, 0]}
          >
            <planeBufferGeometry args={[5, 5]} />
          </mesh>
        </group>
      ) : null}
    </mesh>
  );
};

const Lights: React.FC = () => {
  const { scene } = useThree();

  // * Refs
  const directionalLightRef = useResource<THREE.DirectionalLight>();
  const spotLightRef = useResource<THREE.SpotLight>();
  const pointLightRef = useResource<THREE.PointLight>();

  React.useEffect(() => {
    let request: number;

    if (spotLightRef.current) {
      // * Creating helper
      const spotLightHelper = new THREE.SpotLightHelper(spotLightRef.current);
      spotLightHelper.visible = false;
      scene.add(spotLightHelper);

      // * SpolightHelper is weird and needs to be updated next frame
      // * in order to have the correct position.
      request = requestAnimationFrame(() => spotLightHelper.update());
    }

    // * Clean up RAF
    return () => cancelAnimationFrame(request);
  }, [spotLightRef, scene]);

  return (
    <>
      <ambientLight args={[0xffffff, 0.3]} />
      <directionalLight
        castShadow
        ref={directionalLightRef}
        args={[0xffffff, 0.3]}
        position={[2, 2, -1]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-camera-near={1}
        shadow-camera-far={6}
      />
      {directionalLightRef.current && (
        <cameraHelper
          visible={false}
          args={[directionalLightRef.current.shadow.camera]}
        />
      )}
      <spotLight
        ref={spotLightRef}
        args={[0xffffff, 0.3, 10, Math.PI * 0.3]}
        position={[0, 2, 2]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-fov={30}
        shadow-camera-near={1}
        shadow-camera-far={6}
      />
      {spotLightRef.current && (
        <cameraHelper
          visible={false}
          args={[spotLightRef.current.shadow.camera]}
        />
      )}
      <pointLight
        ref={pointLightRef}
        args={[0xffffff, 0.3]}
        position={[-1, 1, 0]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={5}
      />
      {pointLightRef.current && (
        <cameraHelper
          visible={false}
          args={[pointLightRef.current.shadow.camera]}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      shadowMap={{
        enabled: false,
        type: THREE.PCFSoftShadowMap,
      }}
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
      <Lights />
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default App;

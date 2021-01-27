import React from 'react';
import * as THREE from 'three';
import { useResource, useThree } from 'react-three-fiber';
import { Ghosts } from './Ghosts';

export const Lights: React.FC = () => {
  // * Refs
  const directionalLightRef = useResource<THREE.DirectionalLight>();
  const pointLightRef = useResource<THREE.PointLight>();

  const { scene, gl } = useThree();

  // Adding fog to the scene
  React.useEffect(() => {
    scene.fog = new THREE.Fog('#262837', 1, 15);
  }, [scene]);

  React.useEffect(() => {
    gl.setClearColor('#262837');
  }, [gl]);

  return (
    <>
      <ambientLight args={['#b9d5ff', 0.12]} />
      <directionalLight
        ref={directionalLightRef}
        castShadow
        args={[0xffffff, 0.3]}
        position={[4, 5, -2]}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
      />
      <pointLight
        ref={pointLightRef}
        castShadow
        args={['#ff7d46', 1, 7]}
        position={[0, 2.2, 2.7]}
      />
      <Ghosts />
    </>
  );
};

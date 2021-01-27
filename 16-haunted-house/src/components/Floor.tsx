import React from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useResource, useUpdate } from 'react-three-fiber';

export const Floor: React.FC = () => {
  const floorRef = useResource<
    THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshStandardMaterial>
  >();

  const [
    grassColorTexture,
    grassAmbientOcclusionTexture,
    grassNormalTexture,
    grassRoughnessTexture,
  ] = useTexture([
    'textures/grass/color.jpg',
    'textures/grass/ambientOcclusion.jpg',
    'textures/grass/normal.jpg',
    'textures/grass/roughness.jpg',
  ]);

  useUpdate(
    (self) => {
      self.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(self.geometry.attributes.uv.array, 2)
      );
    },
    [],
    floorRef
  );

  function setRepeatXY(texture: THREE.Texture | null): THREE.Texture | null {
    const t = texture;
    t?.repeat.set(8, 8);

    return t;
  }

  function assignWrappingMode(texture: THREE.Texture | null): void {
    const t = texture;
    t?.wrapS && (t.wrapS = THREE.RepeatWrapping);
    t?.wrapT && (t.wrapT = THREE.RepeatWrapping);
  }

  const grassMaterialRef = useUpdate<THREE.MeshStandardMaterial>((self) => {
    const textures = [self.map, self.aoMap, self.normalMap, self.roughnessMap];
    // Repeating textures
    textures.forEach((t) => assignWrappingMode(setRepeatXY(t)));
  }, []);

  return (
    <mesh
      ref={floorRef}
      receiveShadow
      rotation-x={-Math.PI * 0.5}
      position-y={0}
    >
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial
        ref={grassMaterialRef}
        map={grassColorTexture}
        aoMap={grassAmbientOcclusionTexture}
        normalMap={grassNormalTexture}
        roughnessMap={grassRoughnessTexture}
      />
    </mesh>
  );
};

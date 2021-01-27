import { useTexture } from '@react-three/drei';
import { useResource, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';

export const Walls: React.FC = () => {
  const wallsRef = useResource<
    THREE.Mesh<THREE.BoxBufferGeometry, THREE.MeshStandardMaterial>
  >();

  const [
    bricksColorTexture,
    bricksAmbientOcclusionTexture,
    bricksNormalTexture,
    bricksRoughnessTexture,
  ] = useTexture([
    'textures/bricks/color.jpg',
    'textures/bricks/ambientOcclusion.jpg',
    'textures/bricks/normal.jpg',
    'textures/bricks/roughness.jpg',
  ]);

  useUpdate(
    (self) => {
      self.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(self.geometry.attributes.uv.array, 2)
      );
    },
    [],
    wallsRef
  );
  return (
    <mesh castShadow ref={wallsRef} position-y={2.5 / 2}>
      <boxBufferGeometry args={[4, 2.5, 4]} />
      <meshStandardMaterial
        map={bricksColorTexture}
        aoMap={bricksAmbientOcclusionTexture}
        normalMap={bricksNormalTexture}
        roughnessMap={bricksRoughnessTexture}
      />
    </mesh>
  );
};

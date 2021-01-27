import { useTexture } from '@react-three/drei';
import { useResource, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';

export const Door: React.FC = () => {
  const doorRef = useResource<
    THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshStandardMaterial>
  >();

  const [
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  ] = useTexture([
    'textures/door/color.jpg',
    'textures/door/alpha.jpg',
    'textures/door/ambientOcclusion.jpg',
    'textures/door/height.jpg',
    'textures/door/normal.jpg',
    'textures/door/metalness.jpg',
    'textures/door/roughness.jpg',
  ]);

  useUpdate(
    (self) => {
      self.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(self.geometry.attributes.uv.array, 2)
      );
    },
    [],
    doorRef
  );
  return (
    <mesh ref={doorRef} position-y={1} position-z={2 + 0.01}>
      <planeBufferGeometry args={[2.2, 2.2, 100, 100]} />
      <meshStandardMaterial
        transparent
        alphaMap={doorAlphaTexture}
        map={doorColorTexture}
        aoMap={doorAmbientOcclusionTexture}
        displacementMap={doorHeightTexture}
        displacementScale={0.1}
        normalMap={doorNormalTexture}
        metalnessMap={doorMetalnessTexture}
        roughnessMap={doorRoughnessTexture}
      />
    </mesh>
  );
};

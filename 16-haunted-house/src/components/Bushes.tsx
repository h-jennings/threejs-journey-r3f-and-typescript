import * as THREE from 'three';
export const Bushes: React.FC = () => {
  const bushes: {
    scale: number;
    position: Parameters<THREE.Vector3['set']>;
  }[] = [
    { scale: 0.5, position: [0.8, 0.2, 2.2] },
    { scale: 0.25, position: [1.4, 0.1, 2.1] },
    { scale: 0.4, position: [-0.8, 0.1, 2.2] },
    { scale: 0.15, position: [-1, 0.05, 2.6] },
  ];
  return (
    <>
      {bushes.map((bush, idx) => {
        const { scale, position } = bush;
        return (
          <mesh
            key={idx}
            castShadow
            scale={[scale, scale, scale]}
            position={[position[0], position[1], position[2]]}
          >
            <sphereBufferGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={'#89c854'} />
          </mesh>
        );
      })}
    </>
  );
};

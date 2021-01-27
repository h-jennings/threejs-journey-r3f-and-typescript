export const Graves: React.FC = () => {
  return (
    <group>
      {Array(50)
        .fill(null)
        .map(() => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 4 + Math.random() * 5;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <mesh
              castShadow
              position={[x, 0.3, z]}
              rotation-y={(Math.random() - 0.5) * 0.4}
              rotation-z={(Math.random() - 0.5) * 0.4}
            >
              <boxBufferGeometry args={[0.6, 0.8, 0.2]} />
              <meshStandardMaterial />
            </mesh>
          );
        })}
    </group>
  );
};

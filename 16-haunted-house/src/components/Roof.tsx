export const Roof: React.FC = () => {
  return (
    <mesh position-y={2.5 + 0.5} rotation-y={Math.PI * 0.25}>
      <coneBufferGeometry args={[3.5, 1, 4]} />
      <meshStandardMaterial color={'#b35f45'} />
    </mesh>
  );
};

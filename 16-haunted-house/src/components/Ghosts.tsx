import React from 'react';
import { useFrame, useThree } from 'react-three-fiber';

const Ghost = React.forwardRef<THREE.PointLight | undefined, { color: string }>(
  ({ color }, ref) => {
    return (
      <pointLight
        ref={ref}
        castShadow
        args={[color, 2, 3]}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
      />
    );
  }
);

export const Ghosts: React.FC = () => {
  const ghost1Ref = React.useRef<THREE.PointLight>();
  const ghost2Ref = React.useRef<THREE.PointLight>();
  const ghost3Ref = React.useRef<THREE.PointLight>();

  const { clock } = useThree();

  useFrame(() => {
    const { elapsedTime } = clock;

    if (ghost1Ref.current) {
      const ghost1Angle = elapsedTime * 0.5;
      ghost1Ref.current.position.x = Math.cos(ghost1Angle) * 4;
      ghost1Ref.current.position.z = Math.sin(ghost1Angle) * 4;
      ghost1Ref.current.position.y = Math.sin(elapsedTime * 3);
    }

    if (ghost2Ref.current) {
      const ghost2Angle = -elapsedTime * 0.32;
      ghost2Ref.current.position.x = Math.cos(ghost2Angle) * 5;
      ghost2Ref.current.position.z = Math.sin(ghost2Angle) * 5;
      ghost2Ref.current.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    }

    if (ghost3Ref.current) {
      const ghost3Angle = -elapsedTime * 0.18;
      ghost3Ref.current.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
      ghost3Ref.current.position.z =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
      ghost3Ref.current.position.y =
        Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);
    }
  });
  return (
    <>
      <Ghost ref={ghost1Ref} color="#ff00ff" />
      <Ghost ref={ghost2Ref} color="#0000ff" />
      <Ghost ref={ghost3Ref} color="#ffff00" />
    </>
  );
};

import React from 'react';
import { Canvas, MeshBasicMaterialProps } from 'react-three-fiber';
import { OrbitControls } from 'drei';

const Cube: React.FC<Pick<MeshBasicMaterialProps, 'color'>> = ({ color }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const App: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    if (canvasRef.current && document) {
      if (isFullscreen) {
        canvasRef.current?.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document?.exitFullscreen();
        }
      }
    }
  }, [isFullscreen]);
  return (
    <Canvas
      onDoubleClick={() => setIsFullscreen(!isFullscreen)}
      colorManagement
      onCreated={(state) => {
        canvasRef.current = state.gl.domElement;
      }}
      camera={{
        position: [0, 0, 3],
        fov: 75,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Cube color={0xff0000} />
    </Canvas>
  );
};

export default App;

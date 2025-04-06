import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Collatz3DProps {
  sequence: number[];
}

function CollatzPath({ sequence }: { sequence: number[] }) {
  const points = useMemo(() => {
    return sequence.map((value, index) => {
      const angle = (index / sequence.length) * Math.PI * 2;
      const radius = 5;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        value / 10,
        Math.sin(angle) * radius
      );
    });
  }, [sequence]);

  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#00ff00"
      lineWidth={2}
    />
  );
}

export default function Collatz3D({ sequence }: Collatz3DProps) {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <CollatzPath sequence={sequence} />
        <OrbitControls />
        <gridHelper args={[20, 20]} />
      </Canvas>
    </div>
  );
} 
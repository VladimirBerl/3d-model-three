import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState } from "react";

const Model = ({ fileUrl }: { fileUrl: string }) => {
  const { scene } = useGLTF(fileUrl);
  return <primitive object={scene} scale={1} />;
};

const ModelViewer = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input type="file" accept=".glb" onChange={handleFileUpload} />
      <div style={{ width: "80vw", height: "80vh", marginTop: 20 }}>
        <Canvas camera={{ position: [3, 3, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls />
          {fileUrl && (
            <Suspense fallback={null}>
              <Model fileUrl={fileUrl} />
            </Suspense>
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default ModelViewer;

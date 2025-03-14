import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useState } from "react";

const Model = ({ fileUrl, play }: { fileUrl: string; play: boolean }) => {
  const { scene, animations } = useGLTF(fileUrl);
  const { actions } = useAnimations(animations, scene);

  // Запускаем первую анимацию, если play === true
  if (play && actions && Object.keys(actions).length > 0) {
    actions[Object.keys(actions)[0]]?.play();
  }

  return <primitive object={scene} scale={1} />;
};

const ModelViewer = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setPlayAnimation(false); // Сброс анимации при новой загрузке файла
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input type="file" accept=".glb" onChange={handleFileUpload} />
      {fileUrl && (
        <>
          <button
            onClick={() => setPlayAnimation(!playAnimation)}
            style={{ marginTop: 10, padding: "8px 16px", cursor: "pointer" }}
          >
            {playAnimation ? "Остановить анимацию" : "Запустить анимацию"}
          </button>
          <div style={{ width: "80vw", height: "80vh", marginTop: 20 }}>
            <Canvas camera={{ position: [3, 3, 3] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <OrbitControls />
              <Suspense fallback={null}>
                <Model fileUrl={fileUrl} play={playAnimation} />
              </Suspense>
            </Canvas>
          </div>
        </>
      )}
    </div>
  );
};

export default ModelViewer;

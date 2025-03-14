import "./App.css";
import ModelViewer from "./model";
function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ModelViewer modelPath="public/kitchen-transformed.glb" />
    </div>
  );
}

export default App;

import React,{Suspense} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Model } from "./modelCode/Vinyl.js";
import { Model2 } from "./modelCode/Vinyl2.js";
import { Model3 } from "./modelCode/Vinyl_3.js";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    code ? <Dashboard code={code}/> : <Login/>
    // <Canvas style={{height:"100vh"}}>
    //   {/* <ambientLight/> */}
    //   <OrbitControls />
    //   <Suspense fallback={null}>
    //     {/* <Model/> */}
    //     <Model2 />
    //   </Suspense>
    // </Canvas>
  );
}

export default App;

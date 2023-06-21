import React,{Suspense} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";


function App() {
  return (
    <Dashboard/>
    // <Canvas style={{height:"100vh"}}>
    //   <OrbitControls />
    //   <Suspense fallback={null}>
    //     <Model2 />
    //   </Suspense>
    // </Canvas>
  );
}

export default App;

import React, { Suspense, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login.js";
import Experience from "./components/Experience.js";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const respone = await fetch("/auth/token");
      const json = await respone.json();
      console.log("In  app " + json.access_token);
      setToken(json.access_token);
    }

    getToken();
  }, []);

  // return <>{token === "" ? <Login /> : <Experience token={token} />};</>;
  return <Login />;
}

export default App;

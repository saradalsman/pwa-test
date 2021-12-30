import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js", {})
    .then((reg) => {
      // registration worked
      // debugger;
      console.log("Registration succeeded. Scope is " + reg.scope);
    })
    .catch((error) => {
      // registration failed
      debugger;
      console.log("Registration failed with " + error);
    });
} else {
  console.error("Wont work!");
}

import { useState } from "react";
import logo from "./checkbox.svg";
import classes from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={classes["App"]}>
      <header className={classes["App-header"]}>
        <img src={logo} className={classes["App-logo"]} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className={classes["App-link"]}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className={classes["App-link"]}
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;

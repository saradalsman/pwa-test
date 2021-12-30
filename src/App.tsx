import { useState } from "react";
import logo from "./checkbox.svg";
import classes from "./App.module.css";

function App() {

  const tasks = [
    {
      text: 'Build tools',
      checked: true
    },
    {
      text: 'Create page layout',
      checked: false
    },
    {
      text: 'Input fields',
      checked: false
    },
    {
      text: 'Upload images',
      checked: false
    },
  ]

  return (
    <div className={classes["App"]}>
      <header className={classes["App-header"]}>
        <h1>PWA test</h1>
        <img src={logo} className={classes["App-logo"]} alt="logo" />
      </header>
      <main>
        <form>
          <ol className={classes["Todo-list"]}>
            {tasks.map((item) => {
              return (
              <li>
                <input id={item.text} type="checkbox" checked={item.checked} 
                onChange={(e) => console.log(e)} />
                <label htmlFor={item.text}>
                  {item.text}
                </label>
              </li>
              )
            })}
          </ol>
        </form>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

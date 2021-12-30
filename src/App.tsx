import { useState } from "react";
import logo from "./checkbox.svg";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes["App"]}>
      <Header />
      <main>
        <TodoList />
      </main>
      <Footer />
    </div>
  );
}

export default App;

function Header() {
  return (
    <header className={classes["App-header"]}>
      <h1>PWA test</h1>
      <img src={logo} className={classes["App-logo"]} alt="logo" />
    </header>
  );
}

function TodoList() {
  type TodoItem = {
    text: string;
    checked: boolean;
  };
  const [tasks, setTasks] = useState([
    {
      text: "Build tools",
      checked: true,
    },
    {
      text: "Create page layout",
      checked: true,
    },
    {
      text: "Input fields",
      checked: false,
    },
    {
      text: "Upload images",
      checked: false,
    },

    {
      text: "Input fields",
      checked: false,
    },
    {
      text: "Upload images",
      checked: false,
    },
    {
      text: "Build tools",
      checked: true,
    },
    {
      text: "Create page layout",
      checked: true,
    },
    {
      text: "Input fields",
      checked: false,
    },
    {
      text: "Upload images",
      checked: false,
    },
  ]);

  const checkItem = (i: number) => {
    const next = [...tasks];
    next[i].checked = !next[i].checked;
    setTasks(next);
  };

  const addItem = (item: TodoItem) => {
    const next = [...tasks, item];
    setTasks(next);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const selectorQuery = `.${classes["Todo-input"]}`;
        const itemInputElement = e.currentTarget.querySelector(selectorQuery);
        if (itemInputElement != null) {
          const inputElement = itemInputElement as any;

          const newText = inputElement.value;
          inputElement.value = "";
          addItem({
            text: newText,
            checked: false,
          });
        }
      }}
    >
      <ol className={classes["Todo-list"]}>
        {tasks.map((item, i) => {
          return (
            <li key={i}>
              <label>
                <input
                  type="checkbox"
                  name={`${i}_${item.text}`}
                  checked={item.checked}
                  onChange={() => checkItem(i)}
                />
                {item.text}
              </label>
            </li>
          );
        })}
      </ol>
      <input
        className={classes["Todo-input"]}
        name="new-item"
        type="text"
        placeholder="New todo item..."
      />
    </form>
  );
}

function Footer() {
  return (
    <footer className={classes["Footer"]}>
      <div className={classes["Footer-item"]}>
        <img src={logo} alt="logo" />
        <span>history</span>
      </div>
      <div className={classes["Footer-item"]}>
        <img src={logo} alt="logo" />
        <span>sync</span>
      </div>
      <div className={classes["Footer-item"]}>
        <img src={logo} alt="logo" />
        <span>other</span>
      </div>
    </footer>
  );
}

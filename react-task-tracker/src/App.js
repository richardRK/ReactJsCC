import logo from "./logo.svg";
import "./App.css";

function App() {

const x = true;
const name = 'Rohi';

  return (
    <div className="container">
      <h1>Hello {name}</h1>
      <h1>React {x ? "Yes" : "No"}</h1>
    </div>
  );
}

export default App;

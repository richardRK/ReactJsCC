import "./App.css";
import Header from "./Components/Header";
import React, { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState({ settings: null });

  useEffect(() => {
    fetch("settings.json").then((response) => {
      response.json().then((settings) => {
        // instead of setting state you can use it any other way
        setState({ settings: settings });
      });
    });
  });

  return (
    <div className="container">
      <Header />
    </div>
  );
}

// class App extends React.component {}

export default App;

/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./Components/Header";
import React, { useEffect, useState } from "react";
import Tasks from "./Components/Tasks";

/*states get passed down, actions get passed up


*/

const App = () => {
  const [state, setState] = useState({ settings: null });

  useEffect(() => {
    fetch("settings.json").then((response) => {
      response.json().then((settings) => {
        // instead of setting state you can use it any other way
        setState({ settings: settings });
      });
    });
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true,
    },
  ]);

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "List is Empty"
      )}
    </div>
  );
};

// class App extends React.component {}

//delete task

export default App;

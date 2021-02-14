/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./Components/Header";
import React, { useEffect, useState } from "react";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Forms from "./Components/Forms";
import { useForm } from "./Components/useForm";

/*states get passed down, actions get passed up

*/

const App = () => {
  const [state, setState] = useState({ settings: null });
  const [values, handleChange] = useForm({ email: "", password: "" });

  useEffect(() => {
    // fetch("settings.json").then((response) => {
    //   response.json().then((settings) => {
    //     // instead of setting state you can use it any other way
    //     setState({ settings: settings });
    //   });
    // });
    const fetchSettings = async () => {
      var settings = await fetch("settings.json");
      setState({ settings: settings });
    };

    fetchSettings();
  }, []);

  //get Tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  //add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  //Delete task
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
      <>
        <Forms values={values} handleChange={handleChange} />

        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "List is Empty"
        )}
      </>
    </div>
  );
};

// class App extends React.component {}

//delete task

export default App;

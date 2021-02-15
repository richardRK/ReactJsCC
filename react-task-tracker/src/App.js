/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./Components/Header";
import React, { useEffect, useState } from "react";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Forms from "./Components/Forms";
import { useForm } from "./Components/useForm";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./Components/About";

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

  //fetch Tasks by Id
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  //add task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <>
          {/* <Forms values={values} handleChange={handleChange} /> */}

          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            )}
          />

          <Route path="/about" component={About} />
          <Footer />
        </>
      </div>
    </Router>
  );
};

// class App extends React.component {}

//delete task

export default App;

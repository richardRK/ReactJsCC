import React from "react";

import { useState, useForm } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");

  // const [values, handleChange] = useForm({ firstName: "", lastName: "" });

  const [reminder, setRemider] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add task ");
      return;
    }

    onAdd({ text, day, reminder });

    setText("");
    setDay("");
    setRemider(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => {
            setRemider(e.currentTarget.checked);
          }}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
      <div className="form-control"></div>
    </form>
  );
}

import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";


function App() {
 
  let [todolist, settodolist] = useState([]);

  let saveToDoList = (event) => {
    event.preventDefault();
    let toDoName = event.target.toname.value;
    if (!todolist.includes(toDoName) && toDoName != "") {
      let finallist = [...todolist, toDoName];
      settodolist(finallist);
      event.target.toname.value = "";
    } else {
      if (todolist.includes(toDoName)) {
        NotificationManager.error("Error", "Task already exists!");
      }
      if (toDoName == "") {
        NotificationManager.warning("Warning", "Invalid Task", 3000);
      }
    }
  };

  let list = todolist.map((value, i) => {
    return (
      <Todolistitems
        value={value}
        key={i}
        indexNumber={i}
        todolist={todolist}
        settodolist={settodolist}
      />
    );
  });

  return (
    <div className="App">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 drop-shadow-lg mb-8 mt-8">
        To-Do List
      </h1>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={saveToDoList}
      >
        <input
          type="text"
          className="w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-500"
          name="toname"
          placeholder="Enter your task"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
        >
          Add Task
        </button>
      </form>
      <NotificationContainer />
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function Todolistitems({ value, indexNumber, todolist, settodolist }) {
  let [status, setstatus] = useState(false);

 
  let deleteRow = (event) => {
    event.stopPropagation(); 
    let finalData = todolist.filter((_, i) => i !== indexNumber);
    settodolist(finalData);
  };

  
  let toggleStatus = () => {
    setstatus(!status);
  };

  return (
    <li
      className={status ? "taskcomplete" : ""}
      onClick={toggleStatus} 
    >
      {indexNumber + 1}. {value}
      <span onClick={deleteRow} className="delete-btn">
        &times;
      </span>
    </li>
  );
}


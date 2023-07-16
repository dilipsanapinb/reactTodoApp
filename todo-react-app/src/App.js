
import './App.css';

import React, { useState } from 'react'

import { AiFillDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
// import { FaCheck } from "react-icons/fa";


function App() {
const[isCompleteScreen,setIsCompleteScreen]=useState(false)
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <lable>Title</lable>
            <input type="text" placeholder="What is the title of task?" />
          </div>
          <div className="todo-input-item">
            <lable>Description</lable>
            <input type="text" placeholder="What is the description of task?" />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompleteScreen === false && "active"
            } `}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"} `}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          <div className="todo-list-item">
            <div>
              <h3>Task 1</h3>
              <p>Description</p>
            </div>
            <div>
              <AiFillDelete className='delete-icon' 
              title='Do you want to delete'/>
              <BsCheckLg className='check-icon' title='Do you want mark as completed'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

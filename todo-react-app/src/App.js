
import './App.css';

import React, { useEffect, useState } from 'react'

import { AiFillDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
// import { FaCheck } from "react-icons/fa";


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  const [allTodos,setTodos]=useState([])
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("")
  const [completedTodos,setCompletedTodos]=useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updateTodoArr = [...allTodos];
    console.log(updateTodoArr);
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
  };
  
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setTodos(savedTodo)
    }
  }, []);

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setCompletedTodos(savedTodo);
    }
  }, []);

  const handleDelete = (index) => {
    let remainedTodo = [...allTodos];
    remainedTodo.splice(index)
    localStorage.setItem('todolist', JSON.stringify(remainedTodo));
    setTodos(remainedTodo)
  }

  const handleDeletefromComleted = (index) => {
    let reducedTodosA = [...completedTodos];
    reducedTodosA.splice(index);
 localStorage.setItem("completedTodos", JSON.stringify(reducedTodosA));
    setCompletedTodos(reducedTodosA);
  }


const handleCompleted = (index) => {
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth();
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  let completOn = dd + "-" + mm + "-" + yyyy + "-" + h + ":" + m + ":" + s;

  let filterItem = {
    ...allTodos[index],
    completOn: completOn,
  };
  let updatedCompletedArr = [...completedTodos];
  updatedCompletedArr.push(filterItem);
  localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  setCompletedTodos(updatedCompletedArr);

  handleDelete(index)
};


  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <lable>Title</lable>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is the title of task?"
            />
          </div>
          <div className="todo-input-item">
            <lable>Description</lable>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the description of task?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
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
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiFillDelete
                      className="delete-icon"
                      onClick={() => handleDelete(index)}
                      title="Do you want to delete"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={()=>handleCompleted(index)}
                      title="Do you want mark as completed"
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed ON: {item.completOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiFillDelete
                      className="delete-icon"
                      onClick={() => handleDeletefromComleted(index)}
                      title="Do you want to delete"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  const api = "https://todo-server-rust.vercel.app";

  const fetchTodos = () => {
    fetch(`${api}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data.todos));
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const updateTodo = (id, status) => {
    fetch(`${api}/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }).then(() => {
      fetchTodos();
    });
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h1>Express Todo API</h1>
        <p>This is a simple frontend interface for the Express Todo API.</p>
        <p>
          Please use the provided endpoints to interact with the todo items.
        </p>
        <TodoList fetchTodos={fetchTodos} />
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className={`title ${todo.status ? "done" : ""}`}>
                {todo.title}
              </div>
              <input
                className="checkbox"
                type="checkbox"
                checked={todo.status}
                onChange={() => {
                  updateTodo(todo.id, !todo.status);
                }}
              />
              <button
                className="btn"
                onClick={() => {
                  fetch(`${api}/todo/delete/${todo.id}`, {
                    method: "DELETE",
                  }).then(() => {
                    fetchTodos();
                  });
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

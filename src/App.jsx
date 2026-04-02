import { useState, useEffect } from "react";
  import { generateClient } from "aws-amplify/data";

  const client = generateClient();

  export default function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
      fetchTodos();
    }, []);

    async function fetchTodos() {
      const { data } = await client.models.Todo.list();
      setTodos(data);
    }

    async function addTodo() {
      if (!title.trim()) return;
      await client.models.Todo.create({ title });
      setTitle("");
      fetchTodos();
    }

    async function toggleTodo(id, isComplete) {
      await client.models.Todo.update({ id, isComplete: !isComplete });
      fetchTodos();
    }

    async function deleteTodo(id) {
      await client.models.Todo.delete({ id });
      fetchTodos();
    }

    return (
      <div>
        <h1>Todo App</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo..."
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => toggleTodo(todo.id, todo.isComplete)}
              />
              {todo.title}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

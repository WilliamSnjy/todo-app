// pages/ToDoPage.jsx
import { useEffect, useState } from 'react';
import ToDoAddForm from './ToAddForm';
import ToDoDisplay from './ToDoDisplay';

const ToDoPage = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    fetch('http://localhost:3000/todos', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const handleAdd = (newTodoData) => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newTodoData)
    })
      .then(res => res.json())
      .then(todo => {
        setTodos(prev => [...prev, todo]);
      });
  };

  const handleUpdate = (id, field, value) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todoToUpdate, [field]: value };

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedTodo)
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(prev => prev.map(todo => todo.id === updated.id ? updated : todo));
      });
  };

  const handleDelete = (id) => {
    if (!confirm('Yakin ingin menghapus todo ini?')) return;

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      });
  };

  return (
    <div>
      <h2>Tambah Todo ({role})</h2>
      <ToDoAddForm onAdd={handleAdd} />
      <ToDoDisplay
        todos={todos}
        role={role}
        userId={userId}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ToDoPage;

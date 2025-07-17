import { useEffect, useState } from 'react';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    useEffect(() => {
        fetch('https://f33a39cffa7a.ngrok-free.app/todos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setTodos(data));
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();

        fetch('https://f33a39cffa7a.ngrok-free.app/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ content: newTodo })
        })
        .then(res => res.json())
        .then(todo => {
            setTodos(prev => [...prev, todo]);
            setNewTodo('');
        });
    };

    const handleUpdate = (id, content, is_done) => {
        fetch(`https://f33a39cffa7a.ngrok-free.app/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ content, is_done })
        })
        .then(res => res.json())
        .then(updated => {
            setTodos(prev => prev.map(todo => todo.id === updated.id ? updated : todo));
        });
    };

    return (
        <div>
            <h1>Todo List ({role})</h1>

            <form onSubmit={handleAdd}>
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Tambah todo"
                />
                <button type="submit">Tambah</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.is_done}
                            onChange={(e) => handleUpdate(todo.id, todo.content, e.target.checked)}
                            disabled={role !== 'admin' && todo.user_id !== parseInt(localStorage.getItem('userId'))}
                        />
                        <input
                            value={todo.content}
                            onChange={(e) => handleUpdate(todo.id, e.target.value, todo.is_done)}
                            disabled={role !== 'admin' && todo.user_id !== parseInt(localStorage.getItem('userId'))}
                        />
                        {role === 'admin' && <span> (oleh {todo.username})</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;

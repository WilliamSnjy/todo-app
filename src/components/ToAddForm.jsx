// components/ToDoAddForm.jsx
import { useState } from 'react';

const ToDoAddForm = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState('');
  const [newProgress, setNewProgress] = useState(0);
  const [newProgressDesc, setNewProgressDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      content: newTodo,
      progress: newProgress,
      progress_desc: newProgressDesc,
    });
    setNewTodo('');
    setNewProgress(0);
    setNewProgressDesc('');
  };

  return (
    <form className='form_add' onSubmit={handleSubmit}>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Tambah todo"
        required
        className='input'
      />
      <input
        type="number"
        min="0"
        max="100"
        value={newProgress}
        onChange={(e) => setNewProgress(e.target.value)}
        placeholder="Progres (%)"
        className='input'
      />
      <input
        value={newProgressDesc}
        onChange={(e) => setNewProgressDesc(e.target.value)}
        placeholder="Deskripsi progres"
        className='input'
      />
      <button type="submit">Tambah</button>
    </form>
  );
};

export default ToDoAddForm;

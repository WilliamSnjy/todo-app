import '../App.css'

const ToDoDisplay = ({ todos, role, userId, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>To Do List</h2>
        <table className='table'>
          <tr className='tr'>
            <th className='gap'>CheckBox</th>
            <th className='gap'>List</th>
            <th className='gap'>Progres</th>
            <th className='gap'>Description</th>
            <th className='gap'>User</th>
            <th className='gap'>Action</th>
          </tr>
        {todos.map(todo => (
          <tr className='gap'>
            <td className='gap'>
              <input
                type="checkbox"
                checked={todo.is_done}
                onChange={(e) => onUpdate(todo.id, 'is_done', e.target.checked)}
                disabled={role !== 'admin' && todo.user_id !== userId}
              />
            </td>
            <td>
              <input
                value={todo.content}
                onChange={(e) => onUpdate(todo.id, 'content', e.target.value)}
                disabled={role !== 'admin' && todo.user_id !== userId}
              />
            </td>
            <td>
              <input
                type="number"
                value={todo.progress}
                onChange={(e) => onUpdate(todo.id, 'progress', parseInt(e.target.value))}
                disabled={role !== 'admin' && todo.user_id !== userId}
              />
            </td>
            <td>
              <input
                value={todo.progress_desc || ''}
                onChange={(e) => onUpdate(todo.id, 'progress_desc', e.target.value)}
                disabled={role !== 'admin' && todo.user_id !== userId}
                placeholder="Deskripsi progres"
              />
            </td>
            <td>
              {todo.username && (
                <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
                  {todo.username}
                </span>
              )}
            </td>
            {(role === 'admin' || todo.user_id === userId) && (
              <button
                style={{ marginLeft: '10px', color: 'red' }}
                onClick={() => onDelete(todo.id)}
              >
                Hapus
              </button>
            )}
          </tr>
          ))}
        </table>
        {/* // <li className='form_list' key={todo.id}>
        //   <input
        //     type="checkbox"
        //     checked={todo.is_done}
        //     onChange={(e) => onUpdate(todo.id, 'is_done', e.target.checked)}
        //     disabled={role !== 'admin' && todo.user_id !== userId}
        //   />
        //   <input
        //     value={todo.content}
        //     onChange={(e) => onUpdate(todo.id, 'content', e.target.value)}
        //     disabled={role !== 'admin' && todo.user_id !== userId}
        //   />
        //   <input
        //     type="number"
        //     value={todo.progress}
        //     onChange={(e) => onUpdate(todo.id, 'progress', parseInt(e.target.value))}
        //     disabled={role !== 'admin' && todo.user_id !== userId}
        //   />
        //   <input
        //     value={todo.progress_desc || ''}
        //     onChange={(e) => onUpdate(todo.id, 'progress_desc', e.target.value)}
        //     disabled={role !== 'admin' && todo.user_id !== userId}
        //     placeholder="Deskripsi progres"
        //   />
        //   {todo.username && (
        //     <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
        //       oleh {todo.username}
        //     </span>
        //   )}
        //   {(role === 'admin' || todo.user_id === userId) && (
        //     <button
        //       style={{ marginLeft: '10px', color: 'red' }}
        //       onClick={() => onDelete(todo.id)}
        //     >        
        //       Hapus
        //     </button>
        //   )}
        // </li> */}
    </div>
  );
};

export default ToDoDisplay;

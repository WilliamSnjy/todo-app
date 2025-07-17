import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';

const User = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <div>
            <h1>Halaman User</h1>
            <ToDoList />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default User;

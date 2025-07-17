import { useNavigate, Link } from 'react-router-dom';
import ToDoList from '../components/ToDoList';

function Admin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <Link to='/register'><button>Tambah User (Register)</button></Link>
            <br /><br />
            <ToDoList />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Admin;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');

        if (!token) {
            navigate('/login');
        } else if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    },);

    return <p>Mengarahkan ke halaman sesuai role...</p>;
};

export default Dashboard;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleRegister = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, password, role })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(data => {
                    throw new Error(data.message || 'Gagal daftar');
                });
            }
            return res.json();
        })
        .catch(err => {
            alert(err.message);
        });
    };

    return (
        <div className='form_register'>
            <h1>Register New User</h1>
            <form className='form_register' onSubmit={handleRegister}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className='input'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className='input'
                />
                <select className='input' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <Link to='/admin'>
                <button>back</button>
            </Link>
        </div>
    );
};

export default Register;

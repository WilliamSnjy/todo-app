import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(data => {
                    throw new Error(data.message || 'Login gagal');
                });
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.user.role);
            localStorage.setItem('userId', data.user.id); // ✅ TAMBAHKAN INI
            navigate('/dashboard');
        })
        .catch(err => {
            alert(err.message);
        });
    };

    return (
        <div>
            <h1>ToDoList</h1>
            <form className='form_login' onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginService } from "../../services/login";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await postLoginService({
            email,
            password,

        })

        if (res?.status === 201) {
            sessionStorage.setItem('auth', JSON.stringify(res.data.accessToken))
            navigate("/home");
        }
        console.log('resposta', res)

    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Usuário:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p>
                Não possui cadastro? <Link to="/createUser">Clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;


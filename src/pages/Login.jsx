import React from 'react';
import { useForm } from "react-hook-form";
import './styles/Login.css';

function Login({ aoEntrar }) {
    const { register, handleSubmit } = useForm();

   async function onSubmit(userData) {
    try {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
        if (!response.ok) {
            throw new Error('Erro ao fazer login')
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);

        aoEntrar();
    } catch(error) {
        alert('erro ao fazer login: ' + error.message);
    }
   }
    return (
        <div className="login-background">
            <div className="login-container">
                <h2>Bem-vindo!</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email")}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        <p>Senha</p>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("senha")}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
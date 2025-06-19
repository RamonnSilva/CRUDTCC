import React from 'react';
import { useForm } from "react-hook-form";
import './Login.css';

function Login({ aoEntrar }) {
    const { register, handleSubmit } = useForm();

    function onSubmit(userData) {
        console.log(userData);
        aoEntrar();
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
                            {...register("password")}
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

import React from 'react';
import { useForm } from "react-hook-form";
import './styles/Login.css';
import ReCAPTCHA from "react-google-recaptcha"


function Login({ aoEntrar }) {
    const { register, handleSubmit } = useForm();
    const [captchaValue, setCaptchaValue] = React.useState(null);
    function onChange(value) {
        setCaptchaValue(value);
    }
   async function onSubmit(userData) {
    if (!captchaValue) {
        alert("Por favor, confirme que você não é um robô.");
      return;
    }
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
             console.log(data);
            if (data.funcao !== 'ADMIN') {
                  alert('Acesso negado: usuário não é ADMIN');
            throw new Error('Acesso negado: usuário não é ADMIN');

                }   else{

        localStorage.setItem('token', data.token);

        aoEntrar();
                }
    } catch(error) {
        alert('erro ao fazer login: ' + error.message);
    }
   }

    return (
        <div className="login-background">
            <div className="login-container">
                <h2>Bem-vindo!</h2>
                <img src='icone-removebg-preview.png' className="login-logo"></img>
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
                       <ReCAPTCHA
    sitekey= */colocar sua chave aqui /*
    onChange={onChange}
  />

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
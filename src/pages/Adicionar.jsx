import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './styles/Adicionar.css'
import { Link } from 'react-router-dom';


const Adicionar = () => {

    const [dados, setDados] = useState({})
    const [clicou, setClicou] = useState(false)

    function enviarDados(){
        axios.post('http://localhost:8080/auth/register', 
            dados
        ).then(response => console.log(response))
        .then(dados => alert('Dados enviados com sucesso'))
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
       clicou ? enviarDados() : console.log('app no ar')
       return (()=>setClicou(false))
    }, [clicou])
    
    return (
    <div className='sobre-container'>
        <Formik
            initialValues={{
                id: 0,
                nome: '',
                email: '',
                senha: '',
                cep: '',
                telefone: '',
                endereco: '',
                estado: '',
                funcao: '',
            }}
            onSubmit={(values, actions) => {

                if(values.nome.length > 0){
                        setTimeout(() => {
                        setDados({
                            nome: values.nome,
                            email: values.email,
                            senha: values.senha,
                            cep: values.cep,
                            telefone: values.telefone,
                            endereco: values.endereco,
                            estado: values.estado,
                            funcao: values.funcao,
                        })
                        setClicou(true)
                        // alert(JSON.stringify(values, null, 2));
                        // console.log(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }, 1000);
                } else {
                    alert('Favor preencher informações!')
                }
                
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                
                       

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.nome}
                            placeholder="nome"
                            name="nome"
                        />
                        {props.errors.nome && <div id="feedback">{props.errors.nome}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                            name="email"
                            placeholder="email"
                            maxLength={255}
                        />
                        {props.errors.descricao && <div id="feedback">{props.errors.descricao}</div>}
                    </div>
                    <div>
                        <input
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.senha}
                            name="senha"
                            placeholder="senha"
                            maxLength={30}
                        />
                        {props.errors.codigoBarras && <div id="feedback">{props.errors.codigoBarras}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.cep}
                            name="cep"
                            placeholder="cep"
                            maxLength={8}
                        />
                        {props.errors.foto && <div id="feedback">{props.errors.foto}</div>}
                    </div>
                    <div>
                        <input
                            type="number"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.telefone}
                            name="telefone"
                            placeholder="00 00000-0000"
                            maxLength={20}
                        />
                        {props.errors.preco && <div id="feedback">{props.errors.preco}</div>}
                    </div>
                     
                        <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.endereco}
                            placeholder="endereco"
                            name="endereco"
                        />
                        {props.errors.endereco && <div id="feedback">{props.errors.endereco}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.estado}
                            name="estado"
                            placeholder="estado"
                            maxLength={2}
                        />
                          {props.errors.estado && <div id="feedback">{props.errors.endereco}</div>}
                          <div>
                      <select className='select-role'
                        name="funcao"
                        value={props.values.funcao}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        required>
                        <option value="" label="Selecione a função" />
                        <option value="ADMIN" label="ADMIN" />  
                        <option value="USER" label="USER" />
                        </select>
                        {props.errors.nome && <div id="feedback">{props.errors.role}</div>}
                    </div>
                        </div>
                 <button type="submit" >ADICIONAR</button>
                    
                </form>
            )}
        </Formik>
    </div>
    );
}

export default Adicionar;
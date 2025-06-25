import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './AdicionarDoacao.css'
import { Link } from 'react-router-dom';


const AdicionarDoacao = () => {

    const [dados, setDados] = useState({})
    const [clicou, setClicou] = useState(false)

    function enviarDados(){
        axios.post('http://localhost:8080/doacao', 
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
    <div className='adicionardoacao-container'>
        <Formik
            initialValues={{
                id: 0,
                nome: '',
                titulo: '',
                genero: '',
                autor: '',
                descricao: '',
            }}
            onSubmit={(values, actions) => {

                if(values.nome.length > 0){
                        setTimeout(() => {
                        setDados({
                            nome: values.nome,
                            titulo: values.titulo,
                            genero: values.genero,
                            autor: values.autor,
                            descricao: values.descricao,
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
                            placeholder="Nome"
                            name="nome"
                            maxLength={100}
                        />
                        {props.errors.nome && <div id="feedback">{props.errors.nome}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.titulo}
                            name="titulo"
                            placeholder="titulo"
                            maxLength={100}
                        />
                        {props.errors.descricao && <div id="feedback">{props.errors.descricao}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.genero}
                            name="genero"
                            placeholder="genero"
                            maxLength={100}
                        />
                        {props.errors.codigoBarras && <div id="feedback">{props.errors.codigoBarras}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.autor}
                            name="autor"
                            placeholder="autor"
                            maxLength={666}
                        />
                        {props.errors.foto && <div id="feedback">{props.errors.foto}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.descricao}
                            name="descricao"
                            placeholder="descricao"
                            maxLength={350}
                        />
                        {props.errors.preco && <div id="feedback">{props.errors.preco}</div>}
                    </div>
                   
                 <button type="submit" >ADICIONAR</button>
                    
                </form>
            )}
        </Formik>
    </div>
    );
}

export default AdicionarDoacao;
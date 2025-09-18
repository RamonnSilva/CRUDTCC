import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../styles/Total.css'
import ClienteService from '../services/ClienteService';
import Card from 'react-bootstrap/Card';


const Total = () => {
    const [total, setTotal] = useState(0);

       
         useEffect(() => {
    ClienteService.getTotal()
      .then(response => {
        const total = response.data;
        setTotal(total);
        console.log(total);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return(
    <>
    <h1 style={{ fontSize: '20px', color: 'black', marginLeft: '630px', marginTop: '-8px' }}>All Users: {total}</h1>
 </>
  )
}

export default Total;

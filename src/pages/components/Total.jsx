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
     <Card className='total-card' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Cliente Cadastrados</Card.Title>
        <Card.Text>
         {total}
        </Card.Text>
      </Card.Body>
    </Card>
 </>
  )
}

export default Total;

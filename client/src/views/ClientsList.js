import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';

const ClientsList = () => {


  const [users, setUsers] = useState();
  const navigate = useNavigate()

  const getClients = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/users`)
      console.log(response.data)
      const clients = response.data.filter(user=>user.rol!=="admin");
      // LA VARIABLE CLIENTES TENDRA TODO EL ARREGLO DE USUARIOS QUE SEAN CLIENTES
      setUsers(clients)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getClients()
  }, []);

  return (
    <div style={{backgroundColor:"black"}}>
      <h1>esto es para el admin</h1>
      {
        users?.map(user=>{
          return(
            // Ese boton tiene la ruta para enviar a la lista de periodos de un cliente
            <p>{user.firstName} <button onClick={()=>navigate(`/client-periods/${user._id}`)} className="btn btn-primary">ver</button></p>
          )
        })
      }
    </div>
  );
}

export default ClientsList;

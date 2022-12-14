import React from 'react';
import { useEffect, useState } from 'react';
import { simpleGet } from '../services/simpleGet';

const ClientsList = () => {


  const [users, setUsers] = useState();

  const getClients = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/users`)
      console.log(response.data)
      const clients = response.data.filter(user=>user.rol!=="admin");
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
            <p>{user.firstName}</p>
          )
        })
      }
    </div>
  );
}

export default ClientsList;

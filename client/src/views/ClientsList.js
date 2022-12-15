 import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/ClientsList.module.css"

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
    <div className={styles.container}>
      <div className={styles.container_background}>
        <h3 className={styles.title}>Instructor de </h3>
         <hr className={styles.hr}></hr>
        <div>
          {
            users?.map(user=>{
              return(
                // Ese boton tiene la ruta para enviar a la lista de periodos de un cliente
                <div className={styles.container_user}>
                  <p className={styles.user_name}>{user.firstName}{" "}{user.lastName} </p>
                  <button onClick={()=>navigate(`/client-periods/${user._id}`)} className={styles.btn_user}>ver</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ClientsList;

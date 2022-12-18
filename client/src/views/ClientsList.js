 import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/ClientsList.module.css"
import img_trash from "../assets/transh.svg"
import { simpleDelete } from '../services/simpleDelete';
import { useUser } from "../contexts/userContext"

const ClientsList = () => {


  const [clients, setClients] = useState();
  const navigate = useNavigate()
  const { user, setUser } = useUser();  

  const getClients = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/users`)
      console.log(response.data)
      const clients = response.data.filter(user=>user.rol!=="admin");
      // LA VARIABLE CLIENTES TENDRA TODO EL ARREGLO DE USUARIOS QUE SEAN CLIENTES
      setClients(clients)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getClients()
  }, []);

  const deleteClient = async (id) => {
    try {
      const response = await simpleDelete(`http://localhost:8000/api/user-delete/${id}`)
      console.log(response.data)
      setClients((oldClients)=>oldClients.filter(client=>client._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_background}>
        <h3 className={styles.title}>Instructor de </h3>
         <hr className={styles.hr}></hr>
        <div>
          {
            clients?.map(client=>{
              return(
                // Ese boton tiene la ruta para enviar a la lista de periodos de un cliente
                <div key={client._id} className={styles.container_user}>
                  <p className={styles.user_name}>{client.firstName}{" "}{client.lastName} </p>
                  <div className={styles.container_btns}>
                    <button onClick={()=>navigate(`/client-periods/${client._id}`)} className={styles.btn_user}>ver</button>
                    {/*  CAMBIAR LA FUNCIONALIDAD DEL BOTON DE ABAJO */}
                    {
                      user.rol === "admin"&&
                        <button onClick={()=>deleteClient(client._id)} className={styles.btn_trash}>
                          <img className={styles.icono_trash} src={img_trash} alt="icono de basura" />
                        </button>
                    }
                  </div>
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

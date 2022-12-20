import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/ClientRutines.module.css"
import img_rutina from "../assets/img_rutinaUsuario.png"
import { useUser } from "../contexts/userContext"
import RutineForm from '../components/RutineForm';
import { simplePost } from '../services/simplePost';
import img_trash from "../assets/transh.svg"
import { simpleDelete } from '../services/simpleDelete';

const ClientRutines = () => {

  const { user, setUser } = useUser();

  const navigate = useNavigate()

  const { idPeriod, idUser } = useParams()
  const [rutines, setRutines] = useState([]);
  const [client, setClient] = useState();

  const getRutines = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/rutines/${idPeriod}`);
      console.log(response.data.rutines)
      setRutines(response.data.rutines)
    } catch (err) {
      console.log(err)
    }
  }

  const getClient = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/user/${idUser}`)
      console.log("user", response.data)
      setClient(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRutines();
    getClient()
  }, []);

  useEffect(() => {
    rutines&&
    console.log(rutines)
  }, [rutines]);

  const createRutine = async (values) => {
    try {
      values.idPeriod = idPeriod
      console.log("newvaluies",values)
      const response = await simplePost(`http://localhost:8000/api/rutines`, values)
      console.log(response.data.rutine)
      getRutines()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteRutine = async (id) => {
    try {
      const response = await simpleDelete(`http://localhost:8000/api/delete-rutine/${id}`)
      console.log(response.data)
      setRutines((oldRutines)=>oldRutines.filter(rutine=>rutine._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <img src={img_rutina} alt="imagen de rutina" />
      {
        user.rol==="admin"&&
          <div>
            <div className={styles.data_client}>
              <p>Nombre:{" "} {client?.firstName} {" "} {client?.lastName}</p>
              <p>Edad:{" "}{client?.age}</p>
              <p>Altura:{" "} {client?.height}</p>
              <p>Peso:{" "}  {client?.weight}</p>
              <p>IMC:{" "} {client?.imc.toFixed(2)}</p>
            </div>
            <div className={styles.contain_background}>
              <div className={styles.contain_createRutine}>
                <h4 className={styles.contain_title}>Agregar rutina de ejercicio</h4>
                <button className={styles.btn_createRutina} onClick={()=>navigate("/create-excercise")} >Agregar Ejercicio</button>
              </div>
              <RutineForm onSubmitProp={createRutine} />
            </div>
          </div>
      }
      <div className={styles.containerRutina}>
        <div className={styles.container_title}>
          <h3 className={styles.title}>Rutina</h3>
          <div className={styles.subtitle}>
            <button className={styles.btnCerrar} onClick={()=>navigate(-1)}>X</button>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-dark table-rutina">
              <thead>
                <tr>
                  <th>Ejercicios</th>
                  <th>Series</th>
                  <th>Repeticiones</th>
                  <th>Descansos(sg)</th>
                  <th>Ejemplo</th>
                  {
                    user.rol === "admin" &&
                      <th>Eliminar</th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                  rutines.length === 0 ?
                    <tr>
                      <td colSpan="100%">Solicite rutina a su Coach</td>
                    </tr>
                    :
                    rutines?.map(rutine=>{
                      return(
                      <tr key={rutine._id}>
                        <td>{rutine?.excercise?.name}</td>
                        <td>{rutine?.series}</td>
                        <td>{rutine?.reps}</td>
                        <td>{rutine?.rest}</td>
                        <td><a className={styles.btn_ver} href={rutine?.excercise?.link} target="_blank" rel="noreferrer">ver</a></td>
                          {/* CAMBIAR FUNCIONALIDAD DEL BOTON */}
                          {
                            user.rol === "admin" &&
                              <td>
                                <button onClick={()=>deleteRutine(rutine._id)} className={styles.btn_trash}>
                                  <img className={styles.icono_trash} src={img_trash} alt="icono de basura" />
                                </button>
                              </td>
                          }
                      </tr>
                      )
                    })

                }
              </tbody>
        </table>
      </div>


    </div>
  );
}

export default ClientRutines;

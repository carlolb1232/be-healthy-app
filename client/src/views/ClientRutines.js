import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/ClientRutines.module.css"
import img_rutina from "../assets/img_rutinaUsuario.png"
import { useUser } from "../contexts/userContext"
import RutineForm from '../components/RutineForm';
import { simplePost } from '../services/simplePost';


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

  return (
    <div className={styles.container}>
      <img src={img_rutina} alt="imagen de rutina" />
      {
        user.rol==="admin"&&
          <div className={styles.container}>
            <div className={styles.data_client}>
              <p>{client?.firstName}</p>
              <p>{client?.lastName}</p>
              <p>{client?.age}</p>
              <p>{client?.height}</p>
              <p>{client?.weight}</p>
              <p>{client?.imc}</p>
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
          <button className={styles.btnCerrar} onClick={()=>navigate("/")}>X</button>
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
                      <tr key={rutine?._id}>
                        <td>{rutine?.excercise?.name}</td>
                        <td>{rutine?.series}</td>
                        <td>{rutine?.reps}</td>
                        <td>{rutine?.series}</td>
                        <td><a className={styles.btn_ver} href={rutine?.excercise?.link} target="_blank" rel="noreferrer">ver</a></td>
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

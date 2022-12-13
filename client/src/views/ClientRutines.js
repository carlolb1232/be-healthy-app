import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/ClientRutines.module.css"
import img_rutina from "../assets/img_rutinaUsuario.png"

const ClientRutines = () => {


  const { idPeriod } = useParams()
  const [rutines, setRutines] = useState();

  const getRutines = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/rutines/${idPeriod}`);
      console.log(response.data)
      setRutines(response.data.rutines)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRutines();
  }, []);

  return (
    <div className={styles.container}>
      <img src={img_rutina} alt="imagen de rutina" />
      <div className={styles.containerRutina}>
        <div className={styles.rutina}>
          <h3 >Rutina</h3>
          <button className={styles.btnCerrar}>X</button>
        </div>

        <table className="table table-dark">
              <thead>
                <tr>
                  <th>Ejercicios</th>
                  <th>Series</th>
                  <th>Repeticiones</th>
                  <th>Descansos(sg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sentadilla</td>
                  <td>4</td>
                  <td>12</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
      </div>
    </div>
  );
}

export default ClientRutines;

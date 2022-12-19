import React from 'react';
import { useEffect, useState } from 'react';
import img_dashboard from "../assets/objetivo-usuario.png"
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/MainUserDashboard.module.css"
import { useUser } from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const MainUserDashboard = () => {

  const { user, setUser } = useUser();
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate()

  const getPeriodsFromUser = async () => {
    try {
      console.log(user._id)
      const response = await simpleGet(`http://localhost:8000/api/periods-user/${user._id}`)
      console.log(response.data)
      setPeriods(response.data.periods)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPeriodsFromUser()
  }, []);

  return (
    <div className={styles.container}>
      <img src={img_dashboard} alt="imagen de dashboard" />
      <div className={styles.containerRegistros}>
        <h3 className={styles.title}>Registros mensuales</h3>
        <div>
          <table className="table table-dark table_dashboard">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Peso (Kg)</th>
                <th>Altura (cm)</th>
                <th>IMC</th>
                <th>IMC</th>
                <th>% grasa</th>
                <th>Calorías</th>
                <th>Rutinas</th>
                <th>Dietas</th>
              </tr>
            </thead>
            <tbody>
              {
                periods.length === 0?
                  <tr>
                    <td colSpan="100%">AGENDAR UNA CITA</td>
                  </tr>
                :
                periods.map(period=>{
                  return(
                  <tr key={period._id}>
                    <td>{moment(period.date).format('DD-MM-YYYY')}</td>
                    <td>{period.weight}</td>
                    <td>{period.height}</td>
                    <td>{period.imc.toFixed(2)}</td>
                    <td>
                      {
                        period.imc<=18.4&&"Bajo de Peso"
                      }
                      {
                        period.imc>=18.5 && period.imc<=24.9 &&"normal"
                      }
                      {
                        period.imc>=25 && period.imc<=29.9 &&"Sobre Peso"
                      }
                      {
                        period.imc>=30 && period.imc<=34.9 &&"Obesidad Clase 1"
                      }
                      {
                        period.imc>=35 && period.imc<=39.9 &&"Obesidad Clase 2"
                      }
                      {
                        period.imc>=40 &&"Obesidad Clase 3"
                      }
                    </td>
                    <td>{period.greesepercent}</td>
                    <td>{period.calories}</td>
                    <td><button className={styles.btnVer} onClick={()=>navigate(`/client-rutines/${period._id}/${user._id}`)}>ver</button></td>
                    <td><button className={styles.btnVer} onClick={()=>navigate(`/client-diet/${period._id}/${user._id}`)} >ver</button></td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainUserDashboard;

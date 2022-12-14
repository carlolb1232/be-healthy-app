import React from 'react';
import { useEffect, useState } from 'react';
import img_dashboard from "../assets/objetivo-usuario.png"
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/MainUserDashboard.module.css"
import { useUser } from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';

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
                  <tr>
                    <td>{period.date}</td>
                    <td>{period.weight}</td>
                    <td>{period.height}</td>
                    <td>{period.imc}</td>
                    <td>{period.imc}</td>
                    <td>{period.greesepercent}</td>
                    <td>{period.calories}</td>
                    <td><button className={styles.btnVer} onClick={()=>navigate(`/client-rutines/${period._id}/${user._id}`)}>ver</button></td>
                    <td><button className={styles.btnVer} onClick={()=>navigate(`/client-diet/${period._id}`)} >ver</button></td>
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

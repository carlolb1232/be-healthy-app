import React from 'react';
import { useEffect, useState } from 'react';
import img_dashboard from "../assets/objetivo-usuario.png"
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/MainUserDashboard.module.css"
import { useUser } from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';

const MainUserDashboard = () => {

  const { user, setUser } = useUser();
  const [periods, setPeriods] = useState([1]);
  const navigate = useNavigate()

  const getPeriodsFromUser = async () => {
    try {
      console.log(user._id)
      const response = await simpleGet(`http://localhost:8000/api/periods-user/${user._id}`)
      console.log(response.data)
      // setPeriods(response.data.periods)
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
        <h3>Registros mensuales</h3>
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
                    <td colspan="100%">AGENDAR UNA CITA</td>
                  </tr>
                :
                  <tr>
                    <td>02/01/2022</td>
                    <td>74</td>
                    <td>170</td>
                    <td>22.5</td>
                    <td>Sobrepeso</td>
                    <td>30</td>
                    <td>1800</td>
                    <td><button className={styles.btnVer} onClick={()=>navigate(`/client-rutines/123`)}>ver</button></td>
                    <td><button className={styles.btnVer} onClick={()=>navigate(`/client-diet/123`)} >ver</button></td>
                  </tr>


              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainUserDashboard;

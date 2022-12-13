import React from 'react';
import img_dashboard from "../assets/objetivo-usuario.png"
import styles from "./styles_modules/MainUserDashboard.module.css"
const MainUserDashboard = () => {

  return (
    <div className={styles.container}>
      <img src={img_dashboard} alt="imagen de dashboard" />
      <div>
        <h3>Registros mensuales</h3>
        <div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Peso (Kg)</th>
                <th>Altura (cm)</th>
                <th>IMC</th>
                <th>% grasa</th>
                <th>Calorías</th>
                <th>Rutinas</th>
                <th>Dietas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>02/01/2022</td>
                <td>74</td>
                <td>170</td>
                <td>22.5</td>
                <td>Sobrepeso</td>
                <td>30</td>
                <td>1800</td>
                <td><button>ver</button></td>
                <td><button>ver</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainUserDashboard;

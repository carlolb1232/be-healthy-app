import React from 'react';
import { useParams } from 'react-router-dom';
import styles from "./styles_modules/ClientDiet.module.css"
import img_moderado from "../assets/Behealthy_Recomendado.png"
import img_diet from "../assets/img_dietaUsuario.png"

const ClientDiet = () => {
  const{idPeriod}=useParams()
  return (
    <div className={styles.container}>
      <img src={img_diet} alt="imagen de dieta nutricional" />
      <div className={styles.contenedor}>
        <div>
          <h3>Dieta nutricional</h3>
          <button className={styles.btnCerrar}>X</button>
        </div>
        <div className={styles.contenedor_card}>
            <img className={styles.img_card} src={img_moderado} alt="imagen de logo behealtly"/>
            <p>Recomendado</p>

        </div>
      </div>

    </div>
  );
}

export default ClientDiet;

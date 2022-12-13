import React from 'react';
import { useParams } from 'react-router-dom';
import styles from "./styles_modules/ClientDiet.module.css"
import img_recomendado from "../assets/Behealthy_Recomendado.png"
import img_moderado from "../assets/Behealthy_Moderado.png"
import img_restrictivo from "../assets/Behealthy_Restrictivo.png"
import img_diet from "../assets/img_dietaUsuario.png"

const ClientDiet = () => {
  const{idPeriod}=useParams()
  return (
    <div className={styles.container}>
        <img  src={img_diet} alt="imagen de dieta nutricional" />
        <div className={styles.container_title}>
          <h3>Dieta nutricional</h3>
          <button className={styles.btnCerrar}>X</button>
        </div>
      <div className={styles.containers}>
        <div className={styles.contenedor}>
          <div className={styles.contenedor_card}>
              <div className={styles.contenedor_stroke}>
                <img className={styles.img_card} src={img_recomendado} alt="imagen de logo behealtly"/>
                <p>Recomendado</p>
              </div>
              <button className={styles.btnVer}>ver</button>
          </div>
        </div>

        <div className={styles.contenedor}>
          <div className={styles.contenedor_card}>
              <div className={styles.contenedor_stroke}>
                <img className={styles.img_card} src={img_moderado} alt="imagen de logo behealtly"/>
                <p>Moderado</p>
              </div>
              <button className={styles.btnVer}>ver</button>
          </div>
        </div>

        <div className={styles.contenedor}>
          <div className={styles.contenedor_card}>
              <div className={styles.contenedor_stroke}>
                <img className={styles.img_card} src={img_restrictivo} alt="imagen de logo behealtly"/>
                <p>Restrictivo</p>
              </div>
              <button className={styles.btnVer}>ver</button>
          </div>
        </div>








      </div>


    </div>
  );
}

export default ClientDiet;

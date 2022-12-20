import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./styles_modules/ClientDiet.module.css"
import img_recomendado from "../assets/Behealthy_Recomendado.png"
import img_moderado from "../assets/Behealthy_Moderado.png"
import img_restrictivo from "../assets/Behealthy_Restrictivo.png"
import img_diet from "../assets/img_dietaUsuario.png"
import { useUser } from "../contexts/userContext"
import { simpleGet } from '../services/simpleGet';

const ClientDiet = () => {

  const{idPeriod, idUser}=useParams()
  const navigate = useNavigate()
  const { user, setUser } = useUser();
  const [client, setClient] = useState();

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
    getClient();
  }, []);

  return (
    <div className={styles.container}>
        <img  src={img_diet} alt="imagen de dieta nutricional" />
        {
          user.rol === "admin" &&
            <div className={styles.data_client}>
              <p>Nombre:{" "} {client?.firstName} {" "} {client?.lastName}</p>
              <p>Edad:{" "}{client?.age}</p>
              <p>Altura:{" "} {client?.height}</p>
              <p>Peso:{" "}  {client?.weight}</p>
              <p>IMC:{" "} {client?.imc.toFixed(2)}</p>
            </div>
        }
        <div className={styles.container_title}>
          <h3>Dieta nutricional</h3>
          <button className={styles.btnCerrar} onClick={()=>navigate(`/client-periods/${idUser}`)}>X</button>
        </div>
      <div className={styles.containers}>
        <div className={styles.contenedor}>
          <div className={styles.contenedor_card}>
              <div className={styles.contenedor_stroke}>
                <img className={styles.img_card} src={img_recomendado} alt="imagen de logo behealtly"/>
                <p>Recomendado</p>
              </div>
              <button className={styles.btnVer} onClick={()=>navigate(`/client-foods-list/${idPeriod}/shouldEat`)}>ver</button>
              {
                user.rol === "admin"&&
                <button className={styles.btnVer} onClick={()=>navigate(`/create-diet/${idPeriod}/shouldEat`)}>crear</button>
              }
          </div>
        </div>

        <div className={styles.contenedor}>
          <div className={styles.contenedor_card}>
              <div className={styles.contenedor_stroke}>
                <img className={styles.img_card} src={img_moderado} alt="imagen de logo behealtly"/>
                <p>Moderado</p>
              </div>
              <button className={styles.btnVer} onClick={()=>navigate(`/client-foods-list/${idPeriod}/canEat`)}>ver</button>
              {
                user.rol === "admin"&&
                <button className={styles.btnVer} onClick={()=>navigate(`/create-diet/${idPeriod}/canEat`)}>crear</button>
              }
          </div>
        </div>

        <div className={styles.contenedor}>
          <div className={styles.contenedor_card}>
              <div className={styles.contenedor_stroke}>
                <img className={styles.img_card} src={img_restrictivo} alt="imagen de logo behealtly"/>
                <p>Restrictivo</p>
              </div>
              <button className={styles.btnVer} onClick={()=>navigate(`/client-foods-list/${idPeriod}/shouldntEat`)}>ver</button>
              {
                user.rol === "admin"&&
                <button className={styles.btnVer} onClick={()=>navigate(`/create-diet/${idPeriod}/shouldntEat`)}>crear</button>
              }
          </div>
        </div>








      </div>


    </div>
  );
}

export default ClientDiet;

import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/DietList.module.css"
import img_diet from "../assets/img_dietaUsuario.png"

const DietList = () => {

  const { idPeriod, section } = useParams();
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate()

  const getFoodsPerSectionFromPeriod = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/foods-section/${idPeriod}/${section}`)
      console.log(response.data.foods)
      setFoods(response.data.foods)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFoodsPerSectionFromPeriod();
  }, []);

  return (
    <div className={styles.container}>
      <img  src={img_diet} alt="imagen de dieta nutricional" />
      {
        foods.length === 0?
          <div className={styles.contain}>
            <div className={styles.container_background}>
            <p>¡Lo siento! No tienes una dieta creada, debes agendar una cita</p>
            <button className={styles.btn_cerrar} onClick={()=>navigate(-1)}>X</button>
            </div>
          </div>
        :
          <div className="foods-container">


            {
              foods.map(food=>{
                return(
                  <div className="food-container">
                    <img className={styles.img} src={food.img} alt="" />
                    <p>{food.name}</p>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  );
}

export default DietList;

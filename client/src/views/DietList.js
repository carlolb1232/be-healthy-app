import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/DietList.module.css"
import img_diet from "../assets/img_dietaUsuario.png"

const DietList = () => {

  const { idPeriod, section } = useParams();
  const [foods, setFoods] = useState([]);

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
            <h3>PIDA DIETA AL COACH</h3>
          </div>
        :
          <div className="foods-container">
            {
              foods.map(food=>{
                return(
                  <div className="food-container">
                    <img style={{width:"250px", height:"250px"}} src={food.img} alt="" />
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

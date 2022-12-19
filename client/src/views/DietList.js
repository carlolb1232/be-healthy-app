import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import styles from "./styles_modules/DietList.module.css"
import img_diet from "../assets/img_dietaUsuario.png"
import img_trash from "../assets/transh.svg"
import { simpleDelete } from '../services/simpleDelete';
import { useUser } from "../contexts/userContext"

const DietList = () => {

  const { user, setUser } = useUser();

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

  const deleteFoodFromPeriod = async (idFood) => {
    try {
      const response = await simpleDelete(`http://localhost:8000/api/delete-food-period/${idFood}/${section}/${idPeriod}`);
      console.log(response.data);
      setFoods((oldFoods) => oldFoods.filter(food=>food._id !== idFood))
    } catch (err) {
      console.log(err)
    }
  }

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
          <div className={styles.contenedor}>
            <div className={styles.container_back}>

              <h4 className={styles.title}>Alimentos {
          section ==="shouldEat" && "recomendados"
          } {
          section ==="canEat" && "moderados"
          } {
          section ==="shouldntEat" && "restrictivos"
          }</h4>
          <button className={styles.btnCerrar} onClick={()=>navigate(-1)}>X</button>
            </div>
            <div className={styles.container_card}>
              {
                foods.map(food=>{
                  return(
                    <div key={food._id} className={styles.card}>
                      {
                        user.rol === "admin"&&
                          <button onClick={()=>deleteFoodFromPeriod(food._id)} className={styles.btn_trash}><img className={styles.icono_trash} src={img_trash} alt="icono de eliminar" /></button>
                      }
                      <img className={styles.img_card} src={food.img} alt="" />
                      <p className={styles.name}>{food.name[0] +food.name.substring(1).toLowerCase()}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
      }
    </div>
  );
}

export default DietList;

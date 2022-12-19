import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DietForm from '../components/DietForm';
import { simplePut } from '../services/simplePut';
import styles from "./styles_modules/CreateDiet.module.css"
import img_diet from "../assets/img_dietaUsuario.png"

const CreateDiet = () => {

  const {idPeriod, section} = useParams();

  const navigate = useNavigate()

  const createDiet = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/period-food-section/${idPeriod}/${section}`, values)
      console.log(response.data)
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <img  src={img_diet} alt="imagen de dieta nutricional" />
      <div className={styles.container_background}>
        <h4 className={styles.title}>Alimentos {
          section ==="shouldEat" && "recomendados"
          } {
          section ==="canEat" && "moderados"
          } {
          section ==="shouldntEat" && "restrictivos"
          }
        </h4>
        <button className={styles.btnCerrar} onClick={()=>navigate(-1)}>X</button>
      </div>
      <DietForm className={styles.container_DietForm} onSubmitProp={createDiet} idPeriod={idPeriod} section={section} />
    </div>
  );
}

export default CreateDiet;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import FoodForm from '../components/FoodForm';
import { simplePost } from '../services/simplePost';
import styles from "./styles_modules/CreateFood.module.css"
import img_evaluacion from "../assets/img_evaluacionNutricional.png"

const CreateFood = () => {

  const navigate = useNavigate()

  const createFood = async (values) => {
    try {
      const response = await simplePost(`http://localhost:8000/api/foods`, values)
      console.log(response.data)
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <img  src={img_evaluacion} alt="imagen de evaluacion nutricional" />
      <div className={styles.container_background}>
        <div className={styles.container_form}>
          <div className={styles.container_title}>
            <h3 className={styles.title}>Evaluación nutricional</h3>
            <button className={styles.btnCerrar} onClick={()=>navigate(-1)}>X</button>
          </div>
          <FoodForm onSubmitProp={createFood}/>
        </div>
      </div>
    </div>
  );
}

export default CreateFood;

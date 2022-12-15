import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExcerciseForm from '../components/ExcerciseForm';
import { simplePost } from '../services/simplePost';
import styles from "./styles_modules/CreateExcercise.module.css"
import img_crearEjercicio from "../assets/img_crearEjercicio.png"

const CreateExcercise = () => {

  const navigate = useNavigate();

  const createExcercise = async (values) =>{
    try {
      const response = await simplePost(`http://localhost:8000/api/excercises/`, values);
      console.log(response.data);
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <img  src={img_crearEjercicio} alt="imagen de crear ejercicio" />
      <div className={styles.container_background}>
        <div className={styles.container_form}>
          <div className={styles.container_title}>
            <h4 className={styles.title}>Crear ejercicio</h4>
            <button className={styles.btnCerrar} onClick={()=>navigate(-1)}>X</button>
          </div>
          <ExcerciseForm onSubmitProp={createExcercise}/>
        </div>
      </div>
    </div>
  );
}

export default CreateExcercise;

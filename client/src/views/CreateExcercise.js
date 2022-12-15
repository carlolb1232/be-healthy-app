import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExcerciseForm from '../components/ExcerciseForm';
import { simplePost } from '../services/simplePost';
import styles from "./styles_modules/CreateExcercise.module.css"

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
      <div className={styles.container_background}>
        <h4 className={styles.title}>Crear ejercicio</h4>
        <ExcerciseForm onSubmitProp={createExcercise}/>
      </div>
    </div>
  );
}

export default CreateExcercise;

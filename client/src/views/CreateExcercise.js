import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExcerciseForm from '../components/ExcerciseForm';
import { simplePost } from '../services/simplePost';

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
    <div>
      <h2>Crear ejercicio formulario:</h2>
      <ExcerciseForm onSubmitProp={createExcercise}/>
    </div>
  );
}

export default CreateExcercise;

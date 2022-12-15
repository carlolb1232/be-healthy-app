import React from 'react';
import { useNavigate } from 'react-router-dom';
import FoodForm from '../components/FoodForm';
import { simplePost } from '../services/simplePost';

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
    <div style={{backgroundColor:"black"}}>
      <h1>PARA CREAR COMIDA</h1>
      <FoodForm onSubmitProp={createFood}/>
    </div>
  );
}

export default CreateFood;

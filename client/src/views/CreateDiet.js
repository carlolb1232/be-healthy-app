import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DietForm from '../components/DietForm';
import { simplePut } from '../services/simplePut';

const CreateDiet = () => {

  const {idPeriod, section} = useParams();

  const navigate = useNavigate()

  const createDiet = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/period-food-section/${idPeriod}/${section}`, values)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{backgroundColor:"black"}}>
      <h1>CREACIÓN DE DIETA</h1>
      <button className='btn btn-primary' onClick={()=>navigate("/create-food")}>CREAR COMIDA</button>
      <DietForm onSubmitProp={createDiet}/>
    </div>
  );
}

export default CreateDiet;

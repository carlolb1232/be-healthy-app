import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PeriodForm from '../components/PeriodForm';
import { simplePut } from '../services/simplePut';
import moment from 'moment';
import { simplePost } from '../services/simplePost';

const CreatePeriod = () => {

  const { idUser } = useParams();
  const navigate = useNavigate()

  const updateUser = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/user/${idUser}`, values)
      console.log(response.data.user)
      const data = {
        date: moment().format('MM-DD-YY'),
        height: response.data.user.height,
        weight: response.data.user.weight,
        imc: response.data.user.imc,
        idUser: idUser
      }
      createPeriod(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(moment().format('MM-DD-YY'))
  }, []);

  const createPeriod = async(values)=>{
    try {
      const response = await simplePost(`http://localhost:8000/api/period`, values)
      console.log(response.data)
      navigate(`/client-periods/${idUser}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{backgroundColor:"black"}}>
      <h1>aquí se crea el formulario</h1>
      {/* ESTE FORMULARIO ES PARA CREAR UN PERIODO */}
      <PeriodForm onSubmitProp={updateUser}/>
    </div>
  );
}

export default CreatePeriod;

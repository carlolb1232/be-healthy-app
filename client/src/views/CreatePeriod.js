import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PeriodForm from '../components/PeriodForm';
import { simplePut } from '../services/simplePut';
import moment from 'moment';
import { simplePost } from '../services/simplePost';
import styles from "./styles_modules/CreatePeriod.module.css"
import img_evaluacion from "../assets/img_evaluacionNutricional.png"

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
    <div className={styles.container}>
      <img  src={img_evaluacion} alt="imagen de evaluacion nutricional" />
      <div className={styles.container_background}>
        <div className={styles.container_form}>
          <h3 className={styles.title}>Evaluación nutricional</h3>
          <PeriodForm onSubmitProp={updateUser}/>
        </div>
      </div>
      <h1>aquí se crea el formulario</h1>
      {/* ESTE FORMULARIO ES PARA CREAR UN PERIODO */}
    </div>
  );
}

export default CreatePeriod;

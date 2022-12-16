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
      console.log(response.data)
      const data = {
        date: moment().format('MM-DD-YY'),
        height: response.data.user.height,
        weight: response.data.user.weight,
        imc: response.data.user.imc,
        greesepercent: values.greesepercent,
        calories: values.calories,
        idUser: idUser
      }
      createPeriod(data)
    } catch (err) {
      console.log(err)
    }
  }


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
          <div className={styles.container_title}>
            <h3 className={styles.title}>Evaluación nutricional</h3>
            <button className={styles.btnCerrar} onClick={()=>navigate(-1)}>X</button>
          </div>
          <PeriodForm onSubmitProp={updateUser}/>
        </div>
      </div>
    </div>
  );
}

export default CreatePeriod;

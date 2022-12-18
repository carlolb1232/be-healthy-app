import React from 'react';
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { simpleGet } from '../services/simpleGet';
import styles from "./RutineForm.module.css"


const RutineForm = (props) => {

  const [excercises, setExcercises] = useState([]);

  const { onSubmitProp } = props;

  const getAllExcercises = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/excercises`)
      console.log(response.data.excercises)
      setExcercises(response.data.excercises);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllExcercises()
  }, []);

  return (
    <div >
      <Formik
        initialValues={{
          excercise: '',
          series: '',
          reps: '',
          rest: '',
        }}
        validationSchema={Yup.object().shape({
          excercise: Yup.string()
            .required("Por favor, ingresa un nombre"),

          series: Yup.number()
            .required("Por favor ingrese una contraseña"),

          reps: Yup.number()
            .required("Por favor ingrese una contraseña"),

          rest: Yup.number()
            .required("Por favor ingrese una contraseña"),

        })}

        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          onSubmitProp(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          //isSubmitting,
          //validating,
          valid,
        }) => {
          return (
            <div>
              <Form className="contact" method="post" onSubmit={handleSubmit}>

                <label htmlFor="excercise" className="col-form-label">Nombre del ejercicio</label>
                <Field id='excercise' as="select" type="text" placeholder="excercise" className={`form-control`} name='excercise'>
                  <option value="" disabled>Elija una opcion</option>
                  {
                    excercises?.map(excercise=>{
                      return(
                        <option key={excercise._id} value={excercise._id}>{excercise.name}</option>
                      )
                    })
                  }
                </Field>
                {errors.excercise && touched.excercise && <p>{errors.excercise}</p>}

                <label htmlFor="series" className="col-form-label">Series</label>
                <Field id='series' type="number" placeholder="Ingrese la cantidad de series" className={`form-control`} name='series' />
                {errors.series && touched.series && <p>{errors.series}</p>}

                <label htmlFor="reps" className="col-form-label">Repeticiones</label>
                <Field id='reps' type="number" placeholder="Ingrese la cantidad de repeticiones" className={`form-control`} name='reps' />
                {errors.reps && touched.reps && <p>{errors.reps}</p>}

                <label htmlFor="rest" className="col-form-label">Descanso (seg)</label>
                <Field id='rest' type="number" placeholder="Ingrese el tiempo de descanso" className={`form-control`} name='rest' />
                {errors.rest && touched.rest && <p>{errors.rest}</p>}

                <br></br>
                <button className={styles.btnEnviar} type="submit" disabled={Object.values(errors).length > 0}>Enviar</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default RutineForm;

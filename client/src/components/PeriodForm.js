import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./PeriodForm.module.css"


const PeriodForm = (props) => {

  const {onSubmitProp} = props
  // ESTE FORMULARIO ES PARA CREAR UN PERIODO
  return (
    <div >
      <Formik
        initialValues={{
          weight: 0,
          height: 0,
          greesepercent: 0,
          calories: 0,
        }}
        validationSchema={Yup.object().shape({
          weight: Yup.number()
            .required("Por favor, ingresa un peso"),
          height: Yup.number()
            .required("Por favor, ingresa una altura"),
          greesepercent: Yup.number()
            .required("Por favor, ingresa un porcentaje de grasa"),
          calories: Yup.number()
            .required("Por favor, ingresa calorias"),
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
              <Form className={styles.container_form} onSubmit={handleSubmit}>

                <label htmlFor="weight" className="col-form-label">Peso</label>
                <Field id='weight' type="number" placeholder="weight" className={`form-control`} name='weight' />
                {errors.weight && touched.weight && <p>{errors.weight}</p>}

                <label htmlFor="height" className="col-form-label">Altura</label>
                <Field id='height' type="number" placeholder="height" className={`form-control`} name='height' />
                {errors.height && touched.height && <p>{errors.height}</p>}

                <label htmlFor="greesepercent" className="col-form-label">% de grasa en el cuerpo</label>
                <Field id='greesepercent' type="number" placeholder="greesepercent" className={`form-control`} name='greesepercent' />
                {errors.greesepercent && touched.greesepercent && <p>{errors.greesepercent}</p>}

                <label htmlFor="calories" className="col-form-label">Calorias</label>
                <Field id='calories' type="number" placeholder="calories" className={`form-control`} name='calories' />
                {errors.calories && touched.calories && <p>{errors.calories}</p>}

                <br></br>
                <button className={styles.btn_enviar} type="submit" disabled={Object.values(errors).length > 0}>Enviar</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default PeriodForm;

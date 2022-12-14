import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const PeriodForm = (props) => {

  const {onSubmitProp} = props
  // ESTE FORMULARIO ES PARA CREAR UN PERIODO
  return (
    <div >
      <Formik
        initialValues={{
          weight: 0,
          height: 0,
          imc: 0,
          greesepercent: 0,
          calories: 0,
        }}
        validationSchema={Yup.object().shape({
          weight: Yup.number()
            .required("Por favor, ingresa un peso"),
          height: Yup.number()
            .required("Por favor, ingresa una altura"),
          imc: Yup.number()
            .required("Por favor, ingresa un imc"),
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
              <Form onSubmit={handleSubmit}>
                
                <label htmlFor="weight" className="col-form-label">Peso</label>
                <Field id='weight' type="number" placeholder="weight" className={`form-control`} name='weight' />
                {errors.weight && touched.weight && <p>{errors.weight}</p>}

                <label htmlFor="height" className="col-form-label">Altura</label>
                <Field id='height' type="number" placeholder="height" className={`form-control`} name='height' />
                {errors.height && touched.height && <p>{errors.height}</p>}

                <label htmlFor="imc" className="col-form-label">IMC</label>
                <Field id='imc' type="number" placeholder="imc" className={`form-control`} name='imc' />
                {errors.imc && touched.imc && <p>{errors.imc}</p>}

                <label htmlFor="greesepercent" className="col-form-label">% de grasa en el cuerpo</label>
                <Field id='greesepercent' type="number" placeholder="greesepercent" className={`form-control`} name='greesepercent' />
                {errors.greesepercent && touched.greesepercent && <p>{errors.greesepercent}</p>}

                <label htmlFor="calories" className="col-form-label">Calorias</label>
                <Field id='calories' type="number" placeholder="calories" className={`form-control`} name='calories' />
                {errors.calories && touched.calories && <p>{errors.calories}</p>}

                <br></br>
                <button className="btn btn-primary" type="submit" disabled={Object.values(errors).length > 0}>Enviar</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default PeriodForm;

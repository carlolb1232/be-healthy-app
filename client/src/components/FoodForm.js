import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./FoodForm.module.css"

const FoodForm = (props) => {

  const { onSubmitProp } = props;

  return (
    <div >
      <Formik
        initialValues={{
          name: '',
          img: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Por favor, ingresa un nombre"),

          img: Yup.string()
            .required("Por favor ingrese una contraseña")
        })}

        onSubmit={(values, { setSubmitting }) => {
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
              <Form className={styles.form_food}  method="post" onSubmit={handleSubmit}>
                <label htmlFor="name" className="col-form-label">Nombre del alimento</label>
                <Field id='name' type="text" placeholder="Nombre del alimento" className={`form-control`} name='name' />
                {errors.name && touched.name && <p>{errors.name}</p>}

                <label htmlFor="img" className="col-sm-2 col-form-label">Imagen</label>
                <Field id='img' type="text" placeholder="Link de imagen" className={`form-control`} name='img' />
                {errors.img && touched.img && <p>{errors.img}</p>}
                <br></br>
                <button className={styles.btnEnviar} type="submit" disabled={Object.values(errors).length > 0}>Crear</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default FoodForm;

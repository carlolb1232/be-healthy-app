import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ExcerciseForm.module.css"

const ExcerciseForm = (props) => {

  const { onSubmitProp } = props;


  return (
    <div >
      <Formik
        initialValues={{
          name: '',
          link: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Por favor, ingresa un nombre"),

          link: Yup.string()
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
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <label htmlFor="name" className="col-form-label">Nombre del ejercicio</label>
                <Field id='name' type="text" placeholder="Ingrese un nombre de ejercicio" className={`form-control`} name='name' />
                {errors.name && touched.name && <p>{errors.name}</p>}

                <label htmlFor="link" className="col-sm-2 col-form-label">Link</label>
                <Field id='link' type="text" placeholder="Ingrese un link" className={`form-control`} name='link' />
                {errors.link && touched.link && <p>{errors.link}</p>}
                <br></br><br></br>
                <button className={styles.btnEnviar} disabled={Object.values(errors).length > 0}>Crear</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default ExcerciseForm;

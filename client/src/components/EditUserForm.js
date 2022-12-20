import React from 'react';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styles from "../views/styles_modules/EditUser.module.css";
import { useNavigate } from 'react-router-dom';

const EditUserForm = (props) => {

  const { firstName, lastName, email, age, onSubmitProp } = props;
  const navigate = useNavigate();

  return (
    <div >
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: age,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .min(3, "Tu nombre es muy corto")
            .required("Por favor ingresa tu nombre"),

          lastName: Yup.string()
            .min(3, "El apellido es muy corto")
            .required("Por favor ingrese el apellido correctamente"),

          email: Yup.string()
            .email("Correo no valido")
            .min(3, "Este correo electrónico es incorrecto")
            .required("Por favor, ingresa un correo electrónico válido"),

          age: Yup.number()
            .required("Ingrese una edad"),

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
            <div className={styles.form_contain}>
              <Form className={styles.form_editUserForm} method="post" onSubmit={handleSubmit}>
                <label htmlFor="firstName" className="col-sm-2 col-form-label">Nombre</label>
                <Field id='firstName' type="text" className="form-control " placeholder="Nombre" name='firstName' />
                {errors.firstName && touched.firstName && <p>{errors.firstName}</p>}

                <label htmlFor="lastName" className="col-sm-2 col-form-label">Apellido</label>
                <Field id='lastName' type="text" placeholder="Apellido" className="form-control" name='lastName' />
                {errors.lastName && touched.lastName && <p>{errors.lastName}</p>}

                <label htmlFor="email" className="col-form-label">Correo Electrónico</label>
                <Field id='email' type="text" placeholder="Email" className="form-control" name='email' />
                {errors.email && touched.email && <p>{errors.email}</p>}

                <label htmlFor="age" className="col-form-label">Edad</label>
                <Field id='age' type="number" placeholder="Edad" className="form-control" name='age' />
                {errors.age && touched.age && <p>{errors.age}</p>}

                <br></br>
                <button type="submit" className={styles.btn_register} disabled={Object.values(errors).length > 0}>Actualizar</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default EditUserForm;

import React, { useState } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { simplePost } from '../services/simplePost';
import { useUser } from "../contexts/userContext"
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';
import img_crearAdmin from "../assets/img_crearAdmin.png"
import styles from "./styles_modules/CreateAdmin.module.css"
import { simpleGet } from '../services/simpleGet';

const CreateAdmin = () => {

  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const { setUser } = useUser();

  const registrarUsuario = async (values) => {
    console.log("VALORES DESDE EL FORMIK", values);
    values.rol="admin"
    const response = await simplePost("http://localhost:8000/api/register", values);

    if (response.data.message === "") {
      console.log("usuario registrado", response.data);
      navigate("/")
    } else {
      const errorResponse = response.data.errors; // Get the errors from err.response.data
      const errorArr = []; // Define a temp error array to push the messages in
      for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
        errorArr.push(errorResponse[key].message)
      }
      // Set Errors
      setErrors(errorArr);
    }
  }

  return (
    <div className={styles.container_crearAdmin}>
      <img className={styles.img_crearAdmin} src={img_crearAdmin} alt="imagen de registro" />
      <div className={styles.editCrearAdminForm}>
        <button className={styles.btn_cerrar} onClick={()=>navigate("/")}>X</button>
        {errors.map((err, index) => <div className="alert alert-danger" role="alert" key={index}>{err}</div>)}
        <RegisterForm firstName="" lastName="" email="" age="" password="" confirmPassword="" onSubmitProp={registrarUsuario} ></RegisterForm>
      </div>
    </div>
  );
}

export default CreateAdmin;

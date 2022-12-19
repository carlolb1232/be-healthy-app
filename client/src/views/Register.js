import React, { useState } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { simplePost } from '../services/simplePost';
import { useUser } from "../contexts/userContext"
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';
import img_register from "../assets/img_register.png"
import styles from "./styles_modules/Register.module.css"
import { simpleGet } from '../services/simpleGet';

const Register = () => {

  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const { setUser } = useUser();

  const registrarUsuario = async (values) => {
    console.log("VALORES DESDE EL FORMIK", values);
    const response = await simplePost("http://localhost:8000/api/register", values);

    if (response.data.message === "") {
      console.log("usuario registrado", response.data);
      const response2 = await simpleGet(`http://localhost:8000/api/user/${response.data._id}`)
      console.log(response2)
      setUser(response2.data);
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
    <div className={styles.container_register}>
      <img className={styles.img_register} src={img_register} alt="imagen de registro" />
      <div className={styles.container_registerForm}>
        {errors.map((err, index) => <div className="alert alert-danger" role="alert" key={index}>{err}</div>)}
        <RegisterForm firstName="" lastName="" email="" age="" password="" confirmPassword="" onSubmitProp={registrarUsuario} ></RegisterForm>
      </div>
    </div>
  );
}

export default Register;

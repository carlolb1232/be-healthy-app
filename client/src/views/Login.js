import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { simplePost } from '../services/simplePost';
import { useUser } from "../contexts/userContext"
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';
import img_login from "../assets/img_login.png"
import styles from "./styles_modules/Login.module.css"
import { simpleGet } from '../services/simpleGet';

const Login = () => {

  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const { setUser } = useUser();

  const loginUsuario = async (values) => {
    const response = await simplePost("http://localhost:8000/api/login", values)

    if (response.data.message === "") {
      console.log("USUARIO LOGUEADO", response.data)
      const response2 = await simpleGet(`http://localhost:8000/api/user/${response.data._id}`)
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
    <div className={styles.container_login}>
      <img className={styles.img_login} src={img_login} alt="imagen de login" />
      <div className={styles.container_loginForm}>
        {errors.map((err, index) => <div className={`alert alert-danger`} role="alert" key={index}>{err}</div>)}
        <LoginForm onSubmitProp={loginUsuario} ></LoginForm>
      </div>
    </div>
  );
}

export default Login;

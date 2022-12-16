import React, { useEffect, useState } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import { simplePost } from '../services/simplePost';
import { useUser } from "../contexts/userContext"
import { simpleGet } from '../services/simpleGet';
const CreateFirstAdmin = () => {

  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const { setUser } = useUser();

  let admin = {
    firstName:"Admin",
    lastName:"Admin",
    email:"admin@gmail.com",
    age: 1,
    password:"12345678",
    confirmPassword:"12345678",
    rol:"admin"
  }
  const registrarUsuario = async () => {
    const response = await simplePost("http://localhost:8000/api/register", admin);

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

  useEffect(() => {
    registrarUsuario()
  }, []);

  return (
    <div>
      <h2>Se creo admin</h2>
    </div>
  );
}

export default CreateFirstAdmin;

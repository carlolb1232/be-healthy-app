import React from 'react';
import { useUser } from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';
import logout from '../services/logout';
import Detail from './Detail';
import styles from "./styles_modules/Main.module.css"


const Main = () => {

  const navigate = useNavigate();
  const { user, setUser } = useUser();




  const logOut = async () => {
    const { success } = await logout();
    if (success) setUser(null)
    else window.alert("Error. No se pude desloguear")
  }


  return (
    <div className={styles.container_main}>

      <h1>Es momento de aumentar <br></br>
        tus capacidades</h1>
      <button onClick={()=>navigate("/register")}>Comenzar</button>
    </div>
  );
}

export default Main;

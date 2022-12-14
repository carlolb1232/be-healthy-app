import React from "react";
import styles from "./Navbar.module.css"
import logo from "../assets/LOGO.svg"
import {Link, useNavigate} from "react-router-dom"
import { useUser } from "../contexts/userContext"
import logout from '../services/logout';

const Navbar = () => {

  const navigate=useNavigate()
  const { user, setUser } = useUser();

  const logOut = async () => {
    const { success } = await logout();
    if(success){
      setUser(null)
      navigate("/")
    }else window.alert("Error. No se pude desloguear")
  }

  return (
    <div>
      <nav className={styles.Navbar}>
        <div className={styles.Navbar_container}>
          <img className={styles.logo} src={logo} onClick={()=>navigate("/")} alt="logo Behealthy" />
          <div className={styles.container_btns}>
            {
              !user&&
              <>
                <button className={styles.btn_register} onClick={()=>navigate("/register")}>Register</button>
                <button className={styles.btn_login} onClick={()=>navigate("/login")}>Login</button>
              </>
            }
            {
              user&&
              <button className={styles.btn_login} onClick={logOut}>LogOut</button>
            }
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;

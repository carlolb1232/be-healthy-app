import React from "react";
import styles from "./Navbar.module.css"
import logo from "../assets/LOGO.svg"
import {Link, useNavigate} from "react-router-dom"

const Navbar = () => {

  const navigate=useNavigate()

  return (
    <div>
      <nav className={styles.Navbar}>
        <div className={styles.Navbar_container}>
          <img className={styles.logo} src={logo} onClick={()=>navigate("/")} alt="logo Behealthy" />
          <div className={styles.container_btns}>
            <button className={styles.btn_register} onClick={()=>navigate("/register")}>Register</button>
            <button className={styles.btn_login} onClick={()=>navigate("/login")}>Login</button>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;

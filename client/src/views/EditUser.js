import React from 'react';
import EditUserForm from '../components/EditUserForm';
import { useUser } from "../contexts/userContext"
import { simplePut } from '../services/simplePut';
import styles from "./styles_modules/EditUser.module.css";
import img_editPerfil from "../assets/img_editarPerfil.png"

const EditUser = () => {

  const { user, setUser } = useUser();

  const updateUser = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/user-profile/${user._id}`, values)
      console.log(response.data)
      setUser({...user, ...values})
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div  className={styles.container_perfil}>
      <img className={styles.img_editPerfil} src={img_editPerfil} alt="imagen de registro" />
      <div className={styles.editUserForm} >
        <EditUserForm  firstName={user.firstName} lastName={user.lastName} email={user.email} age={user.age} onSubmitProp={updateUser}/>
      </div>
    </div>
  );
}

export default EditUser;

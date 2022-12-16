import React from 'react';
import EditUserForm from '../components/EditUserForm';
import { useUser } from "../contexts/userContext"
import { simplePut } from '../services/simplePut';

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
    <div style={{backgroundColor:"black"}}>
      <h1>Editar perfil aquí</h1>
      <EditUserForm firstName={user.firstName} lastName={user.lastName} email={user.email} age={user.age} onSubmitProp={updateUser}/>
    </div>
  );
}

export default EditUser;

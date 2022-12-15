import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DietForm from '../components/DietForm';
import { simplePut } from '../services/simplePut';
import styles from "./styles_modules/CreateDiet.module.css"
import img_diet from "../assets/img_dietaUsuario.png"

const CreateDiet = () => {

  const {idPeriod, section} = useParams();

  const navigate = useNavigate()

  const createDiet = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/period-food-section/${idPeriod}/${section}`, values)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <img  src={img_diet} alt="imagen de dieta nutricional" />
      <div className={styles.container_background}>
        <h4>Alimentos</h4>
      </div>
      <div className={styles.navbar}>
        <div>
        <form>
          <label>
            <input type="text" name="busqueda"  placeholder='¿Qué alimento buscas?'/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <label htmlFor="" placeholder='¿Qué alimento buscas?'></label>
        <button className={styles.btnBusqueda} onClick={()=>navigate("/")}>Buscar</button>
        </div>

      </div>
      <div className={styles.container_title}>

          <button className={styles.btnCerrar} onClick={()=>navigate("/")}>X</button>
      </div>
      <button className={styles.btn_createAlimento} onClick={()=>navigate("/create-food")}>Agregar Alimento</button>
      <DietForm onSubmitProp={createDiet}/>
    </div>
  );
}

export default CreateDiet;

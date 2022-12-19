import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { simpleGet } from '../services/simpleGet';
import styles from "./DietForm.module.css"
import { useNavigate } from 'react-router-dom';
import img_trash from "../assets/transh.svg"
import { simpleDelete } from '../services/simpleDelete';

const DietForm = (props) => {

  const navigate = useNavigate()
  const { onSubmitProp, idPeriod, section } = props;

  const [filteredFoods, setFilteredFoods] = useState();
  const [foods, setFoods] = useState();
  const [search, setSearch] = useState();


  const getFood = async () =>{
    try {
      const allFoods = await simpleGet(`http://localhost:8000/api/foods`)
      console.log(allFoods.data.foods)
      const foodsFromPeriod = await simpleGet(`http://localhost:8000/api/foods-section/${idPeriod}/${section}`)
      console.log(foodsFromPeriod.data.foods)
      const foodsFromPeriodId = foodsFromPeriod.data.foods.map(food=>food._id)
      console.log(foodsFromPeriodId)
      const restFoods = allFoods.data.foods.filter(food=>!foodsFromPeriodId.includes(food._id))
      console.log(restFoods)
      const newFoods = restFoods.map((food)=>{
        let newName = food.name.toUpperCase()
        food.name = newName
        return food
      })
      console.log(newFoods)
      setFoods(newFoods)
      setFilteredFoods(newFoods)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFood()
  }, []);


  const handleChange = (e) =>{
    const { value } = e.target;
    console.log(e)
    // setSearch(value.toUpperCase())
    setFilteredFoods(foods.filter(food=>food.name.includes(value.toUpperCase())))
    if (value.length===0) {
      setFilteredFoods(foods)
    }
  }

  const deleteOneFood = async (idFood) => {
    try {
      const response = await simpleDelete(`http://localhost:8000/api/foods/${idFood}`)
      console.log(response.data)
      setFoods((oldFoods)=>oldFoods.filter(food=>food._id !== idFood))
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div >
      <Formik
        initialValues={{
          // toggle: false,
          foods: [],
          /* search:"", */
        }}

        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          onSubmitProp(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          //isSubmitting,
          //validating,
          valid,
        }) => {
          return (
            <div className={styles.container}>
              <form className={styles.container_form}>
                <div className={styles.container_left}>
                  <label htmlFor="search" ></label>
                  <input className={styles.container_input} type="text" name="search" id="search" placeholder="¿Qué alimento buscas?" onChange={e=>handleChange(e)} />
                </div>
                <div  className={styles.container_right}>
                  <button className={styles.btn_registroMensual} onClick={()=>navigate(`/client-diet/${idPeriod}`)}>Volver al registro mensual</button>
                  <button className={styles.btn_createAlimento} onClick={()=>navigate("/create-food")}>Agregar Alimento</button>
                </div>
              </form>


              <Form className="contact form-diet" method="post" onSubmit={handleSubmit}>
                <div className={styles.containerSubmit}>
                  <button type="submit" className={styles.btn_finalizar}>Finalizar</button>
                </div>

                {/* <div id="checkbox-group">Comidas</div> */}
                <div className={styles.container_card}  role="group" aria-labelledby="checkbox-group">
                  {
                    filteredFoods?.map(food=>{
                      return(
                        <div className={styles.card} key={food._id}>
                            <button onClick={()=>deleteOneFood(food._id)} className={styles.btn_trash}><img className={styles.icono_trash} src={img_trash} alt="icono de eliminar" /></button>
                            <img className={styles.img} src={food.img} alt="imagen del alimento" />
                            <div className={styles.descripcion} >
                              <Field className={styles.checkbox} type="checkbox" name="foods" value={food._id} />
                              <label className={styles.name}> {food.name[0] +food.name.substring(1).toLowerCase()}</label>
                            </div>
                        </div>
                      )
                    })
                  }
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default DietForm;

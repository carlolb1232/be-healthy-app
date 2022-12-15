import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { simpleGet } from '../services/simpleGet';

const DietForm = (props) => {

  const { onSubmitProp } = props;

  const [filteredFoods, setFilteredFoods] = useState();
  const [foods, setFoods] = useState();
  const [search, setSearch] = useState();

  const getFood = async () =>{
    try {
      const response = await simpleGet(`http://localhost:8000/api/foods`)
      console.log(response.data.foods)
      const newFoods = response.data.foods.map((food)=>{
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
    if (search.length===0) {
      setFilteredFoods(foods)
    }
  }


  return (
    <div >
      <Formik
        initialValues={{
          // toggle: false,
          foods: [],
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
            <div>
              <form>
                <div className="form-group">
                  <label htmlFor="search">Buscar:</label>
                  <input type="text" name="search" id="search" onChange={e=>handleChange(e)} />
                </div>
              </form>
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <div id="checkbox-group">Comidas</div>
                <div role="group" aria-labelledby="checkbox-group">
                  {
                    filteredFoods?.map(food=>{
                      return(
                        <label key={food._id}>
                          <Field type="checkbox" name="foods" value={food._id} />
                          {food.name}
                        </label>
                      )
                    })
                  }
                </div>
                <button type="submit">Submit</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default DietForm;

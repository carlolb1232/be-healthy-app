import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { simpleGet } from '../services/simpleGet';

const DietForm = (props) => {

  const { onSubmitProp } = props;

  const [foods, setFoods] = useState();

  const getFood = async () =>{
    try {
      const response = await simpleGet(`http://localhost:8000/api/foods`)
      console.log(response.data.foods)
      setFoods(response.data.foods)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFood()
  }, []);

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
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <div id="checkbox-group">Comidas</div>
                <div role="group" aria-labelledby="checkbox-group">
                  {
                    foods?.map(food=>{
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

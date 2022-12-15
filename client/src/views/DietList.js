import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';

const DietList = () => {

  const { idPeriod, section } = useParams();
  const [foods, setFoods] = useState([]);

  const getFoodsPerSectionFromPeriod = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/foods-section/${idPeriod}/${section}`)
      console.log(response.data.foods)
      setFoods(response.data.foods)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFoodsPerSectionFromPeriod();
  }, []);

  return (
    <div style={{backgroundColor:"black"}}>
      {
        foods.length === 0?
          <div className="foods-container">
            <h1>PIDA DIETA AL COACH</h1>
          </div>
        :
          <div className="foods-container">
            {
              foods.map(food=>{
                return(
                  <div className="food-container">
                    <img style={{width:"250px", height:"250px"}} src={food.img} alt="" />
                    <p>{food.name}</p>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  );
}

export default DietList;

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';

const DietList = () => {

  const { idPeriod, section } = useParams();
  const [foods, setFoods] = useState([]);
  const getFoodsPerSectionFromPeriod = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/period-food-section/${idPeriod}/${section}`)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFoodsPerSectionFromPeriod();
  }, []);

  return (
    <div>
      <h2>Este es un h2</h2>
    </div>
  );
}

export default DietList;

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';

const ClientRutines = () => {

  const { idPeriod } = useParams()
  const [rutines, setRutines] = useState();

  const getRutines = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/rutines/${idPeriod}`);
      console.log(response.data)
      setRutines(response.data.rutines)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRutines();
  }, []);

  return (
    <div>
      <h1 style={{color:"black"}}>Rutinas del periodo: {idPeriod}</h1>
    </div>
  );
}

export default ClientRutines;

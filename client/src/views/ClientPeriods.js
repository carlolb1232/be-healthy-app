import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import moment from 'moment';

const ClientPeriods = () => {
  // ESTA VISTA TIENE TODOS LOS PERIODOS DE UN CLIENTE
  const { idUser } = useParams();
  const [client, setClient] = useState();
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();

  const getClient = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/user/${idUser}`)
      console.log(response.data)
      // CLIENT TENDRA DATOS DEL CLIENTE AL QUE SE LE ESTE VIENDO LOS PERIODOS
      setClient(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPeriodsFromClient = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/periods-user/${idUser}`)
      console.log("periods", response.data.periods)
      // LA VARIABLE PERIODS TENDRA TODOS LOS PERIODOS DE UN USUARIO
      setPeriods(response.data.periods)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getClient();
    getPeriodsFromClient();
  }, []);
  
  return (
    <div style={{backgroundColor:"black"}}>
      <h1>Este son los periodos del usuario con id {client?._id}</h1>
      {/* ESTE BOTON CREARA UN PERIODO PARA UN USUARIO */}
      <button className="btn btn-primary" onClick={()=>navigate(`/create-period/${client?._id}`)}>CREAR PERIODO</button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>IMC</th>
            <th>IMC</th>
            <th>Rutinas</th>
            <th>Dietas</th>
          </tr>
        </thead>
        <tbody>
          {
            periods.length === 0?
            <tr>
              <td colSpan="100%">SIN PERIODOS</td>
            </tr>
            :
            // AQUI RECORRO TODOS LOS PERIODOS DE UN CLIENTE
            periods.map(period=>{
              return(
                <tr key={period._id}>
                  <td>{moment(period.date).format('DD-MM-YYYY')}</td>
                  <td>{period.weight}</td>
                  <td>{period.height}</td>
                  <td>{period.imc}</td>
                  <td>{period.imc}</td>
                  <td><button className="btn btn-primary">crear</button></td>
                  <td><button className="btn btn-primary">crear</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default ClientPeriods;

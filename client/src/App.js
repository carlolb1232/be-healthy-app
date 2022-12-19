import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import { useUser } from "./contexts/userContext"
import Detail from "./views/Detail";
import Navbar from "./components/Navbar";
import MainUserDashboard from "./views/MainUserDashboard";
import ClientRutines from "./views/ClientRutines";
import ClientDiet from "./views/ClientDiet";
import DietList from "./views/DietList";
import ClientPeriods from "./views/ClientPeriods";
import CreatePeriod from "./views/CreatePeriod";
import CreateExcercise from "./views/CreateExcercise";
import CreateDiet from "./views/CreateDiet";
import CreateFood from "./views/CreateFood";
import EditUser from "./views/EditUser";
import CreateAdmin from "./views/CreateAdmin";
import CreateFirstAdmin from "./views/CreateFirstAdmin";

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Navbar />


        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register />}></Route>

          {/* CLIENT */}
          <Route path="/client-rutines/:idPeriod/:idUser" element={<ClientRutines />}></Route>
          <Route path="/client-diet/:idPeriod/:idUser" element={<ClientDiet />}></Route>
          <Route path="/client-foods-list/:idPeriod/:section" element={<DietList />}></Route>
          {/* Esta vista es para actualizar el usuario */}
          <Route path="/user-update" element={<EditUser />} />

          {/* ADMIN */}

          {/* ESTA VISTA TIENE TODOS LOS PERIODOS DE UN CLIENTE */}
          <Route path="/client-periods/:idUser" element={<ClientPeriods />} />
          {/* ESTA VISTA ES PARA CREAR UN PERIODO */}
          <Route path="/create-period/:idUser" element={<CreatePeriod />} />
          {/* ESTA VISTA ES PARA CREAR EJERCICIOS */}
          <Route path="/create-excercise" element={<CreateExcercise />} />
          {/* ESTA VISTA ES PARA CREAR DIETAS */}
          <Route path="/create-diet/:idPeriod/:section" element={<CreateDiet />} />
          {/* ESTA VISTA ES PARA CREAR COMIDAS */}
          <Route path="/create-food" element={<CreateFood />} />
          {/* ESTA VISTA ES PARA CREAR EL PRIMER ADMINISTRADOR */}
          <Route path="/create-first-admin" element={<CreateFirstAdmin />} />
          {/* ESTA VISTA ES PARA CREAR ADMINISTRADORES */}
          <Route path="/create-admin" element={<CreateAdmin />} />

        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

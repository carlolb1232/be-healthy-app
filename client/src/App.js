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

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Navbar />


        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

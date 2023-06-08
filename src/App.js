import React from "react";
import Home from "./Componets/Home";
import Login from "./Componets/Login";
import Register from "./Componets/Register";
import Task from "./Componets/Task";
import Taskall from "./Componets/Taskall";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const App = () => {
  return <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/task' element={<Task/>}/>
        <Route path='/taskall' element={<Taskall/>}/>
        
      </Routes>
  </>;
};

export default App;

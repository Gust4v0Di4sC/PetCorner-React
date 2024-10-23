import React from "react";
import { Routes,Route } from "react-router";

import Home from "../components/home/Home";
import Login from "../components/Login/Login";
import PrivateRoute from "./Private";

export default function RoutesApp(){
    return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
          </Route>
          <Route path="/clientes" element={<PrivateRoute><Home /></PrivateRoute>}>
          </Route>
          <Route path="/caes" element={<PrivateRoute><Home /></PrivateRoute>}>
          </Route>
          <Route path="/prods" element={<PrivateRoute><Home /></PrivateRoute>}>
          </Route>
        </Routes>
    );
  
}
    
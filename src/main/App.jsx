import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import './App.css'

import RoutesApp from './Routes'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'

export default function App(){
    return (
      <BrowserRouter>
        <AuthProvider>
          <RoutesApp />
        </AuthProvider>
      </BrowserRouter>
    );
}
   
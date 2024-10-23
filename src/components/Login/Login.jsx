import "./login.css"
import Logo from "../template/logo"
import { useAuth } from "../../contexts/AuthContext";
import { useState} from "react";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Animation from "../../assets/Animation.lottie"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';


export default function Login(){

        const [email,setEmail] = useState("");
        const [password,setPassword]= useState("");
        const { login } = useAuth();
        const [alert, setAlert] = useState(null);
        const [showAnimation, setShowAnimation] = useState(false);
        

        const handleSubmit = async (e) => {
          e.preventDefault();
          if(email !== '' && password !== ''){
            await login(email,password)
        }else{
          setAlert({ severity: 'error', message: 'Preencha todos os campos' });
          return false;
        }
        };
        

    return (
      <div className="container paw-main">
        
        {alert && (
        <Box sx={{ width: 'fit-content', mx: 'auto', my: -5 }}>
          <Alert variant="filled" severity={alert.severity} onClose={() => setAlert(null)}>
            <AlertTitle>{alert.severity === 'error' ? 'Error' : 'Success'}</AlertTitle>
            {alert.message}
          </Alert>
        </Box>
      )}
        <form className="form" onSubmit={handleSubmit}>
          <Logo />
          <div className="box">
            <input
              name="email"
              onChange={(e)=> setEmail(e.target.value)}
              type="email"
              placeholder="Digite seu nome..."
              value={email}
            />
            <input
              name="password"
              onChange={(e)=> setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha..."
              value={password}
            />
            <button onMouseEnter={() => setShowAnimation(true)}
            onMouseLeave={() => setShowAnimation(false)}  type="submit">Entrar</button>
          </div>
        </form>
        <div className="paws">
        {showAnimation && (
          <DotLottieReact src={Animation} autoplay loop />
        )}
        </div>
      </div>
    );
}
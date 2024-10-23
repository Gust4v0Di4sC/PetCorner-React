import React from "react";
import Main from "../template/Main";
import Nav from '../../components/template/Nav'
import Footer from '../../components/template/Footer';
import Logo from "../template/logo";
import "./home.css"
import Cliente from "../Clientes/Cliente";
import { useLocation } from "react-router";


export default function Home(){
  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Idade", accessor: "age" },  // Ajuste para corresponder ao campo correto
    { header: "Email", accessor: "email" },
    { header: "Outro Campo", accessor: "otherField" } // Ajuste conforme necessário
  ];
  const location = useLocation();
  let rota = "";
  if(location.pathname === "/clientes"){
    rota = "/users"
    columns[3].header = "Telefone";
    columns[3].accessor = "otherField";
  }else if(location.pathname === "/caes"){
    rota = "/dogs"
    columns[2].header = "Peso";
    columns[2].accessor = "peso";
    columns[3].header = "Raça";
    columns[3].accessor = "otherField";
  }else if(location.pathname === "/prods"){
    rota = "/products"
    columns[1].header = "Preco";
    columns[2].header = "Codigo";
    columns[3].header = "Quantidade";
    columns[1].accessor = "age";
    columns[2].accessor = "email";
    columns[3].accessor = "otherField";
  }else{
    rota = "/users"
  }
  



  
  
    return (
      <div className="app">
        <Logo/>
        <Nav />
        <Main 
          icon="home"
          title="Inicio"
          subtitle="Sistema para Gestão de petshop"
        >
          
          <Cliente rota={rota} columns={columns} />
          
        </Main>
        <Footer />
      </div>
    );
}
   
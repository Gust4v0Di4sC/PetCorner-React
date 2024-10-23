import React, { useEffect, useState } from "react"
import "./cliente.css"
import api from "../../services/api";
import Form from "../Form/Form";
import { useLocation } from "react-router";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

  let create = false;
  let edit = false;
  let exclude = false;
  let title = "";
export default function Cliente({ rota, columns }){
  const [tab,setTab] = useState([]);
  const [isFormVisible,setFormVisible] = useState(false);
  const [isTableVisible,setTableVisible] = useState(true);
  const [isButtonVisible,setButtonVisible] = useState(true);
  const [newData, setNewData] = useState({
    name: "",
    age: "",
    email: "",
    otherField: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const location = useLocation();
  const [alert, setAlert] = useState(null);
  
  
  
  useEffect(()=>{
    async function fetchUsers() {
      const result = await api.get(`${rota}`);
      if(location.pathname === "/clientes"){
        title = "Cliente"
      }else if (location.pathname === "/caes"){
        title = "Animal"
      }else{
        title = "Produto"
      }

      setTab(result.data)
    }
    fetchUsers()
  },[rota, location])


  const handleBackToTable = () => {
    setFormVisible(false);
    setTableVisible(true);
    setButtonVisible(true);
    create = false;
    edit = false;
    exclude= false;
    setNewData({ name: "", age: "", email: "", otherField: "" });
    setSelectedUser(null);
    setSearchName("");
  };

  function handleCreate(e){
    e.preventDefault();
    setFormVisible(true);
    setTableVisible(false);
    setButtonVisible(false);
    create = true;
  }


  function handleUpdate(e){
    e.preventDefault();
    setFormVisible(true);
    setTableVisible(false);
    setButtonVisible(false);
    edit = true;
  }

  function handleExclude(e){
    e.preventDefault();
    setFormVisible(true);
    setTableVisible(false);
    setButtonVisible(false);
    exclude = true;
  }
  

  // Função para adicionar um novo registro
  const handleAdd = async () => {
    if (!newData.name || !newData.age || !newData.email || !newData.otherField) {
      setAlert({
        severity: 'warning',
        message: 'Por favor, preencha todos os campos antes de prosseguir'
      });
      return;
    }


    if (create) {
      const result = await api.post(`${rota}`, newData);
      setTab((prevTab) => [...prevTab, result.data]);
      setNewData({ name: "", age: "", email: "", otherField: "" });
      create = false;
      setFormVisible(false);
      setTableVisible(true);
      setButtonVisible(true);
      setAlert({
        severity: 'success',
        message: 'Usuario Cadastrado com sucesso'
      });
      return;
    //função para editar registro 
    } else if (edit) {
      await api.put(`${rota}/${selectedUser.id}`, newData);
      confirmAlert({
        title: 'Confirmar Edição',
        message: 'Tem certeza que deseja editar este registro?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
              const updatedTab = tab.map((item) =>
                item.id === selectedUser.id ? newData : item
              );
              setTab(updatedTab);
              setNewData({ name: "", age: "", email: "", otherField: "" });
              edit = false;
              setFormVisible(false);
              setTableVisible(true);
              setButtonVisible(true);
            }
          },
          {
            label: 'Não',
            onClick: () => {}
          }
        ]
      });
      
      
    } else if (exclude){
      await api.delete(`${rota}/${selectedUser.id}`);
      confirmAlert({
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir este registro?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
              const updatedTab = tab.filter((item) => item.id !== selectedUser.id);
              setTab(updatedTab);
              setNewData({ name: "", age: "", email: "", otherField: "" });
              setSelectedUser(null);
              setSearchName("");
              setFormVisible(false);
              setTableVisible(true);
              setButtonVisible(true);
            }
          },
          {
            label: 'Não',
            onClick: () => {}
          }
        ]
      });
      
    }
  };

  const handleSearchChange = async (e) => {
    setSearchName(e.target.value);
    if (e.target.value.trim() !== "") {
      const result = await api.get(`${rota}?name=${e.target.value}`);
      if (result.data.length > 0) {
        const user = result.data[0];
        setNewData({
          name: user.name,
          age: user.age,
          email: user.email,
          otherField: user.otherField,
        });
        setSelectedUser(user);
      }
    } else {
      setNewData({ name: "", age: "", email: "", otherField: "" });
      setSelectedUser(null);
    }
  };

 

  // Função para lidar com mudanças nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };
    return (
      <>
      {alert && (
        <Alert variant="filled" severity={alert.severity} onClose={() => setAlert(null)} sx={{ mb: 2 }}>
          <AlertTitle>{alert.severity === 'warning' ? 'Aviso' : 'Sucesso'}</AlertTitle>
          {alert.message}
        </Alert>
      )}
        <div >
          {isTableVisible && (
            <table className="tabela">
              <thead>
                <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
              </thead>
              <tbody>
                {tab.map((data) => (
                  <tr key={data.id}>
                    {columns.map((column, index) => (
                      <td key={index}>{data[column.accessor]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {isButtonVisible && (
            <section className="box-button">
              <button onClick={handleCreate}>Cadastrar</button>
              <button onClick={handleUpdate}>Editar</button>
              <button onClick={handleExclude}>Deletar</button>
            </section>
          )}
        </div>

        {isFormVisible && create && <Form data={newData} handleInput={handleInputChange} handleButton={handleAdd} textButton={"Inserir"} 
        textTitle={`Inserir Novo ${title}`}  isCreateValue={true} handleBack={handleBackToTable} />}

        {isFormVisible && edit && <Form data={newData} handleInput={handleInputChange} handleButton={handleAdd} textButton={"Alterar"} textTitle={`Editar ${title}`} isEditValue={true} searchName={searchName}
          setSearchName={handleSearchChange} handleBack={handleBackToTable}  />}

        {isFormVisible && exclude && <Form data={newData} handleInput={handleInputChange} handleButton={handleAdd} textButton={"Excluir"} textTitle={`Deletar ${title}`} isExcludeValue={true}  searchName={searchName}
          setSearchName={handleSearchChange} handleBack={handleBackToTable}  />}
      </>
    );
}
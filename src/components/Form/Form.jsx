
import "./form.css"
import 'react-tooltip/dist/react-tooltip.css'
import { useLocation } from "react-router";
import { Tooltip } from 'react-tooltip'

      
export default function Form({data,handleInput,handleButton,textButton,textTitle,isEditValue, isExcludeValue, searchName,setSearchName,handleBack,isCreateValue}){
    const isEdit = isEditValue;
    const isExclude = isExcludeValue;
    const isCreate = isCreateValue;
    let field1 = "";
    let field2 = "";
    let field3 = "";
    let types = [];
    const location = useLocation();
      

    if(location.pathname === "/clientes"){
       types[0] = "number";
       types[1] = "email";
       types[2] = "phone"
       field1 = "Idade";
       field2 = "E-mail";
       field3 = "Telefone";
    }else if(location.pathname === "/caes"){
      types[0] = "number";
      types[1] = "number";
      types[2] = "text"
      field1 = "Idade";
      field2 = "Peso";
      field3 = "Raça";
    }else if(location.pathname === "/prods"){
      types[0] = "number";
      types[1] = "text";
      types[2] = "number"
      field1 = "Preco";
      field2 = "Codigo";
      field3 = "Quantidade";
    }
   

    
    
  return (
    <> 
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <h1>{textTitle}</h1>
      
      {isEdit && (
        <>
        <Tooltip id="my-tooltip" />
        <label htmlFor="searchName">Nome de busca:</label>
        <input
          id="searchName"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Digite aqui o nome do registro a ser editado"
          data-tooltip-place="top"
          type="text"
          value={searchName}
          onChange={setSearchName}
          placeholder="Busque por um nome"
          required
        />
        <label htmlFor="nome" >Nome:</label>
         <input
            id="nome"
            type="text"
            name="name"
            value={data.name}
            placeholder="Nome"
            onChange={handleInput}
            
          />
          <label htmlFor="age" >{field1}:</label>
          <input
            type={types[0]}
            name="age"
            value={data.age}
            placeholder={field1}
            onChange={handleInput}
            
          />
          <label htmlFor="email" >{field2}:</label>
          <input
            type={types[1]}
            name="email"
            value={data.email}
            placeholder={field2}
            onChange={handleInput}
            
          />
          <label htmlFor="otherFieldSearch" >{field3}:</label>
          <input
            type={types[2]}
            name="otherField"
            value={data.otherField}
            placeholder={field3}
            onChange={handleInput}
            id="otherFieldSearch"
           
          />
        </>
        
      )}
      {isCreate && (
        <>
          <label htmlFor="name" >Nome:</label>
           <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            placeholder="Nome"
            onChange={handleInput}
            required
          />
          <label htmlFor="age" >{field1}:</label>
          <input
            id="age"
            type="number"
            name="age"
            value={data.age}
            placeholder={field1}
            onChange={handleInput}
            required
          />
          <label htmlFor="email" >{field2}:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            placeholder={field2}
            onChange={handleInput}
            required
          />
          <label htmlFor={field3} >{field3}:</label>
          <input
            id="otherfield"
            type="text"
            name="otherField"
            value={data.otherField}
            placeholder={field3}
            onChange={handleInput}
           required
          />
        </>
      )}
      {isExclude && (
        <>
        <label htmlFor="deleteInput" >Nome: </label>
        <input
          id="deleteInput"
          type="text"
          value={searchName}
          onChange={setSearchName}
          placeholder="Digite um nome para deletar"
          required
        />
        </>
        
      )}
      
      <section className="box-button">
        <button onClick={handleButton}>{textButton}</button>
        <button onClick={handleBack}>Voltar</button>
      </section>
    </form>
    </>
   
  );
}
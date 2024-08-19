

import { useEffect, useMemo, useRef, useState } from "react";
import './App.css';

function App() {
 

  const [error,setError]=useState('')




  return (

      <div className="mainContainer">
      <div className="errorMessage">
      {error.length==0?<div></div>:<div>{error}</div>}</div>
      <div className="inputForm">
       <InputCard  setError={setError}></InputCard>
       </div>


    <CardWrapper ></CardWrapper>

    </div>
  )
}
function CardData({name,description,interests}){
  return (
    <div style={{width:"100%",padding:"10px", border:"solid 1px black"}}>
    <h1>{name}</h1>
    <div>{description}</div>
    <h2>Interests</h2>
    <ul style={{listStyle:"none"}}>
    {
      interests.map((item)=>{
        return(
          <li>{item}</li>
        )
      })
    }
    </ul>
    <button style={{backgroundColor:"blue",color:"white", padding:"3px", margin:"10px"}}>LinkedIn</button>
    <button>Twitter</button>
    
  </div>

  )
}
function CardWrapper(){
  const [data,setData]=useState([])
  function getData(){
    setInterval(()=>fetch("http://localhost:3000/").then(
      async (response)=>{
        const responsedata=await response.json();
        setData(responsedata.data)
  
      }
  
    ),1000)
  }
  useEffect(getData,[])
 
  if(data.length==0){
    return (
      <div>No Data Found</div>
    )
  }
  return(
    <div>
    {data.map((item)=>{
        return(
          <CardData name={item.name} description={item.name} interests={item.interests}></CardData>
        )
      })
    }
</div>
  


  )

}
function InputCard(props){
  console.log("reander")
  const nameRef=useRef("");
  const descRef=useRef("");
  const interestRef=useRef('')
  function DisplayCard(e){
    e.preventDefault();
    console.log("hangle")
    const currentData={name:nameRef.current.value,description:descRef.current.value,interests:[interestRef.current.value]}
    fetch("http://localhost:3000/",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(currentData)
    }).then(async(response)=>{
      const data=await response.json(); 
      if(response.status==200){
        props.setError('')

      }else{
        props.setError(data.msg)
      }
      
      
})}




  return (
    <div className="formContainer">
    <form onSubmit={(e)=>DisplayCard(e)} className="form">
      <input placeholder="Name" type="text" name="name"  ref={nameRef} className="inputField"></input>
      <input placeholder="Description" name="name"  ref={descRef} type="text" className="inputField"></input>
      <input placeholder="Interest" name="name"  ref={interestRef} type="text" className="inputField"></input>
      <div className="buttonContainer">
      <input type="submit" className="submitButton"></input></div>
      </form>

    </div>
  )}


export default App

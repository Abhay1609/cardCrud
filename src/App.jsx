

import { useEffect, useMemo, useRef, useState } from "react";
import './App.css';

function App() {
  const [updateData,setUpdateDate]=useState({id:0,name:'',description:'',interests:''})
 

  const [error,setError]=useState('')




  return (

      <div className="mainContainer">
      <div className="errorMessage">
      {error.length==0?<div></div>:<div>{error}</div>}</div>
      <div className="inputForm">
       <InputCard  setError={setError} updateData={updateData} setUpdateDate={setUpdateDate}></InputCard>
       </div>


    <CardWrapper setUpdateDate={setUpdateDate} ></CardWrapper>

    </div>
  )
}
function CardData({id,name,description,interests,setUpdateDate}){
  async function deleteCard(id){

    let response=await fetch("http://localhost:3000/"+id,{method:"DELETE"})
    let data=await response.json()
    console.log(data)
    
    
  }
  async function updateCard(id,name,description,interests){
    setUpdateDate({id,name,description,interests})
    


    

  }
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
    <button onClick={()=>deleteCard(id)}>Delete</button>
    <button onClick={()=>updateCard(id,name,description,interests)}>Update</button>
    
  </div>

  )
}
function CardWrapper({setUpdateDate}){
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
          <CardData key={item.id} setUpdateDate={setUpdateDate} id={item.id} name={item.name} description={item.description} interests={item.interests}></CardData>
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
    if(props.updateData.id!=0){

      const currentData={name:nameRef.current.value,description:descRef.current.value,interests:[interestRef.current.value]}
      fetch("http://localhost:3000/"+props.updateData.id,{
        method:"PUT",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(currentData)}).then(
         async (response)=>{
         let  res=await response.json();
         console.log(res)
         })
         return props.setUpdateDate({id:0,name:'',description:'',interests:''})

    }else{

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
    }
      
)}}
function changeName(e){
console.log(props.updateData.id)

  if(props.updateData.id==0){
    nameRef.current.value=e.target.value
    

  }else{
    nameRef.current.value=props.updateData.name
    


  }
}




  return (
    <div className="formContainer">
    <form onSubmit={(e)=>DisplayCard(e)} className="form">
      <input type="text" name="name" defaultValue={props.updateData.name} onChange={(e)=>changeName(e)} placeholder="Name" ref={nameRef} className="inputField"></input>
      <input placeholder="Description" defaultValue={props.updateData.description} ref={descRef} type="text" className="inputField"></input>
      <input placeholder="Interest" name="name" defaultValue={props.updateData.interests} ref={interestRef} type="text" className="inputField"></input>
      <div className="buttonContainer">
      <input type="submit" className="submitButton"></input></div>
      </form>

    </div>
  )}


export default App

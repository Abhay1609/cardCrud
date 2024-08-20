import { useState, useEffect } from "react";
import { CardData } from "./CardData";

export function CardWrapper({setUpdateDate}){
    const [data,setData]=useState([])
    function getData(){
      setInterval(
        ()=>fetch("http://localhost:3000/")
            .then(
                async (response)=>{
                const responsedata=await response.json();
                setData(responsedata.data)})
       ,1000)
    }
    useEffect(getData,[])
   
    if(data.length==0){
      return (
        <div className="processContainer">
        <div className="process"></div>
        </div>
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
  
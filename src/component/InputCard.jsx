
import { useState, useRef } from "react";
import { Interest } from "./Interest";

export function InputCard(props){
   
    // const nameRef=useRef(null);
    // const descRef=useRef("");
    // const interestRef=useRef('')
    const initalValue={name:'',description:"",interests:['']}
    let [formData,setFormData]=useState(initalValue)
    let [interestComponent,setInterestComponent]=useState([])
    let isdisable=false;
 
    function addInterestData(index,e){
        if(props.updateData.id!=0){
            let key=props.updateData.interests[index]
            props.updateData.interests[index]=e.target.value
            props.setUpdateDate({...props.updateData})
          
        }else{
            let key=formData.interests[index]
            formData.interests[index]=e.target.value
            setFormData({...formData})
}}


    if(props.updateData.id!=0){
        formData=props.updateData
         interestComponent=props.updateData.interests

        isdisable=true;
    }
    function addInterest(e){
        e.preventDefault()
    
        props.updateData.interests.push('')
        setInterestComponent([...interestComponent,{}])
        

    }

    function DisplayCard(e){
         e.preventDefault()
        if(props.updateData.id!=0){
           
            fetch("http://localhost:3000/"+props.updateData.id,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)}).then(
                    async (response)=>{
                    let  res=await response.json();
                    if(response.status!=200){
                        props.setError(res.msg)
                        
                        return
                       
                    }else{
                       props.setUpdateDate({...initalValue,id:0})
                       
                       setFormData(initalValue)
                       setInterestComponent([])
                        props.setError('');

                        return
                    }
        
                })
                
  
        }else{
            e.preventDefault()
            fetch("http://localhost:3000/",{
                method:"POST",
                headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
                }).then(async(response)=>{
                const data=await response.json();
                console.log(response); 
                if(response.status==200){
                props.setError('')
                setFormData(initalValue)
                setInterestComponent([])
                
        
                }else{
                props.setError(data.msg)
                
                }
            }
            
    )}}
  function HandleChange(e){
    const name=e.target.name;
    const value=e.target.value;
    if(props.updateData.id!=0){
        props.setUpdateDate({...props.updateData,[name]:value})
    }else{
        setFormData({...formData,[name]:value});

    }

}
  
  return (
      <div className="formContainer">
        <form  className="form">
            <input 
                type="text"
                name="name" 
                placeholder="Name"
                disabled={isdisable}
                value={formData.name}
                onFocus={(e)=>HandleChange(e)}
                onChange={(e)=>HandleChange(e)}
                className="inputField">
               
            </input>
            <input 
                type="text" 
                name="description"
                placeholder="Description" 
                value={formData.description}
                onChange={(e)=>HandleChange(e)} 
                className="inputField">
            </input>
          
                <input
                    type="text"
                    name="interests" 
                    placeholder="Interest 0" 
                    value={formData.interests[0]}
                    onChange={(e)=>addInterestData(0,e)}  
                    className="inputField">
                </input>

                
                
           
            {interestComponent.map((_,index)=><Interest index={index} key={index} addInterestData={addInterestData} interestData={formData.interests}></Interest>)}

            <div className="buttonContainer">
            <button onClick={(e)=>addInterest(e)} className="update button">
                    Add Interest
                </button>
                <button 
                    type="submit" 
                    className="button link"
                    onClick={(e)=>DisplayCard(e)}>
                    Submit

                </button>

            </div>
            </form>
  
      </div>
    )}


  

  
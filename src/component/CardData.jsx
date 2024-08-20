

export function CardData({id,name,description,interests,setUpdateDate}){
    async function deleteCard(id){
  
      let response=await fetch("http://localhost:3000/"+id,{method:"DELETE"})
      let data=await response.json()
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
      <button className="button link">LinkedIn</button>
      <button className="button twitter">Twitter</button>
      <button onClick={()=>deleteCard(id)} className="button delete">Delete</button>
      <button onClick={()=>updateCard(id,name,description,interests)} className="button update">Update</button>
      
    </div>
  
    )
  }
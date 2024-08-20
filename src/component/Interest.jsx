

export function Interest({index,addInterestData,interestData}){
    return(
        <input
        type="text"
        name="interests" 
        placeholder={"Interest "+(parseInt(index)+parseInt(1))} 
        value={interestData[index+1]}
        onChange={(e)=>addInterestData(index+1,e)}  
        className="inputField">
    </input>

    )
}
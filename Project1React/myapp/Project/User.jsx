import { useEffect, useState } from "react"
import { deleteItem, getAll, updateItem } from "../src/utils";
import OtherDataComp from "./OtherData";
import IdClickComp from "./IdClick";
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';


const UserComp = ({user, onUpdate, onDelete,borderColor,onShowTasks, style, onAllTasksCompleted }) =>{
const [userChange, setUserChange] = useState({name : user.name, email : user.email });
const [showOtherData, setShowOtherData] = useState(false)



const handleInputChange = (e) =>{
   const {name, value} = e.target;
   setUserChange({...userChange, [name] : value})
}

const handleMouseEnter = () =>{
setShowOtherData(true)
}

const handleMouseLeave = () =>{
   setShowOtherData(false)
}

const UpdateData = async () =>{
   try{
      const {data} = await updateItem(USERS_URL, user.id, userChange)
      onUpdate(data)
      alert("User data updated successfuly");
   } catch (error){
      console.error('Error updating user', error);
      alert('Failed to update user data')
   }
}

const DeleteData = async() =>{
   try{
      await deleteItem(USERS_URL, user.id)
      alert("User deleted successfuly")
      onDelete(user.id)
   }catch(error) {
      console.error('Error deleting user : ', error)
      alert('Failed to delete user')
   }
}



   return (
    <div style={{border : `2px solid ${borderColor}`,
      marginBottom : "10px",
      padding : "10px",
      borderRadius : "10px",
      ...style,
    }}>
      
            <div>ID : <span style={{cursor : "pointer", textDecoration : "underline"}} onClick={() => onShowTasks()}>{user.id} <br/></span></div>
            <div>Name :  <input type="text" name="name" value={userChange.name}  onChange={handleInputChange}/> <br/> </div>
            <div>Email : <input type="text" name="email" value={userChange.email}  onChange={handleInputChange}/> <br/> </div>
       <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Other Data</button> 
    &nbsp; &nbsp; &nbsp; &nbsp;
    
    {showOtherData && <OtherDataComp address={user.address} />}
    {showOtherData && (
    <div style={{marginLeft : "20px"}}>
      <button onClick={UpdateData}>Update</button>
      <button onClick={DeleteData}>Delete</button>
    </div>
    )}
    {!showOtherData && (
      <div style={{marginTop : "10px"}}>
         <button onClick={UpdateData}>Update</button>
         <button onClick={DeleteData}>Delete</button>
      </div>
    )}
    </div>
   )
}

export default UserComp;
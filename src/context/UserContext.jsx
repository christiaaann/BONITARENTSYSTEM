import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
 const [users, setUsers] = useState([]);
 const [admins, setAdmins] = useState([]);
 const [softdeleted, setSoftDeleted] = useState([]);
 const [trashUsers, setTrashUsers] = useState([]);
// fetchusers
  const fetchUsers = async () => {
    try{
      const res = await fetch('http://localhost:3000/api/users');
      const data = await res.json();
      setUsers(data);

    //admin filter
      const onlyAdmins = data.filter(user => user.role === 'admin');
      setAdmins(onlyAdmins);
               
    }catch (error) {
      console.error('Error fetching users:', error);
    }
  };


    const fetchTrashUsers = async () => {
    try{
    const res = await fetch('http://localhost:3000/api/users/trash');
    const data = await res.json();
    setTrashUsers(data);
    }catch{
  console.error('Error fethching trashusers ')
    }  
  };

  
  
//   soft delete User
  const deleteUser = async (id) => {
    const confirmDelte = confirm('Are you sure you want to Delete?');
    if (!confirmDelte) return;
    try{
      await fetch(`http://localhost:3000/api/users/${id}/soft-delete`, {
      method: 'PATCH',
      });
      alert('User Deleted');
      fetchUsers();
      fetchTrashUsers();
    }catch (error){
      console.error('Error deleting user', error);
    }
  }

  // restore
  const restoreUser = async (id) => {
    const confirmDelte = confirm('Restore user?');
    if (!confirmDelte) return; 
   try{
   await fetch(`http://localhost:3000/api/users/${id}/restore`, {
   method: 'PATCH'
   })
   alert('Restore User');
   fetchUsers();
   fetchTrashUsers();
   }catch{
    console.error('Error restoring user')
   } 
  }

//   permeant deleted
const permanentDeleteUser = async (id) => {
    const confirmDelete = confirm("Are you sure you wnat delete Permanent?");
    if (!confirmDelete) return;
    try{
       await fetch(`http://localhost:3000/api/users/${id}`, {
       method:"DELETE",
     })
     alert("Usr Permanent Deleted");
     fetchUsers();
     fetchTrashUsers();
    }catch (err){
    console.error('Error deleting user') 
    }   
  }

    useEffect(() => { 
    fetchUsers();
    fetchTrashUsers();
  },[]);
  


  return (
    <UserContext.Provider 
       value={{
         users, 
         admins, 
         trashUsers, 
         fetchUsers, 
         fetchTrashUsers, 
         deleteUser, 
         restoreUser,
         permanentDeleteUser
         }}>
     {children}
    </UserContext.Provider>
  )
}

export const useUsers = () => useContext(UserContext);
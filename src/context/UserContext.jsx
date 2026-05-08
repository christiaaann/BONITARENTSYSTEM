import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
 const [users, setUsers] = useState([]);
 
 // fetchusers
  const fetchUsers = async () => {
    try{
      const res = await fetch('http://localhost:3000/api/users');
      const data = await res.json();
      setUsers(data);
    }catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
//   soft delete User
  const deleteUser = async (id) => {
    const confirmDelte = confirm('Are you sure you want to Delete?');
    if (!confirmDelte) return;
    try{
      await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE',
      });
      alert('User Deleted');
      fetchUsers();
    }catch (error){
      console.error('Error deleteting user', error);
    }
  }
  
    useEffect(() => { 
    fetchUsers();
  },[]);
  


  return (
    <UserContext.Provider value={{users, fetchUsers, deleteUser}}>
     {children}
    </UserContext.Provider>
  )
}

export const useUsers = () => useContext(UserContext);
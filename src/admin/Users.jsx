import { useState } from 'react'
import { useEffect, useRef } from 'react';
import { ChartNoAxesCombined, ChevronUp, Database, Mail, MapPinHouse, Moon, Pencil, Phone, Sun, Trash } from 'lucide-react';
import { useUsers } from '../context/UserContext';
const Users = ({setTheme}) => {
  const { users, deleteUser, permanentDeleteUser } = useUsers();

  const [name, setName] =  useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] =  useState('');
  const [loading, setLoading] = useState(false);

  // Close Outside
  const popupRef = useRef(null);
  useEffect (() => {
    const closeModalDarkmode = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)){
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeModalDarkmode);
    return () => {
      document.removeEventListener('mousedown', closeModalDarkmode);
    };
   },[]);
  
  // darkmode toggle
  const [open, setOpen] = useState(false);

  
  // Filter Select Dropdown
  const [openSelect, setOpenSelect] = useState(false);
  const [filterRole, setFilterRole] = useState('user');



  // EDIT
  const [edit, setEdited] = useState(null);
  const handleEdit = (user) => {
  setName(user.name);
  setEmail(user.email);
  setRole(user.role);
  setEdited(user.id);
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // validation
  //   if (!name || !email || !role) {
  //     alert('Name email and role  are required');
  //     return; 
  //   }

  //   setLoading(true);

  //   try {
  //     const url  = edit 
  //     ? `http://localhost:3000/api/users/${edit}`
  //     : `http://localhost:3000/api/users`;  

  //     const method  = edit ? 'PUT' : 'POST';
  //     const response = await fetch(url, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name, email, role }),
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //     alert(data.error);
  //     return;
  //      }
  //     alert('User added successfully!');
     
  //     console.log(data);
  //     // clear inputs
  //     setName('');
  //     setEmail('');
  //     setRole('');
  //     setEdited(null);
  //     // get users no refresh
  //     fetchUsers();
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <>
    {/* <form onSubmit={handleSubmit}> 
      <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /> 
   
      <select value={role} onChange={(e) => setRole(e.target.value)}> 
      <option value="">Select Role</option> 
      <option value="staff">Staff</option> 
      <option value="utility">Utility</option> 
      <option value="admin">Admin</option> 
      </select> 
      <button disabled={loading} type='submit'> {loading ? 'Adding...' : edit ? 'Update' : 'Add User'} </button>\ 
      </form> 
      <h1>USER LIST TOTAL: {users.length}</h1> 
      <thead> <tr> <th>ID</th> <th>Name</th> <th>Email</th> <th>Role</th> </tr> </thead> 
      <tbody> {users.map((user) =>( <tr key={user.id}> <td>{user.id}</td> <td>{user.name}</td> <td>{user.email}</td> <td>{user.role}</td> <td> <button onClick={() => handleEdit(user)}>EDIT</button></td> <td><button onClick={() => handleDelete(user.id)}>Delete</button></td> </tr> ))}
      </tbody> */}

        <div className='min-h-screen bg-white dark:bg-[#0C1221] transition duration-300 flex justify-center'>
        <div className='shadow-sm bg-white dark:bg-[#121A2B] transition-colors duration-500 rounded-xl w-full flex flex-col gap-5 p-2'>
        <div className='flex'>
         <div className=' flex gap-2 w-full'>
          <div className='h-4 w-4 bg-red-600 rounded-full'></div>
          <div className='h-4 w-4 bg-yellow-200 rounded-full'></div>
          <div className='h-4 w-4 bg-green-600 rounded-full'></div>
         </div>
        
        <div className='p-2 relative '>
         <button onClick={() =>setOpen(!open)} className='cursor-pointer transition duration-500 hover:bg-blue-100/50 w-10 h-10 flex items-center justify-center rounded-xl dark:text-white'><Sun strokeWidth={1}/></button>
         {open && (
          <div ref={popupRef} className='shadow-lg dark:bg-[#0C1221] border-white/10 border right-0 rounded-xl w-44 transition duration-300 bg-white p-2  absolute'>
           <button onClick={() => {setTheme('light'); localStorage.setItem('theme', 'light'); setOpen(false)}}className='flex gap-2 hover:bg-blue-100/60 py-2 hover:text-blue-500 dark:text-white dark:hover:bg-white/5 rounded-xl px-1 w-full'><Sun strokeWidth={1}/>Light</button>
           <button onClick={() => {setTheme('dark'); localStorage.setItem('theme', 'dark'); setOpen(false)}} className='flex gap-2  hover:bg-blue-100/60 w-full hover:text-blue-500 dark:hover:bg-white/5 dark:text-white py-2 px-1 rounded-xl'><Moon strokeWidth={1}/>Dark</button>
          </div>
         )}
         </div>
        </div>

         <div className='flex justify-between '>
          <div className='flex items-center gap-2'>
            <div className='bg-blue-100 dark:bg-violet-500/5 dark:text-white rounded-2xl w-10 h-10 flex items-center justify-center '><Database size={20} strokeWidth={1}/></div><h1 className='text-xl dark:text-white font-semibold'></h1>
          </div>

            
         </div>

         <div className='flex relative justify-end '>
          <button onClick={() => setOpenSelect(!openSelect)} className='border flex capitalize gap-1 py-1 px-4 border-neutral-200 dark:border-white/5 dark:bg-[#151C2D] dark:text-white/50  rounded-sm'>
           {filterRole === 'All' ?  'All' : filterRole}
           <span><ChevronUp className={` transition-transform duration-300 ${openSelect ? ' rotate-180' : 'rotate-0'}`} strokeWidth={1}/></span> 
          </button>

          {openSelect && (
          <div  className='absolute flex flex-col gap-2 rounded-lg w-44 right-0 mt-10 bg-white dark:bg-[#0C1221] dark:text-white shadow p-3'>
           <span className= {`py-2 px-2 rounded-xl cursor-pointer ${filterRole === 'All' ? 'bg-blue-100 text-blue-500 dark:bg-white/10' : 'hover:bg-blue-100/60 dark:hover:bg-blue-100/10 hover:text-blue-500'}`} onClick={() => {setFilterRole('All'); setOpenSelect(false)}}>All</span>
           <span className= {`py-2 px-2 rounded-xl cursor-pointer ${filterRole === 'staff' ? 'bg-blue-100 text-blue-500 dark:bg-white/10' : 'hover:bg-blue-100/60 dark:hover:bg-blue-100/10 hover:text-blue-500'}`} onClick={() => {setFilterRole('staff'); setOpenSelect(false)}}>Staff</span>
           <span className='hover:bg-blue-100/60 py-2 px-2 rounded-xl hover:text-blue-500 dark:hover:bg-blue-100/10' onClick={()=> {setFilterRole('utility'); setOpenSelect(false)}}>Utility</span>
           <span className='hover:bg-blue-100/60 py-2 px-2 rounded-xl hover:text-blue-500 dark:hover:bg-blue-100/10' onClick={() => {setFilterRole('admin'); setOpenSelect(false)}}>Admin</span>
          </div>
          )}
         </div>
      
       <div className='flex items-center bg-gray-50 dark:bg-[#151C2D] border overflow-hidden rounded-xl  border-gray-200 dark:border-white/10 transition duration-300'>
       <aside className='flex gap-10 p-2  border-r-2 border-gray-200 dark:border-white/20 flex-col'>
       <span className='bg-gray-300 dark:bg-gray-800  shadow-sm w-3 h-3 rounded-full'></span>
       <span className='bg-gray-300 dark:bg-gray-800 w-3 h-3 shadow-sm rounded-full'></span>
       <span className='bg-gray-300 dark:bg-gray-800 w-3 h-3 rounded-full'></span>
       <span className='bg-gray-300 dark:bg-gray-800  w-3 h-3 rounded-full'></span>
       <span className='bg-gray-300 dark:bg-gray-800  w-3 h-3 rounded-full'></span>
       </aside>  
       
      <table className="w-full border-collapse">
        
        {/* HEADER */}
        <thead>
          <tr className="text-gray-500 border-b-2 dark:border-white/5 border-gray-300">
            <th className="p-5 text-left">ID</th>
            <th className="p-5 text-left">Name</th>
            <th className="p-5 text-left">Email</th>
            <th className="p-5 text-left">Contact</th>
            <th className="p-5 text-center">Address</th>
            <th className="p-5 text-left text-blue-500">Role</th>
            <th className="p-5 text-center text-red-700">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
        {users
        .filter((user) => {
          if (filterRole === 'All') return true;
          return user.role === filterRole;
        })
        .map((user) => (
            <tr key={user.id} className="border-b text-nowrap transition duration-300 group border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 dark:text-white">
              <td className="p-5">{user.id}</td>
              <td className="p-5">{user.name}</td>
              <td className="p-5 flex items-center gap-2"><Mail/>{user.email}</td>
              <td className='p-5'>
              <div className='flex items-center gap-2'>
                <Phone />
                {user.contact}
              </div>
            </td>
              <td className='p-5 flex items-center gap-2'>
               <MapPinHouse/>{user.address}

              </td>
              <td className="p-5 bg-blue-50/65 group-hover:bg-blue-100 dark:group-hover:bg-blue-400/5 group-dark:bg-white/5 transition">{user.role}</td>
              <td className='flex gap-2 justify-center' >
             <button 
                className=' cursor-pointer'
                onClick={() => deleteUser(user.id)}
                >
                <Trash color='red' strokeWidth={1}
                />
            </button>
             
              </td>
            </tr>
          ))}
        </tbody>

      </table>
       </div>

        </div>
      </div>
    </>
  )
}

export default Users
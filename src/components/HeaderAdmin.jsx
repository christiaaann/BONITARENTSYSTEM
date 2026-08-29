import { CircleCheck, Ellipsis, Plus, Trash, UserRoundPlusIcon, Users } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useUsers } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
const HeaderAdmin = () => {
        
   const {users, fetchUsers, admins, permanentDeleteUser, alertpermantdelete} = useUsers();
   const {user} = useAuth();
   const [modalAdmin, setModalAdmin] = useState(false); 
   const [boxadmin, setBoxAdmin]= useState(null);
   const [addedModalUsers, setAddedModalUsers] = useState(false);
   
   const [name, setName] = useState('');
   const [email,setEmail] = useState('');
   const [role, setRole] = useState('');
   
  //  validation 
  const [formError, setFormError] = useState('');
  // Custom Alert box!
  const [myAlert, setMyAlert] = useState({
     show: false,
     message: ''
   });
  

  // greetings admin
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const getGreetingByTime = () => {
      const hr = new Date().getHours();
      if (hr >= 5 && hr < 12)  return 'Good morning';
      if (hr >= 12 && hr < 17) return 'Good afternoon';
      if (hr >= 17 && hr < 22) return 'Good evening';
      return 'Good night';
    };
    setGreeting(getGreetingByTime());

    // Function para i-update ang Date at Time
  const updateClock = () => {
    const now = new Date();
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit' // Alisin mo ito kung ayaw mo ng gumagalaw na segundo
    };
    
    setCurrentDate(now.toLocaleDateString('en-US', options));
  };

  updateClock(); 
  const timer = setInterval(updateClock, 1000);
  return () => clearInterval(timer);
  }, []);



  //  submit
   const handleSubmit = async (e) => {
   e.preventDefault();

    if (!name || !email || !role) {
    alert("Name, email, and role are required");
    return;
  }

    try{
      const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, role }),
    });

    const data = await response.json();
    if(!response.ok) {
    setFormError(data.error);
    return;
    }

    setName("");
    setEmail("");
    setRole("");
    
    fetchUsers();
    setAddedModalUsers(false);
    
    // alert(data.message || "Admin added successfully");
    setMyAlert({
    show: true,
    message: data.message   
    });
    
    setTimeout(() => {
    setMyAlert({ show: false, message: '' });
    }, 3000);

    }catch(error){
    console.error("Error adding admin ",error);
    }
  }

  return (
    <>
    <header className=' border-b relative pl-5 border-gray-200  flex items-center justify-between pr-8 h-16'>
       
   <div className="flex items-center gap-3">
  {/* Date Pill */}
  <div className="bg-stone-100/80 px-2.5 py-1 rounded-md border border-stone-200/60">
    <p className="text-xs font-medium text-stone-500">
      {currentDate}
    </p>
  </div>

  <span className="text-stone-300">•</span>

  {/* Greeting & Name */}
  <div className="flex items-center gap-1.5">
    <span className="text-stone-500 text-sm">{greeting},</span>
    <span className="text-stone-900 font-semibold text-sm">
      {user?.name || 'Admin'}
    </span>
  </div>
</div>

     <button
      onClick={() => setModalAdmin(true)}
      className='cursor-pointer bg-gray-100 flex justify-center items-center  w-10 h-10 rounded-full shadow font-semibold text-lg text-gray-600'
      >
      <UserRoundPlusIcon strokeWidth={1}/>
     </button>

     {modalAdmin && (
      <div className='fixed inset-0 z-20 flex backdrop-blur-sm justify-center items-center'>
        
        <div className='shadow-sm rounded-lg bg-white relative h-200 w-250'>
         
          <div className='bg-gray-100 flex items-center justify-between w-full h-20 p-5'
          >
          <div className='flex gap-2 items-center'>
           <div className='bg-white px-2 py-2 rounded-lg shadow'><Users color='blue'/></div>
           
           <div className='flex flex-col'>
           <h1 className='font-semibold'>Admin</h1>
           <p className='text-sm text-gray-400'>Manage your admin account</p> 
           </div>
          </div>

          <button
              onClick={() => setAddedModalUsers(true)}
              className='flex text-sm bg-blue-800 rounded-lg text-white px-2 py-1'
              >
              <Plus size={20}
              />
              Add Admin
        </button>  
          </div>

          {/* adminusers added */}
          {addedModalUsers && (
            <div className='fixed inset-0 z-10 flex justify-center items-center'>
              <div className='bg-white shadow w-120 rounded-lg p-5'>
               <form onSubmit={handleSubmit}>
               <div className='flex gap-2 flex-col'>

               {formError && (
               <div className='bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r-lg text-sm font-medium flex items-center gap-2 transition-all duration-200'>
               <span>⚠️</span>
               <span>{formError}</span>
               </div>
               )}

               <input 
                 type="text" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder='Name'
                 className='bg-gray-50 border border-gray-200 px-2 py-2 rounded-lg' 
                 
                 />
               <input 
                 type="text"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} 
                 placeholder='email'
                 className='bg-gray-50 border border-gray-200 px-2 py-2 rounded-lg'  
                 />

                 <select
                   className='bg-gray-50 text-gray-800 border border-gray-200 px-2 py-2 rounded-lg'  
                   value={role} 
                   onChange={(e) => setRole(e.target.value)}
                   >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>  
                </select>
               <button 
                 type='submit'
                 className='cursor-pointer bg-gray-100 py-2 rounded-xl'
                >
                Submit
              </button>
               </div>
              </form> 
              </div>
              
            </div>
          )}
          
          <button 
            onClick={() => setModalAdmin(false)}
            className='absolute cursor-pointer -right-11 -top-4 bg-red-600 text-white w-10 h-10 rounded-full'
            >
            X
        </button>
         <div className='p-2'>
         <div className=' grid grid-cols-1 gap-2  '>
          {admins.map((admin) => (
            <div
            key={admin.id}
            className='bg-gray-50 shadow p-2 rounded-lg'
            >
             <div className='flex items-center gap-2 '>
             <div className='flex items-center w-full gap-2'>
             {/* profile */}
             <div className='p-2'>
              {admin.picture ? (
              <img
                className=' w-12 h-12 rounded-full'
                referrerpolicy="no-referrer" 
                src={admin.picture} 
                alt="" 
              />
              ):(
            <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full">
               {admin?.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
              
             )}
             </div>
          
             {/* Admin details */}
             <div>
             <p className='font-semibold'>{admin.name}</p>
             <p className='text-gray-400'>{admin.email}</p>
             </div>
             </div>
             
             <div className='w-full relative flex items-center justify-between'>
              <p className='border border-dashed border-green-900 text-sm text-green-900 px-2 py-1 rounded-lg'>{admin.role}</p>
            <button
              onClick={() => setBoxAdmin(prev => (prev === admin.id ? null : admin.id))}
              className='cursor-pointer'
              >
              <Ellipsis/>
            </button>
             {boxadmin === admin.id && (
              <div className=' flex flex-col gap-1 absolute z-10 rounded-lg right-7 top-3 w-36 h-20 shadow bg-white p-2'>
              <button
               onClick={() => permanentDeleteUser(admin.id)}
               className='bg-gray-50 shadow py-1 rounded-lg text-sm'>Delete</button>
              <button className='bg-gray-50 shadow py-1 rounded-lg text-sm'>Block</button>
              </div>
             )}
              </div>
             </div> 
            </div>
          ))}
         </div>
       </div>

        </div>
      </div>  
     )}

     {/* customize alert */}
      {myAlert.show && (
       <div className="fixed right-20 z-50">
        <div className='bg-white flex gap-2 border-2 shadow shadow-green-600/40 rounded border-green-600/50 p-2 w-100'>
           <CircleCheck color='green'/>
           <p className='text-green-600'>{myAlert.message}</p>
        </div>
       </div>
     )}
      
       {alertpermantdelete.show && (
       <div className="fixed right-20 z-50">
        <div className='bg-white flex gap-2 border-2 shadow shadow-red-600/50 rounded border-red-600/50 p-2 w-100'>
           <CircleCheck color='red'/>
           <p className='text-red-600'>{alertpermantdelete.message}</p>
        </div>
       </div>
     )}
    </header>
    </>
  )
}

export default HeaderAdmin
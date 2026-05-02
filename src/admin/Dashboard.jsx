import { useState, useEffect} from 'react'
import { ChartNoAxesCombined} from 'lucide-react'
import UserLineChart from '../components/UserLineChart'
const Dashboard = () => {

    // Get users
    const [users, setUsers] = useState([]);
    useEffect(() => { 
      fetchUsers();
    },[]);
    const fetchUsers = async () => {
      try{
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        setUsers(data);
      }catch (error) {
        console.error('Error fetching users:', error);
      }
    };


  return (
   <>
   <div className='p-20 dark:bg-[#121A2B] relative min-h-screen'>
    <h1 className=' absolute dark:text-gray-400  left-5 top-5 text-2xl font-medium'>Analytics</h1>
    <div className='flex  justify-center items-center gap-2  w-40 bg-blue-50 dark:border-white/5 border border-blue-200 p-1 rounded-xl dark:bg-blue-400/5 dark:shadow'>
    <ChartNoAxesCombined color='blue'size={30} strokeWidth={1.5}/>
    <div className=''>
    <h1 className=' uppercase text-gray-500 font-semibold text-lg'>Users</h1>
    <p className='font-semibold text-blue-500 text-xl'>{users.length}</p>    
    </div>
    </div>
    <div className='flex gap-5'>
    <UserLineChart/>
     </div>

    </div>
 
   </>
  )
}

export default Dashboard
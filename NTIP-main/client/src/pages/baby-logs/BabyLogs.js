import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import BabyLog from './BabyLog'


function Books() {
    const [babyLogs, setBabyLogs] = useState([]);
    
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3001/api/baby-logs', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization token in the headers
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
            setBabyLogs(data);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        // Call the fetch data function
        fetchData();
      }, []); // Empty dependency array means this effect runs once after the initial render>

      const handleDelete = async (id) => {
        try {
          // Make a DELETE request to the API
          const response = await fetch(`http://localhost:3001/api/baby-logs/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization token in the headers
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete the baby log');
          }
    
          setBabyLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
        } catch (error) {
          console.error('Error deleting baby log:', error.message);
        }
      };
    

    return (
        <div className="container mx-auto mt-8">
          <div className='flex w-full justify-between'>
            <h1 className="text-3xl font-bold mb-4">Baby Logs</h1>
            <Link to="/add-baby-log" className="bg-blue-500 text-white p-2 mb-4">
              Add Baby Log
            </Link>
          </div>
        
        {babyLogs.map((babyLog) => (
            <BabyLog key={babyLog.id} {...babyLog} onDelete={handleDelete}/>
        ))}
        </div>
    );
}
  
export default Books 
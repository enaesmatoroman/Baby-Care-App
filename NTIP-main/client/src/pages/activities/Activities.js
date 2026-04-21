import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Reservations() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/api/activities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  
    setActivities(prev => prev.filter(a => a.id !== id));
  };
  useEffect(() => {
    // Function to fetch activities
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/activities', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization token in the headers
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error.message);
      }
    };

    fetchActivities();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container mx-auto mt-8">
      <div className='flex w-full justify-between'>
        <h1 className="text-3xl font-bold mb-4">Activities</h1>
        <Link to="/add-activity" className="bg-blue-500 text-white p-2 mb-4">
          Add Activity
        </Link>
      </div>
      <ul>
      {activities.map((a) => (
  <div key={a.id} className="border p-3 mb-2">
    <h3>{a.title}</h3>
    <p>{a.notes}</p>

    <button
      onClick={() => handleDelete(a.id)}
      className="bg-red-500 text-white px-2"
    >
      Delete
    </button>
  </div>
))}
      </ul>
    </div>
  );
}

export default Reservations;

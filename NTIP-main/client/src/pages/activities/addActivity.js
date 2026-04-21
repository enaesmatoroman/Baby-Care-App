import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddReservation() {
  const [newActivity, setNewActivity] = useState({
    activityType: 'reminder',
    title: '',
    notes: '',
    activityTime: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("TOKEN:", localStorage.getItem("token"));
    try {
      // Make a POST request to add the new activity
      const response = await fetch('http://localhost:3001/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newActivity),
      });

      if (!response.ok) {
        throw new Error('Failed to add the new activity');
      }

      navigate('/activities');

    } catch (error) {
      console.error('Error adding activity:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add Activity</h1>

      <form onSubmit={handleSubmit} className='flex flex-col p-4'>
        <label>Activity Type:</label>
        <select
          name="activityType"
          value={newActivity.activityType}
          onChange={(e) => setNewActivity({ ...newActivity, activityType: e.target.value })}
          required
          className="border p-2 mb-2"
        >
          <option value="reminder">Reminder</option>
          <option value="appointment">Appointment</option>
        </select>

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newActivity.title}
          onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
          required
          className="border p-2 mb-2"
        />

        <label>Notes:</label>
        <textarea
          name="notes"
          value={newActivity.notes}
          onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
          className="border p-2 mb-2"
        />

        <label>Activity Time:</label>
        <input
          type="datetime-local"
          name="activityTime"
          value={newActivity.activityTime}
          onChange={(e) => setNewActivity({ ...newActivity, activityTime: e.target.value })}
          required
          className="border p-2 mb-4"
        />

        <button type="submit" className="bg-green-500 text-white p-2">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddReservation;

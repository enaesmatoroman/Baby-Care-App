import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [newBabyLog, setNewBabyLog] = useState({
    type: 'feeding',
    note: '',
    date: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add the new baby log

      const response = await fetch('http://localhost:3001/api/baby-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization token in the headers
        },
        body: JSON.stringify(newBabyLog),
      });

      if (!response.ok) {
        throw new Error('Failed to add the new baby log');
      }

      navigate('/baby-logs');

    } catch (error) {
      console.error('Error adding baby log:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add Baby Log</h1>

      <form onSubmit={handleSubmit} className='flex flex-col p-4'>
        <label>Log Type:</label>
        <select
          name="type"
          value={newBabyLog.type}
          onChange={(e) => setNewBabyLog({ ...newBabyLog, type: e.target.value })}
          required
          className="border p-2 mb-2"
        >
          <option value="feeding">Feeding</option>
          <option value="sleep">Sleep</option>
          <option value="symptom">Symptom</option>
        </select>

        <label>Note:</label>
        <textarea
          name="note"
          value={newBabyLog.note}
          onChange={(e) => setNewBabyLog({ ...newBabyLog, note: e.target.value })}
          required
          className="border p-2 mb-2"
        />

        <label>Date and Time:</label>
        <input
          type="datetime-local"
          name="date"
          value={newBabyLog.date}
          onChange={(e) => setNewBabyLog({ ...newBabyLog, date: e.target.value })}
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

export default AddBook;

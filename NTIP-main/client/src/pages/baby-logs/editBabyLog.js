import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();

  const [editedBabyLog, setEditedBabyLog] = useState({
    type: 'feeding',
    note: '',
    date: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the baby log data based on the ID
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/baby-logs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization token in the headers
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch baby log data');
        }

        const data = await response.json();
        setEditedBabyLog({
          ...data,
          date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
        });
      } catch (error) {
        console.error('Error fetching baby log data:', error.message);
      }
    };

    // Call the fetch data function
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the baby log
      const response = await fetch(`http://localhost:3001/api/baby-logs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authorization token in the headers
        },
        body: JSON.stringify(editedBabyLog),
      });

      if (!response.ok) {
        throw new Error('Failed to update the baby log');
      }

      navigate('/baby-logs');
    } catch (error) {
      console.error('Error updating baby log:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Edit Baby Log {id}</h1>

      <form onSubmit={handleSubmit} className='flex flex-col p-4'>
        <label>Log Type:</label>
        <select
          name="type"
          value={editedBabyLog.type}
          onChange={(e) => setEditedBabyLog({ ...editedBabyLog, type: e.target.value })}
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
          value={editedBabyLog.note}
          onChange={(e) => setEditedBabyLog({ ...editedBabyLog, note: e.target.value })}
          required
          className="border p-2 mb-2"
        />

        <label>Date and Time:</label>
        <input
          type="datetime-local"
          name="date"
          value={editedBabyLog.date}
          onChange={(e) => setEditedBabyLog({ ...editedBabyLog, date: e.target.value })}
          required
          className="border p-2 mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white p-2">
         Spremi
        </button>
      </form>
    </div>
  );
}

export default EditBook;

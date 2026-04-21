import React from 'react';
import {Link} from 'react-router-dom'

function Book ({ id, type, note, date, onDelete }) {
  return (
    <div className="flex flex-inline bg-gray-200 shadow-md p-4 mb-4 rounded-md">
      <div>
        <h2 className="text-xl font-bold mb-2 capitalize">{type}</h2>
        <p className="text-gray-600">{new Date(date).toLocaleString()}</p>
        <p className="mt-2">{note}</p>
      </div>
      <div className='flex w-full justify-end items-center'>
        <button className='bg-red-800 rounded-md mr-2 p-4' onClick={() => onDelete(id)}>Delete</button>
        <Link to={`/edit-baby-log/${id}`}  className='bg-blue-800 rounded-md mr-2 p-4'>
          Edit
        </Link>
      </div> 
    </div>
  );
};

export default Book;

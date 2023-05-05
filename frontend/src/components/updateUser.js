import React from 'react'
const host = "http://localhost:8000";
const updateUser = async (userId, userData) => {
    try {
      const response = await fetch(`${host}/api/auth/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };
  
  export default updateUser;
  

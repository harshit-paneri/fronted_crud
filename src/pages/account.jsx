// src/components/UserAccountList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserAccountList() {
  const [userAccounts, setUserAccounts] = useState([])

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/UserAccounts')
      setUserAccounts(response.data)
    } catch (error) {
      console.error('Error fetching user accounts:', error)
    }
  }



const handleDelete = async id => {
  try {
    // Make a DELETE request to delete the user account
    await axios.delete(`http://localhost:3001/UserAccount/${id}`)

    // Update the UI by removing the deleted user account
    setUserAccounts(prevUserAccounts =>
      prevUserAccounts.filter(user => user.id !== id)
    )
  } catch (error) {
    console.error('Error deleting user account:', error)
    // Display a user-friendly error message to the user
    alert('Failed to delete the user account. Please try again later.')
  }
}


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">User Accounts</h1>

      {/* User Account Table */}
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Headers */}
        {/* ... (same as before) */}

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {userAccounts.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {user.user_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {user.mob_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(user.id)} // Pass user.id to the handleDelete function
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserAccountList

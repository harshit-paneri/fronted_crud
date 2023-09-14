// src/components/UserAccountList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserAccountList() {
  const [userAccounts, setUserAccounts] = useState([])
  const [editingUserId, setEditingUserId] = useState(null)
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    mob_number: ''
  })

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

  const handleEdit = user => {
    setEditingUserId(user.id)
    setFormData({
      user_name: user.user_name,
      email: user.email,
      mob_number: user.mob_number
    })
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/useraccount/${editingUserId}`,
        formData
      )

      // Update the UI with the updated user account data
      setUserAccounts(prevUserAccounts =>
        prevUserAccounts.map(user =>
          user.id === editingUserId ? response.data : user
        )
      )

      // Clear the form and editing state
      setEditingUserId(null)
      setFormData({
        user_name: '',
        email: '',
        mob_number: ''
      })
    } catch (error) {
      console.error('Error updating user account:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">User Accounts</h1>

      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Headers */}
        {/* ... (same as before) */}

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {userAccounts.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={e =>
                      setFormData({ ...formData, user_name: e.target.value })
                    }
                  />
                ) : (
                  user.user_name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="mob_number"
                    value={formData.mob_number}
                    onChange={e =>
                      setFormData({ ...formData, mob_number: e.target.value })
                    }
                  />
                ) : (
                  user.mob_number
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user.id ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(user.id)}
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

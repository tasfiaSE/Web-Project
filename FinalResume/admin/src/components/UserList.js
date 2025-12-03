import React from "react";
import axios from "axios";

const UserList = ({ users }) => {
  const toggleUser = async (id, isActive) => {
    try {
      await axios.patch(`/api/admin/users/${id}`, { isActive: !isActive });
      window.location.reload(); // simple refresh
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Resumes</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.resumeCount}</td>
            <td>{user.isActive ? "Yes" : "No"}</td>
            <td>
              <button
                onClick={() => toggleUser(user._id, user.isActive)}
                className={user.isActive ? "btn-red" : "btn-blue"}
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;


import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchUser = () => {
  const [citizenshipNumber, setCitizenshipNumber] = useState("");
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showInputFields, setShowInputFields] = useState(false); // State to control showing input fields
  const [updatedUsers, setUpdatedUsers] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/search/${citizenshipNumber}`);
      setUserData(response.data);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError("User not found");
    }
  };

  const fetchVerifiedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/verified");
      const nonAdminUsers = response.data.filter((user) => user.admin == 0);
      setVerifiedUsers(nonAdminUsers);
      setError(null);
    } catch (error) {
      setError("Error fetching verified users");
    }
  };
  const handleUpdateUser = async () => {
    try {
      await Promise.all(
        Object.entries(updatedUsers).map(async ([userId, userInputs]) => {
          const foundUser = verifiedUsers.find((u) => u.id === parseInt(userId));
          if (foundUser) {
            await axios.put(`http://localhost:8000/users/update/${foundUser.citizenshipNumber}`, {
              name: userInputs.name || foundUser.name,
              email: userInputs.email || foundUser.email,
            });
          }
        })
      );
      await fetchVerifiedUsers();
      setUpdatedUsers({});
      setSelectedUsers([]);
      setShowInputFields(false);
    } catch (error) {
      console.error("Error updating users:", error);
      setError("Error updating users");
    }
  };

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);


  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      const updatedUsersCopy = { ...updatedUsers };
      delete updatedUsersCopy[userId];
      setUpdatedUsers(updatedUsersCopy);
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setUpdatedUsers({
        ...updatedUsers,
        [userId]: { name: "", email: "" },
      });
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelectedUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map(async (userId) => {
          const user = verifiedUsers.find((user) => user.id === userId);
          if (user) {
            await axios.delete(`http://localhost:8000/users/delete/${userId}`);
          }
        })
      );
      setSelectedUsers([]);
      await fetchVerifiedUsers();
    } catch (error) {
      console.log("Error deleting selected users:", error);
    }
  };
  const handleSelect = () => {
    setShowInputFields(true); // Show input fields for selected users
  };

  const renderInputFields = (user) => {
    if (selectedUsers.includes(user.id) && showInputFields) {
      const userInputs = updatedUsers[user.id] || { name: user.name, email: user.email };
  
      const handleNameChange = (e) => {
        setUpdatedUsers({
          ...updatedUsers,
          [user.id]: { ...userInputs, name: e.target.value },
        });
      };
  
      const handleEmailChange = (e) => {
        setUpdatedUsers({
          ...updatedUsers,
          [user.id]: { ...userInputs, email: e.target.value },
        });
      };
  
      return (
        <>
          <td>
            <input
              type="text"
              value={userInputs.name}
              onChange={handleNameChange}
              placeholder={user.name}
            />
          </td>
          <td>
            <input
              type="text"
              value={userInputs.email}
              onChange={handleEmailChange}
              placeholder={user.email}
            />
          </td>
          <td>{user.citizenshipNumber}</td>
        </>
      );
    } else {
      return (
        <>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.citizenshipNumber}</td>
        </>
      );
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSelectAll = () => {
    const allUserIds = verifiedUsers.map((user) => user.id);
    setSelectedUsers(allUserIds);
  };

  const tableStyle = {
    border: '2px solid black',
    borderRadius: '5px',
    padding: '5px 10px'
  };


  
  const totalNonAdminUsers = verifiedUsers.filter((user) => !user.isAdmin).length;
const indexOfLastUser = currentPage * itemsPerPage;
const indexOfFirstUser = indexOfLastUser - itemsPerPage;
const currentUsers = verifiedUsers
  .filter((user) => !user.isAdmin)
  .slice(indexOfFirstUser, Math.min(indexOfLastUser, totalNonAdminUsers));

  return (
    <div>
      <div>
        <input
          type="text"
          value={citizenshipNumber}
          onChange={(e) => setCitizenshipNumber(e.target.value)}
          placeholder="Enter citizenship number"
          style={{ margin: '13px', padding: '0px 7px', height: '33px', borderRadius: '10px', width: '196px' }}
        />
        <button onClick={handleSearch}>Search</button>
        {userData && (
          <div>
            <table style={tableStyle}>
              <tr>
                <td>{userData.name}</td>
                <td>{userData.email}</td>
                <td>{userData.citizenshipNumber}</td>
                <td>{userData.verified ? "Yes" : "No"}</td>
              </tr>
            </table>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>

      <h2>Verified Users</h2>
      {currentUsers.length === 0 ? (
        <p>No verified users found</p>
      ) : (
        <div>
          <div>
            <button onClick={handleUpdateUser}>Update</button>
            <button onClick={handleSelect}>Select</button>
            <button onClick={handleDeleteSelectedUsers}>Delete</button>
            <button onClick={handleSelectAll}>Select All</button>
          </div>
          <br />
          <table style={tableStyle}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Citizenship Number</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            {renderInputFields(user)}
            <td>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          <div>
            Items per page:{" "}
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div>
            {Array.from({ length: Math.ceil(verifiedUsers.length / itemsPerPage) }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchUser;

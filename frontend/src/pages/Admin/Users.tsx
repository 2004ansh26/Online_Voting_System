import React, { useEffect, useState } from "react";
import axios from "../../axios";

type User = {
  id: number;
  name: string;
  citizenshipNumber: string;
  email: string;
  checked:boolean;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("/users/all")
      .then((res) => setUsers(res.data.users))
      .catch((error) => console.log({ error }));
  }, []);

  const verifyUser = (id: number | string) => {
    axios
      .post("/users/verify", { userId: id })
      .then((res) => {
        console.log(res);
        removeUserFromList(id);
      })
      .catch((error) => console.log({ error }));
  };

  const deleteUser = (id: number | string) => {
    axios
      .delete(`/users/delete/${id}`)
      .then((res) => {
        console.log(res);
        removeUserFromList(id);
      })
      .catch((error) => console.log({ error }));
  };

  const removeUserFromList = (id: number | string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const verifyAllUsers = async () => {
    try {
      await Promise.all(
        users.map((user) => axios.post("/users/verify", { userId: user.id }))
      );
      // After verifying all users, fetch the updated user list
      fetchUsers();
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteAllUsers = async () => {
    try {
      await Promise.all(
        users.map((user) => axios.delete(`/users/delete/${user.id}`))
      );
      // After deleting all users, fetch the updated user list
      fetchUsers();
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchUsers = () => {
    axios
      .get("/users/all")
      .then((res) =>
        setUsers(
          res.data.users.map((user: User) => ({
            ...user,
            checked: false,
          }))
        )
      )
      .catch((error) => console.log({ error }));
  };
  if (users.length === 0) return <div></div>;
  
  const toggleUserCheckbox = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, checked: !user.checked } : user
      )
    );
  };

  const verifySelectedUsers = async () => {
    const selectedUserIds = users
      .filter((user) => user.checked)
      .map((user) => user.id);
    try {
      await Promise.all(
        selectedUserIds.map((userId) =>
          axios.post("/users/verify", { userId })
        )
      );
      fetchUsers();
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteSelectedUsers = async () => {
    const selectedUserIds = users
      .filter((user) => user.checked)
      .map((user) => user.id);
    try {
      await Promise.all(
        selectedUserIds.map((userId) =>
          axios.delete(`/users/delete/${userId}`)
        )
      );
      fetchUsers();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="users-wrapper">
      {users.map((user, index) => (
        <div key={index} className="user-wrapper">
           <input
            type="checkbox"
            checked={user.checked}
            onChange={() => toggleUserCheckbox(user.id)}
          />
          {user.name} || {user.citizenshipNumber}
          
          <div>
            <button
              onClick={() => verifyUser(user.id)}
              className="button-primary"
            >
              verify
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="button-black"
            >
              delete
            </button>
          </div>
        </div>
      ))}
      <button onClick={verifyAllUsers} className="button-primary">
        Verify All Users
      </button>
      <button onClick={deleteAllUsers} className="button-black">
        Delete All Users
      </button>
      <br/>
      <br/>
        <button
          onClick={() => verifySelectedUsers()}
          className="button-primary"
        >
          Verify Selected Users
        </button>
        <button
          onClick={() => deleteSelectedUsers()}
          className="button-black"
        >
          Delete Selected Users
        </button>
      
    </div>
  );
};

export default Users;

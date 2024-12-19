import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("No access token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (
          response.data &&
          response.data.results &&
          Array.isArray(response.data.results)
        ) {
          setUsers(response.data.results);
        } else {
          setError("Invalid response structure.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <Link to={`/profile/${user.id}`}>
                {user.username || "Unnamed User"}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;

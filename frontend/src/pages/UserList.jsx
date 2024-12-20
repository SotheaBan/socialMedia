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

        console.log("User List Response data:", response.data);

        if (
          response.data &&
          response.data.results &&
          Array.isArray(response.data.results)
        ) {
          const usersWithDetails = await Promise.all(
            response.data.results.map(async (user) => {
              const userDetailsResponse = await axios.get(
                `http://127.0.0.1:8000/api/users/${user.id}/`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              return userDetailsResponse.data.data; // Return full user details
            })
          );
          setUsers(usersWithDetails); // Set the detailed users list
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
    return (
      <div className="flex justify-center items-center py-6">
        <p className="text-lg text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        User List
      </h1>
      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No users found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600"
                  src={
                    user.profile_picture
                      ? `http://127.0.0.1:8000${user.profile_picture}`
                      : "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                  }
                  alt={user.username || "User Avatar"}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                <Link
                  to={`/profile/${user.id}`}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {user.username || "Unnamed User"}
                </Link>
              </h3>
              <div className="text-center text-gray-600 text-sm">
                <p>{user.bio || "No bio available."}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;

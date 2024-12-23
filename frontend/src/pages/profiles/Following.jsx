import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Following = () => {
  const { userId } = useParams();
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      if (!accessToken) {
        setError("You are not authorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/`, // Endpoint to fetch user data
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setFollowingList(response.data.following || []);
      } catch (err) {
        setError("Failed to load following. Please try again.");
        console.error("Error fetching following:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">
        Following
      </h2>
      <ul className="space-y-5">
        {followingList.length > 0 ? (
          followingList.map((followedUser, index) => (
            <li
              key={index}
              className="flex items-center p-5 bg-gray-50 rounded-xl shadow-md hover:bg-blue-50 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <span className="text-xl text-gray-800 font-medium">
                {followedUser}
              </span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">Not following anyone yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Following;

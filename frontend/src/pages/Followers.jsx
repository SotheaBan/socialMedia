import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Followers = () => {
  const { userId } = useParams();
  console.log("userId from useParams:", userId);

  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You are not authorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("User Profile Data: ", response.data);

        setFollowersList(response.data.followers || []); //
      } catch (err) {
        setError("Failed to load followers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">
        Followers
      </h2>
      <ul className="space-y-5">
        {followersList.length > 0 ? (
          followersList.map((follower, index) => (
            <li
              key={index}
              className="flex items-center p-5 bg-gray-50 rounded-xl shadow-md hover:bg-blue-50 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <span className="text-xl text-gray-800 font-medium">
                {follower}
              </span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No followers found.</p>
        )}
      </ul>
    </div>
  );
};

export default Followers;

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
              Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
            },
          }
        );

        setFollowingList(response.data.following); // Assuming the response has a `following` field
      } catch (err) {
        setError("Failed to load following. Please try again.");
        console.error("Error fetching following:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="following-page">
      <h2>Following</h2>
      <ul>
        {followingList.length > 0 ? (
          followingList.map((followedUser, index) => (
            <li key={index}>{followedUser}</li>
          ))
        ) : (
          <p>Not following anyone yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Following;

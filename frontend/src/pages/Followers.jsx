import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Followers = () => {
  const { userId } = useParams();
  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      const accessToken = localStorage.getItem("accessToken"); // Get the token from localStorage or another place

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
              Authorization: `Bearer ${accessToken}`, // Pass the token in the Authorization header
            },
          }
        );
        setFollowersList(response.data.followers); // Assuming the API returns an object with a "followers" property
      } catch (err) {
        setError("Failed to load followers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="followers-page">
      <h2>Followers</h2>
      <ul>
        {followersList.length > 0 ? (
          followersList.map((follower, index) => (
            <li key={index}>{follower}</li>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </ul>
    </div>
  );
};

export default Followers;

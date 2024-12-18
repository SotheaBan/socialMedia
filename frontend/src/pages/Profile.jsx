import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("No access token found. Please log in again.");
        return;
      }

      try {
        // Check token format before decoding
        if (!accessToken.includes(".")) {
          throw new Error("Invalid token format");
        }

        // Decode the JWT to extract the user ID
        const decodedToken = jwtDecode(accessToken);
        console.log("Decoded Token:", decodedToken);

        // Check for token expiration
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          setError("Session expired. Please log in again.");
          return;
        }

        const userId = decodedToken.user_id || decodedToken.id;

        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setUserProfile(response.data.data);
        } else {
          setError("Failed to fetch user profile.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        if (err.response && err.response.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to fetch user profile.");
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userProfile ? (
        <div>
          <p>
            <strong>Username:</strong> {userProfile.username}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Bio:</strong> {userProfile.bio}
          </p>
          <p>
            <strong>Profile Picture:</strong>
            {userProfile.profile_picture ? (
              <img
                src={`http://127.0.0.1:8000${userProfile.profile_picture}`}
                alt="Profile"
                style={{ width: 150, height: 150 }}
              />
            ) : (
              "No profile picture"
            )}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null); // State for profile pic preview
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get access token and decode it
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const currentUserId = decodedToken ? decodedToken.user_id : null;

  // Fetch user profile data
  useEffect(() => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data && response.data.data) {
          const userData = response.data.data;
          setUser(userData);
          setUsername(userData.username || "");
          setEmail(userData.email || "");
          setBio(userData.bio || "");
          // If there's a profile picture, set the preview URL
          if (userData.profile_picture) {
            setProfilePicPreview(
              `http://127.0.0.1:8000${userData.profile_picture}`
            );
          }
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, accessToken]);

  // Handle saving the updated profile
  const handleSave = async () => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);

    if (profilePic) {
      formData.append("profile_picture", profilePic);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${userId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        navigate(`/profile/${userId}`); // Navigate back to the user's profile page
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle loading and error states
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  // Ensure user is editing their own profile
  if (currentUserId !== userId) {
    return (
      <p className="text-center text-red-600">
        You are not authorized to edit this profile.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Edit Profile
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-lg font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-lg font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label
            htmlFor="profilePic"
            className="block text-lg font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            {/* Display image preview */}
            {profilePicPreview && (
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
            )}
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setProfilePic(e.target.files[0]);
                setProfilePicPreview(URL.createObjectURL(e.target.files[0])); // Set preview image
              }}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

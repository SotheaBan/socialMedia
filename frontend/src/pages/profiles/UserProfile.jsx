import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../home/components/side_bar";
import Navbar from "../home/components/navbar";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [userPostd, setUserPosts] = useState([]);

  const navigate = useNavigate();


  

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const currentUserId = decodedToken ? decodedToken.user_id : null;
 

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(response.data)


        
        if (response.data && response.data.data) {
          const fetchedUser = response.data.data;
          setUser(fetchedUser);

          setFollowersList(response.data.followers);
          setFollowingList(response.data.following);

          // Check if the current user is following the fetched user
          const followers = Array.isArray(fetchedUser.followers)
            ? fetchedUser.followers
            : [];
          const isFollowingUser = followers.includes(currentUserId);

          // Retrieve the persisted state from localStorage
          const persistedIsFollowing = JSON.parse(
            localStorage.getItem(`isFollowing_${userId}`)
          );

          setIsFollowing(
            persistedIsFollowing !== null
              ? persistedIsFollowing
              : isFollowingUser
          );
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, accessToken, currentUserId]);

  const handleFollowToggle = async () => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    const url = `http://127.0.0.1:8000/api/users/${userId}/follow/`;
    const method = isFollowing ? "PUT" : "POST";

    try {
      setIsFollowing((prevState) => !prevState);

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status === "success") {
        setUser((prevUser) => ({
          ...prevUser,
          followers_count: response.data.data.followers_count,
          following_count: response.data.data.following_count,
        }));

        // Persist the new following state in localStorage
        localStorage.setItem(
          `isFollowing_${userId}`,
          JSON.stringify(!isFollowing)
        );

        setIsFollowing(!isFollowing);
      } else {
        setError(response.data.message || "Something went wrong.");
        setIsFollowing(isFollowing);
      }
    } catch (err) {
      console.error("Error during follow/unfollow request:", err);
      setIsFollowing(isFollowing);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`);
  };

  // Handle navigation when clicking on followers or following count
  const handleNavigateToFollowers = () => {
    navigate(`/profile/${userId}/followers`);
  };

  const handleNavigateToFollowing = () => {
    navigate(`/profile/${userId}/following`);
  };

  if (loading) {
    return <p className="text-center py-4 text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-600">{error}</p>;
  }

 


  return (<div className="bg-gray-100 min-h-screen ">
     <Navbar />
    <div className="grid grid-cols-7 h-screen overflow-hidden">
                <div className="md:bg-[#490057] h-full overflow-hidden">
                    <Sidebar />
                </div>
                <div className="col-span-7 h-screen  md:col-span-5 overflow-y-scroll mb-28">
                <div className="container mx-auto px-6 md:px-12">
        <header className="flex flex-col items-center md:flex-row md:justify-between mb-8">
          <div className="w-40 h-40 mb-6 md:mb-0">
            <img
              className="w-full h-full object-cover rounded-full border-4 border-pink-600"
              src={
                user?.profile_picture
                  ? `http://127.0.0.1:8000${user.profile_picture}`
                  : "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
              }
              alt="profile"
            />
            <div className="font-bold mt-2 text-center">{user.username}</div>
          </div>

          <div className="md:w-2/3 ml-0 md:ml-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-6">
              <h2 className="text-3xl font-semibold text-center md:text-left">
                {user?.username || "Unnamed User"}
              </h2>

              {currentUserId === user.id ? (
                <button
                  onClick={handleEditProfile}
                  className="mt-4 md:mt-0 bg-indigo-600 px-4 py-2 text-white font-semibold rounded-full"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  className={`${
                    isFollowing ? "bg-red-500" : "bg-blue-500"
                  } mt-4 md:mt-0 px-4 py-2 text-white font-semibold rounded-full`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between text-lg text-gray-700 mb-4">
              <div className="mb-4 sm:mb-0">
                <strong>{user?.posts_count || 0}</strong> posts
              </div>
              <div className="mb-4 sm:mb-0">
                <strong
                  onClick={handleNavigateToFollowers}
                  className="cursor-pointer"
                >
                  {user?.followers_count || 0} followers
                </strong>{" "}
              </div>
              <div>
                <strong
                  onClick={handleNavigateToFollowing}
                  className="cursor-pointer"
                >
                  {user?.following_count || 0} following
                </strong>{" "}
              </div>
            </div>

            <div>
              <p>{user?.bio || "Bio information not available"}</p>
            </div>
          </div>
        </header>
      </div>
      <div>
                </div> 
               
      
      <div className="w-full">
              <div className="grid grid-cols-2 ">
                <div className=" col-span-1 h-24">
                  <div className="w-full flex items-center justify-center mt-8">
                        <a
                          href=""
                          className="relative group hover:bg-slate-100 shadow-lg hover:text-black transition p-4 rounded"
                        >
                          <i className="fa-solid fa-table-cells text-2xl lg:text-4xl"></i>
                          <i
                            className="fa-solid fa-minus  absolute top-full left-1/2 mt-2 -translate-x-1/2 text-black text-xl scale-0 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                          ></i>
                        </a>

                  </div>
                </div>
                <div className=" col-span-1 h-24">
                  <div className="w-full flex items-center justify-center mt-8">
                        <a
                          href=""
                          className="relative group hover:bg-slate-100 shadow-lg hover:text-black transition p-4 rounded"
                        >
                          <i className="fa-solid fa-user text-2xl lg:text-4xl"></i>
                          <i
                            className="fa-solid fa-minus  absolute top-full left-1/2 mt-2 -translate-x-1/2 text-black text-xl scale-0 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                          ></i>
                        </a>
                  </div>
                </div>
              </div>
      </div>
     
      <hr className="border-black mt-6"/>

      <div class="grid mt-3 grid-cols-2 md:grid-cols-3 gap-4">
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""/>
    </div>
    </div>
    </div>
    </div>
    </div>

      );
};

export default UserProfile;

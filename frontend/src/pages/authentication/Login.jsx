import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  // Function to get the stored tokens
  const getTokens = () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  };

  // Function to handle login
  const loginUser = async (email, password) => {
    setLoading(true); // Start loading state
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email,
        password,
      });

      // Log the response to verify the data structure
      console.log("Login response data:", response.data);

      // Ensure response.data has access_token and refresh_token
      if (
        response.data &&
        response.data.data.access_token &&
        response.data.data.refresh_token
      ) {
        // Store the tokens in localStorage
        localStorage.setItem("accessToken", response.data.data.access_token);
        localStorage.setItem("refreshToken", response.data.data.refresh_token);
        console.log(
          "Access token stored in localStorage:",
          response.data.data.access_token
        );

        // Redirect to the profile page after successful login
        navigate("/profile");
      } else {
        setError("No access token or refresh token received.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const { refreshToken } = getTokens();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post("http://127.0.0.1:8000/api/refresh/", {
        refresh_token: refreshToken,
      });

      // Store the new access token in localStorage
      if (response.data && response.data.data.access_token) {
        localStorage.setItem("accessToken", response.data.data.access_token);
        console.log(
          "New access token stored:",
          response.data.data.access_token
        );
        return response.data.data.access_token; // Return new access token
      } else {
        throw new Error("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure, e.g., redirect to login page
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  // Function to handle the form submission (login)
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://mystickermania.com/cdn/stickers/k-pop/bt21-chimmy-welcomes-512x512.png"
              alt="logo"
            />
            Social Media
          </a>
          <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email or Phone Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Logging in..." : "Sign in"}
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/Register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

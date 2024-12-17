import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostPage() {
  const [title, setTitle] = useState(''); // Store title
  const [file, setFile] = useState(null); // Store the file
  const [author,setAuthor] = useState(1)

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert('Caption are required!');
      return;
    }
    if (!file){
        alert('Image are required!');
      return;
    }

    const formData = new FormData();
    formData.append('content', title);
    formData.append('image', file);
    formData.append('author',author)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/post/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('It Posted');
        window.location.href = '/'; 
      } else {
        alert('Failed to create post!');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      alert('An error occurred!');
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center justify-center w-min min-h-[300px] space-y-4">
        <input
          type="text"
          id="title"
          placeholder="Enter title here"
          className="w-full sm:w-96 p-2 border-2 border-gray-300 rounded-lg text-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={handleTitleChange}
        />

        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full min-h-[200px] sm:min-h-[250px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleSubmit}
        >
          <a href="/home">Post</a>
        </button>
      </div>
    </div>
  );
}

export default PostPage;

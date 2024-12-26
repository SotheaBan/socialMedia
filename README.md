# Advanced Social Media Platform

## Overview
The Advanced Social Media Platform is a scalable and modular application designed to provide a robust set of features for social media interactions. The app combines a backend powered by Django REST Framework and a frontend built with React.js to deliver a seamless user experience.

---

## Tech Stack

### Backend
- Django REST Framework
- PostgreSQL (or preferred relational database)
- JWT Authentication

### Frontend
- React.js
- Axios for API calls
- Tailwind CSS (or preferred styling framework)
- Firebase

### Deployment
- Docker (for containerization)
- Vercel
---

## Features

### Authentication
- User registration, login, and logout functionality.
- Secure authentication using JWT tokens.

### User Profiles
- Sign-up and log in.
- View user profiles with details such as profile picture, bio, followers, and following.
- Follow and unfollow users.
- Edit profile details.

### Posts
- Create, edit, delete, and view posts.
- Support for text content and image uploads.

### Comments
- Add, edit, and delete comments on posts.

### Likes and Reactions
- React to posts with likes or other reactions (e.g., Love, Wow).

### Sharing
- Share posts to a personal feed.

### Feeds
- Display posts from followed users, ordered by time or popularity.

### Notifications
- Notify users of likes, comments, and follows.
- "Mark as read" functionality for notifications.

### Search
- Search for users and posts using a query.
- Autocomplete suggestions for users and posts.

---

## Frontend Features

### Authentication Pages
- Login, register, and logout functionality.

### Feed Page
- Infinite scrolling for posts from followed users.
- Like, share, and comment directly on posts.

### Profile Page
- Display user info and posts.
- Edit profile details and follow/unfollow functionality.

### Notifications Page
- Display a list of user notifications with "mark as read" functionality.

### Post Creation
- Upload images, write text, and post.

### Search Bar
- Autocomplete suggestions for users and posts.

---

## Development Plan

### Backend Development
- Build and test APIs using Django REST Framework.
- Implement JWT or Token-based authentication.

### Frontend Development
- Create React components for each feature.
- Use Axios for API integration.

### Collaborative Tools
- GitHub for version control.
- Trello or Jira for project management.

---

## Goals
- Build a scalable and modular codebase.
- Ensure a responsive UI/UX design.
- Learn and practice full-stack development with Django and React.js.

---

## Links
- **Figma Design**: [Profile Page Design](https://www.figma.com/design/wsi1Gd34O8lWwNetOuZUH6/Profile-page-(Community)?node-id=0-1&node-type=canvas&t=cY7dIyAh0vS4SSPx-0)
- **GitHub Repository**: [socialMedia](https://github.com/SotheaBan/socialMedia.git)

---

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/SotheaBan/socialMedia.git
   cd socialMedia/backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd socialMedia/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License.

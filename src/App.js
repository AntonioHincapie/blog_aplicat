import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import NavBar from './components/Common/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Common/Home';
import CreatePost from './components/Post/CreatePost';
import Profile from './components/Common/Profile';
import Post from './components/Post/Post';
import MyPost from './components/Post/MyPosts';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const CheckAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  return (
    <Router>
      {isAuth && <NavBar />}
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="*"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-posts/:id"
          element={
            isAuth && (
              <MyPost id={`${window.location.pathname.split('/').pop()}`} />
            )
          }
        />
        <Route path="/create-post" element={isAuth && <CreatePost />} />
        <Route path="/profile" element={isAuth && <Profile />} />
        <Route
          path="/post/:id"
          element={
            isAuth && (
              <Post id={`${window.location.pathname.split('/').pop()}`} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

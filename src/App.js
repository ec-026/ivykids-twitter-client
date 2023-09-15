import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import UserProfile from './pages/UserProfile';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
        <MenuBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/users/:username" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
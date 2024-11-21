import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import axios from "axios";
import BananaBash from "./Components/BananaBash";
import Leaderboard from "./Components/Leaderboard";
import Instructions from "./Components/Instructions";
import ThankYouPage from "./Components/ThankYouPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/user', { withCredentials: true })
      .then(response => {
        if (response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signup" />} 
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/bananabash" element={<BananaBash />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserData } from './components/userData';
import { useState } from 'react';
import Admin from './Admin/Admin';
import Homepage from './components/homepage';


function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<UserData />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

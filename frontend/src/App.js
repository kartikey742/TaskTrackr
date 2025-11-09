import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard setSearch={setSearch} search={search} /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;

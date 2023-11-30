import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
       <Typography variant="h6">Personal Trainer App</Typography>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/customer"}>Customer</Link>
        <Link to={"/training"}>Training</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App

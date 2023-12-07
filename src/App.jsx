import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <Typography variant="h6">Personal Trainer App</Typography>
      <nav>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/customer" color="inherit">Customer</Button>
        <Button component={Link} to="/training" color="inherit">Training</Button>
        <Button component={Link} to="/calendar" color="inherit">Calendar</Button>
        <Button component={Link} to="/statistic" color="inherit">Statistics</Button>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

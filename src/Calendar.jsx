import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CalendarPage from "./components/CalendarPage"

export default function Calendar() {
    return (
        <Container maxWidth="xl">
          <AppBar position='static'>
            <Toolbar>
              <Typography variant="h6">Training Calendar</Typography>
            </Toolbar>
          </AppBar>
          <CalendarPage />
        </Container>
      )
  }
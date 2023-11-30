import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TraningList from "./components/TraningList"

export default function Training() {
    return (
        <Container maxWidth="xl">
          <AppBar position='static'>
            <Toolbar>
              <Typography variant="h6">Here is a list of the excersises</Typography>
            </Toolbar>
          </AppBar>
          <TraningList />
        </Container>
      )
  }
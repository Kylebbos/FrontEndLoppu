import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomerList from "./components/CustomerList"

export default function Customer() {
  return (
    <Container maxWidth="xl">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">Here is a list of the customers</Typography>
        </Toolbar>
      </AppBar>
      <CustomerList />
    </Container>
  );
}

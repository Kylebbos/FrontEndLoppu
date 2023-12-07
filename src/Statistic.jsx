import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import StatisticPage from "./components/StatisticPage"

export default function Statistic() {
    return (
        <Container maxWidth="xl">
          <AppBar position='static'>
            <Toolbar>
              <Typography variant="h6">Training Statistics</Typography>
            </Toolbar>
          </AppBar>
          <StatisticPage />
        </Container>
      )
  }
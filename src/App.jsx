import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';


export default function App() {
  const [value, setValue] = React.useState("customers");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box flex={1}>
            <Typography variant="h6" align="center">
              Personal Trainer
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value="customers" label="Customers" />
        <Tab value="trainings" label="Trainings" />
      </Tabs>
      {value === "customers" && <CustomerList />}
      {value === "trainings" && <TrainingList />}
    </Container>
  )
}
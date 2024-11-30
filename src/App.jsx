import * as React from 'react';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar'

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
        <Tab value="calendar" label="Calendar" />
      </Tabs>
      {value === "customers" && <CustomerList />}
      {value === "trainings" && <TrainingList />}
      {value === "calendar" && <Calendar />}
    </Container>
  )
}
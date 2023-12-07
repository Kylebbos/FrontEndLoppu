import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining({ fetchTrainings }) {

  const [allCustomers, setAllCustomers] = useState([])

  const [open, setOpen] = useState(false);

  const [training, setTrainings] = useState({
    date: new Date(),
    duration: '',
    activity: '',
    customerReference: ''
  });

  const [customerName, setCustomerName] = useState({name:''})

  const handleClickOpen = () => {
    setOpen(true);
    customerResponse()
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newDate) => {
    setTrainings(prevTraining => ({
      ...prevTraining,
      date: newDate || new Date()
    }));
  };

  const handleCustomerNameChange = () => {
    console.log(allCustomers)
    const foundCustomer = allCustomers.find(customer => customer.firstname === customerName.name);
    return foundCustomer.id;
  };

  const customerResponse = () => {
    fetch("http://traineeapp.azurewebsites.net/getcustomers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error in fetch:", response.status, response.statusText);
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        const modifiedData = data.map((item) => ({
          ...item,
        }));
        setAllCustomers(modifiedData);
      })
      .catch((err) => console.error(err));
  };
  const saveTraining = () => {
    const customerId = handleCustomerNameChange();
  
    fetch(`http://traineeapp.azurewebsites.net/api/customers/${customerId}`)
      .then(response => response.json())
      .then(customerData => {
        const updatedTraining = { 
          ...training, 
          customerReference: customerData
        };
  
        setTrainings(updatedTraining);
      })
      .catch((err) => {
        console.error(err);
        handleClose();
      });
  };
  useEffect(()=>{
    if(training.customerReference){
      postTraining(training);
    }
  },[training])
  const postTraining = (updatedTraining) => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTraining),
    })
    .then((response) => {
      if (!response.ok) throw new Error('Error when adding a training: ' + response.statusText);
      fetchTrainings();
    })
    .catch((err) => console.error(err));

    console.log(training)

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              value={training.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} variant="standard" margin="dense" fullWidth />}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Duration in minutes"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={(e) => setTrainings({ ...training, duration: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={(e) => setTrainings({ ...training, activity: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Customer name"
            fullWidth
            variant="standard"
            value={customerName.name}
            onChange={(e) => setCustomerName({ name: e.target.value })}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

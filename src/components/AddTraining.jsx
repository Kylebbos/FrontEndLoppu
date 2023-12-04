import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining({ fetchTrainings, fetchCustomers }) {
  const [training, setTrainings] = React.useState({
    date: null,
    duration: '',
    activity: '',
    customerReference: ''
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setTrainings({ ...training, date });
  };

  const saveTraining = () => {
    console.log(training)
    fetch('http://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error('Error when adding a training: ' + response.statusText);
        fetchTrainings();
      })
      .catch((err) => console.error(err));

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
            label="TÄHÄN TULEE CUSTOMER REFERENCE JOLLAIN MENULLA"
            fullWidth
            variant="standard"
            value={training.customerReference}
            onChange={(e) => setTrainings({ ...training, customerReference: e.target.value })}
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

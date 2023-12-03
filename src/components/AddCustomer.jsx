import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function addCustomer({ fetchCustomers }) {
  const [customer, setCustomers] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(customer) 
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding customer: "  + response.statusText);

      fetchCustomers();
    })
    .catch(err => console.error(err));

    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={e => setCustomers({...customer, firstname: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Lastname"
            fullWidth
            variant="standard"
            value={customer.lastnamename}
            onChange={e => setCustomers({...customer, lastname: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Streetaddress"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={e => setCustomers({...customer, streetaddress: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={e => setCustomers({...customer, postcode: e.target.value})}
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={e => setCustomers({...customer, city: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={e => setCustomers({...customer, email: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={e => setCustomers({...customer, phone: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
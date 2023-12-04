import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from './CustomerDialog';

export default function EditCustomer({ fetchCustomers, data }) {
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
    setCustomers({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone
    });
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    const customerUrl = data.links[0]["href"];
    fetch(customerUrl, {
      method: 'PUT',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(customer) 
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when editing a customer: "  + response.statusText);

      fetchCustomers();
    })
    .catch(err => console.error(err));

    handleClose();
  }

  const handleChange = (e) => {
    setCustomers({...customer, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
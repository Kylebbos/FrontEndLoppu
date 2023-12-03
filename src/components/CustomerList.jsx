import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";


function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    { field: "id", hide: true },
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      cellRenderer: params => <EditCustomer fetchCustomers={fetchCustomers} data={params.data} />,
      width: 120
    },
    {
      cellRenderer: params => (
        <Button size="small" onClick={() => deleteCustomer(params)}>
          Delete
        </Button>
      ),
      width: 120
    }
  ]);
  
  
  const fetchCustomers = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error in fetch:", response.status, response.statusText);
          throw new Error("Failed to fetch");
        }
      })
      .then(data => {
        const embeddedCustomers = data.content;
        if (embeddedCustomers) {
          setCustomers(embeddedCustomers);
        } else {
          console.error("API response does not contain customer data as expected.");
        }
      })
      .catch(err => console.error(err));
  };

  const deleteCustomer = (params) => {
    console.log("Delete button clicked");
    console.log("Params:", params);
  
    if (window.confirm("Are you sure?")) {
      // Extract the customer ID
      const customerId = params.data?.id || params.node?.data?.id;
  
      if (customerId) {
        const customerUrl = `http://traineeapp.azurewebsites.net/api/customers/${customerId}`;
  
        fetch(customerUrl, { method: 'DELETE' })
          .then(response => {
            if (response.ok)
              fetchCustomers();
            else
              throw new Error("Error in DELETE: " + response.statusText);
          })
          .catch(err => console.error(err));
      } else {
        console.error("Unable to find customer ID in params.data");
      }
    }
  };
     
  
  return (
    <>
    <AddCustomer fetchCustomers={fetchCustomers} />
      <div className="ag-theme-material" style={{ width: '100%', height: 600 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default CustomerList;
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

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
 
    if (window.confirm("Are you sure?")) {

      const customerUrl = params.data?.links[0]["href"] || params.node?.data?.links[0]["href"];
  
      fetch(customerUrl, { method: 'DELETE' })
        .then(response => {
          if (response.ok)
            fetchCustomers();
          else
            throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch(err => console.error(err));
    }
  };

  const exportToCSV = () => {
    const csvContent = customers.map(customer =>
      Object.values(customer).join(',')
    );
  
    const csvString = [
      Object.keys(customers[0]).join(','),
      ...csvContent
    ].join('\n');
  
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'customers.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
     
  
  return (
    <>
    <AddCustomer fetchCustomers={fetchCustomers} />
    <Button variant="contained" color="primary" size="small" onClick={exportToCSV}>
        Export to CSV
      </Button>
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
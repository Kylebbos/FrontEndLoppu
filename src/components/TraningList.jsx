import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    { field: "customer.firstname", headerName: "Customer Name", sortable: true, filter: true },
  ]);

  const fetchTrainings = () => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings?_expand=customer')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error in fetch:", response.status, response.statusText);
          throw new Error("Failed to fetch");
        }
      })
      .then(data => {
        const embeddedTrainings = data.content;
        if (embeddedTrainings) {
          setTrainings(embeddedTrainings);
        } else {
          console.error("API response does not contain training data as expected.");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className="ag-theme-material" style={{ width: '100%', height: 600 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Training;

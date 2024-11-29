import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = () => {
            fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
                .then(response => response.json())
                .then(data => setCustomers(data._embedded.customers))
        }
        fetchCustomers();
    }, []);

    const [columnDefs] = useState([
        { field: 'firstname', headerName: 'First Name', filter: true, flex: 1 },
        { field: 'lastname', headerName: 'Last Name', filter: true, flex: 1 },
        { field: 'streetaddress', headerName: 'Street Address', filter: true, flex: 1 },
        { field: 'postcode', headerName: 'Post Code', filter: true, flex: 1 },
        { field: 'city', headerName: 'City', filter: true, flex: 1 },
        { field: 'email', headerName: 'Email', filter: true, flex: 1 },
        { field: 'phone', headerName: 'Phone', filter: true, flex: 1 }
    ]);

    return (
        <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
    )
}
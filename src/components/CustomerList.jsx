import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Stack, Button, Snackbar } from '@mui/material';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import AddTraining from './AddTraining'
import CSV from './CSV'

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [snackbarAdd, setSnackbarAdd] = useState(false);
    const [snackbarDelete, setSnackbarDelete] = useState(false);
    const [snackbarEdit, setSnackbarEdit] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
    }

    const saveCustomer = (customer) => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(fetchCustomers())
            .then(() => {
                setSnackbarAdd(true);
            })
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchCustomers())
            .then(() => {
                setSnackbarEdit(true);
            })
    }

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: "DELETE" })
                .then(response => fetchCustomers())
                .then(() => {
                    setSnackbarDelete(true);
                })
        }
    }

    const saveTraining = (training) => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training),
        })
            .then(() => {
                setSnackbarAdd(true);
            })
    };

    const [columnDefs] = useState([
        { field: 'firstname', headerName: 'First Name', filter: true, flex: 1 },
        { field: 'lastname', headerName: 'Last Name', filter: true, flex: 1 },
        { field: 'streetaddress', headerName: 'Street Address', filter: true, flex: 1 },
        { field: 'postcode', headerName: 'Post Code', filter: true, flex: 1 },
        { field: 'city', headerName: 'City', filter: true, flex: 1 },
        { field: 'email', headerName: 'Email', filter: true, flex: 1 },
        { field: 'phone', headerName: 'Phone', filter: true, flex: 1 },
        {
            cellRenderer: params => (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', gap: '10px' }}>
                    <AddTraining data={params.data} saveTraining={saveTraining} />
                    <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
                    <Button variant="outlined" size="small" color="error" onClick={() => deleteCustomer(params.data._links.customer.href)}>Delete</Button>
                </div>
            ),
            headerName: 'Actions',
            width: 300,
            sortable: false,
            filter: false
        }
    ]);

    return (
        <>
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                <AddCustomer saveCustomer={saveCustomer} />
            </Stack>
            <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
            <Stack direction="row" justifyContent="center">
                <Button variant="outlined" size="small">
                    <CSV customers={customers} />
                </Button>
            </Stack>
            <Snackbar
                open={snackbarAdd}
                autoHideDuration={2500}
                onClose={() => setSnackbarAdd(false)}
                message="Added succesfully"
            />
            <Snackbar
                open={snackbarDelete}
                autoHideDuration={2500}
                onClose={() => setSnackbarDelete(false)}
                message="Deleted succesfully"
            />
            <Snackbar
                open={snackbarEdit}
                autoHideDuration={2500}
                onClose={() => setSnackbarEdit(false)}
                message="Edited succesfully"
            />
        </>
    )
}
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from '@mui/material';
import dayjs from "dayjs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [snackbarDelete, setSnackbarDelete] = useState(false);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = async () => {
        const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings");
        const data = await response.json();

        const trainingsData = await Promise.all(
            data._embedded.trainings.map(async (training) => {
                if (training._links.customer) {
                    const responseCustomer = await fetch(training._links.customer.href);
                    const customerData = await responseCustomer.json();
                    return {
                        ...training,
                        id: training._links.self.href.split('/').pop(),
                        customerName: `${customerData.firstname} ${customerData.lastname}`,
                    };
                }
            })
        );
        setTrainings(trainingsData);
    };

    const deleteTraining = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
                method: 'DELETE',
            });
            fetchTrainings()
                .then(() => {
                    setSnackbarDelete(true);
                })
        }
    };

    const [columnDefs] = useState([
        { field: 'activity', headerName: 'Activity', filter: true, flex: 1 },
        { field: 'date', headerName: 'Date', filter: true, flex: 1, valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH.mm") },
        { field: 'duration', headerName: 'Duration', filter: true, flex: 1, valueFormatter: params => `${params.value} min` },
        { field: 'customerName', headerName: 'Customer', filter: true, flex: 1 },
        {
            cellRenderer: params => (
                <Button variant="outlined" size="small" color="error" onClick={() => deleteTraining(params.data.id)}>Delete</Button>
            ),
            headerName: 'Actions',
            sortable: false,
            filter: false
        }
    ]);

    return (
        <>
            <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    enableCellTextSelection={true}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={snackbarDelete}
                autoHideDuration={2500}
                onClose={() => setSnackbarDelete(false)}
                message="Deleted succesfully"
            />
        </>
    )
}
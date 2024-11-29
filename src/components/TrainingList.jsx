import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
                const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings");
                const data = await response.json();

                const trainingsData = await Promise.all(
                    data._embedded.trainings.map(async (training) => {
                        if (training._links.customer) {
                            const responseCustomer = await fetch(training._links.customer.href);
                            const dataCustomer = await responseCustomer.json();
                            return {
                                ...training, customerName: `${dataCustomer.firstname} ${dataCustomer.lastname}`,
                            };
                        }
                    })
                );
                setTrainings(trainingsData);
        };
        fetchTrainings();
    }, []);

    const [columnDefs] = useState([
        { field: 'date', headerName: 'Date', filter: true, flex: 1, valueFormatter: formatDate },
        { field: 'duration', headerName: 'Duration', filter: true, flex: 1 },
        { field: 'activity', headerName: 'Activity', filter: true, flex: 1 },
        {field: 'customerName', headerName: 'Customer', filter: true, flex: 1}
    ]);

    function formatDate(params) {
        return format(new Date(params.value), "dd.MM.yyyy hh:mm")
    }


    return (
        <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
    )
}
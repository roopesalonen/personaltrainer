import { CSVLink } from "react-csv";

export default function CSVExport({ customers }) {
    const csvData = customers.map(customer => ({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone
    }))

    return (
        <CSVLink
            data={csvData}
            filename={"customerdata.csv"}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            Export customer data
        </CSVLink>
    )
}
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function AddCustomer(props) {
    const [customer, setCustomer] = useState({ firstname: "", lastname: "", streetaddress: "", postcode: "", city: "", email: "", phone: "" })
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        });
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" color="success" onClick={handleOpen}>
                New Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstname"
                        label="First Name"
                        value={customer.firstname}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        label="Last name"
                        value={customer.lastname}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        label="Street address"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        label="Postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        label="City"
                        value={customer.city}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        value={customer.email}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
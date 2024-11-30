import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function EditCustomer(props) {
    const [customer, setCustomer] = useState({ firstname: "", lastname: "", streetaddress: "", postcode: "", city: "", email: "", phone: "" })
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const updateCustomer = () => {
        props.updateCustomer(customer, props.customer._links.customer.href);
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" size="small" onClick={handleOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
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
                    <Button onClick={updateCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
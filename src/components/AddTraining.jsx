import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function AddTraining(props) {
    const { data, saveTraining } = props;
    const [training, setTraining] = useState({ activity: "", date: dayjs(), duration: "", customer: "" });
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setTraining(prevTraining => ({
            ...prevTraining,
            customer: data._links.self.href,
        }));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newDate) => {
        setTraining({ ...training, date: newDate });
    };

    const addTraining = () => {
        const trainingData = {
            activity: training.activity,
            date: training.date.toISOString(),
            duration: training.duration,
            customer: training.customer,
        };
        saveTraining(trainingData);
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" size="small" color="success" onClick={handleOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="activity"
                        label="Activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration (minutes)"
                        value={training.duration}
                        onChange={handleInputChange}
                        type="number"
                        variant="standard"
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date and time"
                            value={training.date}
                            ampm={false}
                            onChange={handleDateChange}
                            slots={{
                                textField: (props) => <TextField {...props} fullWidth margin="dense" />,
                            }}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

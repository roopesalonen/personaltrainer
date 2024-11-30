import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'

const localizer = dayjsLocalizer(dayjs)

export default function TrainingCalendar() {
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
        const data = await response.json();

        const training = await Promise.all(
            data._embedded.trainings.map(async (training) => {
                const customerResponse = await fetch(training._links.customer.href);
                const customerData = await customerResponse.json();
                return {
                    ...training,
                    customerName: `${customerData.firstname} ${customerData.lastname}`,
                };
            })
        );
        setTrainings(training);

        const eventsArray = training.map((training) => ({
            title: `${training.activity} (${training.customerName})`,
            start: new Date(training.date),
            end: dayjs(training.date).add(training.duration).toDate(),
        }));
        setEvents(eventsArray);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                style={{ height: 550 }}
            />
        </div>
    )
}
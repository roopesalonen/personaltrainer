import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { groupBy, sumBy } from 'lodash';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
        const data = await response.json();

        const grouped = groupBy(data._embedded.trainings, 'activity');
        const chartData = Object.keys(grouped).map((activity) => ({
            activity,
            duration: sumBy(grouped[activity], 'duration'),
        }));
        setTrainings(data._embedded.trainings);
        setData(chartData);
    };

    return (
        <div style={{ width: '100%', height: 550 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="activity" />
                    <YAxis label={{
                        value: "Duration (min)",
                        position: "insideLeft",
                        angle: -90,
                        fontSize: 18,
                    }} />
                    <Bar dataKey="duration" fill="#2074d4">
                        <LabelList
                            dataKey="duration"
                            position="insideMiddle"
                            fill='white' />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

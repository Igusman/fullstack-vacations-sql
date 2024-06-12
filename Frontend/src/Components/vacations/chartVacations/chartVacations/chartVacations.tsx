import { useEffect, useState } from "react";
import "./chartVacations.css";
import { getAllFollowerCsvService, getAllFollowerService } from "../../../../services/followService";
import { FollowerType } from "../../../../models/followersModel";
import notify from "../../../../services/Notify";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ChartVacations(): JSX.Element {
    const [followsChart, setFollowsChart] = useState<FollowerType[]>([]);

    useEffect(() => {
        const data = getAllFollowerService()
            .then(data => setFollowsChart(data))
            .catch(err => notify.error(err))
    }, [])

    const handleDownloadChart = async () => {
        try {
            const csvBlob = await getAllFollowerCsvService();
            const url = window.URL.createObjectURL(csvBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'followers.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download CSV", error);
        }
    }

    return (
        <div className="chartVacations">
            <button onClick={handleDownloadChart}>Download Chart</button>
            <h2>Analytics </h2>
            <ResponsiveContainer width="90%" height={400}>
                <BarChart data={followsChart}>
                    <XAxis dataKey="destination" />
                    <YAxis allowDecimals={false}/>
                    <Tooltip />
                    <Bar dataKey="numberOfFollowers" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

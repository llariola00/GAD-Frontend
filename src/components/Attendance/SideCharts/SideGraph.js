import '../Attendance.css'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

const SideGraph = ({ TotalAttendanceState }) => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

    const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Attendance',
                borderWidth: 0,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                hoverBackgroundColor: 'rgba(75,192,192,1)',
                hoverBorderWidth: 3,
                borderRadius: 5,
                data: TotalAttendanceState.dataQuarter,
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                display: false,
            },
        },
    }

    return (
        <div className="outline SideGraph p-0 m-0">
            <Bar
                className="outline card shadow-sm"
                data={data}
                options={options}
            />
        </div>
    )
}

export default SideGraph

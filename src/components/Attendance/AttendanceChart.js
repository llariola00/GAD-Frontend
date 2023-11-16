import './Attendance.css'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import DateSelector from './DateSelector'

const AttendanceChart = ({
    excelFiles,
    TotalAttendanceState,
    updateData,
    updateDataByQuarter,
    updateLabel,
    updateXAxisLabel,
    updateSideInfo,
}) => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

    const data = {
        labels: TotalAttendanceState.label,
        datasets: [
            {
                label: 'Attendance',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderWidth: 0,
                borderColor: 'rgba(54, 162, 235, 1)',
                hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
                hoverBorderWidth: 3,
                borderRadius: 15,
                data: TotalAttendanceState.data,
            },
        ],
    }

    const options = {
        title: {
            display: true,
            text: 'Attendance Chart',
            fontSize: 20,
        },
        legend: {
            display: true,
            position: 'right',
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: TotalAttendanceState.xAxisLabel,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Attendance',
                },
            },
        },
    }

    return (
        <div className="AttendanceChart outline col-8 d-flex flex-column align-items-center justify-content-center">
            <DateSelector
                excelFiles={excelFiles}
                updateChartData={updateData}
                updateDataByQuarter={updateDataByQuarter}
                updateChartLabel={updateLabel}
                updateXAxisLabel={updateXAxisLabel}
                updateSideInfo={updateSideInfo}
            />
            <Bar className="card shadow" data={data} options={options} />
        </div>
    )
}

export default AttendanceChart

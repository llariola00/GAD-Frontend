import './Gender.css'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { months } from './DateSelector'
import DateSelector from './DateSelector'

function calculateGenderCountsPerMonth(genderByMonth, gender) {
    if (
        gender !== 'male' &&
        gender !== 'female' &&
        gender !== 'preferNotToSay'
    ) {
        throw new Error(
            'Invalid gender parameter. It must be "male", "female", or "preferNotToSay".'
        )
    }

    const genderCountsPerMonth = []

    for (const month in genderByMonth) {
        if (genderByMonth.hasOwnProperty(month)) {
            genderCountsPerMonth.push(genderByMonth[month][gender])
        }
    }
    return genderCountsPerMonth
}

const LineChart = ({
    excelFiles,
    GenderDistributionState,
    updateData,
    updateDataQuarterly,
    updateLabel,
    updateXAxisLabel,
    updateSideInfo,
}) => {
    ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
        PointElement
    )

    const data = {
        type: 'line',
        labels: GenderDistributionState.label,
        datasets: [
            {
                label: 'Male',
                data: calculateGenderCountsPerMonth(
                    GenderDistributionState.data,
                    'male'
                ),
                fill: false,
                tension: 0.4,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointStyle: 'rectRot',
                pointRadius: 7.5,
                pointBorderColor: 'rgba(54, 162, 250, 1)',
            },

            {
                label: 'Female',
                data: calculateGenderCountsPerMonth(
                    GenderDistributionState.data,
                    'female'
                ),
                fill: false,
                tension: 0.4,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointStyle: 'circle',
                pointRadius: 7.5,
                pointBorderColor: 'rgba(255, 99, 150, 1)',
            },

            {
                label: 'Prefer Not to Say',
                data: calculateGenderCountsPerMonth(
                    GenderDistributionState.data,
                    'preferNotToSay'
                ),
                fill: false,
                tension: 0.4,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                pointStyle: 'triangle',
                pointRadius: 7.5,
                pointBorderColor: 'rgba(255, 206, 100, 1)',
            },
        ],
    }

    const options = {
        responive: true,
        title: {
            display: true,
            text: 'Gender Chart',
            fontSize: 20,
        },
        legend: {
            display: true,
            position: 'right',
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: GenderDistributionState.xAxisLabel,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Gender Count',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
        },
    }

    return (
        <div className="TestChart outline col-8 d-flex flex-column align-items-center justify-content-center">
            <DateSelector
                excelFiles={excelFiles}
                GenderDistributionState={GenderDistributionState}
                updateChartData={updateData}
                updateChartDataQuarterly={updateDataQuarterly}
                updateChartLabel={updateLabel}
                updateXAxisLabel={updateXAxisLabel}
                updateSideInfo={updateSideInfo}
            />
            <Line className="card shadow" data={data} options={options} />
        </div>
    )
}

export default LineChart

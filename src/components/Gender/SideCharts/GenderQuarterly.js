import '../Gender.css'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

function calculateGenderCountsPerQuarter(genderByQuarter, gender) {
    if (
        gender !== 'male' &&
        gender !== 'female' &&
        gender !== 'preferNotToSay'
    ) {
        throw new Error(
            'Invalid gender parameter. It must be "male", "female", or "preferNotToSay".'
        )
    }

    const genderCountsPerQuarter = []

    // IF this function returns an empty array, make sure that you're passing an object, not an array
    // Or change `genderByQarter.dataQuarterly` to `genderByQuarter`, etc.
    for (const quarter in genderByQuarter.dataQuarterly) {
        if (genderByQuarter.dataQuarterly.hasOwnProperty(quarter)) {
            genderCountsPerQuarter.push(
                genderByQuarter.dataQuarterly[quarter][gender]
            )
        }
    }
    return genderCountsPerQuarter
}

const GenderQuarterly = ({ GenderDistributionState }) => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

    const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                type: 'bar',
                label: 'Male',
                data: calculateGenderCountsPerQuarter(
                    GenderDistributionState,
                    'male'
                ),
                borderWidth: 0,
                borderRadius: 15,
                backgroundColor: 'rgba(54, 162, 235, 0.6',
                borderColor: 'rgba(54, 162, 235, 0.8)',
                hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
                hoverBorderWidth: 3,
            },

            {
                type: 'bar',
                label: 'Female',
                data: calculateGenderCountsPerQuarter(
                    GenderDistributionState,
                    'female'
                ),
                borderWidth: 0,
                borderRadius: 15,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                hoverBorderWidth: 3,
            },

            {
                type: 'bar',
                label: 'Prefer Not to Say',
                data: calculateGenderCountsPerQuarter(
                    GenderDistributionState,
                    'preferNotToSay'
                ),
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 0.8)',
                hoverBackgroundColor: 'rgba(255, 206, 86, 1)',
                hoverBorderWidth: 3,
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    return (
        <div className="outline GenderQuarterly p-0 m-0">
            <Bar className="outline" data={data} options={options} />
        </div>
    )
}

export default GenderQuarterly

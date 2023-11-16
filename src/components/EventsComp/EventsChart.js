import './EventsComp.css'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { months } from './DateSelector'
import DateSelector from './DateSelector'

const EventsChart = ({
    excelFiles,
    TotalEventState,
    updateData,
    updateDataByQuarter,
    updateLabel,
    updateXAxisLabel,
    updateSideInfo,
}) => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

    const data = {
        labels: TotalEventState.label,
        datasets: [
            {
                label: 'Events',
                backgroundColor: 'rgba(248, 198, 70, 0.6)',
                borderWidth: 0,
                borderColor: 'rgba(255, 206, 86, 1)',
                hoverBackgroundColor: 'rgba(255, 206, 86, 1)',
                hoverBorderWidth: 3,
                borderRadius: 15,
                data: TotalEventState.data,
            },
        ],
    }

    const options = {
        title: {
            display: true,
            text: 'Events Chart',
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
                    text: TotalEventState.xAxisLabel,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Events',
                },
            },
        },
    }

    return (
        <div className="EventsChart outline col-8 d-flex flex-column align-items-center justify-content-center">
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

export default EventsChart

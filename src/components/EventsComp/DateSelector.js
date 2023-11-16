import './EventsComp.css'
import { useState } from 'react'

export const years = Array.from({ length: 7 }, (_, i) => i + 2017)
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

function calculateUniqueEventsByQuarter(selectedYear, data) {
    const uniqueEventsByQuarter = [new Set(), new Set(), new Set(), new Set()]

    data.forEach((item) => {
        const date = new Date(item.timestamp)

        if (date.getFullYear() === selectedYear) {
            let quarter = Math.floor(date.getMonth() / 3)
            uniqueEventsByQuarter[quarter].add(item.eventName)
        }
    })

    return uniqueEventsByQuarter.map((set) => set.size)
}

export function filterByYear(selectedYear, data) {
    let uniqueEventsByMonth = Array(12)
        .fill()
        .map(() => new Set())
    let totalUniqueEvents = new Set()

    let uniqueEventsByQuarter = calculateUniqueEventsByQuarter(
        selectedYear,
        data
    )

    data.forEach((event) => {
        let date = new Date(event.timestamp)
        if (date.getFullYear() === selectedYear) {
            uniqueEventsByMonth[date.getMonth()].add(event.eventName)
            totalUniqueEvents.add(event.eventName)
        }
    })

    return {
        counts: uniqueEventsByMonth.map((set) => set.size),
        total: totalUniqueEvents.size,
        uniqueEventsByQuarter,
    }
}

export function filterByMonth(selectedYear, selectedMonth, data) {
    let counts = []
    let eventNames = []
    let gender = { male: 0, female: 0, preferNotToSay: 0 }

    data.forEach((student) => {
        let date = new Date(student.timestamp)
        if (
            date.getFullYear() === selectedYear &&
            date.getMonth() === selectedMonth
        ) {
            let index = eventNames.indexOf(student.eventName)
            if (index !== -1) {
                counts[index]++
            } else {
                eventNames.push(student.eventName)
                counts.push(1)
            }

            // Get gender distribution data
            switch (student.sex) {
                case 'Male':
                    gender.male++
                    break
                case 'Female':
                    gender.female++
                    break
                default:
                    gender.preferNotToSay++
                    break
            }
        }
    })

    return { counts, eventNames, gender }
}

const DateSelector = ({
    excelFiles,
    updateChartData,
    updateDataByQuarter,
    updateChartLabel,
    updateXAxisLabel,
    updateSideInfo,
}) => {
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [isOnlyMonths, setIsOnlyMonths] = useState(false)

    const handleClick = () => {
        // On button click, call the function to count the students by month
        // and pass the result to the callback function onClick (which is updateChartData in Home.js)
        try {
            if (!excelFiles || excelFiles.length === 0) {
                alert('Data is not loaded yet. Please wait.')
            } else {
                // Total Events by Year
                const result = filterByYear(year, excelFiles)
                const counts = result.counts
                const eventNames = months

                console.log('Events result: ', result)
                updateChartData(counts)
                updateChartLabel(eventNames)
                updateXAxisLabel('Months')

                // Total Attendance by Quarter
                updateDataByQuarter(result.uniqueEventsByQuarter)

                // Side Info
                updateSideInfo(result.total, year, null)
            }
        } catch (error) {
            console.error('An error occurred: ', error)
        }
    }

    return (
        <>
            <div className="dateSelector_events gap-3 px-4 d-flex flex-row align-items-center justify-content-evenly m-2 p-2 rounded-3">
                <div className="gap-1 d-flex justify-content-center align-items-center">
                    <label htmlFor="yearSelect_events">Year:</label>
                    <select
                        id="yearSelect_events"
                        name="yearSelect_events"
                        className="form-select"
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    id="btnSubmit"
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleClick}
                >
                    Display
                </button>
            </div>
        </>
    )
}

export default DateSelector

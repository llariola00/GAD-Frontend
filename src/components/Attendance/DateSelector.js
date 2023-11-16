import './Attendance.css'
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

function calculateAttendanceByQuarter(selectedYear, data) {
    const attendanceByQuarter = [0, 0, 0, 0]

    data.forEach((item) => {
        const date = new Date(item.timestamp)

        if (date.getFullYear() === selectedYear) {
            let quarter = Math.floor(date.getMonth() / 3) + 1
            attendanceByQuarter[quarter - 1]++
        }
    })

    return attendanceByQuarter
}

export function filterByYear(selectedYear, data) {
    let counts = Array(12).fill(0)
    let total = 0

    let attendanceByQuarter = calculateAttendanceByQuarter(selectedYear, data)

    data.forEach((student) => {
        let date = new Date(student.timestamp)
        if (date.getFullYear() === selectedYear) {
            counts[date.getMonth()]++
            total++
        }
    })

    return { counts, total, attendanceByQuarter }
}

export function filterByMonth(selectedYear, selectedMonth, data) {
    let counts = []
    let eventNames = []
    let total = 0

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
            total++
        }
    })

    return { counts, eventNames, total }
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
                if (isOnlyMonths) {
                    const result = filterByMonth(year, month - 1, excelFiles)
                    const counts = result.counts
                    const eventNames = result.eventNames

                    updateChartLabel(eventNames)
                    updateChartData(counts)
                    updateXAxisLabel('Events')

                    // Total Attendance by Quarter
                    updateDataByQuarter(
                        calculateAttendanceByQuarter(year, excelFiles)
                    )

                    // Side Info
                    updateSideInfo(result.total, year, months[month - 1])
                } else {
                    // Total Attendance by Year
                    const result = filterByYear(year, excelFiles)
                    const counts = result.counts
                    const eventNames = months

                    updateChartData(counts)
                    updateChartLabel(eventNames)
                    updateXAxisLabel('Months')

                    // Total Attendance by Quarter
                    updateDataByQuarter(result.attendanceByQuarter)

                    // Side Info
                    updateSideInfo(result.total, year, null)
                }
            }
        } catch (error) {
            console.error('An error occurred: ', error)
        }
    }

    return (
        <>
            <div className="dateSelector_attendance d-flex flex-row align-items-center justify-content-evenly m-2 p-2 rounded-3">
                <div className="d-flex justify-content-center align-items-center">
                    <label>Year:</label>
                    <select
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

                <div className="d-flex justify-content-center align-items-center">
                    <label>Month:</label>
                    <select
                        className="form-select"
                        value={month}
                        onChange={(e) => setMonth(parseInt(e.target.value))}
                    >
                        {months.map((m, i) => (
                            <option key={i} value={i + 1}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="checkBox-container d-flex flex-row flex-nowrap align-items-center">
                    <input
                        className="me-2"
                        type="checkbox"
                        id="isOnlyMonths_attendance"
                        name="isOnlyMonths_attendance"
                        onChange={(e) => setIsOnlyMonths(e.target.checked)}
                    />

                    <label
                        className="text-nowrap"
                        htmlFor="isOnlyMonths_attendance"
                    >
                        Attendance/Month
                    </label>
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

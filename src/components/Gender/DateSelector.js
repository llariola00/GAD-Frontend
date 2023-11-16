import './Gender.css'
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

/**
 * Calculates the number of male, female and prefer not to say students by quarter for a given year.
 * @param {number} selectedYear - The year for which to calculate the gender distribution.
 * @param {Array} data - An array of student objects containing their gender and timestamp.
 * @returns {Object} An object containing the number of male, female and prefer not to say students by quarter.
 */
export function calculateGenderByQuarter(selectedYear, data) {
    let genderByQuarter = {
        Q1: { male: 0, female: 0, preferNotToSay: 0 },
        Q2: { male: 0, female: 0, preferNotToSay: 0 },
        Q3: { male: 0, female: 0, preferNotToSay: 0 },
        Q4: { male: 0, female: 0, preferNotToSay: 0 },
    }

    data.forEach((student) => {
        let date = new Date(student.timestamp)
        if (date.getFullYear() === selectedYear) {
            let quarter = Math.floor(date.getMonth() / 3) + 1
            switch (student.sex) {
                case 'Male':
                    genderByQuarter[`Q${quarter}`].male++
                    break
                case 'Female':
                    genderByQuarter[`Q${quarter}`].female++
                    break
                default:
                    genderByQuarter[`Q${quarter}`].preferNotToSay++
                    break
            }
        }
    })

    return genderByQuarter
}

export function calculateGenderByMonth(selectedYear, data) {
    let genderByMonth = {
        1: { male: 0, female: 0, preferNotToSay: 0 },
        2: { male: 0, female: 0, preferNotToSay: 0 },
        3: { male: 0, female: 0, preferNotToSay: 0 },
        4: { male: 0, female: 0, preferNotToSay: 0 },
        5: { male: 0, female: 0, preferNotToSay: 0 },
        6: { male: 0, female: 0, preferNotToSay: 0 },
        7: { male: 0, female: 0, preferNotToSay: 0 },
        8: { male: 0, female: 0, preferNotToSay: 0 },
        9: { male: 0, female: 0, preferNotToSay: 0 },
        10: { male: 0, female: 0, preferNotToSay: 0 },
        11: { male: 0, female: 0, preferNotToSay: 0 },
        12: { male: 0, female: 0, preferNotToSay: 0 },
    }

    data.forEach((student) => {
        let date = new Date(student.timestamp)
        if (date.getFullYear() === selectedYear) {
            let month = date.getMonth() + 1
            switch (student.sex) {
                case 'Male':
                    genderByMonth[`${month}`].male++
                    break
                case 'Female':
                    genderByMonth[`${month}`].female++
                    break
                default:
                    genderByMonth[`${month}`].preferNotToSay++
                    break
            }
        }
    })

    return genderByMonth
}

export function filterByYear(selectedYear, data) {
    let totalGender = { male: 0, female: 0, preferNotToSay: 0 }
    let genderByQuarter = calculateGenderByQuarter(selectedYear, data)

    data.forEach((student) => {
        let date = new Date(student.timestamp)
        if (date.getFullYear() === selectedYear) {
            switch (student.sex) {
                case 'Male':
                    totalGender.male++
                    break
                case 'Female':
                    totalGender.female++
                    break
                default:
                    totalGender.preferNotToSay++
                    break
            }
        }
    })

    return { totalGender, genderByQuarter }
}

export function filterByMonth(selectedYear, selectedMonth, data) {
    let eventNames = []
    let gender = {}

    data.forEach((student) => {
        let date = new Date(student.timestamp)
        if (
            date.getFullYear() === selectedYear &&
            date.getMonth() === selectedMonth
        ) {
            if (!eventNames.includes(student.eventName)) {
                eventNames.push(student.eventName)
                gender[student.eventName] = {
                    male: 0,
                    female: 0,
                    preferNotToSay: 0,
                }
            }

            // Get gender distribution data
            switch (student.sex) {
                case 'Male':
                    gender[student.eventName].male++
                    break
                case 'Female':
                    gender[student.eventName].female++
                    break
                default:
                    gender[student.eventName].preferNotToSay++
                    break
            }
        }
    })

    return { eventNames, gender }
}

const DateSelector = ({
    updateChartData,
    updateChartLabel,
    excelFiles,
    updateXAxisLabel,
    updateChartDataQuarterly,
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
                let resultMonth, resultYear, eventNames, gender
                resultYear = filterByYear(year, excelFiles)

                if (isOnlyMonths) {
                    resultMonth = filterByMonth(year, month - 1, excelFiles)
                    eventNames = resultMonth.eventNames
                    gender = Object.values(resultMonth.gender)
                    updateSideInfo(
                        Object.values(resultYear.totalGender),
                        year,
                        months[month - 1]
                    )
                } else {
                    eventNames = months
                    gender = calculateGenderByMonth(year, excelFiles)
                    updateSideInfo(
                        Object.values(resultYear.totalGender),
                        year,
                        null
                    )
                }

                // Main chart
                updateChartLabel(eventNames)
                updateXAxisLabel(isOnlyMonths ? 'Events' : 'Months')
                updateChartData(gender)

                // Gender Quarterly
                const genderQuarterly = Object.values(
                    resultYear.genderByQuarter
                )
                updateChartDataQuarterly(genderQuarterly)
            }
        } catch (error) {
            console.error('An error occurred: ', error)
        }
    }

    return (
        <>
            <div className="dateSelector_gender d-flex flex-row align-items-center justify-content-evenly m-2 p-2 rounded-3">
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
                        id="isOnlyMonths_gender"
                        name="isOnlyMonths_gender"
                        onChange={(e) => setIsOnlyMonths(e.target.checked)}
                    />

                    <label
                        className="text-nowrap"
                        htmlFor="isOnlyMonths_gender"
                    >
                        Gender/Month
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

import React, { useEffect, useState } from 'react'
import './Gender.css'
import SideMain from './SideCharts/SideMain'
import LineChart from './LineChart'
import { months, filterByYear, calculateGenderByMonth } from './DateSelector'

const Gender = ({ excelFiles }) => {
    useEffect(() => {
        // Code to run after component mounts or updates goes here
        if (excelFiles !== null) {
            const initialData = filterByYear(
                new Date().getFullYear(),
                excelFiles
            )

            // Initial data for GenderDistribution chart and Side charts

            // Main chart
            const gender = calculateGenderByMonth(
                new Date().getFullYear(),
                excelFiles
            )
            updateData(gender)

            // Quarterly Gender Dist.
            const genderQuarterly = Object.values(initialData.genderByQuarter)
            updateDataQuarterly(genderQuarterly)

            // Total Gender Dist.
            const totalGender = Object.values(initialData.totalGender)
            updateSideInfo(totalGender, new Date().getFullYear(), null)
        }
    }, [excelFiles])

    const [GenderDistributionState, setGenderDistributionState] = useState({
        data: {},
        dataQuarterly: {},
        total: {},
        label: months,
        xAxisLabel: 'Months',
        selectedYear: null,
        selectedMonth: null,
    })

    const updateData = (newData) => {
        setGenderDistributionState((prevState) => ({
            ...prevState,
            data: newData,
        }))
    }

    const updateDataQuarterly = (newQuarterly) => {
        setGenderDistributionState((prevState) => ({
            ...prevState,
            dataQuarterly: newQuarterly,
        }))
    }

    const updateLabel = (newLabel) => {
        setGenderDistributionState((prevState) => ({
            ...prevState,
            label: newLabel,
        }))
    }

    /**
     * Updates the X-axis label for TotalAttendance chart
     * @param {string} newLabel - The new X-axis label to update the chart with
     */
    const updateXAxisLabel = (newLabel) => {
        setGenderDistributionState((prevState) => ({
            ...prevState,
            xAxisLabel: newLabel,
        }))
    }

    const updateSideInfo = (newTotal, newYear, newMonth) => {
        setGenderDistributionState((prevState) => ({
            ...prevState,
            total: newTotal,
            selectedYear: newYear,
            selectedMonth: newMonth,
        }))
    }

    return (
        // JSX code for component goes here
        <div className="Gender row mt-5 mb-2 me-0">
            <div className="col-2 outline">navbar</div>
            <LineChart
                excelFiles={excelFiles}
                GenderDistributionState={GenderDistributionState}
                updateData={updateData}
                updateDataQuarterly={updateDataQuarterly}
                updateLabel={updateLabel}
                updateXAxisLabel={updateXAxisLabel}
                updateSideInfo={updateSideInfo}
            />
            <SideMain GenderDistributionState={GenderDistributionState} />
        </div>
    )
}

export default Gender

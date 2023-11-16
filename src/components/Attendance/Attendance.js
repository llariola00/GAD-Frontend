import React, { useState, useEffect } from 'react'
import './Attendance.css'
import { months, filterByYear } from './DateSelector'
import AttendanceChart from './AttendanceChart'
import SideMain from './SideCharts/SideMain'

const Attendance = ({ excelFiles }) => {
    useEffect(() => {
        // Code to run after component mounts or updates goes here
        // Calls the update function to set the initial chart data
        if (excelFiles !== null) {
            const initialData = filterByYear(
                new Date().getFullYear(),
                excelFiles
            )

            // Initial data for TotalAttendance chart and Side charts
            updateData(initialData.counts)
            updateDataByQuarter(initialData.attendanceByQuarter)
            updateSideInfo(initialData.total, new Date().getFullYear(), null)
        }
    }, [excelFiles])

    // The state and setState for TotalAttendance chart
    const [TotalAttendanceState, setTotalAttendanceState] = useState({
        data: {},
        dataQuarter: {},
        label: months,
        xAxisLabel: 'Months',
        totalYear: 0,
        selectedYear: null,
        selectedMonth: null,
    })

    /**
     * Updates the chart data for TotalAttendance chart
     * @param {Object} newData - The new data to update the chart with
     */
    const updateData = (newData) => {
        setTotalAttendanceState((prevState) => ({
            ...prevState,
            data: newData,
        }))
    }

    const updateDataByQuarter = (newData) => {
        setTotalAttendanceState((prevState) => ({
            ...prevState,
            dataQuarter: newData,
        }))
    }

    const updateLabel = (newLabel) => {
        setTotalAttendanceState((prevState) => ({
            ...prevState,
            label: newLabel,
        }))
    }

    const updateXAxisLabel = (newLabel) => {
        setTotalAttendanceState((prevState) => ({
            ...prevState,
            xAxisLabel: newLabel,
        }))
    }

    const updateSideInfo = (newTotal, newYear, newMonth) => {
        setTotalAttendanceState((prevState) => ({
            ...prevState,
            totalYear: newTotal,
            selectedYear: newYear,
            selectedMonth: newMonth,
        }))
    }

    return (
        // JSX code for component goes here
        <div className="Attendance row mt-5 mb-2 me-0">
            <div className="col-2 outline">navbar</div>
            <AttendanceChart
                excelFiles={excelFiles}
                TotalAttendanceState={TotalAttendanceState}
                updateData={updateData}
                updateDataByQuarter={updateDataByQuarter}
                updateLabel={updateLabel}
                updateXAxisLabel={updateXAxisLabel}
                updateSideInfo={updateSideInfo}
            />
            {/* <div className="col-2 outline">sidechart</div> */}

            <SideMain TotalAttendanceState={TotalAttendanceState} />
        </div>
    )
}

export default Attendance

import React, { useEffect, useState } from 'react'
import './EventsComp.css'
import { months, filterByYear } from './DateSelector'
import EventsChart from './EventsChart'
import SideMain from './SideCharts/SideMain'

const EventsComp = ({ excelFiles }) => {
    useEffect(() => {
        // Code to run after component mounts or updates goes here
        // Calls the update function to set the initial chart data
        if (excelFiles !== null) {
            const initialData = filterByYear(
                new Date().getFullYear(),
                excelFiles
            )

            // Initial data for Events chart and Side charts
            updateData(initialData.counts)
            updateDataByQuarter(initialData.uniqueEventsByQuarter)
            updateSideInfo(initialData.total, new Date().getFullYear(), null)
        }
    }, [excelFiles])

    // The state and setState for Events chart
    const [TotalEventState, setTotalEventState] = useState({
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
        setTotalEventState((prevState) => ({
            ...prevState,
            data: newData,
        }))
    }

    const updateDataByQuarter = (newData) => {
        setTotalEventState((prevState) => ({
            ...prevState,
            dataQuarter: newData,
        }))
    }

    const updateLabel = (newLabel) => {
        setTotalEventState((prevState) => ({
            ...prevState,
            label: newLabel,
        }))
    }

    const updateXAxisLabel = (newLabel) => {
        setTotalEventState((prevState) => ({
            ...prevState,
            xAxisLabel: newLabel,
        }))
    }

    const updateSideInfo = (newTotal, newYear, newMonth) => {
        setTotalEventState((prevState) => ({
            ...prevState,
            totalYear: newTotal,
            selectedYear: newYear,
            selectedMonth: newMonth,
        }))
    }

    return (
        // JSX code for component goes here
        <div className="EventsComp row mt-5 mb-2 me-0">
            <div className="col-2 outline">navbar</div>
            <EventsChart
                excelFiles={excelFiles}
                TotalEventState={TotalEventState}
                updateData={updateData}
                updateDataByQuarter={updateDataByQuarter}
                updateLabel={updateLabel}
                updateXAxisLabel={updateXAxisLabel}
                updateSideInfo={updateSideInfo}
            />
            {/* <div className="col-2 outline">sidechart</div> */}

            <SideMain TotalEventState={TotalEventState} />
        </div>
    )
}

export default EventsComp

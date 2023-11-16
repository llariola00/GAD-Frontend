import React from 'react'
import '../Attendance.css'
import SideGraph from './SideGraph'

const SideMain = ({ TotalAttendanceState }) => {
    let year = TotalAttendanceState.selectedYear || '-'
    let month = TotalAttendanceState.selectedMonth || '-'
    let total = TotalAttendanceState.totalYear || '-'

    return (
        <div className="SideMain col-2 row gap-1 align-items-center align-content-center">
            <section className="SideTotal outline card shadow-sm w-100 text-center">
                <div className="card-body">
                    <h5 className="card-title m-0">ATTENDANCE</h5>
                </div>
            </section>

            <section className="SideDate outline card shadow-sm w-100 text-center">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        DATE
                    </h6>
                    <h5 className="card-title">{year}</h5>
                    <p className="card-text">{month}</p>
                </div>
            </section>

            <section className="SideTotal outline card shadow-sm w-100 text-center">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        TOTAL
                    </h6>
                    <h5 className="card-title">{total}</h5>
                </div>
            </section>
            <SideGraph TotalAttendanceState={TotalAttendanceState} />
        </div>
    )
}

export default SideMain

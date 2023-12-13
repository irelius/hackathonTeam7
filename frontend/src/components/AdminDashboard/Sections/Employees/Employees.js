import "./Employees.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../../../store/user"
import EditEmployees from "./EditEmployees/EditEmployees";

function EmployeesSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userActions.loadAllEmployeesThunk())
    }, [dispatch])

    const allEmployees = Object.values(useSelector(state => state.user))

    const [expandRow, setExpandRow] = useState(null)

    const handleRowClick = (index) => {
        setExpandRow(prev => prev === index ? null : index)
    }

    const handleCloseExpandRow = () => {
        setExpandRow(null)
    }

    return (
        <div>
            {/* Employee Header */}
            <section className="dashboard-header">
                <aside className="width-200">Username</aside>
                <aside className="width-200">Email</aside>
                <aside className="width-100">Role</aside>
            </section>

            {/* Employee Body */}
            <section>
                {allEmployees.length === 0 ? (
                    <section>You have no employees to list</section>
                ) : (
                    <section className="dashboard-body">
                        {allEmployees.map((el, i) => (
                            <div key={i} className="dashboard-one-employee">
                                <section className="dashboard-one-employee-row" onClick={() => handleRowClick(i)}>
                                    <aside className="width-200">{el.username}</aside>
                                    <aside className="width-200">{el.email}</aside>
                                    <aside className="width-100">
                                        {el.role ? el.role.charAt(0).toUpperCase() + el.role.slice(1) : 'Unknown Role'}
                                    </aside>
                                </section>
                                <section className={`expanded-row ${expandRow === i ? 'employee-show' : ''}`} key={i}>
                                    {expandRow === i ? (
                                        <EditEmployees employee={el} onCloseExpandRow={handleCloseExpandRow} />
                                    ) : (
                                        <></>
                                    )}
                                </section>
                            </div>
                        ))}
                    </section>
                )}
            </section>
        </div>
    )
}

export default EmployeesSection;

import "./Employees.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../../../store/user"

function EmployeesSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userActions.loadAllEmployeesThunk())

        return (() => {
            dispatch(userActions.clearUser())
        })
    }, [dispatch])

    const allEmployees = Object.values(useSelector(state => state.user))

    return (
        <div>
            {/* Employee Header */}
            <section className="dashboard-header">
                <aside className="width-200">Username</aside>
                <aside className="width-200">Email</aside>
                <aside className="width-100">Role</aside>
            </section>

            {/* Employee Body */}
            <section className="dashboard-body">
                {allEmployees.map((el, i) => (
                    <div key={i} className="dashboard-one-employee">
                        <section className="dashboard-one-employee-row">
                            <aside className="width-200">{el.username}</aside>
                            <aside className="width-200">{el.email}</aside>
                            <aside className="width-100">{el.role.charAt(0).toUpperCase() + el.role.slice(1)}</aside>
                        </section>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default EmployeesSection;

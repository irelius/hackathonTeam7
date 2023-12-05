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
        <div className="dashboard-table">
            <table>
                <thead className="dashboard-header">
                    <tr className="dashboard-tr">
                        <th className="dashboard-th-300">Username</th>
                        <th className="dashboard-th-300">Email</th>
                        <th className="dashboard-th-200">Role</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {allEmployees.map((el, i) => (
                    <tr key={i} className="dashboard-table-rows">
                        <td className="dashboard-td-300">
                            {el.username}
                        </td>
                        <td className="dashboard-td-300">
                            {el.email}
                        </td>
                        <td className="dashboard-td-200">
                            {el.role.charAt(0).toUpperCase() + el.role.slice(1)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </div>
    )
}

export default EmployeesSection;

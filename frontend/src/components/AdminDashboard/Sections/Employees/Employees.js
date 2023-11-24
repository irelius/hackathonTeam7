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
            {allEmployees.map((el, i) => (
                <div key={i}>
                    <section>
                        {el.username}
                    </section>
                    <section>
                        {el.email}
                    </section>
                    <section>
                        {el.role}
                    </section>
                </div>
            ))}
        </div>
    )
}

export default EmployeesSection;

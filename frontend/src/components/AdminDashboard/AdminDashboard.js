import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../store/session"
import OrdersSection from "./Sections/Orders/Orders"
import DiscountsSection from "./Sections/Discounts"
import ProductsSection from "./Sections/Products"
import EmployeesSection from "./Sections/Employees"
import ReviewsSection from "./Sections/Reviews"


function AdminDashboard() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
    }, [dispatch])

    const user = useSelector(state => state.session.user)


    return user === null ? (
        <Redirect to="/forbidden" />
    ) : user.role === "customer" ? (
        <Redirect to="/forbidden" />
    ) : (
        <div>
            <section>
                <OrdersSection />
            </section>
            <section>
                <ProductsSection />
            </section>
            <section>
                <ReviewsSection />
            </section>
            <section>
                <DiscountsSection />
            </section>
            {user.role === "admin" ? ( // only show the employee section if the user role is Admin
                <section>
                    <EmployeesSection />
                </section>
            ) : (
                <section></section>
            )}
        </div>
    )

}

export default AdminDashboard

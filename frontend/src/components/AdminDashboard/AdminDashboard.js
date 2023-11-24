import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../store/session"
import OrdersSection from "./Sections/Orders/Orders"
import DiscountsSection from "./Sections/Discounts/Discounts"
import ProductsSection from "./Sections/Products/Products"
import EmployeesSection from "./Sections/Employees/Employees"
import ReviewsSection from "./Sections/Reviews/Reviews"

import * as reviewActions from "../../store/review"
import * as userActions from "../../store/user"
import * as orderActions from "../../store/order"
import * as discountActions from "../../store/discount"
import * as productActions from "../../store/product"


function AdminDashboard() {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        setLoad(true)
    }, [dispatch])

    const currUser = useSelector(state => state.session.user)

    if (!currUser) {
        return <Redirect to="/forbidden" />;
    }

    if (currUser.role === "customer") {
        return <Redirect to="/forbidden" />;
    }

    return (
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
            {currUser.role === "admin" ? ( // only show the employee section if the user role is Admin
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

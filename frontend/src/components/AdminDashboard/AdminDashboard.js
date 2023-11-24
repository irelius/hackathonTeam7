import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../store/session"
import OrdersSection from "./Sections/Orders/Orders"
import DiscountsSection from "./Sections/Discounts/Discounts"
import ProductsSection from "./Sections/Products/Products"
import EmployeesSection from "./Sections/Employees/Employees"
import ReviewsSection from "./Sections/Reviews/Reviews"

import * as userActions from "../../store/user"

function AdminDashboard() {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [activeTab, setActiveTab] = useState("OrdersSection")

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        dispatch(userActions.loadAllUsersThunk())
        setLoad(true)

        return (() => (
            dispatch(userActions.clearUser())
        ))
    }, [dispatch])

    const currUser = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.user)

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }


    if (!currUser) {
        return <Redirect to="/forbidden" />;
    }

    if (currUser.role === "customer") {
        return <Redirect to="/forbidden" />;
    }

    return load ? (
        <div>
            <section>
                <button onClick={() => handleTabChange("OrdersSection")}>Orders</button>
                <button onClick={() => handleTabChange("ProductsSection")}>Products</button>
                <button onClick={() => handleTabChange("ReviewsSection")}>Reviews</button>
                <button onClick={() => handleTabChange("DiscountsSection")}>Discounts</button>
                {currUser.role === "admin" ? ( // only show the employee tab button if the user role is Admin
                    <button onClick={() => handleTabChange("EmployeesSection")}>Employees</button>
                ) : (
                    <></>
                )}
            </section>

            <section>
                {activeTab === "OrdersSection" && <OrdersSection />}
                {activeTab === "ProductsSection" && <ProductsSection />}
                {activeTab === "ReviewsSection" && <ReviewsSection allUsers={allUsers} />}
                {activeTab === "DiscountsSection" && <DiscountsSection />}
                {activeTab === "EmployeesSection" && currUser.role === "admin" ? ( // only show the employee section if the user role is Admin
                    <EmployeesSection />
                ) : (
                    <></>
                )}
            </section>
        </div>
    ) : (
        <></>
    )
}

export default AdminDashboard

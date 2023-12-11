import "./AdminDashboard.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import OrdersSection from "./Sections/Orders/Orders"
import DiscountsSection from "./Sections/Discounts/Discounts"
import ProductsSection from "./Sections/Products/Products"
import EmployeesSection from "./Sections/Employees/Employees"
import ReviewsSection from "./Sections/Reviews/Reviews"
import CreateDiscount from "./Sections/CreateDiscount/CreateDiscount"
import CreateProduct from "./Sections/CreateProduct/CreateProduct"
import CreateEmployee from "./Sections/CreateEmployee/CreateEmployee"

import * as sessionActions from "../../store/session"
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
            <section id="dashboard-sidebar">
                <div className={`dash-text-${activeTab === "OrdersSection" ? "100" : "200"}`} onClick={() => handleTabChange("OrdersSection")}>Orders</div>
                <div className={`dash-text-${activeTab === "ProductsSection" ? "100" : "200"}`} onClick={() => handleTabChange("ProductsSection")}>Products</div>
                <div className={`dash-text-${activeTab === "ReviewsSection" ? "100" : "200"}`} onClick={() => handleTabChange("ReviewsSection")}>Reviews</div>
                <div className={`dash-text-${activeTab === "DiscountsSection" ? "100" : "200"}`} onClick={() => handleTabChange("DiscountsSection")}>Discounts</div>
                {currUser.role === "admin" ? ( // only show the employee tab div if the user role is Admin
                    <div className={`dash-text-${activeTab === "EmployeesSection" ? "100" : "200"}`} onClick={() => handleTabChange("EmployeesSection")}>Employees</div>
                ) : (
                    <></>
                )}
                <div className={`dash-text-${activeTab === "CreateDiscountSection" ? "100" : "200"}`} onClick={() => handleTabChange("CreateDiscountSection")}>Create Discount</div>
                <div className={`dash-text-${activeTab === "CreateProductSection" ? "100" : "200"}`} onClick={() => handleTabChange("CreateProductSection")}>Create Product</div>
                <div className={`dash-text-${activeTab === "CreateEmployeeSection" ? "100" : "200"}`} onClick={() => handleTabChange("CreateEmployeeSection")}>Create Employee</div>

            </section>

            {/* Depending on the activeTabe, return and load the appropriate component */}
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
                {activeTab === "CreateDiscountSection" && <CreateDiscount />}
                {activeTab === "CreateProductSection" && <CreateProduct />}
                {activeTab === "CreateEmployeeSection" && <CreateEmployee />}
            </section>
        </div >
    ) : (
        <></>
    )
}

export default AdminDashboard

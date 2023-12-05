import "./Orders.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadAllOrdersByCartThunk } from "../../../../store/order"
import { useState } from "react"
import DashboardOneCart from "./DashboardOneCart/DashboardOneCart"


function OrdersSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllOrdersByCartThunk())
    }, [dispatch])

    const orders = Object.values(useSelector(state => state.order))

    return (
        <div className="dashboard-table">
            <table>
                <thead className="dashboard-header">
                    <tr className="dashboard-tr">
                        <th className="dashboard-th-100">Cart ID</th>
                        <th className="dashboard-th-300">Name</th>
                        <th className="dashboard-th-100">Quantity</th>
                        <th className="dashboard-th-100">Date</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {orders.map((cart, i) => {
                    return (
                        <div id="dashboard-order-cart-section" key={i}>
                            <DashboardOneCart cart={cart} />
                        </div >
                    )
                })}
            </tbody >
        </div >
    )
}

export default OrdersSection

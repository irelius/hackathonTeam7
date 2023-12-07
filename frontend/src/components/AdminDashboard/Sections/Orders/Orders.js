import "./Orders.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadAllOrdersByCartThunk } from "../../../../store/order"
import DashboardOneCart from "./DashboardOneCart/DashboardOneCart"


function OrdersSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllOrdersByCartThunk())
    }, [dispatch])

    const orders = Object.values(useSelector(state => state.order))

    return (
        <div>
            <section className="dashboard-header">
                <aside className="width-100">Cart ID</aside>
                <aside className="width-300">Name</aside>
                <aside className="width-100">Quantity</aside>
                <aside className="width-100">Date</aside>
            </section>
            <section className="dashboard-body">
                {orders.map((cart, i) => {
                    return (
                        <DashboardOneCart cart={cart} />
                    )
                })}
            </section>
        </div>
    )
}

export default OrdersSection

import "./Orders.css"

import TableCreation from "./Helper/TableCreation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadAllOrdersByCartThunk } from "../../../../store/order"


function OrdersSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllOrdersByCartThunk())
    }, [dispatch])

    const orders = Object.values(useSelector(state => state.order))

    return (
        <div className="dashboard-header">
            <table>
                <thead className="dashboard-header">
                    <tr className="dashboard-tr">
                        <th className="dashboard-th-100">Cart ID</th>
                        <th className="dashboard-th-200">Name</th>
                        <th className="dashboard-th-100">Quantity</th>
                        <th className="dashboard-th-100">Date</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {orders.map((el, i) => (
                    <TableCreation orders={el} />
                ))}
            </tbody>
        </div>
    )
}

export default OrdersSection

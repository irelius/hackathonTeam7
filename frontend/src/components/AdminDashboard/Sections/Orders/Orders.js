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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Cart ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((el, i) => (
                        <TableCreation orders={el} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersSection

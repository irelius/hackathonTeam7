import "./Orders.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as orderActions from "../../../../store/order"
import TableCreation from "./HelperFuncs/TableCreation"


function OrdersSection() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(orderActions.loadAllOrdersByCartThunk())
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

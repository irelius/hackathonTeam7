import { useState } from "react";

function TableCreation({ orders }) {
    return (
        <>
            {orders.map((order, index) => (
                <tr key={index}>
                    {index === 0 ? (
                        <td>
                            {order.cartId}
                        </td>
                    ) : (
                        <td></td>
                    )}
                    <td>{order.productName}</td>
                    <td>{order.productQuantity}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                </tr>
            ))}
        </>
    );
}

export default TableCreation

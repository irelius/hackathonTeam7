function DashboardOneCart({ cart }) {
    return (
        <div>
            {cart.map((el, j) => {
                return (
                    < tr key={j} className="dashboard-table-rows">
                        {j === 0 ? (
                            <td className="dashboard-td-100">
                                {el.cartId}
                            </td>
                        ) : (
                            <td className="dashboard-td-100"></td>
                        )}
                        <td className="dashboard-td-300">{el.productName}</td>
                        <td className="dashboard-td-100">{el.productQuantity}</td>
                        <td className="dashboard-td-100">{el.createdAt.slice(0, 10)}</td>
                    </tr>
                )
            })}
        </div>
    )
}

export default DashboardOneCart

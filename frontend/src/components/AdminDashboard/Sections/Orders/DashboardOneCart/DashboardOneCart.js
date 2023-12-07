function DashboardOneCart({ cart }) {
    return (
        <div className="dashboard-one-cart">
            {cart.map((el, j) => {
                return (
                    < div key={j} className='dashboard-one-cart-row'>
                        {j === 0 ? (
                            <aside className="width-100">
                                {el.cartId}
                            </aside>
                        ) : (
                            <aside className="width-100"></aside>
                        )}
                        <aside className="width-300">{el.productName}</aside>
                        <aside className="width-100">{el.productQuantity}</aside>
                        <aside className="width-100">{el.createdAt.slice(0, 10)}</aside>
                    </div>
                )
            })}
        </div>
    )
}

export default DashboardOneCart

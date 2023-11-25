import "./Products.css"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as productActions from "../../../../store/product"

function ProductsSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(productActions.loadAllProductsThunk())
    }, [dispatch])

    const products = Object.values(useSelector(state => state.product))

    return (
        <div className="dashboard-table">
            <table>
                <thead className="dashboard-header">
                    <tr className="dashboard-tr">
                        <th className="dashboard-th-300">Name</th>
                        <th className="dashboard-th-200">Price</th>
                        <th className="dashboard-th-200">Stock</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {products.map((el, i) => (
                    <tr key={i} className="dashboard-table-rows">
                        <td className="dashboard-td-300">
                            {el.productName}
                        </td>
                        <td className="dashboard-td-200">
                            ${el.productPrice / 100}
                        </td>
                        <td className="dashboard-td-200">
                            {el.productQuantity}
                        </td>
                    </tr>
                ))}
            </tbody>
        </div>
    )
}

export default ProductsSection

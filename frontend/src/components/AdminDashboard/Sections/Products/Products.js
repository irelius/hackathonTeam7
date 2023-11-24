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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {products.map((el, i) => (
                    <tr key={i}>
                        <td>
                            {el.productName}
                        </td>
                        <td>
                            ${el.productPrice / 100}
                        </td>
                        <td>
                            {el.productQuantity}
                        </td>
                    </tr>
                ))}
            </tbody>
        </div>
    )
}

export default ProductsSection

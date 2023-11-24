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
            products
        </div>
    )
}

export default ProductsSection

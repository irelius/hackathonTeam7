import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"
import * as discountActions from "../../store/discount"
import * as orderActions from "../../store/order"
import * as productActions from "../../store/product"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productActions.loadAllProductsThunk())
    }, [])

    const product = useSelector(state => state.product)

    const handleTest = (e) => {
        e.preventDefault()

        const newProduct = {
            productName: "test product",
            productDescription: "test product descript",
            productPrice: 111,
            productQuantity: 111
        }

        const editProduct = {
            productName: "edit product",
            productDescription: "edit product descript",
            productPrice: 999,
            productQuantity: 999
        }

        const productQuantity = 1

        // dispatch(productActions.editProductQuantityThunk(1, productQuantity))

        dispatch(productActions.deleteProductThunk(1))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam

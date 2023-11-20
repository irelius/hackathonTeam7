import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"
import * as discountActions from "../../store/discount"
import * as orderActions from "../../store/order"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(orderActions.loadDateOrderThunk("2023-11-20"))
    }, [])

    const order = useSelector(state => state.order)

    const handleTest = (e) => {
        e.preventDefault()

        const newOrder = {
            cartId: 1,
            productId: 1,
            productName: "test product",
            productDescription: "test product description",
            productQuantity: 1,
            pricePerUnit: 9999,
        }

        const editOrder = {
            cartId: 1,
            productId: 1,
            productName: "edit product",
            productDescription: "edit product description",
            productQuantity: 1,
            pricePerUnit: 1111,
        }

        dispatch(orderActions.deleteOrderThunk(5))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam

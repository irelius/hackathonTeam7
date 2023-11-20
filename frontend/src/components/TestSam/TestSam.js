import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"
import * as discountActions from "../../store/discount"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addressActions.loadAllAddressesThunk())
        dispatch(discountActions.loadAllDiscountsThunk())
    }, [])

    const discount = useSelector(state => state.discount)
    const address = useSelector(state => state.address)
    console.log('booba', discount)

    const handleTest = (e) => {
        e.preventDefault()

        const newDiscount = {
            discountName: "test discount",
            discountType: "percent",
            discountValue: 15,
            expirationDate: new Date("2024-12-12")
        }

        const editDiscount = {
            discountName: "test discount",
            discountType: "percent",
            discountValue: 20,
            expirationDate: new Date("2024-12-12")
        }

        // dispatch(discountActions.addDiscountThunk(newDiscount))

        dispatch(discountActions.deleteDiscountThunk(1))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cartActions.loadUserCartThunk())
    }, [])

    const test = useSelector(state => state.cart)
    console.log('booba', test)

    const handleTest = (e) => {
        e.preventDefault()

        const newCart = {

        }

        const editAddress = {
            firstName: "test edit firstname",
            lastName: "test edit lastname",
            address: "test edit address",
            state: "test edit state",
            zipCode: "test edit zipCode"
        }

        dispatch(cartActions.deleteCartThunk(9))

        // dispatch(addressActions.deleteAddressThunk(9))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam

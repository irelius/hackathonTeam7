import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addressActions.loadAllShippingThunk())
    }, [])

    const test = useSelector(state => state.address)
    console.log('booba asdf', test)

    const handleTest = (e) => {
        e.preventDefault()

        const newAddress = {
            type: "billing",
            firstName: "test new firstname",
            lastName: "test new lastname",
            address: "test new address",
            state: "test new state",
            zipCode: "test new zipCode"
        }

        const editAddress = {
            firstName: "test edit firstname",
            lastName: "test edit lastname",
            address: "test edit address",
            state: "test edit state",
            zipCode: "test edit zipCode"
        }

        // dispatch(addressActions.editAddressThunk(9, editAddress))

        dispatch(addressActions.deleteAddressThunk(9))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam

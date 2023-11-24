import "./Discounts.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import * as discountActions from "../../../../store/discount"

function DiscountsSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(discountActions.loadAllDiscountsThunk())
    }, [dispatch])

    const discounts = Object.values(useSelector(state => state.discount))

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
            </table>
            {discounts.map((el, i) => (
                <tr key={i}>
                    <td>
                        {el.discountName}
                    </td>
                    <td>
                        {el.discountType.charAt(0).toUpperCase() + el.discountType.slice(1)} {/* Discount type is all lower case, change so that it's capitalized */}
                    </td>
                    <td>
                        {el.discountValue}
                    </td>
                    <td>
                        {el.expirationDate.slice(0, 10)}
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default DiscountsSection

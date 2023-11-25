import "./Discounts.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import * as discountActions from "../../../../store/discount"

function DiscountsSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(discountActions.loadAllDiscountsThunk())
    }, [dispatch])

    const discounts = Object.values(useSelector(state => state.discount))

    const [expandRow, setExpandRow] = useState(null);

    const handleRowClick = (index) => {
        setExpandRow((prev) => (prev === index ? null : index));
    };


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
                <tbody>
                    {discounts.map((el, i) => [
                        <tr key={i} onClick={() => handleRowClick(i)}>
                            <td>{el.discountName}</td>
                            <td>{el.discountType.charAt(0).toUpperCase() + el.discountType.slice(1)}</td>
                            <td>{el.discountValue}</td>
                            <td>{el.expirationDate.slice(0, 10)}</td>
                        </tr>,
                        expandRow === i && (
                            <tr key={`${i}-expanded`}>
                                <td colSpan="4">
                                    booba asdf asdf asdf asdf asdf asd f
                                </td>
                            </tr>
                        ),
                    ])}
                </tbody>
            </table>
        </div>
    )
}

export default DiscountsSection

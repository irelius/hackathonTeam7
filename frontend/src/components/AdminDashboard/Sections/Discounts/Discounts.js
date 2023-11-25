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
        <div className="dashboard-table">
            <table>
                <thead className="dashboard-header">
                    <tr className="dashboard-tr">
                        <th className="dashboard-th-300">Discount Name</th>
                        <th className="dashboard-th-200">Type</th>
                        <th className="dashboard-th-200">Value</th>
                        <th className="dashboard-th-200">Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map((el, i) => [
                        <tr className="dashboard-table-rows" key={i} onClick={() => handleRowClick(i)}>
                            <td className="dashboard-td-300">{el.discountName}</td>
                            <td className="dashboard-td-200">{el.discountType.charAt(0).toUpperCase() + el.discountType.slice(1)}</td>
                            <td className="dashboard-td-200">{el.discountValue}</td>
                            <td className="dashboard-td-200">{el.expirationDate.slice(0, 10)}</td>
                        </tr>,
                        expandRow === i && (
                            <tr id="expand-discount" key={`${i}-expanded`}>
                                <td colSpan="4">
                                    asdf asdf asdf asdf asdf asd f
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

import "./Discounts.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import * as discountActions from "../../../../store/discount"
import EditDiscount from "./EditDiscount/EditDiscount"

function DiscountsSection() {
    const dispatch = useDispatch()

    // variable to know if row should expand
    const [expandRow, setExpandRow] = useState(null);

    // usestate variable to keep track if discount is edited
    const [discountUpdated, setDiscountUpdated] = useState(false)

    // sort by usestate variables for discounts
    const [nameSort, setNameSort] = useState("ASC")
    const [typeSort, setTypeSort] = useState(null)
    const [valueSort, setValueSort] = useState(null)
    const [expireSort, setExpireSort] = useState(null)


    useEffect(() => {
        if (nameSort) {
            dispatch(discountActions.loadSortedDiscountsThunk("discountName", nameSort))
        }
        if (typeSort) {
            dispatch(discountActions.loadSortedDiscountsThunk("discountType", typeSort))
        }
        if (valueSort) {
            dispatch(discountActions.loadSortedDiscountsThunk("discountValue", valueSort))
        }
        if (expireSort) {
            dispatch(discountActions.loadSortedDiscountsThunk("expirationDate", expireSort))
        }
    }, [dispatch, nameSort, typeSort, valueSort, expireSort])

    const discounts = Object.values(useSelector(state => state.discount))


    const handleRowClick = (index) => {
        setExpandRow((prev) => (prev === index ? null : index));
    };

    const handleCloseExpandRow = () => {
        setExpandRow(null);
    };

    // function to handle changing the sort method
    const handleSortChanging = (mode, order) => {
        setExpandRow(null)
        if (mode === "discountName") {
            setNameSort(order)
            setTypeSort(null)
            setValueSort(null)
            setExpireSort(null)
        }
        if (mode === "discountType") {
            setNameSort(null)
            setTypeSort(order)
            setValueSort(null)
            setExpireSort(null)
        }
        if (mode === "discountValue") {
            setNameSort(null)
            setTypeSort(null)
            setValueSort(order)
            setExpireSort(null)
        }
        if (mode === "expirationDate") {
            setNameSort(null)
            setTypeSort(null)
            setValueSort(null)
            setExpireSort(order)
        }
    }

    return (
        <div>
            {/* Discounts Header */}
            <section className="dashboard-header">
                <aside className="width-200 dashboard-header-arrows">
                    Discount Name
                    <section className="pointer">
                        {nameSort === 'ASC' ? (
                            <i className="bx bx-caret-up" onClick={() => handleSortChanging('discountName', 'DESC')} />
                        ) : nameSort === 'DESC' ? (
                            <i className="bx bx-caret-down" onClick={() => handleSortChanging('discountName', 'ASC')} />
                        ) : (
                            <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('discountName', 'ASC')} />
                        )}
                    </section>
                </aside>
                <aside className="width-200 dashboard-header-arrows">
                    Type
                    <section className="pointer">
                        {typeSort === 'ASC' ? (
                            <i className="bx bx-caret-up" onClick={() => handleSortChanging('discountType', 'DESC')} />
                        ) : typeSort === 'DESC' ? (
                            <i className="bx bx-caret-down" onClick={() => handleSortChanging('discountType', 'ASC')} />
                        ) : (
                            <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('discountType', 'ASC')} />
                        )}
                    </section>
                </aside>
                <aside className="width-100 dashboard-header-arrows">
                    Value
                    <section className="pointer">
                        {valueSort === 'ASC' ? (
                            <i className="bx bx-caret-up" onClick={() => handleSortChanging('discountValue', 'DESC')} />
                        ) : valueSort === 'DESC' ? (
                            <i className="bx bx-caret-down" onClick={() => handleSortChanging('discountValue', 'ASC')} />
                        ) : (
                            <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('discountValue', 'ASC')} />
                        )}
                    </section>
                </aside>
                <aside className="width-100 dashboard-header-arrows">
                    Expiration
                    <section className="pointer">
                        {expireSort === 'ASC' ? (
                            <i className="bx bx-caret-up" onClick={() => handleSortChanging('expirationDate', 'DESC')} />
                        ) : expireSort === 'DESC' ? (
                            <i className="bx bx-caret-down" onClick={() => handleSortChanging('expirationDate', 'ASC')} />
                        ) : (
                            <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('expirationDate', 'ASC')} />
                        )}
                    </section>
                </aside>
            </section>

            {/* Discounts Body */}
            <section>
                {discounts.length === 0 ? (
                    <section className="dashboard-body no-dashboard-rows">There doesn't seem to be a discount available for customers.</section>
                ) : (
                    <section className="dashboard-body">
                        {discounts.map((el, i) => (
                            <div key={i} className="dashboard-one-discount">
                                <section className="pointer dashboard-one-discount-row" onClick={() => handleRowClick(i)}>
                                    <aside className="width-200">{el.discountName}</aside>
                                    <aside className="width-200">{el.discountType.charAt(0).toUpperCase() + el.discountType.slice(1)}</aside>
                                    <aside className="width-100">{el.discountValue}</aside>
                                    <aside className="width-100">{el.expirationDate.slice(0, 10)}</aside>
                                </section>
                                <section className={`expanded-row ${expandRow === i ? 'discount-show' : ''}`} key={i}>
                                    {expandRow === i ? (
                                        <EditDiscount discount={el} onCloseExpandRow={handleCloseExpandRow} setDiscountUpdated={setDiscountUpdated} />
                                    ) : (
                                        <></>
                                    )}
                                </section>
                            </div>
                        ))}
                    </section>
                )}
            </section>
        </div>
    )
}

export default DiscountsSection

import "./Discounts.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import * as discountActions from "../../../../store/discount"
import * as categoryActions from "../../../../store/category"
import EditDiscount from "./EditDiscount/EditDiscount"

function DiscountsSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(discountActions.loadAllDiscountsThunk())
        dispatch(categoryActions.loadAllCategoriesThunk());
    }, [dispatch])

    const discounts = Object.values(useSelector(state => state.discount))

    const [expandRow, setExpandRow] = useState(null);
    // usestate variable to keep track if product is edited
    const [discountUpdated, setDiscountUpdated] = useState(false)


    const handleRowClick = (index) => {
        setExpandRow((prev) => (prev === index ? null : index));
    };

    const handleCloseExpandRow = () => {
        setExpandRow(null);
    };

    return (
        <div>
            {/* Discounts Header */}
            <section className="dashboard-header">
                <aside className="width-200">Discount Name</aside>
                <aside className="width-100">Type</aside>
                <aside className="width-100">Value</aside>
                <aside className="width-100">Expiration</aside>
            </section>

            {/* Discounts Body */}
            <section>
                {discounts.length === 0 ? (
                    <section id="no-products" className="dashboard-body">There doesn't seem to be a discount available for customers.</section>
                ) : (
                    <section className="dashboard-body">
                        {discounts.map((el, i) => (
                            <div id="expand-container" key={i} className="dashboard-one-product">
                                <section className="pointer dashboard-one-product-row" onClick={() => handleRowClick(i)}>
                                    <aside className="width-200">{el.discountName}</aside>
                                    <aside className="width-100">{el.discountType.charAt(0).toUpperCase() + el.discountType.slice(1)}</aside>
                                    <aside className="width-100">{el.discountValue}</aside>
                                    <aside className="width-100">{el.expirationDate.slice(0, 10)}</aside>
                                </section>
                                <section className={`expanded-row ${expandRow === i ? 'show' : ''}`} key={i}>
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
        // <div className="dashboard-table">
        //     <section>
        //         <section className="dashboard-header">
        //             <section className="dashboard-tr">
        //                  <aside className="dashboard-th-300">Discount Name</aside>
        //                  <aside className="dashboard-th-200">Type</aside>
        //                  <aside className="dashboard-th-200">Value</aside>
        //                  <aside className="dashboard-th-200">Expiration</aside>
        //             </section>
        //         </section>
        //         <section>
        //             {discounts.length === 0 ? (
        //                 <div id="no-products">There doesn't seem to be a discount available for customers.</div>
        //             ) : (
        //                 <div>
        //                     {discounts.map((el, i) => (
        //                         <div id="expand-container" key={i} className="dashboard-table-rows">
        //                             <section id='expand-columns' className="pointer" onClick={() => handleRowClick(i)}>
        //                                 <aside className="dashboard-td-300">{el.discountName}</aside>
        //                                 <aside className="dashboard-td-200">{el.discountType.charAt(0).toUpperCase() + el.discountType.slice(1)}</aside>
        //                                 <aside className="dashboard-td-200">{el.discountValue}</aside>
        //                                 <aside className="dashboard-td-200">{el.expirationDate.slice(0, 10)}</aside>
        //                             </section>
        //                             <section className={`expanded-row ${expandRow === i ? 'show' : ''}`} key={i}>
        //                                 {expandRow === i ? (
        //                                     <EditDiscount discount={el} onCloseExpandRow={handleCloseExpandRow} setDiscountUpdated={setDiscountUpdated} />
        //                                 ) : (
        //                                     <></>
        //                                 )}
        //                             </section>
        //                         </div>
        //                     ))}
        //                 </div>
        //             )}
        //         </section>
        //     </section>
        // </div>
    )
}

export default DiscountsSection

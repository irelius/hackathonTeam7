import "./Products.css"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as productActions from "../../../../store/product"
import { useState } from "react"

function ProductsSection() {
    const dispatch = useDispatch()

    const [searchLetter, setSearchLetter] = useState("All")
    useEffect(() => {
        if (searchLetter === "All") {
            dispatch(productActions.loadAllProductsSortedThunk())
        } else {
            dispatch(productActions.loadLetterProductsSortedThunk(searchLetter))
        }
    }, [dispatch, searchLetter])

    const products = Object.values(useSelector(state => state.product))
    const alphabet = ['All', ...Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))];

    const isActive = (letter) => letter === searchLetter;

    return (
        <div id="temp">
            <div className="dashboard-table">
                <table>
                    <thead className="dashboard-header">
                        <tr className="dashboard-tr">
                            <th className="dashboard-th-300">Name</th>
                            <th className="dashboard-th-200">Price</th>
                            <th className="dashboard-th-200">Stock</th>
                        </tr>
                    </thead>
                </table>
                <tbody>
                    {products.length === 0 ? (
                        <div id="no-products">There are no products that start with {`${searchLetter}`}</div>
                    ) : (
                        <div id="temp">
                            {products.map((el, i) => (
                                <tr key={i} className="dashboard-table-rows">
                                    <td className="dashboard-td-300">
                                        {el.productName}
                                    </td>
                                    <td className="dashboard-td-200">
                                        ${el.productPrice / 100}
                                    </td>
                                    <td className="dashboard-td-200">
                                        {el.productQuantity}
                                    </td>
                                </tr>
                            ))}
                        </div>
                    )}
                </tbody>
            </div>
            <div id="dashboard-product-directory-bg">
                <div id="dashboard-product-directory" className="text-200">
                    {alphabet.map((letter) => (
                        <aside
                            key={letter}
                            className={isActive(letter) ? 'active-letter text-100 pointer letter-spacing' : 'pointer letter-spacing'}
                            onClick={() => setSearchLetter(letter)}
                        >
                            {letter}
                        </aside>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductsSection

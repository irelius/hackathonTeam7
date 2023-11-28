import "./Products.css"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as productActions from "../../../../store/product"
import { useState } from "react"

function ProductsSection() {
    const dispatch = useDispatch()

    // startsWith option
    const [searchLetter, setSearchLetter] = useState("All")

    // sortBy and Order option
    const [nameSort, setNameSort] = useState("ASC")
    const [priceSort, setPriceSort] = useState(null)
    const [stockSort, setStockSort] = useState(null)

    useEffect(() => {
        const sortBy = nameSort ? "productName" : priceSort ? "productPrice" : "productQuantity"
        const sortOrder = nameSort ? nameSort : priceSort ? priceSort : stockSort

        dispatch(productActions.loadAllProductsSortedThunk(sortBy, sortOrder, searchLetter))
    }, [dispatch, searchLetter, nameSort, priceSort, stockSort])

    const products = Object.values(useSelector(state => state.product))
    const alphabet = ['All', ...Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))];

    const isActive = (letter) => letter === searchLetter;


    const handleSortChanging = (mode, order) => {
        if (mode === "nameSort") {
            setNameSort(order)
            setPriceSort(null)
            setStockSort(null)
        } else if (mode === "priceSort") {
            setNameSort(null)
            setPriceSort(order)
            setStockSort(null)
        } else if (mode === "stockSort") {
            setNameSort(null)
            setPriceSort(null)
            setStockSort(order)
        }
    }

    return (
        <div id="dashboard-products-main-container">
            <div className="dashboard-table">
                <table>
                    <thead className="dashboard-header">
                        <tr className="dashboard-tr">
                            <th className="dashboard-th-300">
                                Name
                                {nameSort === "ASC" ? (
                                    <i class='bx bx-chevron-up' onClick={() => handleSortChanging("nameSort", "DESC")} />
                                ) : nameSort === "DESC" ? (
                                    <i class='bx bx-chevron-down' onClick={() => handleSortChanging("nameSort", "ASC")} />
                                ) : (
                                    <i className='bx bx-reflect-horizontal' onClick={() => handleSortChanging("nameSort", "ASC")} />
                                )}
                            </th>
                            <th className="dashboard-th-200">
                                Price
                                {priceSort === "ASC" ? (
                                    <i class='bx bx-chevron-up' onClick={() => handleSortChanging("priceSort", "DESC")} />
                                ) : priceSort === "DESC" ? (
                                    <i class='bx bx-chevron-down' onClick={() => handleSortChanging("priceSort", "ASC")} />
                                ) : (
                                    <i className='bx bx-reflect-horizontal' onClick={() => handleSortChanging("priceSort", "ASC")} />
                                )}
                            </th>
                            <th className="dashboard-th-200">
                                Stock
                                {stockSort === "ASC" ? (
                                    <i class='bx bx-chevron-up' onClick={() => handleSortChanging("stockSort", "DESC")}></i>
                                ) : stockSort === "DESC" ? (
                                    <i class='bx bx-chevron-down' onClick={() => handleSortChanging("stockSort", "ASC")}></i>
                                ) : (
                                    <i className='bx bx-reflect-horizontal' onClick={() => handleSortChanging("stockSort", "ASC")} />
                                )}
                            </th>
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
            </div >
            <div id="dashboard-product-directory-bg">
                <div id="dashboard-product-directory" className="text-200">
                    {alphabet.map((letter) => (
                        <aside
                            key={letter}
                            className={isActive(letter) ? 'active-letter text-100 pointer letter-spacing' : 'pointer letter-spacing'}
                            onClick={() => {
                                setSearchLetter(letter)
                                setNameSort("ASC")
                                setPriceSort(null)
                                setStockSort(null)
                            }}
                        >
                            {letter}
                        </aside>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ProductsSection

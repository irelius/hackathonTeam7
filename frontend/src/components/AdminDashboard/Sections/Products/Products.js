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

    const handleSearchLetter = () => {

    }


    const products = Object.values(useSelector(state => state.product))

    return (
        <div id="dashboard-product-display">
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
                        <div>There are no products that start with {`${searchLetter}`}</div>
                    ) : (
                        <div>
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
                    <aside onClick={() => setSearchLetter("All")}>All</aside>
                    <aside onClick={() => setSearchLetter("A")}>A</aside>
                    <aside onClick={() => setSearchLetter("B")}>B</aside>
                    <aside onClick={() => setSearchLetter("C")}>C</aside>
                    <aside onClick={() => setSearchLetter("D")}>D</aside>
                    <aside onClick={() => setSearchLetter("E")}>E</aside>
                    <aside onClick={() => setSearchLetter("F")}>F</aside>
                    <aside onClick={() => setSearchLetter("G")}>G</aside>
                    <aside onClick={() => setSearchLetter("H")}>H</aside>
                    <aside onClick={() => setSearchLetter("I")}>I</aside>
                    <aside onClick={() => setSearchLetter("J")}>J</aside>
                    <aside onClick={() => setSearchLetter("K")}>K</aside>
                    <aside onClick={() => setSearchLetter("L")}>L</aside>
                    <aside onClick={() => setSearchLetter("M")}>M</aside>
                    <aside onClick={() => setSearchLetter("N")}>N</aside>
                    <aside onClick={() => setSearchLetter("O")}>O</aside>
                    <aside onClick={() => setSearchLetter("P")}>P</aside>
                    <aside onClick={() => setSearchLetter("Q")}>Q</aside>
                    <aside onClick={() => setSearchLetter("R")}>R</aside>
                    <aside onClick={() => setSearchLetter("S")}>S</aside>
                    <aside onClick={() => setSearchLetter("T")}>T</aside>
                    <aside onClick={() => setSearchLetter("U")}>U</aside>
                    <aside onClick={() => setSearchLetter("V")}>V</aside>
                    <aside onClick={() => setSearchLetter("W")}>W</aside>
                    <aside onClick={() => setSearchLetter("X")}>X</aside>
                    <aside onClick={() => setSearchLetter("Y")}>Y</aside>
                    <aside onClick={() => setSearchLetter("Z")}>Z</aside>
                </div>
            </div>
        </div>
    )
}

export default ProductsSection

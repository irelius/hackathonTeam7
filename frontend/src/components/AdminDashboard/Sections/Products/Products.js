import "./Products.css"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import EditProduct from "./EditProduct"
import * as productActions from "../../../../store/product"
import * as categoryActions from "../../../../store/category"

function ProductsSection() {
    const dispatch = useDispatch();

    // startsWith option
    const [searchLetter, setSearchLetter] = useState('All');

    // sortBy and Order option
    const [nameSort, setNameSort] = useState('ASC');
    const [priceSort, setPriceSort] = useState(null);
    const [stockSort, setStockSort] = useState(null);

    useEffect(() => {
        dispatch(categoryActions.loadAllCategoriesThunk());
    }, []);

    const categories = useSelector((state) => state.category);

    useEffect(() => {
        const sortBy = nameSort ? 'productName' : priceSort ? 'productPrice' : 'productQuantity';
        const sortOrder = nameSort ? nameSort : priceSort ? priceSort : stockSort;

        dispatch(productActions.loadAllProductsSortedThunk(sortBy, sortOrder, searchLetter));
    }, [dispatch, searchLetter, nameSort, priceSort, stockSort]);

    const products = Object.values(useSelector((state) => state.product));

    const alphabet = ['All', ...Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))];
    const isActive = (letter) => letter === searchLetter;

    // function to handle changing the sorting option whether by productname, price, or quantity
    const handleSortChanging = (mode, order) => {
        setExpandRow(null);
        if (mode === 'nameSort') {
            setNameSort(order);
            setPriceSort(null);
            setStockSort(null);
        } else if (mode === 'priceSort') {
            setNameSort(null);
            setPriceSort(order);
            setStockSort(null);
        } else if (mode === 'stockSort') {
            setNameSort(null);
            setPriceSort(null);
            setStockSort(order);
        }
    };

    const [expandRow, setExpandRow] = useState(null);

    const handleRowClick = (index) => {
        setExpandRow((prev) => (prev === index ? null : index));
    };

    return (
        <div id="dashboard-products-main-container">
            <div className="dashboard-table">
                <section className="dashboard-header">
                    <section className="dashboard-tr">
                        <aside className="dashboard-th-300" id="dashboard-header-column">
                            Name
                            <section id="arrow-icon" className="pointer">
                                {nameSort === 'ASC' ? (
                                    <i className="bx bx-caret-up" onClick={() => handleSortChanging('nameSort', 'DESC')} />
                                ) : nameSort === 'DESC' ? (
                                    <i className="bx bx-caret-down" onClick={() => handleSortChanging('nameSort', 'ASC')} />
                                ) : (
                                    <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('nameSort', 'ASC')} />
                                )}
                            </section>
                        </aside>
                        <aside className="dashboard-th-200" id="dashboard-header-column">
                            Price
                            <section id="arrow-icon" className="pointer">
                                {priceSort === 'ASC' ? (
                                    <i className="bx bx-caret-up" onClick={() => handleSortChanging('priceSort', 'DESC')} />
                                ) : priceSort === 'DESC' ? (
                                    <i className="bx bx-caret-down" onClick={() => handleSortChanging('priceSort', 'ASC')} />
                                ) : (
                                    <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('priceSort', 'ASC')} />
                                )}
                            </section>
                        </aside>
                        <aside className="dashboard-th-200" id="dashboard-header-column">
                            Stock
                            <section id="arrow-icon" className="pointer">
                                {stockSort === 'ASC' ? (
                                    <i className="bx bx-caret-up" onClick={() => handleSortChanging('stockSort', 'DESC')}></i>
                                ) : stockSort === 'DESC' ? (
                                    <i className="bx bx-caret-down" onClick={() => handleSortChanging('stockSort', 'ASC')}></i>
                                ) : (
                                    <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('stockSort', 'ASC')} />
                                )}
                            </section>
                        </aside>
                    </section>
                </section>
                <section>
                    {products.length === 0 ? (
                        <div id="no-products">There are no products that start with {`${searchLetter}`}</div>
                    ) : (
                        <div>
                            {products.map((el, i) => (
                                <div id="expand-container" key={i} className="dashboard-table-rows pointer" onClick={() => handleRowClick(i)}>
                                    <section id='expand-columns'>
                                        <aside className="dashboard-td-300">{el.productName}</aside>
                                        <aside className="dashboard-td-200">${el.productPrice / 100}</aside>
                                        <aside className="dashboard-td-200">{el.productQuantity}</aside>
                                    </section>
                                    <section className={`expanded-row ${expandRow === i ? 'show' : ''}`} key={i}>
                                        <EditProduct product={el} />
                                    </section>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <div id="dashboard-product-directory-bg">
                <div id="dashboard-product-directory" className="text-200">
                    {alphabet.map((letter) => (
                        <aside
                            key={letter}
                            className={isActive(letter) ? 'active-letter text-100 pointer letter-spacing' : 'pointer letter-spacing'}
                            onClick={() => {
                                setSearchLetter(letter);
                                setNameSort('ASC');
                                setPriceSort(null);
                                setStockSort(null);
                                setExpandRow(null);
                            }}
                        >
                            {letter}
                        </aside>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsSection

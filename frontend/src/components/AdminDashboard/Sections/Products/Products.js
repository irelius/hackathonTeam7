import "./Products.css"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import EditProduct from "./EditProduct"
import * as productActions from "../../../../store/product"
import * as categoryActions from "../../../../store/category"
import SortArrowSection from "../../ReusableSections/SortArrowSection"

function ProductsSection() {
    const dispatch = useDispatch();

    // useState variable to set startsWith option to "All"
    const [searchLetter, setSearchLetter] = useState('All');

    // usestate variable to keep track if product is edited
    const [productUpdated, setProductUpdated] = useState(false)

    // sortBy and order option usestate variables
    const [nameSort, setNameSort] = useState('ASC');
    const [priceSort, setPriceSort] = useState(null);
    const [stockSort, setStockSort] = useState(null);

    // if product gets updated, redispatch the categories of the product
    useEffect(() => {
        dispatch(categoryActions.loadAllCategoriesThunk());
    }, [productUpdated]);

    // useeffect to dispatch what products to display depending on the starting letter, order, quantity, price, etc.
    useEffect(() => {
        const sortBy = nameSort ? 'productName' : priceSort ? 'productPrice' : 'productQuantity';
        const sortOrder = nameSort ? nameSort : priceSort ? priceSort : stockSort;

        dispatch(productActions.loadAllProductsSortedThunk(sortBy, sortOrder, searchLetter));
    }, [dispatch, productUpdated, searchLetter, nameSort, priceSort, stockSort]);

    const products = Object.values(useSelector((state) => state.product));

    // alphabet variable for the product directory
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

    const handleCloseExpandRow = () => {
        setExpandRow(null);
    };

    return (
        <div>
            {/* Products Header */}
            <section className="dashboard-header">
                <aside className="width-300 dashboard-header-arrows">
                    Name
                    <section className="pointer">
                        <SortArrowSection sortType={nameSort} handleSortChanging={(order) => handleSortChanging('nameSort', order)} />
                    </section>
                </aside>
                <aside className="width-200 dashboard-header-arrows">
                    Price
                    <section className="pointer">
                        <SortArrowSection sortType={priceSort} handleSortChanging={(order) => handleSortChanging('priceSort', order)} />
                    </section>
                </aside>
                <aside className="width-150 dashboard-header-arrows">
                    Stock
                    <section className="pointer">
                        <SortArrowSection sortType={stockSort} handleSortChanging={(order) => handleSortChanging('stockSort', order)} />
                    </section>
                </aside>
            </section>

            {/* Products Body */}
            <section>
                {products.length === 0 ? (
                    <section className="dashboard-body no-dashboard-rows">There are no products that start with {`${searchLetter}`}</section>
                ) : (
                    <section className="dashboard-body" id="product-spacing">
                        {products.map((el, i) => (
                            <div key={i} className="dashboard-one-product">
                                <section className="pointer dashboard-one-product-row" onClick={() => handleRowClick(i)}>
                                    <aside className="width-300">{el.productName}</aside>
                                    <aside className="width-200">${el.productPrice / 100}</aside>
                                    <aside className="width-150">{el.productQuantity}</aside>
                                </section>
                                <section className={`expanded-row ${expandRow === i ? 'product-show' : ''}`} key={i}>
                                    {expandRow === i ? (
                                        <EditProduct product={el} onCloseExpandRow={handleCloseExpandRow} setProductUpdated={setProductUpdated} />
                                    ) : (
                                        <></>
                                    )}
                                </section>
                            </div>
                        ))}
                    </section>
                )}
            </section>

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

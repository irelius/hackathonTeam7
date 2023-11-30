import "./EditProduct.css"

import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"

import * as productCategoryActions from "../../../../../store/productcategory"
import * as categoryActions from "../../../../../store/category"
import * as productActions from "../../../../../store/product"

function EditProduct({ product, onCloseExpandRow, setProductUpdated }) {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(productCategoryActions.loadProductCategoryByProduct(product.id))
    }, [dispatch])

    const allProductCategories = useSelector(state => state.productCategory)
    const allCategories = useSelector(state => state.category)

    const colorSection = Object.values(allCategories).filter(el => el.section === "Color");
    const availabilitySection = Object.values(allCategories).filter(el => el.section === "Availability");
    const furnitureSection = Object.values(allCategories).filter(el => el.section === "Furniture");
    const locationSection = Object.values(allCategories).filter(el => el.section === "Location");

    const [name, setName] = useState(product.productName)
    const [price, setPrice] = useState(product.productPrice / 100)
    const [stock, setStock] = useState(product.productQuantity)
    const [description, setDescription] = useState(product.productDescription)

    const [currPCs, setCurrPCs] = useState({})
    const [copyCurrPCs, setCopyCurrPCs] = useState({})

    // useEffect to set up the currPCs useState variable. Object with categoryNames as key for O(1) lookup. requires some time to set up though
    useEffect(() => {
        const productCategories = {};
        for (let i = 0; i < Object.values(allProductCategories).length; i++) {
            let curr = Object.values(allProductCategories)[i];
            if (curr && curr.Category) { // Check if curr and curr.Category are defined
                productCategories[curr.Category.categoryName] = true;
            }
        }

        setCurrPCs(prevState => ({
            ...prevState,
            ...productCategories,
        }));
        setCopyCurrPCs(prevState => ({
            ...prevState,
            ...currPCs,
        }));
    }, [allProductCategories]);

    // function to handle clicking a checkbox and updates the currPCs useState variable.
    const handleCheckBoxClick = (categoryName, e) => {
        e.stopPropagation();
        const categoryUpdater = { ...currPCs }
        if (categoryUpdater[categoryName]) {
            delete categoryUpdater[categoryName]
        } else {
            categoryUpdater[categoryName] = true
        }
        setCurrPCs(categoryUpdater)
    }

    const handleProductEdit = () => {
        // handle any edits made to product name, price, and quantity
        const newProductInfo = {
            productName: name,
            productPrice: price * 100,
            productDescription: description,
            productQuantity: stock,
        }
        dispatch(productActions.editProductThunk(product.id, newProductInfo))

        // handle any edits amde to the product categories
        dispatch(productCategoryActions.editProductCategoryThunk(product.id, Object.keys(currPCs)))

        setProductUpdated(prevState => !prevState)

        return onCloseExpandRow()
    }

    const handleCancel = () => {
        setCurrPCs(() => ({
            ...copyCurrPCs
        }))
        return onCloseExpandRow()
    }

    return (
        <div id="product-main-container" className="bg-200">
            <section id="product-link">
                View <p onClick={() => history.push(`/products/${product.id}`)} id="product-name" className="text-200">{product.productName}</p>
            </section>
            <section id="product-info-container">
                <aside id="product-edit-container">
                    <section>
                        <aside>Edit Name:</aside>
                        <input
                            type="text"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside>Edit Price:</aside>
                        <input
                            type="number"
                            defaultValue={`${price}`}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside>Edit Stock:</aside>
                        <input
                            type="number"
                            defaultValue={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </section>
                </aside>
                <aside>
                    <aside id='product-description'>Edit Description</aside>
                    <textarea
                        id="product-description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </aside>
            </section>
            <section id="category-header-container">
                <aside>Color</aside>
                <aside>Furniture</aside>
                <aside>Location</aside>
            </section >
            <section id="category-body-container">
                <section>
                    {colorSection.map(el => (
                        <div key={`color-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`color-${el.id}`}
                                checked={currPCs[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`color-${el.id}`} onClick={(e) => e.preventDefault()}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
                {/* TO DO: see if availability is somethign that should be an option */}
                {/* <section>
                    {availabilitySection.map(el => (
                        <div key={`availability-${el.id}`}>
                            <input
                                type="radio"
                                id={`availability-${el.id}`}
                                name="availability"
                            />
                            <label htmlFor={`availability-${el.id}`} onClick={(e) => e.preventDefault()}>
                                {el.categoryName === "Instock" ? "In Stock" : "Out of Stock"}
                            </label>
                        </div>
                    ))}
                </section> */}
                <section>
                    {furnitureSection.map(el => (
                        <div key={`furniture-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`furniture-${el.id}`}
                                checked={currPCs[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`furniture-${el.id}`} onClick={(e) => e.preventDefault()}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
                <section>
                    {locationSection.map(el => (
                        <div key={`location-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`location-${el.id}`}
                                checked={currPCs[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`location-${el.id}`} onClick={(e) => e.preventDefault()}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
            </section>
            <section id="save-changes-container">
                <p id="product-save-changes" className="pointer" onClick={() => handleProductEdit()}>
                    Save Changes
                </p>
                <p id="product-cancel-changes" className="pointer" onClick={() => handleCancel()} >
                    Cancel
                </p>
            </section>
        </div>
    )
}

export default EditProduct

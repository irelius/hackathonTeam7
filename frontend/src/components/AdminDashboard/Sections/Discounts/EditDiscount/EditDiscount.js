import { useState } from "react"
import "./EditDiscount.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import * as discountCategoryActions from "../../../../../store/discountcategory"
import * as discountActions from "../../../../../store/discount"

function EditDiscount({ discount, onCloseExpandRow, setDiscountUpdated }) {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(discountCategoryActions.loadDiscountCategoryByDiscountThunk(discount.id))
    }, [dispatch])

    const allDiscountCategories = useSelector(state => state.discountCategory)
    const allCategories = useSelector(state => state.category)

    console.log('booba', discount)

    const colorSection = Object.values(allCategories).filter(el => el.section === "Color");
    const availabilitySection = Object.values(allCategories).filter(el => el.section === "Availability");
    const furnitureSection = Object.values(allCategories).filter(el => el.section === "Furniture");
    const locationSection = Object.values(allCategories).filter(el => el.section === "Location");

    const [name, setName] = useState(discount.discountName)
    const [type, setType] = useState(discount.discountType)
    const [value, setValue] = useState(discount.discountValue)
    const [expiration, setExpiration] = useState(discount.expirationDate.slice(0, 10))

    const [currDCs, setCurrDCs] = useState({})
    const [copyCurrDCs, setCopyCurrDCs] = useState({})


    // useEffect to set up the currDCs useState variable. Object with categoryNames as key for O(1) lookup. requires some time to set up though
    useEffect(() => {
        const discountCategories = {};
        let dcArr = Object.values(allDiscountCategories)
        for (let i = 0; i < dcArr.length; i++) {
            let curr = dcArr[i];
            if (curr && curr.Category) { // Check if curr and curr.Category are defined
                discountCategories[curr.Category.categoryName] = true;
            }
        }

        setCurrDCs(prevState => ({
            ...prevState,
            ...discountCategories,
        }))
        setCopyCurrDCs(prevState => ({
            ...prevState,
            ...currDCs,
        }));
    }, [allDiscountCategories]);

    // function to handle clicking a checkbox and updates the currDCs useState variable.
    const handleCheckBoxClick = (categoryName, e) => {
        e.stopPropagation();
        const categoryUpdater = { ...currDCs }
        if (categoryUpdater[categoryName]) {
            delete categoryUpdater[categoryName]
        } else {
            categoryUpdater[categoryName] = true
        }
        setCurrDCs(categoryUpdater)
    }

    console.log('booba', currDCs)

    const handleDiscountEdit = () => {
        // handle any edits made to product name, price, and quantity
        const newDiscountInfo = {
            discountName: name,
            discountType: type.toLowerCase(),
            discountValue: value,
            expirationDate: expiration,
        }
        dispatch(discountActions.editDiscountThunk(discount.id, newDiscountInfo))

        // handle any edits amde to the product categories
        dispatch(discountCategoryActions.editDiscountCategoryThunk(discount.id, Object.keys(currDCs)))

        setDiscountUpdated(prevState => !prevState)

        return onCloseExpandRow()
    }

    const handleCancel = () => {
        setCurrDCs(() => ({
            ...copyCurrDCs
        }))
        return onCloseExpandRow()
    }

    // function to handle radio button clicking for discount type
    const handleRadioClick = (type, e) => {
        e.stopPropagation()
        setType(type)
    }

    return (
        <div id="product-main-container" className="bg-200">
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
                        <aside>Edit Value:</aside>
                        <input
                            type="number"
                            defaultValue={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside id='product-description'>Edit Expiration</aside>
                        <input
                            id="product-description-input"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                        />
                    </section>
                </aside>
                <aside>
                    <section>
                        <aside>Edit Discount Type</aside>
                        <input
                            type="radio"
                            id="type-percent"
                            checked={type === "percent"}
                            onClick={(e) => handleRadioClick("percent", e)}
                        />
                        <label htmlFor={`type-percent`} onClick={(e) => e.preventDefault()}>
                            Percent
                        </label>
                    </section>
                    <section>
                        <input
                            type="radio"
                            id="type-flat"
                            checked={type === "flat"}
                            onClick={(e) => handleRadioClick("flat", e)}
                        />
                        <label htmlFor={`type-flat`} onClick={(e) => e.preventDefault()}>
                            Flat Discount
                        </label>
                    </section>
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
                                checked={currDCs[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`color-${el.id}`} onClick={(e) => e.preventDefault()}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
                <section>
                    {furnitureSection.map(el => (
                        <div key={`furniture-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`furniture-${el.id}`}
                                checked={currDCs[el.categoryName]}
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
                                checked={currDCs[el.categoryName]}
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
                <p id="product-save-changes" className="pointer" onClick={() => handleDiscountEdit()}>
                    Save Changes
                </p>
                <p id="product-cancel-changes" className="pointer" onClick={() => handleCancel()} >
                    Cancel
                </p>
            </section>
        </div>
    )
}

export default EditDiscount

import "./EditDiscount.css"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import * as discountCategoryActions from "../../../../../store/discountcategory"
import * as discountActions from "../../../../../store/discount"
import CategorySection from "../../../ReusableSections/CategorySection"

function EditDiscount({ discount, onCloseExpandRow, setDiscountUpdated }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(discountCategoryActions.loadDiscountCategoryByDiscountThunk(discount.id))
    }, [dispatch, discount.id])

    const allDiscountCategories = useSelector(state => state.discountCategory)
    const [name, setName] = useState(discount.discountName)
    const [type, setType] = useState(discount.discountType)
    const [value, setValue] = useState(discount.discountValue)
    const [expiration, setExpiration] = useState(discount.expirationDate.slice(0, 10))

    const [currCats, setCurrCats] = useState({})
    const [copyCurrCats, setCopyCurrCats] = useState({})
    const [newCategories, setNewCategories] = useState({})

    // useEffect to set up the currCats useState variable. Object with categoryNames as key for O(1) lookup. requires some time to set up though
    useEffect(() => {
        const discountCategories = {};
        let dcArr = Object.values(allDiscountCategories)
        for (let i = 0; i < dcArr.length; i++) {
            let curr = dcArr[i];
            if (curr && curr.Category) { // Check if curr and curr.Category are defined
                discountCategories[curr.Category.categoryName] = true;
            }
        }

        setCurrCats(prevState => ({
            ...prevState,
            ...discountCategories,
        }))
        setCopyCurrCats(prevState => ({
            ...prevState,
            ...currCats,
        }));
    }, [allDiscountCategories]);

    const handleCategorySelection = (updatedCategories) => {
        setNewCategories(updatedCategories)
    }

    const handleDiscountEdit = () => {
        // handle any edits made to discount name, type, value, and expiration date
        const newDiscountInfo = {
            discountName: name,
            discountType: type.toLowerCase(),
            discountValue: value,
            expirationDate: expiration,
        }
        dispatch(discountActions.editDiscountThunk(discount.id, newDiscountInfo))

        // handle any edits amde to the discount categories
        dispatch(discountCategoryActions.editDiscountCategoryThunk(discount.id, Object.keys(newCategories)))

        setDiscountUpdated(prevState => !prevState)

        return onCloseExpandRow()
    }

    const handleCancel = () => {
        setCurrCats(() => ({
            ...copyCurrCats
        }))
        return onCloseExpandRow()
    }

    // function to handle radio button clicking for discount type
    const handleRadioClick = (type, e) => {
        e.stopPropagation()
        setType(type)
    }

    return (
        <form onSubmit={handleDiscountEdit} id="discount-main-container" className="bg-200">
            <section id="discount-info-container">
                <aside id="discount-edit-container">
                    <section>
                        <aside>Edit Name:</aside>
                        <input
                            type="text"
                            required
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside>Edit Value:</aside>
                        <input
                            type="number"
                            required
                            defaultValue={value}
                            max={type === "percent" ? 100 : undefined}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside id='discount-expiration'>Edit Expiration</aside>
                        <input
                            id="discount-expiration-input"
                            type="date"
                            required
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                        />
                    </section>
                </aside>
                <aside id="discount-type-container">
                    <section id="category-section-map">
                        <aside>Edit Discount Type</aside>
                        <input
                            type="radio"
                            id="type-percent"
                            checked={type === "percent"}
                            onClick={(e) => handleRadioClick("percent", e)}
                        />
                        <label htmlFor={`type-percent`} onClick={(e) => {
                            e.preventDefault()
                            handleRadioClick("percent", e)
                        }}>
                            Percent
                        </label>
                    </section>
                    <section id="category-section-map">
                        <input
                            type="radio"
                            id="type-flat"
                            checked={type === "flat"}
                            onClick={(e) => handleRadioClick("flat", e)}
                        />
                        <label htmlFor={`type-flat`} onClick={(e) => {
                            e.preventDefault()
                            handleRadioClick("flat", e)
                        }}>
                            Flat Discount
                        </label>
                    </section>
                </aside>
            </section>

            <section>
                <CategorySection onCategoryChange={handleCategorySelection} currCats={currCats} setCurrCats={setCurrCats} />
            </section>

            <section id="save-changes-container">
                <button id="discount-save-changes" className="pointer" type="submit">
                    Save Changes
                </button>
                <button id="discount-cancel-changes" className="pointer" onClick={() => handleCancel()} >
                    Cancel
                </button >
            </section>
        </form>
    )
}

export default EditDiscount

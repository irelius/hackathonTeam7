import "./CreateDiscount.css"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as discountActions from "../../../../store/discount"
import * as categoryActions from "../../../../store/category"
import CategorySection from "../../ReusableSections/CategorySection"



function CreateDiscount() {
    const dispatch = useDispatch()

    const [discountName, setDiscountName] = useState("")
    const [discountType, setDiscountType] = useState("percent")
    const [discountValue, setDiscountValue] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [discountCategories, setDiscountCategories] = useState([])

    useEffect(() => {
        dispatch(categoryActions.loadAllCategoriesThunk())
    }, [])

    const allCategories = useSelector(state => state.category)
    const colorSection = Object.values(allCategories).filter(el => el.section === "Color");
    const furnitureSection = Object.values(allCategories).filter(el => el.section === "Furniture");
    const locationSection = Object.values(allCategories).filter(el => el.section === "Location");

    const [currCats, setCurrCats] = useState({})
    const [copyCurrCats, setCopyCurrCats] = useState({})

    // function to handle clicking a checkbox and updates the currCats useState variable.
    const handleCheckBoxClick = (categoryName, e) => {
        e.stopPropagation();
        const categoryUpdater = { ...currCats }
        if (categoryUpdater[categoryName]) {
            delete categoryUpdater[categoryName]
        } else {
            categoryUpdater[categoryName] = true
        }
        setCurrCats(categoryUpdater)
    }


    return (
        <div id="temp">
            <section>Create a New Discount</section>

            <section>
                <section>discountName</section>
            </section>
            <section>
                <section>discountType</section>
            </section>
            <section>

                <section>discountValue</section>
            </section>
            <section>
                <section>expirationDate</section>
            </section>

            <section id="category-section">
                <CategorySection />
            </section>

            <section>
                <button>Create New Discount</button>
                <button>Clear</button>
            </section>

        </div>
    )
}

export default CreateDiscount

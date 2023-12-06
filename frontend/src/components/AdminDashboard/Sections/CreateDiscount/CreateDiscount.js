import "./CreateDiscount.css"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as discountActions from "../../../../store/discount"
import * as categoryActions from "../../../../store/category"
import CategorySection from "../../ReusableSections/CategorySection"

function CreateDiscount() {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [type, setType] = useState("percent")
    const [value, setValue] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [categories, setCategories] = useState({})

    const [currCats, setCurrCats] = useState({})
    const [clearCats, setClearCats] = useState({})

    const handleCategorySelection = (updatedCategories) => {
        setCategories(updatedCategories)
    }

    // function to handle radio button clicking for discount type
    const handleRadioClick = (type, e) => {
        e.stopPropagation()
        setType(type)
    }

    const handleClear = () => {
        setCurrCats(prevState => ({
            prevState,
            ...clearCats
        }))
    }

    const handleSubmit = () => {
        const newDiscount = {
            discountName: name,
            discountType: type,
            discountValue: value,
            expirationDate: expirationDate
        }

        dispatch(discountActions.addDiscountThunk(newDiscount))
    }

    return (
        <div id="temp">
            <section>
                <div>Create a New Discount</div>
            </section>
            <section>
                <section>
                    <section>Discount Code Name</section>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </section>
                <section>
                    <section>Discount Type</section>
                    <section>
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
                </section>
                <section>

                    <section>Discount Value</section>
                    <input
                        type="number"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </section>
                <section>
                    <section>Expiration Date</section>
                    <input
                        type="date"
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                </section>
            </section>

            <section>
                <section id="category-section">
                    <CategorySection onCategoryChange={handleCategorySelection} currCats={currCats} setCurrCats={setCurrCats} />
                </section>
            </section>


            <section>
                <section>
                    <button onClick={handleSubmit}>Create New Discount</button>
                    <button onClick={handleClear}>Clear</button>
                </section>
            </section>

        </div>
    )
}

export default CreateDiscount

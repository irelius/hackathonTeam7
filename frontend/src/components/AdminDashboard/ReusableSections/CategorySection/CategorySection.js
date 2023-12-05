import "./CategorySection.css"

import { useSelector } from "react-redux"

function CategorySection({ onCategoryChange, currCats, setCurrCats }) {
    const allCategories = useSelector(state => state.category)
    const colorSection = Object.values(allCategories).filter(el => el.section === "Color");
    const furnitureSection = Object.values(allCategories).filter(el => el.section === "Furniture");
    const locationSection = Object.values(allCategories).filter(el => el.section === "Location");

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
        onCategoryChange(categoryUpdater)
    }

    return (
        <div id="category-section">
            <aside>
                <section className="underline">Color</section>
                <section id="category-section-map">
                    {colorSection.map(el => (
                        <div key={`color-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`color-${el.id}`}
                                checked={currCats[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`color-${el.id}`} onClick={(e) => {
                                e.preventDefault()
                                handleCheckBoxClick(el.categoryName, e)
                            }}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
            </aside>
            {/* <aside>
                    TO DO: see if availability is somethign that should be an option
                    <section>Availability</section>
                    <section>
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
                    </section>
                </aside> */}
            <aside>
                <section className="underline">Furniture</section>
                <section id="category-section-map">
                    {furnitureSection.map(el => (
                        <div key={`furniture-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`furniture-${el.id}`}
                                checked={currCats[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`furniture-${el.id}`} onClick={(e) => {
                                e.preventDefault()
                                handleCheckBoxClick(el.categoryName, e)
                            }}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
            </aside>
            <aside>
                <section className="underline">Location</section>
                <section id="category-section-map">
                    {locationSection.map(el => (
                        <div key={`location-${el.id}`}>
                            <input
                                type="checkbox"
                                id={`location-${el.id}`}
                                checked={currCats[el.categoryName]}
                                onClick={(e) => handleCheckBoxClick(el.categoryName, e)}
                            />
                            <label htmlFor={`location-${el.id}`} onClick={(e) => {
                                e.preventDefault()
                                handleCheckBoxClick(el.categoryName, e)
                            }}>
                                {el.categoryName}
                            </label>
                        </div>
                    ))}
                </section>
            </aside>
        </div>
    )
}

export default CategorySection

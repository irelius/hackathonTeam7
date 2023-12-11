import "./Reviews.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadAllReviewByDateThunk } from "../../../../store/review"
import { clearUser, loadAllUsersThunk } from "../../../../store/user"
import { loadAllProductsThunk } from "../../../../store/product"

function ReviewsSection({ allUsers }) {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        dispatch(loadAllReviewByDateThunk())
        dispatch(loadAllUsersThunk())
        dispatch(loadAllProductsThunk())
        setLoad(true)

        return (() => (
            dispatch(clearUser())
        ))
    }, [dispatch])

    const reviews = Object.values(useSelector(state => state.review))
    const products = useSelector(state => state.product)

    return (
        < div id="review-main-container" >
            {reviews.map((el, i) => (
                <div key={`review-${i}`} id='review-container'>
                    <section id="review-header">
                        <aside id="review-header-left">
                            <aside id="review-product-name">
                                {products[el.productId] ? (
                                    products[el.productId].productName
                                ) : (
                                    <></>
                                )}
                            </aside>
                            <aside className="text-200">
                                by {allUsers[el.userId] ? (
                                    allUsers[el.userId].username
                                ) : (
                                    <></>
                                )}
                            </aside>
                        </aside>
                        <aside>
                            {el.createdAt.slice(0, 10)}
                        </aside>
                    </section>
                    <section>
                        {el.review}
                    </section>
                    <section>
                        {Array.from({ length: el.rating }, (_, index) => {
                            return (
                                <i key={`star-${i}`}  className="bx bx-star" />
                            )
                        })}
                    </section>
                </div>
            ))}
        </div >
    )
}

export default ReviewsSection

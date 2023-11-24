import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearReview, loadAllReviewByDateThunk } from "../../../../store/review"
import { clearUser, loadAllUsersThunk } from "../../../../store/user"

function ReviewsSection({ allUsers }) {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        dispatch(loadAllReviewByDateThunk())
        dispatch(loadAllUsersThunk())

        setLoad(true)

        return (() => (
            dispatch(clearUser())
        ))
    }, [dispatch])

    const reviews = Object.values(useSelector(state => state.review))

    return load ? (
        <div>
            {reviews.map((el, i) => (
                <div key={i}>
                    {allUsers[el.userId] ? (
                        allUsers[el.userId].username
                    ) : (
                        <></>
                    )}
                    <section>
                        {el.review}
                    </section>
                    <section>
                        {el.createdAt.slice(0, 10)}
                    </section>
                </div>
            ))}
        </div>
    ) : (
        <div></div>
    )
}

export default ReviewsSection

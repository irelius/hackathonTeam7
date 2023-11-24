import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadAllReviewByDateThunk } from "../../../../store/review"
import { loadAllUsersThunk } from "../../../../store/user"

function ReviewsSection() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllReviewByDateThunk())
        dispatch(loadAllUsersThunk())
    }, [dispatch])

    const reviews = Object.values(useSelector(state => state.review))
    const allUsers = useSelector(state => state.user)

    return (
        <div>
            {reviews.map((el, i) => (
                <div key={i}>
                    <section>
                        {allUsers[el.userId].username}
                    </section>
                    <section>
                        {el.review}
                    </section>
                    <section>
                        {el.createdAt.slice(0, 10)}
                    </section>
                </div>
            ))}
        </div>
    )
}

export default ReviewsSection

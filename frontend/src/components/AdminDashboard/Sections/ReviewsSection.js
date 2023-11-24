

function ReviewsSection() {

  return (
    <>

      {sessionUser?.id !== 1 ? (
        <div className="profile-right">
          <h2>Reviews</h2>
          {reviews.map((review) => (
            <div key={review.id}>
              <div className="review-info">
                <li className="info product">
                  {
                    products.find(
                      (product) => product.id === review.productId
                    )?.productName
                  }
                </li>
                <li>{renderStars(review.rating)}</li>
              </div>
              <div className="review-info">
                <li>{review.review}</li>
              </div>
              <div className="review-info">
                <li> - {formatDate(review.createdAt)}</li>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ReviewsSection;

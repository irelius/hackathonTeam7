import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllBillingsThunk,
  loadOneBillingThunk,
  loadUserBillingsThunk,
} from "../../store/billingaddress";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./ProfilePage.css";
import { loadUserReviewsThunk } from "../../store/review";
import { loadAllProductsThunk } from "../../store/product";

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const billingObj = useSelector((state) => state.billingAddress);
  const reviewsObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewsObj);
  const productObj = useSelector((state) => state.product);
  const products = Object.values(productObj);

  useEffect(() => {
    if (sessionUser?.id === 1) {
      dispatch(loadAllBillingsThunk());
    } else {
      dispatch(loadOneBillingThunk(sessionUser?.id));
      dispatch(loadUserReviewsThunk(sessionUser?.id));
      dispatch(loadAllProductsThunk());
    }
  }, [dispatch, sessionUser]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Render a full star
        stars.push(<i key={i} className="bx bxs-star"></i>);
      } else {
        // Render an empty star
        stars.push(<i key={i} className="bx bx-star"></i>);
      }
    }
    return stars;
  };

  if (!sessionUser) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className={`container profile ${reviews.length > 0 ? 'reviews-present' : ''}`}>
        <div className="profile header">
          <h1>
            <i className="bx bxs-user-circle user-icon"></i>
            {sessionUser.username}
          </h1>
        </div>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile email">
              <div className="info-header">
                <h2>Personal information</h2>
                <button className="info-edit-btn">
                  Edit <i className="bx bx-pencil"></i>
                </button>
              </div>
              <h3>Email</h3>
              <li>{sessionUser.email}</li>
            </div>
            <div className="profile address">
              <div className="info-header">
                <h2>Address</h2>
                <button className="info-edit-btn">
                  Edit <i className="bx bx-pencil"></i>
                </button>
              </div>
              <div className="address-row">
                <div>
                  <h3>Street</h3>
                  <li>{billingObj.billingAddress}</li>
                </div>
                <div>
                  <h3>State</h3>
                  <li>{billingObj.billingState}</li>
                </div>
                <div>
                  <h3>Postal Code</h3>
                  <li>{billingObj.billingZipCode}</li>
                </div>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

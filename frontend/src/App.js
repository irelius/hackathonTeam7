import React, { useState, useEffect, Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import OrderPage from "./components/OrderPage";
import ReviewPage from "./components/ReviewPage";
import CartPage from "./components/CartPage";
import PaymentSuccess from "./components/StripePayment/PaymentSuccess";
import PaymentCancel from "./components/StripePayment/PaymentCancel";
import ProfilePage from "./components/ProfilePage";
import LandingPage from "./components/LandingPage";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import ProductsPage from "./components/Products";
import SingleProductPage from "./components/Products/SingleProductPage";
import TestSam from "./components/TestSam/TestSam";
import CartPage2 from "./components/CartPage/CartPage";

// import Homespace from "./components/HomeSpace";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  //home position [-2, 4, 10]
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {/* <Suspense>
              <directionalLight position={[8, 7, 1]} ref={dirLight} color={"#005F00"} castShadow intensity={20} shadow-mapSize={2048} shadow-bias={-0.001}/>
              <Canvas dpr={[1, 2]} shadows>

                <color attach="background" args={["#213547"]} />
                <Homespace />
              </Canvas>
            </Suspense>
              <Loader /> */}

            <LandingPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/admin">
            <AdminDashboard />
          </Route>
          <Route path="/profile">
            <CustomerDashboard />
          </Route>
          <Route path="/all">
            <ProductsPage />
          </Route>
          <Route path="/products/:id">
            <SingleProductPage />
          </Route>
          {/* <Route path="/reviews">
            <ReviewPage />
          </Route>
          <Route path="/orders">
            <OrderPage />
          </Route> */}
          {/* <Route path="/profile">
            <ProfilePage />
          </Route> */}
          <Route path="/cart">
            {/* <CartPage /> */}
            <CartPage2 />
          </Route>
          <Route path="/payment/success">
            <PaymentSuccess />
          </Route>
          <Route path="/payment/cancel">
            <PaymentCancel />
          </Route>
          {/* Just a test route for my purposes */}
          <Route path="/test">
            <TestSam />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

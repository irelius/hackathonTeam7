import React, { useState, useEffect, Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homespace from "./components/HomeSpace";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import OrderPage from "./components/OrderPage";
import ReviewPage from "./components/ReviewPage";
import CartPage from "./components/CartPage";
import PaymentSuccess from "./components/StripePayment/PaymentSuccess";
import PaymentCancel from "./components/StripePayment/PaymentCancel";
import ProfilePage from "./components/ProfilePage";


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
          <Route path="/">
            <Suspense>
              {/* <directionalLight position={[8, 7, 1]} ref={dirLight} color={"#005F00"} castShadow intensity={20} shadow-mapSize={2048} shadow-bias={-0.001}/> */}
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Route path="/reviews">
                <ReviewPage />
              </Route>
              <Route path="/orders">
                <OrderPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/payment/success">
                <PaymentSuccess />
              </Route>
              <Route path="/payment/cancel">
                <PaymentCancel />
              </Route>
              <Canvas dpr={[1, 2]} shadows>

                <color attach="background" args={["#213547"]} />
                <Homespace />
              </Canvas>
            </Suspense>
              <Loader />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

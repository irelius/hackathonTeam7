import React, { useRef, useState, useEffect } from "react";
import {
  ScrollControls,
  PerspectiveCamera,
  OrbitControls,
  Gltf,
  Html
} from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import roboto from './fonts/Roboto_Bold.json'
import { Model } from "./Scene";
import SubScene from "../SubScene";
import ListScene from "../ListScene";
import ProductScene from "../ProductScene";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Scene.css";

extend({ TextGeometry })


export default function Homespace() {
  const [position, setPosition] = useState([1, -4, 2]);
  const [category, setCategory] = useState("");
  const [rotation, setRotation] = useState([0.1, 0.1, 0]);
  const [hover, setHover] = useState(false);
  const [list, setList] = useState(false);
  const [home, setHome] = useState(true);
  const [signup, setSignup] = useState(false);
  const [constant, setConstant] = useState(10);
  const cameraRef = useRef(null);
  const [product, setProduct] = useState({});
  const [showProduct, setShowProduct] = useState(false);

  const history = useHistory(); // Initialize history

  const signupPos = (cameraRef, pX, pY, pZ, rX, rY, rZ) => {
    if (cameraRef.current.position.y < -3)
      cameraRef.current.position.y += (-3 - pY) / constant;
    if (cameraRef.current.position.y > -3)
      cameraRef.current.position.y -= (pY - -3) / constant;
    if (cameraRef.current.position.x < 8)
      cameraRef.current.position.x += (8 - pX) / constant;
    if (cameraRef.current.position.x > 8)
      cameraRef.current.position.x -= (pX - 8) / constant;
    if (cameraRef.current.position.z < 16)
      cameraRef.current.position.z += (16 - pZ) / constant;
    if (cameraRef.current.position.z > 16)
      cameraRef.current.position.z -= (pZ - 16) / constant;

    if (cameraRef.current.rotation.y < -0.7)
      cameraRef.current.rotation.y += (-0.7 - rY) / constant;
    if (cameraRef.current.rotation.y > -0.7)
      cameraRef.current.rotation.y -= (rY - -0.7) / constant;
    if (cameraRef.current.rotation.x < 0)
      cameraRef.current.rotation.x += (0 - rX) / constant;
    if (cameraRef.current.rotation.x > 0)
      cameraRef.current.rotation.x -= (rX - 0) / constant;
    if (cameraRef.current.rotation.z < 0)
      cameraRef.current.rotation.z += (0 - rZ) / constant;
    if (cameraRef.current.rotation.z > 0)
      cameraRef.current.rotation.z -= (rZ - 0) / constant;
  };

  const defaultPos = (cameraRef, pX, pY, pZ, rX, rY, rZ) => {
    if (cameraRef.current.position.y < position[1])
      cameraRef.current.position.y += (position[1] - pY) / constant;
    if (cameraRef.current.position.y > position[1])
      cameraRef.current.position.y -= (pY - position[1]) / constant;
    if (cameraRef.current.position.x < position[0])
      cameraRef.current.position.x += (position[0] - pX) / constant;
    if (cameraRef.current.position.x > position[0])
      cameraRef.current.position.x -= (pX - position[0]) / constant;
    if (cameraRef.current.position.z < position[2])
      cameraRef.current.position.z += (position[2] - pZ) / constant;
    if (cameraRef.current.position.z > position[2])
      cameraRef.current.position.z -= (pZ - position[2]) / constant;

    if (cameraRef.current.rotation.y < rotation[1])
      cameraRef.current.rotation.y += (rotation[1] - rY) / constant;
    if (cameraRef.current.rotation.y > rotation[1])
      cameraRef.current.rotation.y -= (rY - rotation[1]) / constant;
    if (cameraRef.current.rotation.x < rotation[0])
      cameraRef.current.rotation.x += (rotation[0] - rX) / constant;
    if (cameraRef.current.rotation.x > rotation[0])
      cameraRef.current.rotation.x -= (rX - rotation[0]) / constant;
    if (cameraRef.current.rotation.z < rotation[2])
      cameraRef.current.rotation.z += (rotation[2] - rZ) / constant;
    if (cameraRef.current.rotation.z > rotation[2])
      cameraRef.current.rotation.z -= (rZ - rotation[2]) / constant;
  };

  useEffect(() => {
    if (signup) {
      setPosition([8, -3, 16]);
      setRotation([0, -0.7, 0]);
    }
    if (list) {
      setPosition([-7.5, -5, 11]);
      setRotation([0.1, 0.1, 0]);
    }
    if (home) {
      setPosition([1, -4, 2]);
      setRotation([0.8, 0.5, 0]);
    }
    if (showProduct) {
      setPosition([-10, -5, 16]);
      setRotation([0.1, 0.6, 0]);
    }
    if (!signup || !list || !showProduct) {
      setPosition([1, -4, 2]);
      setRotation([0.8, 0.5, 0]);
    }
  }, [signup, list, home, showProduct]);

  useFrame(() => {
    const pY = cameraRef.current.position.y;
    const pX = cameraRef.current.position.x;
    const pZ = cameraRef.current.position.z;

    const rY = cameraRef.current.rotation.y;
    const rX = cameraRef.current.rotation.x;
    const rZ = cameraRef.current.rotation.z;

    if (signup) {
      signupPos(cameraRef, pX, pY, pZ, rX, rY, rZ);
    }
    if (home) {
      setPosition([1, -4, 2]);
      setRotation([0.8, 0.5, 0]);
      defaultPos(cameraRef, pX, pY, pZ, rX, rY, rZ);
    }

    if (list) {
      setPosition([-8.5, -5, 11]);
      setRotation([0.1, 0, 0]);
      defaultPos(cameraRef, pX, pY, pZ, rX, rY, rZ);
    }

    if (showProduct) {
      setPosition([-10, -5, 16]);
      setRotation([0.1, 0.6, 0]);
      defaultPos(cameraRef, pX, pY, pZ, rX, rY, rZ);
    }
  });

  const font = new FontLoader().parse(roboto)
  //signup [-2,-2, 5]
  //position 2 position={[8, -3, 16]} rotation={[0, -.7, 0]}
  return (
    <>
  {/* <mesh position={[0, 2, 0]}>
    <textGeometry args={['Three-DEA', {font, size: .5, height: 1, bevelThickness: .1,}]}/>
    <meshPhysicalMaterial attach='material' color={'red'}/>
  </mesh> */}
      <Html>
        {signup || list || showProduct ? (
          <h1
            className="back-button"
            onClick={() => {
              if (signup || list) {
                setHome(true);
                setList(false);
                setSignup(false);
                setShowProduct(false);
                history.push("/"); // Change the URL to "/"
              }
              if (showProduct) {
                setList(true);
                setSignup(false);
                setShowProduct(false);
                setHome(false);
              }
            }}
          >
            Back
          </h1>
        ) : (
          <>
          </>
        )}
      </Html>
      <PerspectiveCamera
        position={[1, -4, 2]}
        rotation={[0.8, 0.5, 0]}
        camera={{ fov: 50 }}
        ref={cameraRef}
      >
        <directionalLight
          position={[5, 5, -8]}
          castShadow
          intensity={5}
          shadow-mapSize={2048}
          shadow-bias={-0.001}
        />

        <axesHelper />
        <Model />
        <SubScene setCategory={setCategory} setList={setList} />
        <ListScene
          category={category}
          setProduct={setProduct}
          setShowProduct={setShowProduct}
        />
        {
          showProduct && <ProductScene product={product}/>
        }
        {/* </ScrollControls> */}

        <directionalLight
          intensity={1}
          castShadow
          position={[4.553, 2.857, 8.307]}
          rotation={[-Math.PI / 2, 0, 0.102]}
          shadow-bias={-0.001}
          shadow-mapSize={2048}
        />
      </PerspectiveCamera>
    </>
  );
}

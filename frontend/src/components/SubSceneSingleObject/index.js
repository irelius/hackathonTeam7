import { Gltf } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function SubSceneSingleObject({src, position, rotation, name, setCategory, setList}) {

    const [x, setX] = useState(0)
    const [y, setY] = useState(1)
    const [z, setZ] = useState(-3)
    const [objPosition, setObjPosition] = useState(position)
    const [hover, setHover] = useState(false)
  const ref = useRef()

  useFrame(({ clock }) => {
    if (hover && ref.current.position.y < .65) {

      ref.current.position.y += .03
    }
    else if (!hover && ref.current.position.y > objPosition[1]) {
      ref.current.position.y -= .03
    }
  })


  return (
    <>
      {
        name && name !== 'Carpets' && hover ? <Html>
          <h1>{name}</h1>
        </Html> : <></>
      }
    <Gltf
      src={src}
      position={objPosition}
      rotation={rotation}
      onPointerOver={() => {
        if (name !== 'Carpets')
        setHover(true)

      }}
      onPointerOut={() => {
        if (name !== 'Carpets')
        setHover(false)
      }}
    ref={ref}
    onClick={() => {
      if (name !== 'Carpets')
      setCategory(name)
      setList(true)
  }}
    />
    </>
  );
}

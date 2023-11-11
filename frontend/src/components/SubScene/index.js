import { useState, useRef } from "react";
import SubSceneSingleObject from "../SubSceneSingleObject";
import models from "./models";

export default function SubScene({ setCategory, setList }) {
  const [position, setPosition] = useState([0, 1.85, -7]);

  return (
    <group position={position}>
      {models.map((model) => {
        if (!model.category)
          return (
            <SubSceneSingleObject
              src={model.src}
              position={model.position}
              rotation={model.rotation}
              scale={model.scale || 1}
              name={model.name || ""}
              setCategory={setCategory}
              setList={setList}
            />
          );
      })}
    </group>
  );
}

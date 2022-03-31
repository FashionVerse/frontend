import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import FastAverageColor from "fast-average-color";

const setOpacity = (hex, alpha) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, 0)}`;

export default function Viewer(props) {
  const ref = useRef();
  useEffect(() => {
    // window.addEventListener("load", function () {
    console.log("test");
    const fac = new FastAverageColor();
    fac
      .getColorAsync(
        props.imgLink,
        { algorithm: "sqrt", mode: "precision" }
      )
      .then((color) => {
        console.log(color);
        console.log(color.hex);
        document.body.style.background = color.hex;
      })
      .catch((e) => {
        console.log(e);
      });
    // });
  }, []);
  return (
    <>
      <div
        style={{
          height: "247px",
          width: "300px",
          filter: "drop-shadow(rgba(0, 0, 0, 0.3) 0px 20px 10px)"
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 50 }}
          style={{ height: "247px",width: "300px", }}
        >
          <Suspense fallback={null}>
            <Stage controls={ref} environment="city">
              {props.children}
            </Stage>
          </Suspense>
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            ref={ref}
            autoRotate
            autoRotateSpeed={5}
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
          />
        </Canvas>
      </div>
    </>
  );
}

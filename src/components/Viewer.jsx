import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import FastAverageColor from "fast-average-color";
import AnimLogo from "./AnimLogo";
import { Box } from "@mui/material";

const setOpacity = (hex, alpha) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, 0)}`;

export default function Viewer(props) {
  const ref = useRef();
  function Loader(){
    return(
        <Box
          sx={{
            height: "100vh",
            width: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <AnimLogo />
        </Box>
      );
      // <Image src={props.imgLink} />
  }
  useEffect(() => {
    // window.addEventListener("load", function () {
    const fac = new FastAverageColor();
    fac
      .getColorAsync(
        props.imgLink,
        { algorithm: "sqrt", mode: "precision" }
      )
      .then((color) => {
        console.log(color);
        console.log(color.hex);
        // document.body.style.background = color.hex;
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
          height:props.height,
          width: props.width,
          paddingTop: "7%",
          filter: "drop-shadow(rgba(0, 0, 0, 0.3) 0px 20px 10px)"
        }}
      >
      <Suspense fallback={<Loader/>}>
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 50 }}
          style={{ height:props.height, width: props.width, zIndex: -1 }}

        >
            <Stage controls={ref} environment="city">
              {props.children}
            </Stage>
          {props.isProduct==="false"?
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
          :
          <OrbitControls
            ref={ref}
            autoRotate
            autoRotateSpeed={4}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
        }
          
        </Canvas>
      </Suspense>
      </div>
    </>
  );
}

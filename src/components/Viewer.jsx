import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import FastAverageColor from "fast-average-color";
import { motion } from "framer-motion"
import { Box,Typography } from "@mui/material";
import { useProgress } from '@react-three/drei'
import CircularProgress from '@mui/material/CircularProgress';

const setOpacity = (hex, alpha) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, 0)}`;

export default function Viewer(props) {
  const ref = useRef();
  const { progress } = useProgress()
  function Loader(){
    return(
     <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full tw-z-10 tw-scale-[2]">
      <Box>
      <CircularProgress variant="determinate" value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
    </div>
      );
      // <Image src={props.imgLink} />
  }
  // useEffect(() => {
  //   // window.addEventListener("load", function () {
  //   const fac = new FastAverageColor();
  //   fac
  //     .getColorAsync(
  //       props.imgLink,
  //       { algorithm: "sqrt", mode: "precision" }
  //     )
  //     .then((color) => {
  //       console.log(color);
  //       console.log(color.hex);
  //       // document.body.style.background = color.hex;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   // });
  // }, []);
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

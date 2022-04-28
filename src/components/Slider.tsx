import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

type SliderProps = {
  slideArray: any[];
};
const ResizePlugin = (slider) => {
  const observer = new ResizeObserver(function () {
    slider.update();
  });

  slider.on("created", () => {
    observer.observe(slider.container);
  });
  slider.on("destroyed", () => {
    observer.unobserve(slider.container);
  });
};
export default function Slider({ slideArray }: SliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 2, spacing: 2 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 8 },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [ResizePlugin]
  );

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     position: "relative",
    //     // paddingLeft: "32px",
    //   }}
    // >
    <>
      {loaded && instanceRef.current && (
        <motion.div
          // className="drops_hover_cursor"
          style={{
            cursor: "pointer",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: "easeOut", delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
        >
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
        </motion.div>
      )}
      <div ref={sliderRef} className="keen-slider">
        {slideArray.map((slideContent) => (
          <Box
            className="keen-slider__slide"
            // sx={{ padding: "0px 12px" }}
          >
            {slideContent}
          </Box>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <motion.div
          // className="drops_hover_cursor"
          style={{
            cursor: "pointer",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: "easeOut", delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
        >
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </motion.div>
      )}
    </>
    // </Box>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  if (props.left) {
    return (
      <BsArrowLeftCircle
        fontSize="2em"
        color="#22CAFF"
        onClick={props.onClick}
        // style={{ position: "relative", top: "40%", left: "-44px", cursor:"pointer" }}
      />
    );
  } else
    return (
      <BsArrowRightCircle
        fontSize="2em"
        color="#22CAFF"
        onClick={props.onClick}
        // style={{ position: "relative", top: "40%", right: "-44px" ,cursor:"pointer" }}
      />
    );
}

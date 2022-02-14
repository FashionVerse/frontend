import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Box } from "@mui/material";

type SliderProps = {
  slideArray: any[];
};

export default function Slider({ slideArray }: SliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 2 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 4 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          pl: "32px",
        }}
      >
        {loaded && instanceRef.current && (
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
        )}
        <div
          ref={sliderRef}
          className="keen-slider"
          style={{ margin: "0px 16px" }}
        >
          {slideArray.map((slideContent) => (
            <Box className="keen-slider__slide" sx={{ padding: "0px 12px" }}>
              {slideContent}
            </Box>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        )}
      </Box>
    </Box>
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
        fontSize="3em"
        color="#22CAFF"
        onClick={props.onClick}
        style={{ position: "absolute", top: "40%", left: 0 }}
      />
    );
  } else
    return (
      <BsArrowRightCircle
        fontSize="3em"
        color="#22CAFF"
        onClick={props.onClick}
        style={{ position: "absolute", top: "40%", right: 0 }}
      />
    );
}

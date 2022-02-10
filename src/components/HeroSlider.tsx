import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Box } from "@mui/material";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <Box sx={{ position: "relative", maxWidth: "320px", margin: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: "320px" }}>
        {loaded && instanceRef.current && (
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
        )}
        <div ref={sliderRef} className="keen-slider">
          {SLIDES.map(({ alt, href, id, src }) => (
            <div className="keen-slider__slide flex-center" key={id}>
              <Image
                src={src}
                alt={alt}
                layout="fixed"
                height={"200px"}
                width={"180px"}
                className="m-auto"
              />
            </div>
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
    return <BsArrowLeftCircle fontSize="2em" onClick={props.onClick} />;
  } else return <BsArrowRightCircle fontSize="2em" onClick={props.onClick} />;
}

const SLIDES = [
  {
    id: "jaki8j",
    href: "#",
    src: "/clothing-item.png",
    alt: "fashion item",
  },
  {
    id: "likja3",
    href: "#",
    src: "/logo.svg",
    alt: "fashion item",
  },
];

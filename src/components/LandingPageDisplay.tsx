import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { Box, Button, Stack } from "@mui/material";
import EnlargedFashionCard from "./EnlargedFashionCard";
import Web3 from 'web3';

export default function LandingPageDisplay(props) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [enlarged, setEnlarged] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });


  return (
    <Box sx={{ position: "relative", margin: "auto", maxWidth: "320px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: "320px",
          position: "relative",
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
        <div ref={sliderRef} className="keen-slider">
          {props.items.map((item) => (
            <Stack
              key={item.id}
              className="keen-slider__slide"
              sx={{
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Image
                src={item.nft.properties.image.description}
                alt={"Featured Item"}
                layout="fixed"
                height={"200px"}
                width={"180px"}
                className="m-auto"
                onClick={()=>{
                  setEnlarged(true);
                }}
              />
              <Stack direction="row" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<SiEthereum />}
                >
                  { Web3.utils.fromWei( item.price, 'ether') + " ETH"}
                </Button>
                {props.expandable && (
        <EnlargedFashionCard
          state={enlarged}
          setState={setEnlarged}
          {...item}
        />
      )}
              </Stack>
            </Stack>
            
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
        fontSize="2.5em"
        color="#22CAFF"
        onClick={props.onClick}
        style={{ position: "absolute", top: "40%", left: 0 }}
      />
    );
  } else
    return (
      <BsArrowRightCircle
        fontSize="2.5em"
        color="#22CAFF"
        onClick={props.onClick}
        style={{ position: "absolute", top: "40%", right: 0 }}
      />
    );
}

const SLIDES = [
  {
    id: "jaki8j",
    href: "#",
    src: "/clothing-item.png",
    alt: "fashion item",
    price: 19.5,
  },
  {
    id: "likja3",
    href: "#",
    src: "/clothing-item-2.png",
    alt: "fashion item",
    price: 10,
  },
];

import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { Box, Button, Stack } from "@mui/material";
import EnlargedFashionCard from "./EnlargedFashionCard";
import Web3 from "web3";
import Viewer from "./Viewer";
import Model from "./Model";

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
          {ModelData.map((item) => (
            <Stack
              key={item.id}
              className="keen-slider__slide"
              sx={{
                alignItems: "center",
                gap: "12px",
              }}
              onClick={()=>{
                setEnlarged(true);
                console.log(item.id);
              }}
            >
              {/* <Image
                src={item.nft.properties.image.description}
                alt={"Featured Item"}
                layout="fixed"
                height={"200px"}
                width={"180px"}
                className="m-auto"
                onClick={()=>{
                  setEnlarged(true);
                }}
              /> */}
              <Viewer width="247px" height="300px">
          {/* {"name":"Cyber Punk Outfit","description":"A Cyber Punk Outfit","image":"https://ipfs.infura.io/ipfs/QmbmAYjQxCcj3MANspmK6KGKjsqQgrnNAgyAbv1iYfYV3d","animation_url":"https://ipfs.infura.io/ipfs/QmWpez4dCweVKgaMWtDXrqkDnDZcGBxrGp12khdzE9b2XJ"} */}
                <Model 
                  link= {item.animation_url+"?filename=file"+item.id+".glb" }
                  imgLink = {item.image}
                  />
              </Viewer>
              <Stack direction="row" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<SiEthereum />}
                  className="tw-fixed tw-z-index-5 tw-bottom-1/4 md:tw-bottom-[1%] tw-left-1/4 tw-translate-x-[21%] md:tw-translate-x-[25%] md:tw-translate-y-0 -tw-translate-y-1/4 tw-shadow-xl tw-shadow-cyan-500/50 hover:tw-shadow-cyan-100/50"
                >
                  {/* {Web3.utils.fromWei(item.price, "ether") + " ETH"} */}
                  0.3 ETH
                </Button>
                {/* {props.expandable && (
                  <EnlargedFashionCard
                    state={enlarged}
                    setState={setEnlarged}
                    {...item}
                  />
                )} */}
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
        style={{ position: "absolute", top: "40%", left: 0, zIndex: "5", cursor:"pointer" }}
      />
    );
  } else
    return (
      <BsArrowRightCircle
        fontSize="2.5em"
        color="#22CAFF"
        onClick={props.onClick}
        style={{ position: "absolute", top: "40%", right: 0, cursor:"pointer" }}
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

const ModelData = [
  {"id":1,"name":"Cyber Punk Outfit","description":"A Cyber Punk Outfit","image":"https://ipfs.infura.io/ipfs/QmbmAYjQxCcj3MANspmK6KGKjsqQgrnNAgyAbv1iYfYV3d","animation_url":"https://ipfs.infura.io/ipfs/QmWpez4dCweVKgaMWtDXrqkDnDZcGBxrGp12khdzE9b2XJ"},
  {"id":2,"name":"Cloth","description":"Clothes","image":"https://ipfs.infura.io/ipfs/Qmd4qbWo1Rbh78EjZiL9EVHtBKwqfwn9a6SaqmgpshCYrS","animation_url":"https://ipfs.infura.io/ipfs/QmRyXLW5eRwKarbyWoxNJigUNStcFzzVf5GdLyRJ3Vpwg9"}
]
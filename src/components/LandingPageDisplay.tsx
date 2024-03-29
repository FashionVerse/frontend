import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { Avatar, Box, Button, Stack } from "@mui/material";
import EnlargedFashionCard from "./EnlargedFashionCard";
import Web3 from "web3";
import Viewer from "./Viewer";
import Model from "./Model";
import AnimLogo from "./AnimLogo";
import useSWR from "swr";
import Link from "next/link";
import etheriumIcon from "../../public/etherium-icon.svg";
import flowerBomb from "../../public/FlowerBombDress.gif";
import stripeSuit from "../../public/PinStripeSuit.gif";
import purpuleDress from "../../public/purpule-dress.webp";
import layeredTee from "../../public/90S_LayeredTee_Gif-min.gif";

const fetcher = (url) => fetch(url).then((res) => res.json());

function FeaturedDisplay() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const { data, error } = useSWR(
    process.env.API_URL + "/api/getFeatured",
    fetcher
  );
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
  if (error) return <div>failed to load</div>;
  if (!data) return <AnimLogo />;
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {loaded && instanceRef.current && (
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
        )}
        {/* <div ref={sliderRef} className="keen-slider"></div> */}
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
        {/* {data.items.map((item) => (
          <Stack
            key={item._id}
            className="keen-slider__slide"
            sx={{
              alignItems: "center",
              // gap: "12px",
            }}
          >
            <Viewer
              width="500px"
              height="400px"
              imgLink={item.nft.metadata.image}
              isProduct="false"
            >
              {"name":"Cyber Punk Outfit","description":"A Cyber Punk Outfit","image":"https://ipfs.infura.io/ipfs/QmbmAYjQxCcj3MANspmK6KGKjsqQgrnNAgyAbv1iYfYV3d","animation_url":"https://ipfs.infura.io/ipfs/QmWpez4dCweVKgaMWtDXrqkDnDZcGBxrGp12khdzE9b2XJ"}
              <Model
                link={
                  item.nft.metadata.animation_url +
                  "?filename=file" +
                  item._id +
                  ".glb"
                }
              />
            </Viewer>
         
            <div className="gif-outer" >
              <Image  src={Gif} alt="gif"  objectFit="cover" />
            </div>

        
              <Link href={`/products/${item._id}`}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<Image src={etheriumIcon} alt="etherium icon" />}
                  
                  className="tw-shadow-xl tw-shadow-cyan-500/50 hover:tw-shadow-cyan-100/50 cost-btn"
                >
                  {Web3.utils.fromWei(item.price.toString().slice(0, 2), "ether") + " ETH"}
                  {item.price.toString() + " ETH"}
                </Button>
              </Link>
             
          </Stack>
        ))} */}
        <Stack
          className="keen-slider__slide"
          sx={{
            alignItems: "center",
          }}
        >
          <div className="gif-outer">
            <Image src={layeredTee} alt="gif" objectFit="cover" />
          </div>
        </Stack>
        <Stack
          className="keen-slider__slide"
          sx={{
            alignItems: "center",
          }}
        >
          <div className="gif-outer">
            <Image src={stripeSuit} alt="gif" objectFit="cover" />
          </div>
        </Stack>
        <Stack
          className="keen-slider__slide"
          sx={{
            alignItems: "center",
          }}
        >
          <div className="gif-outer">
            <Image src={flowerBomb} alt="gif" objectFit="cover" />
          </div>
        </Stack>
      </div>
    </>
  );
}

export default function LandingPageDisplay(props) {
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        maxWidth: "542px",
        position: "relative",
        top: "12px",
        height: "100%",
        // border: "1px solid red"
      }}
      className="slider-box"
    >
      <FeaturedDisplay />
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
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          zIndex: "5",
          cursor: "pointer",
          marginTop: "-32px",
        }}
      />
    );
  } else
    return (
      <BsArrowRightCircle
        fontSize="2.5em"
        color="#22CAFF"
        onClick={props.onClick}
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          cursor: "pointer",
          marginTop: "-32px",
        }}
      />
    );
}

// const SLIDES = [
//   {
//     id: "jaki8j",
//     href: "#",
//     src: "/clothing-item.png",
//     alt: "fashion item",
//     price: 19.5,
//   },
//   {
//     id: "likja3",
//     href: "#",
//     src: "/clothing-item-2.png",
//     alt: "fashion item",
//     price: 10,
//   },
// ];

// const ModelData = [
//   {"id":1,"name":"Cyber Punk Outfit","description":"A Cyber Punk Outfit","image":"https://ipfs.infura.io/ipfs/QmbmAYjQxCcj3MANspmK6KGKjsqQgrnNAgyAbv1iYfYV3d","animation_url":"https://ipfs.infura.io/ipfs/QmWpez4dCweVKgaMWtDXrqkDnDZcGBxrGp12khdzE9b2XJ"},
//   {"id":2,"name":"Cloth","description":"Clothes","image":"https://ipfs.infura.io/ipfs/Qmd4qbWo1Rbh78EjZiL9EVHtBKwqfwn9a6SaqmgpshCYrS","animation_url":"https://ipfs.infura.io/ipfs/QmRyXLW5eRwKarbyWoxNJigUNStcFzzVf5GdLyRJ3Vpwg9"}
// ]

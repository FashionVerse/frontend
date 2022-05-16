import React, { useEffect, useState } from "react";
import Head from "next/head";
import Viewer from "../../src/components/Viewer";
import Model from "../../src/components/Model";
import useSWR from "swr";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  getListItemAvatarUtilityClass,
} from "@mui/material";
import GridCard, { GridCardProps } from "../../src/components/GridCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimLogo from "../../src/components/AnimLogo";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Footer from "../../src/components/Footer";
import { NextSeo } from "next-seo";
// import Gif from "../../public/product-img.gif";
import { styled, alpha, useTheme } from "@mui/system";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Web3 from "web3";

function AnimatedButton(props) {
  const router = useRouter();
  async function setCart() {
    if (typeof window["ethereum"] !== "undefined") {
      const ethereum = window["ethereum"];
      if (ethereum) {
        var provider = new ethers.providers.Web3Provider(ethereum);
      }

      const isMetaMaskConnected = async () => {
        const accounts = await provider.listAccounts();
        return accounts.length > 0;
      };
      const connected = await isMetaMaskConnected();
      if (connected) {
        const accounts = await ethereum.enable();
        const account = accounts[0];
        const rawResponse = await fetch(
          process.env.API_URL + "/api/addItemToBag",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item: props.id.toString(),
              account: account,
            }),
          }
        ).catch();
        const content = await rawResponse.json();
        if (content.status === "ok") {
          setIsAnimating(2);
        } else {
          setIsAnimating(0);
        }
        console.log(content);
      } else {
        router.replace("/wallets");
      }
    } else {
      alert("MetaMask not installed");
    }
  }
  const [isAnimating, setIsAnimating] = useState(0);
  return (
    <>
      {/* <motion.button 
        type="button" 
        onClick={() => 
          {
            setIsAnimating(1)
            setCart()
          }
        }
        style={isAnimating===0? {display:"flex"}:{display:"none"}}
        class="tw-cursor-pointer tw-flex tw-gap-4 tw-items-center tw-justify-center tw-py-2 tw-px-4 tw-bg-cyan-500 hover:tw-bg-cyan-600 focus:tw-ring-cyan-400 focus:tw-ring-offset-cyan-200 tw-text-white tw-w-full tw-transition tw-ease-in tw-duration-200 tw-text-center tw-text-base tw-font-semibold tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 tw-rounded-lg "
        >
          <AccountBalanceWalletIcon /> Add To Bag lllll
        </motion.button> */}

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          setIsAnimating(1);
          setCart();
        }}
        style={isAnimating === 0 ? { display: "flex" } : { display: "none" }}
        sx={{ color: "#fff", width: 1 }}
      >
        <AccountBalanceWalletIcon /> Add To Bag
      </Button>
      <Button
        variant="contained"
        size="large"
        style={isAnimating === 1 ? { display: "flex" } : { display: "none" }}
        sx={{ color: "#fff", width: 1 }}
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          class="tw-mr-2 tw-animate-spin"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
        </svg>
        Adding
      </Button>
      <Button
        variant="contained"
        size="large"
        style={isAnimating === 2 ? { display: "flex" } : { display: "none" }}
        sx={{ color: "#fff", width: 1 }}
      >
        <DoneAllIcon /> Added To Bag
      </Button>
      {/* <motion.button 
        style={isAnimating===1? {display:"flex"}:{display:"none"}}
        type="button" class="tw-py-2 tw-px-4 tw-flex tw-justify-center tw-items-center  tw-bg-blue-600 hover:tw-bg-blue-700 focus:tw-ring-blue-500 focus:tw-ring-offset-blue-200 tw-text-white tw-w-full tw-transition tw-ease-in tw-duration-200 tw-text-center tw-text-base tw-font-semibold tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2  tw-rounded-lg ">
        <svg width="20" height="20" fill="currentColor" class="tw-mr-2 tw-animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
            </path>
        </svg>
        Adding kkkkk
      </motion.button> */}
      {/* <motion.button 
        style={isAnimating===2? {display:"flex"}:{display:"none"}}
        type="button" class="tw-py-2 tw-px-4 tw-gap-2 tw-flex tw-justify-center tw-items-center  tw-bg-green-600 hover:tw-bg-green-700 focus:tw-ring-green-500 focus:tw-ring-offset-green-200 tw-text-white tw-w-full tw-transition tw-ease-in tw-duration-200 tw-text-center tw-text-base tw-font-semibold tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2  tw-rounded-lg ">
        <DoneAllIcon />{' '}
        Added To Bag jjjjjj
      </motion.button> */}
    </>
  );
}

export default function Product() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const router = useRouter();
  const { productId } = router.query;

  // if (!productId)
  //   return (
  //     <Box
  //       sx={{
  //         height: "100vh",
  //         width: "100vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         margin: "auto",
  //       }}
  //     >
  //       <AnimLogo />
  //     </Box>
  //   );

  async function getItem(productId) {
    console.log("GETTING ITEMS");
    console.log(productId);
    const response = await fetch(
      process.env.API_URL + "/api/getItems?id=" + productId,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data)
      return (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <AnimLogo />
        </Box>
      );

    var rarityCategory;
    if (data.totalSupply >= 30) {
      rarityCategory = "Bronze";
    } else if (data.totalSupply >= 15 && data.totalSupply < 30) {
      rarityCategory = "Silver";
    } else if (data.totalSupply >= 5 && data.totalSupply < 15) {
      rarityCategory = "Gold";
    }
    if (data.totalSupply < 5) {
      rarityCategory = "Platinum";
    }

    return { ...data, rarityCategory: rarityCategory };
  }

  const {
    palette: { mode },
  } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!productId) {
      return;
    }
    getItem(productId)
      .then((val) => {
        console.log(val);
        setData(val);
      })
      .catch((e) => {});
  }, [productId]);

  const [data, setData] = useState(null);

  if (!data) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <AnimLogo />
      </Box>
    );
  }

  return (
    <>
      <NextSeo
        title={data.nft.metadata.name}
        description={data.nft.metadata.description}
        canonical={"https://www.thefashionverse.io/products/" + productId + "/"}
        twitter={{
          handle: "@FashionVerseInc",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <title>Product</title>
      </Head>

      <Container
        className="wrapper resource-page common-wrapper"
        maxWidth={false}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container common-fold1 "
        >
          <Grid
            sx={{
              marginTop: "20px",
              marginBottom: "100px",
              alignItems: "center",
            }}
            container
            direction="row"
            spacing={4}
            className="product-spacing"
          >
            <Grid item md={6} xs={12} className="product-image-wrapper">
              <div
                id="product-container"
                class="tw-shadow-2xl tw-shadow-white/50"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "20px",
                }}
              >
                <Box
                  className="image-box"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px",
                    overflow: "hidden",
                    px: 6,
                    py: 6,
                  }}
                >
                  {/* <Image
                    sx={{ borderRadius: "20px" }}
                    src={Gif}
                    alt="gif"
                    objectFit="cover"
                  /> */}
                  <div className="gif-outer" style={{ width: "410px" }}>
                    <Image
                      sx={{
                        borderRadius: "20px",
                        width: "500px",
                        height: "400px",
                      }}
                      src={data.nft.metadata.image}
                      alt="gif"
                      width="500px"
                      height="400px"
                      objectFit="cover"
                    />
                  </div>

                  <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    color={mode === "dark" ? "primary" : "secondary"}
                    sx={{
                      alignSelf: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    Open in 3D
                  </Button>

                  {/* Adding Modal for viewer */}
                  {open && (
                    <Dialog
                      fullWidth={fullWidth}
                      maxWidth={maxWidth}
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle
                        sx={{
                          background:
                            "linear-gradient(270.98deg, #01f0ff 1.94%, rgba(0, 0, 0) 50.07%)",
                        }}
                      >
                        3D View
                      </DialogTitle>
                      <DialogContent
                        sx={{
                          background: "#fff",
                        }}
                      >
                        <Box
                          noValidate
                          className="responsive-viewer"
                          component="form"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            m: "auto",
                            width: "fit-content",
                          }}
                        >
                          <Viewer
                            width="500px"
                            height="400px"
                            imgLink={data.nft.metadata.image}
                            isProduct="true"
                          >
                            <Model
                              link={
                                data.nft.metadata.animation_url +
                                "?filename=model.glb"
                              }
                              imgLink={data.nft.metadata.image}
                            ></Model>
                          </Viewer>
                        </Box>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          background: "#fff",
                        }}
                      >
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  )}
                </Box>
              </div>
            </Grid>
            <Grid item md={6} xs={12} className="product-detail-wrapper">
              <Box
                sx={{
                  padding: "0 20px 20px;",
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  {data.nft.metadata.description}
                </Typography>
                <Typography
                  variant="h1"
                  component="h1"
                  color="primary"
                  sx={{
                    fontSize: "h3.fontSize",
                    textAlign: "left",
                    fontWeight: 700,
                    marginBottom: "20px",
                  }}
                >
                  {data.nft.metadata.name}
                </Typography>

                <Link
                  href={"/brands/" + data.brand.url}
                  style={{ cursor: "pointer" }}
                >
                  <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center ">
                    <Image
                      src={data.brand.avatarSrc}
                      width="40"
                      height="40"
                      className="tw-rounded-full"
                    />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      className="tw-font-light"
                    >
                      {data.brand.title}
                    </Typography>
                  </div>
                </Link>

                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="tw-font-light"
                  sx={{ marginTop: "10px" }}
                >
                  <span className="tw-font-semibold">
                    {data.collection.title}
                  </span>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    className="tw-font-light"
                    sx={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="tw-font-semibold">Rarity:&nbsp;</span>
                    <div className="tw-animate-gradient-x tw-font-bold tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-l tw-from-rose-400 tw-via-fuchsia-500 tw-to-indigo-500">
                      {data.rarityCategory}
                    </div>
                  </Typography>
                  {data.available != 0 ? (
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      className="tw-font-semibold"
                      sx={{
                        marginBottom: "10px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      Total Available:&nbsp;
                      <div className="tw-font-semibold pl-2">
                        {data.available}
                      </div>
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      className="tw-font-semibold tw-text-red-500"
                    >
                      Currently Unavailable
                    </Typography>
                  )}
                </Box>

                <Box
                  sx={{
                    marginBottom: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    className="tw-font-semibold"
                    sx={{
                      // fontSize: "h6.fontSize",
                      fontWeight: "600",
                      mr: 2,
                    }}
                  >
                    Current Price:
                  </Typography>
                  <Typography
                    variant="h3"
                    gutterBottom
                    component="div"
                    className="tw-font-semibold pl-2 eth-price"
                    sx={{
                      fontSize: "2.42857rem",
                      fontWeight: 600,
                    }}
                  >
                    <img
                      alt="ETH"
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                      src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                      size="24"
                    />{" "}
                    {Web3.utils.fromWei(data.price.toString(), "ether")} ETH
                  </Typography>
                </Box>
                <Box
                  className="btn-wrapper"
                  sx={{
                    marginBottom: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    style={{
                      cursor: "pointer",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.1 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                  >
                    {data.available != 0 ? (
                      <>
                        <AnimatedButton id={data._id} />
                      </>
                    ) : (
                      <Button
                        disabled
                        variant="contained"
                        size="large"
                        sx={{ color: "#fff", width: "400px" }}
                      >
                        <AccountBalanceWalletIcon /> Add To Bag
                      </Button>
                    )}
                  </motion.div>
                  <motion.div
                    style={{
                      cursor: "pointer",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.1 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                  >
                    <Button
                      variant="contained"
                      className="tw-animate-gradient-x tw-font-bold tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-l tw-from-rose-400 tw-via-fuchsia-500 tw-to-indigo-500"
                      size="large"
                      sx={{ color: "#fff", ml: 2 }}
                      onClick={() => {
                        window.open(
                          "https://testnets.opensea.io/assets/" +
                            data.nft.nftContract +
                            "/" +
                            data.nft.tokenId
                        );
                      }}
                    >
                      View on OpenSea
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Container>

      {/* <div class="tw-flex tw-flex-wrap md:tw-h-screen tw-p-10 tw-h-full tw-gap-x-10 tw-justify-center tw-items-center ">
        <div id="product-container"
          class="tw-mb-4 tw-px-4 md:tw-w-1/2 tw-w-full tw-shadow-2xl tw-h-[65vh] lg:tw-h-full tw-shadow-white/50"

          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "20px",
          }}
        >
          <Image
            src="/hero-circle.svg"
            alt="..."
            layout="fill"
            priority
            loading="eager"
          />
          <Viewer width="100%" height="100%" imgLink={data.nft.metadata.image} isProduct="true">
            <Model
              link={data.nft.metadata.animation_url + "?filename=model.glb"}
              imgLink={data.nft.metadata.image}
            ></Model>
          </Viewer>
        </div>
        <div
          class="tw-my-4 tw-p-6 md:tw-w-1/3 tw-w-full tw-shadow-xl tw-space-y-7 tw-text-center md:tw-text-justify  "
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "20px",
          }}
        >
          <div className="tw-flex tw-flex-col tw-gap-y-6">
            <div>
              <Typography
                variant="h3"
                component="div"
                color="primary"
                gutterBottom
                className="tw-font-bold"
              >
                {data.nft.metadata.name}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
              >
                {data.nft.metadata.description}
              </Typography>
            </div>
            <Link href={"/brands/"+data.brand.url} className="!tw-cursor-pointer">
            <motion.div
              // className="drops_hover_cursor"
              style={{
                cursor: "pointer",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-items-center tw-pr-5">
            <Image src={data.brand.avatarSrc} width="40" height="40" className="tw-rounded-full"/>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                {data.brand.title}
              </Typography>
            </div>
            </motion.div>
            </Link>
            <Link href={"/collections/"+data.collection._id} className="!tw-cursor-pointer">
            <motion.div
              // className="drops_hover_cursor"
              style={{
                cursor: "pointer",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                <span className="tw-font-semibold">{data.collection.title}</span>
              </Typography>
            </motion.div>
            </Link>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                <span className="tw-font-semibold">Rarity:</span> <span className="tw-animate-gradient-x tw-font-bold tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-l tw-from-rose-400 tw-via-fuchsia-500 tw-to-indigo-500">Ultra Rare</span>
              </Typography>
            <div>
              {data.available != 0 ? (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="tw-font-light"
                >
                  Total Available:{" "}
                  <span className="tw-font-semibold pl-2">
                    {data.available}
                  </span>
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="tw-font-semibold tw-text-red-500"
                >
                  Currently Unavailable
                </Typography>
              )}
            </div>
            
            <div>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                Current Price
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                className="tw-font-bold"
              >
                <img
                  alt="ETH"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  size="24"
                />{" "}
                {data.price} ETH
              </Typography>
            </div>
            <motion.div
//className="drops_hover_cursor"
              style={{
                cursor: "pointer",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
              {data.available != 0 ? (
                <>
                <AnimatedButton id={data._id}/>
              </>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  color="primary"
                  className="tw-rounded-lg tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-gap-x-2 tw-w-full"
                >
                  <AccountBalanceWalletIcon /> Add To Bag
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <div className="tw-pt-[4rem] tw-pb-[4rem]">
        <Footer />
      </div> */}
    </>
  );
}

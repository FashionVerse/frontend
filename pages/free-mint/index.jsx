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
import { nftAddress, marketAbi, marketAddress } from "../../public/abi";
import { AbiItem } from "web3-utils";

function AnimatedButton(props) {
  const router = useRouter();
  async function claim() {
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
        await window["ethereum"].request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });

        const web3 = (window["web3"] = new Web3(
          window["web3"].currentProvider
        ));

        const marketContract = new web3.eth.Contract(
          marketAbi,
          marketAddress
        );

        

        const accounts = await ethereum.enable();
        const account = accounts[0];

        try {

          await fetch(
            process.env.API_URL + "/api/setClaimed",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                account: account,
                claimed: true,
              }),
            }
          )

        marketContract.methods
            .createMarketSale(nftAddress, ["21"], ["20"], ["1"])
            .send({ from: account, value: "1" }).on('transactionHash', function(){
              alert("Successfully claimed");
              window.open("/wardrobe","_self")
            }).on('error', async function (error) {
              console.log("ERROR")
              await fetch(
                process.env.API_URL + "/api/setClaimed",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    account: account,
                    claimed: false,
                  }),
                }
              );
              
            });
          } catch {
            console.log("ERROR2")
            await fetch(
              process.env.API_URL + "/api/setClaimed",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  account: account,
                  claimed: false,
                }),
              }
            )
          }
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

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          claim();
        }}
        style={isAnimating === 0 ? { display: "flex" } : { display: "none" }}
        sx={{ color: "#fff", width: 1 }}
      >
        <AccountBalanceWalletIcon /> Claim
      </Button>
      
    </>
  );
}

export default function Product() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const router = useRouter();

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

  const {
    palette: { mode },
  } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getWhitelist() {
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
          process.env.API_URL + "/api/getWhitelist?account="+account,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        ).catch();
        const content = await rawResponse.json();
        return !content.claimed;
      } else {
        alert("Connect to Metamask");
        router.replace("/wallets");
      }
    } else {
      alert("MetaMask not installed");
      return false;
    }
  }

  useEffect(() => {
    getWhitelist().then((value)=>{
      setEligible(value);
    });
  }, [router.isReady]);

  const [eligible, setEligible] = React.useState(false);

  return (
    <>
      <NextSeo
        title={"Free Mint"}
        description={"It's a free mint"}
        canonical={"https://www.thefashionverse.io/free-mint/"}
        twitter={{
          handle: "@FashionVerseInc",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <title>Free Mint</title>
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
                      src="https://gateway.thefashionverse.io/ipfs/QmZfXztgXMcgSNcoJqFp4y3sHiqzUcznHnYdLN7Ncdtmu6"
                      alt="gif"
                      width="500px"
                      height="500px"
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
                            imgLink="https://firebasestorage.googleapis.com/v0/b/fashionverse-77907.appspot.com/o/NFTs%2FFree%20Mint%2FFV%20Branded%20Sneakers%2FFV%20Sneaker2.png?alt=media&token=9eea013d-b7dc-47da-b8c8-49d4b618805e"
                            isProduct="true"
                          >
                            <Model
                              link=
                                "https://gateway.thefashionverse.io/ipfs/QmXjCo2G99CfSiHkBhKEzRTdFH3sqHWg2qM6oQsjjB71zX?filename=nft.glb"
                              
                              imgLink="https://firebasestorage.googleapis.com/v0/b/fashionverse-77907.appspot.com/o/NFTs%2FFree%20Mint%2FFV%20Branded%20Sneakers%2FFV%20Sneaker2.png?alt=media&token=9eea013d-b7dc-47da-b8c8-49d4b618805e"
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
                   High top basketball sneakers
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
                  FV Branded Sneakers
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
                    {eligible ? (
                      <>
                        <AnimatedButton id="button" />
                      </>
                    ) : (
                      <Button
                        disabled
                        variant="contained"
                        size="large"
                        sx={{ color: "#fff", width: "400px" }}
                      >
                        <AccountBalanceWalletIcon /> Claim
                      </Button>
                    )}

                    {!eligible ? (<p className="account-status" style={{color: "red", justifyContent: "flex-start"}}>Account not eligible</p>) : <div></div>}
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
                  </motion.div>
                  <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ color: "#fff", ml: 2 }}
                      onClick={() => {
                        window.open(
                          "https://opensea.io/assets/ethereum/0xd2c96174f18f45075b4bb9da971f77706eb511f0/20" 
                        );
                      }}
                    >
                      View on OpenSea
                    </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

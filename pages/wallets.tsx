import * as React from "react";
import Footer from "../src/components/Footer";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
const ModelViewer = require("@metamask/logo");
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useSnackbar } from "notistack";

const StyledPaper = styled(Paper)({
  maxWidth: "340px",
  aspectRatio: "1/1",
  margin: "auto",
  borderRadius: "32px",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: `rgba( 255, 255, 255, 0.08 )`,
});



export default function Wallets() {

  const { enqueueSnackbar } = useSnackbar();

  async function connectWallet() {
    if (typeof window["ethereum"] !== "undefined") {
      try {
        await window["ethereum"].enable();
        enqueueSnackbar("Wallet connected", { variant: "success" });
        return true;
      } catch (e) {
        return false;
      }
    } else {
      alert("Metamask is not installed!");
    }
  }

  React.useEffect(() => {
    const viewer = ModelViewer({
      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: 500,
      height: 400,
      // pxNotRatio: false,
      // width: 0.9,
      // height: 0.9,

      // To make the face follow the mouse.
      followMouse: true,

      // head should slowly drift (overrides lookAt)
      slowDrift: false,
    });
    const container = document.getElementById("logo-container");
    container.appendChild(viewer.container);
    container.getElementsByTagName("svg")[0].style.width = "300px";
    container.getElementsByTagName("svg")[0].style.height = "300px";
  }, []);
  return (
    <>
      <NextSeo
        title="Wallet"
        description="Connect your wallet."
        canonical="https://www.thefashionverse.io/wallets/"
        twitter={{
          handle: "@FashionVerseInc",
          cardType: "summary_large_image",
        }}
      />
      <Container
        className="wrapper connect-wallet common-wrapper"
        maxWidth={false}
      >
        {/* <Header /> */}
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container first-fold"
        >
          <Grid item xs={12}>
            <Typography
                variant="h1"
                className="main-heading"
                sx={{ mt: 10, mb: 10, textAlign: "center" }}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                 CONNECT A WALLET
                </Typography>
              </Typography>
          </Grid>

          {WALLETS.map(({ id, href, name, src, alt }) => (
            <Grid sx={{mt: 2, mb: 6}} item xs={12} key={id} style={{ cursor: "pointer" }}>
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
                <StyledPaper
                  variant="outlined"
                  onClick={() => {
                    connectWallet();
                  }}
                  className="tw-shadow-xl tw-shadow-cyan-500/40 hover:tw-shadow-cyan-100/50"
                >
                  <div id="logo-container"></div>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {name}
                  </Typography>
                </StyledPaper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

const WALLETS = [
  {
    id: "hj7ay5",
    name: "MetaMask",
    src: "/metamask.png",
    href: "#",
    alt: "MetaMask logo",
  },
  // {
  //   id: "k8igs4",
  //   name: "Coinbase Wallet",
  //   src: "/coin-base.svg",
  //   href: "#",
  //   alt: "CoinBase logo",
  // },
  // {
  //   id: "ka80ha3",
  //   name: "Wallet Connect",
  //   src: "/wallet-connect.png",
  //   href: "#",
  //   alt: "WalletConnect logo",
  // },
];

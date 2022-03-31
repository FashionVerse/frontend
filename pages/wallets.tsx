import * as React from "react";
import Footer from "../src/components/Footer";
import { Container, Typography, Grid, Paper } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/system";

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

async function connectWallet(){
  if (typeof window['ethereum'] !== 'undefined') {
    try {
      await window['ethereum'].enable();
      return true;
    } catch (e) {
      return false;
    }
  } else {
    alert('Metamask is not installed!')
  }
}

export default function Wallets() {
  return (
    <Container>
      {/* <Header /> */}
      <Typography
        variant="h3"
        align="center"
        color="primary"
        sx={{ mt: 16, mb: 10 }}
        className="gradient-text"
      >
        <b>CONNECT A WALLET</b>
      </Typography>
      <Grid container justifyContent="center" spacing={12} sx={{ mb: 16 }}>
        {WALLETS.map(({ id, href, name, src, alt }) => (
          <Grid item xs={12} sm={12} md={4} key={id}>
            <StyledPaper variant="outlined" onClick={() => {
              connectWallet()
            }}>
              <Image
                src={src}
                alt={alt}
                layout={"fixed"}
                height={"300px"}
                width={"300px"}
              />
              <Typography variant="h5" sx={{ mt: 2 }}>
                {name}
              </Typography>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
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

import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Button, Container, Typography, Grid, Paper } from "@mui/material";
import Image from "next/image";

export default function Wallets() {
  return (
    <Container>
      <Header />
      <Typography
        variant="h3"
        align="center"
        color="primary"
        sx={{ mt: 16, mb: 10 }}
      >
        CHECKOUT
      </Typography>
      <Grid container justifyContent="center" spacing={12} sx={{ mb: 16 }}>
        {WALLETS.map(({ id, href, name, src, alt }) => (
          <Grid item xs={12} sm={12} md={5} key={id}>
            <Paper
              variant="outlined"
              sx={{
                maxWidth: "360px",
                aspectRatio: "1/1",
                margin: "auto",
                borderRadius: "32px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src={src}
                alt={alt}
                layout={"fixed"}
                height={"300px"}
                width={"300px"}
              />
              <Typography variant="h5">{name}</Typography>
            </Paper>
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
    name: "Meta Mask",
    src: "/metamask.png",
    href: "#",
    alt: "MetaMask logo",
  },
  {
    id: "k8igs4",
    name: "Coinbase Wallet",
    src: "/coin-base.svg",
    href: "#",
    alt: "CoinBase logo",
  },
  {
    id: "ka80ha3",
    name: "Wallet Connect",
    src: "/wallet-connect.png",
    href: "#",
    alt: "WalletConnect logo",
  },
];

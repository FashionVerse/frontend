import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import FashionItemCard, {
  FashionItemCardProps,
} from "../src/components/FashionItemCard";

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

export default function Wardrobe() {
  const [activePage, setActivePage] = React.useState<"nfts" | "avatar">("nfts");

  return (
    <Container>
      <Header />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ mt: 16, mb: 10 }}
      >
        <Typography variant="h3" color="primary" className="gradient-text">
          <b>YOUR WARDROBE</b>
        </Typography>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <GradientButton onClick={() => setActivePage("nfts")}>
            <Typography variant="body1">VIEW FASHION NFTS</Typography>
          </GradientButton>
          <GradientButton onClick={() => setActivePage("avatar")}>
            <Typography variant="body1">VIEW AVATAR</Typography>
          </GradientButton>
        </ButtonGroup>
      </Stack>
      {activePage === "nfts" ? (
        <Grid container spacing={8} sx={{ mb: 16 }}>
          {YOUR_NFTS.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FashionItemCard {...props} hideAddToBag expandable />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <Typography variant="h3" color="textSecondary">
            Coming Soon...
          </Typography>
        </Container>
      )}
      <Footer />
    </Container>
  );
}

const YOUR_NFTS: FashionItemCardProps[] = [
  {
    id: "as6a0a82asd",
    src: "https://source.unsplash.com/random/900×700/?trousers",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Trousers",
    price: 0.04,
    rarity: 13,
    description: "lorem ipsum dolor sit",
    noOfPieces: 25,
    collectionName: "Street Wear",
    rarityCategory: "Semi-rare",
  },
  {
    id: "jda67kajbs",
    src: "https://source.unsplash.com/random/900×700/?caps",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Caps & Hats",
    price: 0.25,
    rarity: 28,
    description: "lorem ipsum dolor sit",
    noOfPieces: 5,
    collectionName: "Street Wear",
    rarityCategory: "Ultra-rare",
  },
  {
    id: "asda79qkajs72",
    src: "https://source.unsplash.com/random/900×700/?shoes",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Shoes",
    price: 0.01,
    rarity: 8,
    description: "lorem ipsum dolor sit",
    noOfPieces: 25,
    collectionName: "Street Wear",
    rarityCategory: "Semi-rare",
  },
];

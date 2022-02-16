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
import DropCard, { DropCardProps } from "../src/components/DropCard";

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
        <Typography variant="h3" color="primary">
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
          {DROP_DATA.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DropCard {...props} hideAddToBag fashionItem />
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

const DROP_DATA: DropCardProps[] = [
  {
    id: "ausdkbbsk",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    description: "lorem ipsum dolor sit",
    noOfPieces: 12,
    collectionName: "Street Wear",
  },
  {
    id: "asndka62va",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    description: "lorem ipsum dolor sit",
    noOfPieces: 12,
    collectionName: "Street Wear",
  },
  {
    id: "as6a0a82asd",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    description: "lorem ipsum dolor sit",
    noOfPieces: 12,
    collectionName: "Street Wear",
  },
  {
    id: "jda67kajbs",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    description: "lorem ipsum dolor sit",
    noOfPieces: 12,
    collectionName: "Street Wear",
  },
  {
    id: "asda79qkajs72",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    description: "lorem ipsum dolor sit",
    noOfPieces: 12,
    collectionName: "Street Wear",
  },
];

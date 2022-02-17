import * as React from "react";
import Image from "next/image";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import {
  Container,
  Typography,
  Grid,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useRouter } from "next/router";
import FashionItemCard, {
  FashionItemCardProps,
} from "../../src/components/FashionItemCard";
import DividedTable, {
  DividedTableProps,
} from "../../src/components/DividedTable";

export default function BrandPage() {
  const router = useRouter();
  const { brand } = router.query;

  function ImageGallery() {
    return (
      <ImageList
        sx={{ width: "100%", height: "100%" }}
        variant="quilted"
        cols={4}
        rowHeight={140}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={4} rows={4}>
            <img
              {...srcset(item.img, 400)}
              alt={item.title}
              loading="eager"
              style={{ objectFit: "fill" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Container>
        <Header />
      </Container>
      <Box sx={{ mt: 6, position: "relative" }}>
        <ImageGallery />
        <Box
          sx={{
            width: "380px",
            aspectRatio: "1/1",
            borderRadius: "99999px",
            position: "absolute",
            bottom: "-120px",
            left: "50%",
            transform: "translate(-50%, 0)",
            overflow: "hidden",
            backgroundImage:
              "url(https://source.unsplash.com/random/1200x400/?logo)",
          }}
        />
      </Box>
      <Container>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          sx={{ mt: 24, mb: 4 }}
        >
          <b>
            {/* Should ideally be this {brand} */}
            {"BRAND NAME HERE"}
          </b>
        </Typography>
        <Grid container spacing={8} sx={{ mb: 16 }}>
          <Grid item xs={12}>
            <DividedTable {...DividerTableData} />
            <Container maxWidth="md">
              <Typography sx={{ mt: 6 }} variant="h6" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                consectetur minus iste nulla quo praesentium modi dolorum
                necessitatibus aliquid dolorem accusamus officia, labore neque.
                Impedit, odit? Culpa tempora unde voluptates vero accusantium
                accusamus fugiat, autem neque eaque iusto ipsam sequi!
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="primary"
                sx={{ mt: 6, mb: 2 }}
              >
                <b>CONTRIBUTING DESIGNERS</b>
              </Typography>
            </Container>
            <Grid
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {DESIGNERS.map(({ name, description }, i) => (
                <Grid item xs={12} id={name + i}>
                  <Typography gutterBottom align="center">
                    <b>{name}</b>
                  </Typography>
                  <Typography align="center" variant="body2">
                    {description}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {BRAND_ITEMS.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FashionItemCard {...props} expandable />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Container>
  );
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://source.unsplash.com/random/1200x400/?city",
    title: "Brand background",
  },
];

const BRAND_ITEMS: FashionItemCardProps[] = [
  {
    id: "ausdkbbsk",
    src: "https://source.unsplash.com/random/900×700/?hoodies",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Hoodie",
    price: 0.02,
    rarity: 20,
    description: "lorem ipsum dolor sit",
    noOfPieces: 4,
    collectionName: "Street Wear",
    rarityCategory: "Super-rare",
  },
  {
    id: "asndka62va",
    src: "https://source.unsplash.com/random/900×700/?shirts",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Shirt",
    price: 0.12,
    rarity: 50,
    description: "lorem ipsum dolor sit",
    noOfPieces: 1,
    collectionName: "Street Wear",
    rarityCategory: "Extremely-rare",
  },
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

const DESIGNERS = [
  {
    name: "Joseph Joestar",
    description: "Creates bizzare designs inspired by ancient gods",
  },
];

const DividerTableData: DividedTableProps = {
  title1: "COLLECTION",
  subtitle1: "Tundra Burst",
  title2: "DROP CATEGORY",
  subtitle2: "Exotic Wear",
  title3: "PIECES",
  subtitle3: "Only 20 in-store",
};

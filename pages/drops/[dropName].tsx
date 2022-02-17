import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import {
  Container,
  Typography,
  Grid,
  Box,
  ImageList,
  ImageListItem,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import FashionItemCard, {
  FashionItemCardProps,
} from "../../src/components/FashionItemCard";
import CheckBoxSelect, { Option } from "../../src/components/CheckBoxSelect";

export default function DropPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      rarity: RARITY_DATA,
      price: PRICE_DATA,
      brand: BRAND_DATA,
      collection: COLLECTION_DATA,
    },
  });
  const { dropName } = router.query;

  function ImageGallery() {
    return (
      <ImageList
        sx={{ width: "100%", height: "100%" }}
        variant="quilted"
        cols={4}
        rowHeight={180}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={1} rows={1}>
            <img {...srcset(item.img, 180)} alt={item.title} loading="eager" />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} disableGutters>
        <Container>
          <Header />
        </Container>
        <Box sx={{ mt: 6, mb: 3 }}>
          <ImageGallery />
        </Box>

        <Container>
          <Typography
            variant="h3"
            align="center"
            color="primary"
            sx={{ mt: 16, mb: 10 }}
          >
            <b>
              {/* Should ideally be this {dropName} */}
              {"STREET WEAR"}
            </b>
          </Typography>
          <Grid container spacing={8} sx={{ mb: 16 }}>
            <Grid item xs={12}>
              <Stack direction="row" gap={2} sx={{ px: 1 }}>
                <CheckBoxSelect formStateName="rarity" label="Rarity" />
                <CheckBoxSelect formStateName="price" label="Price" />
                <div style={{ flexGrow: 1 }} />
                <CheckBoxSelect formStateName="brand" label="Brand" />
                <CheckBoxSelect formStateName="collection" label="Colection" />
              </Stack>
            </Grid>
            {DROP_DATA.map((props) => (
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
    </FormProvider>
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
    img: "https://source.unsplash.com/random/900×700/?clothing",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?fashion",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?pants",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?trousers",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?people",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?branded",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?designers",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?global",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?logo",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?insignia",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?clothing",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?bags",
    title: "random",
  },
];

const DROP_DATA: FashionItemCardProps[] = [
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

const RARITY_DATA: Option[] = [
  { value: "Semi rare", id: "123kjaasd" },
  { value: "Ultra rare", id: "asdasioqdoj" },
  { value: "Super rare", id: "asdaiuqas" },
  { value: "Extremely rare", id: "98ujkacc" },
];

const PRICE_DATA: Option[] = [
  { value: "< 0.05 eth", id: "osndaok" },
  { value: "> 0.05 & <= 0.2 eth", id: "oichaiu" },
  { value: "> 0.2 eth & <= 0.5 eth", id: "afhjasd" },
  { value: "> 0.5 eth", id: "yuvaeibask" },
];
const BRAND_DATA = [
  { value: "Sieke", id: "oansdin" },
  { value: "Alibas", id: "avwdhjdasjd" },
  { value: "Gape", id: "7b2212sx" },
];

const COLLECTION_DATA = [
  { value: "Sports", id: "jakais7ja" },
  { value: "Exotic", id: "hayus8as" },
  { value: "Casuals", id: "gh3yyahsa" },
];

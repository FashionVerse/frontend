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
import DropCard, { DropCardProps } from "../../src/components/DropCard";
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
        rowHeight={121}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={1} rows={1}>
            <img {...srcset(item.img, 121)} alt={item.title} loading="lazy" />
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
                  <DropCard {...props} fashionItem />
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
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
];

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

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
import DropCard, { DropCardProps } from "../../src/components/DropCard";
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
        rowHeight={121}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={4} rows={4}>
            <img {...srcset(item.img, 121)} alt={item.title} loading="lazy" />
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
            backgroundColor: "red",
          }}
        ></Box>
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
            {"XYZ BRAND NAME"}
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
          {DROP_DATA.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DropCard {...props} />
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
  },
];

const DESIGNERS = [
  { name: "Designer name", description: "asds ads asd asd asd asdas asdasdas" },
];

const DividerTableData: DividedTableProps = {
  title1: "title",
  subtitle1: "desc here",
  title2: "title",
  subtitle2: "desc here",
  title3: "title",
  subtitle3: "desc here",
};

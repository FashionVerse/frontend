import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Container, Typography, Grid, Box } from "@mui/material";
import GridCard, { GridCardProps } from "../src/components/GridCard";

export default function Brands() {
  return (
    <Container>
      <Header />
      <Typography
        variant="h3"
        align="center"
        color="primary"
        sx={{ mt: 16, mb: 10 }}
      >
        <b>BRANDS</b>
      </Typography>
      <Grid container spacing={8} sx={{ mb: 16 }}>
        {BRANDS_DATA.map((props) => (
          <Grid item xs={12} sm={6} md={4} key={props.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GridCard {...props} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
}

const BRANDS_DATA: GridCardProps[] = [
  {
    id: "abc123",
    title: "STREET WEAR",
    subtitle: "CAPTION HERE",
    avatarSrc: "/designer.jpg",
    topLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "h7jaus9",
    title: "STREET WEAR",
    subtitle: "CAPTION HERE",
    avatarSrc: "/designer.jpg",
    topLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "7haj8ka",
    title: "STREET WEAR",
    subtitle: "CAPTION HERE",
    avatarSrc: "/designer.jpg",
    topLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "h8ak9ja",
    title: "STREET WEAR",
    subtitle: "CAPTION HERE",
    avatarSrc: "/designer.jpg",
    topLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "/3d.png",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
];

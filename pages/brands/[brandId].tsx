import * as React from "react";
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
import DividedTable, {
  DividedTableProps,
} from "../../src/components/DividedTable";
import GridCard, { GridCardProps } from "../../src/components/GridCard";

export default function BrandPage() {
  const router = useRouter();
  const { brandId } = router.query;

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
          {BRANDS.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  router.push("/collections/" + props.title);
                }}
              >
                <GridCard {...props} noBrand />
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

const BRANDS: GridCardProps[] = [
  {
    id: "asdhkjasd3ad",
    title: "Limitless",
    subtitle: "Boundless fashion",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?nike",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?gap",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?adidas",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?cr7",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "naksjadidjadw",
    title: "Vintage",
    subtitle: "Feeling old school?",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?company",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?logo",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pattern",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?facebook",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "hsyaiajskaiaasasd",
    title: "Work Wear",
    subtitle: "Fashion at work",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?designer",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?levis",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?denims",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?puma",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "hajsuaiaosakassd",
    title: "Evening Wear",
    subtitle: "Fashionable evenings",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?brand",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?logo",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?branded",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?company",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
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

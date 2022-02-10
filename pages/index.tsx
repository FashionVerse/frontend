import * as React from "react";
import Image from "next/image";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import HeroSlider from "../src/components/HeroSlider";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { BiRocket } from "react-icons/bi";
import Slider from "../src/components/Slider";
import GridCard, { GridCardProps } from "../src/components/GridCard";
import { BsDiscord, BsTwitter } from "react-icons/bs";

export default function Index() {
  return (
    <Container>
      <Header />
      {/* Hero */}
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        sx={{ mt: 10, gap: 6 }}
      >
        <div>
          <Typography variant="h3">
            <Typography
              variant="h3"
              sx={{ fontWeight: 700 }}
              color="primary"
              component="span"
            >
              GENESIS&nbsp;
            </Typography>
            <i>COLLECTION</i>
          </Typography>
          <Typography sx={{ mt: 3 }} variant="h4" align="center">
            Build your first digital <br /> wardrobe
          </Typography>
        </div>
        <Box
          sx={{
            width: "50%",
            minWIdth: "240px",
            maxWidth: "400px",
            aspectRatio: "1/1",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/hero-circle.svg"
            alt="..."
            layout="fill"
            priority
            loading="eager"
          />
          <HeroSlider />
        </Box>
      </Stack>
      {/* Drops */}
      <Typography variant="h3" align="center" sx={{ mt: 16, mb: 10 }}>
        <Typography variant="h3" color="primary" component="span">
          LATEST&nbsp;
        </Typography>
        DROPS
      </Typography>
      <Slider
        slideArray={DROPS.map((props) => (
          <GridCard {...props} key={props.id} />
        ))}
      />
      {/* Brands */}
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction={"row"}
        sx={{ margin: "128px 64px 80px" }}
      >
        <Typography variant="h3">
          OUR PARTNER&nbsp;
          <Typography variant="h3" color="primary" component="span">
            BRANDS
          </Typography>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: "12px", px: "36px", py: "16px" }}
          startIcon={<BiRocket />}
        >
          <Typography variant="h6">Explore All</Typography>
        </Button>
      </Stack>
      <Slider
        slideArray={DROPS.map((props) => (
          <GridCard {...props} key={props.id} />
        ))}
      />
      {/* Advisors */}
      <Typography variant="h3" align="center" sx={{ mt: 16, mb: 10 }}>
        OUR&nbsp;
        <Typography variant="h3" color="primary" component="span">
          ADVISORS
        </Typography>
      </Typography>
      <Grid container justifyContent="space-evenly" spacing={12}>
        {ADVISORS.map(({ src, alt, id }) => (
          <Grid
            key={id}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src={src}
              alt={alt}
              layout="intrinsic"
              height={"200px"}
              width={"200px"}
            />
          </Grid>
        ))}
      </Grid>
      {/* Community */}
      <Typography variant="h3" align="center" sx={{ mt: 16, mb: 10 }}>
        <Typography variant="h3" color="primary" component="span">
          JOIN&nbsp;
        </Typography>
        THE <b>FV</b>COMMUNITY
      </Typography>
      <Stack
        direction="row"
        gap={6}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 20 }}
      >
        <IconButton size="large">
          <BsTwitter fontSize={"2em"} />
        </IconButton>
        <IconButton size="large">
          <BsDiscord fontSize={"2em"} />
        </IconButton>
      </Stack>
      <Footer />
    </Container>
  );
}

const DROPS: GridCardProps[] = [
  {
    id: "abc123",
    title: "STREET WEAR",
    subtitle: "caption here",
    avatarSrc: "/logo.svg",
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

/*
  {
    id: "",
    title: "",
    subtitle: "",
    avatarSrc:"",
    topLeftImage: {
      src: "",
      alt: "",
      bgColor: "",
    },
    topRightImage: {
      src: "",
      alt: "",
      bgColor: "",
    },
    bottomLeftImage: {
      src: "",
      alt: "",
      bgColor: "",
    },
    bottomRightImage: {
      src: "",
      alt: "",
      bgColor: "",
    }
  }
*/

const ADVISORS = [
  { id: "klaose", src: "/advisor.png", alt: "advisor brand" },
  { id: "laokssa", src: "/advisor.png", alt: "advisor brand" },
  { id: "hjau7sa2", src: "/advisor.png", alt: "advisor brand" },
];

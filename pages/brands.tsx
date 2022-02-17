import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Container, Typography, Grid, Box } from "@mui/material";
import GridCard, { GridCardProps } from "../src/components/GridCard";
import CheckBoxSelect from "../src/components/CheckBoxSelect";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

export default function Brands() {
  const methods = useForm({
    defaultValues: {
      drops: DROP_NAME_DATA,
    },
  });

  const router = useRouter();

  return (
    <FormProvider {...methods}>
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
          <Grid item xs={12} sx={{ ml: 3 }}>
            <CheckBoxSelect formStateName="drops" label="Drop" />
          </Grid>
          {BRANDS_DATA.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  router.push("/brands/" + props.title);
                }}
              >
                <GridCard {...props} />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </Container>
    </FormProvider>
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

const DROP_NAME_DATA = [
  { value: "Streetwear", id: "jakais7ja" },
  { value: "Vintage", id: "hayjsu812" },
  { value: "Limitless", id: "asd81ja" },
  { value: "Workwear", id: "jad1da7ja" },
  { value: "Partywear", id: "po8nabsad" },
  { value: "Ethnic", id: "hays7has" },
  { value: "Eveningwear", id: "971bnada" },
];

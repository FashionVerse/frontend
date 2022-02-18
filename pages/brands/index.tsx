import * as React from "react";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import { Container, Typography, Grid, Box } from "@mui/material";
import GridCard, { GridCardProps } from "../../src/components/GridCard";
import CheckBoxSelect from "../../src/components/CheckBoxSelect";
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
          className="gradient-text"
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
    id: "asdhkjasd3ad",
    title: "Limitless",
    subtitle: "Boundless fashion",
    avatarSrc: "https://source.unsplash.com/random/900×700/?logo%20company",
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
    avatarSrc: "https://source.unsplash.com/random/900×700/?logo%20company",
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
    avatarSrc: "https://source.unsplash.com/random/900×700/?logo%20company",
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
    avatarSrc: "https://source.unsplash.com/random/900×700/?logo%20company",
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
  {
    id: "hsbahsjsakajsas",
    title: "Ethnic",
    subtitle: "Fashion for the cultured",
    avatarSrc: "https://source.unsplash.com/random/900×700/?logo%20company",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?tops",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?bikini",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?shoes",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?glam",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "laoaksiajajasndads",
    title: "Party Wear",
    subtitle: "Glam and Glitter",
    avatarSrc: "https://source.unsplash.com/random/900×700/?logo%20company",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?glam",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?icons",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?logos",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?branded",
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

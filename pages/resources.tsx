import * as React from "react";
import { motion } from "framer-motion";
import Footer from "../src/components/Footer";
import Head from "next/head";
import { Button, Container, Typography, Grid, Paper, Box } from "@mui/material";
import { NextSeo } from "next-seo";
import { styled, alpha, useTheme } from "@mui/system";

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  borderRadius: "999px",
  minWidth: "220px",
}));

const BlueShadowPaper = styled(Paper)(({ theme }) => ({
  boxShadow: `0px 5.25872px 5.25872px ${theme.palette.primary.main}, inset 50.3961px -50.3961px 50.3961px rgba(149, 149, 149, 0.095), inset -50.3961px 50.3961px 50.3961px rgba(255, 255, 255, 0.095)`,
  background: theme.palette.mode === "dark" ? "#121212" : "#FFF",
}));

const GridCardContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  // maxWidth: "403px",
  borderRadius: "24px",
  padding: "0 26px",
  paddingBottom: "0px",
  minHeight: "276px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 255, 255, 255, 0.2 )`
      : alpha(theme.palette.primary.light, 0.2),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  boxShadow: "none",
  display: "flex",
  alignItems: "center",
}));

export default function Resources() {
  const {
    palette: { mode },
  } = useTheme();
  return (
    <>
      <Head>
        <title>The FashionVerse | Resources</title>
      </Head>
      <NextSeo
        title="Using More of Config"
        description="This example uses more of the available config options."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
          site_name: "SiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />

      <Container
        className="wrapper resource-page common-wrapper"
        maxWidth={false}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container common-fold"
        >
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="custom-container  common-fold"
          >
            <Grid item xs={12}>
              <span className="divider"></span>
              <Box>
                <Typography
                  variant="h1"
                  className="secondary-heading"
                  sx={{ mt: 10, mb: 6 }}
                >
                  <Typography
                    variant="h1"
                    color="primary"
                    component="span"
                    className="gradient-text"
                  >
                    RESOURCES
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            sx={{ mt: 3, mb: 10 }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            {RESOURCE_INFO.map(({ id, href, buttonText, description }) => (
              <Grid item xs={12} sm={6} lg={4} key={id}>
                <GridCardContainer className="custom-card">
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      align="center"
                      sx={{ mb: 4 }}
                    >
                      {description}
                    </Typography>
                    <GradientButton
                      onClick={() => {
                        window.open(href);
                      }}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      <Typography variant="subtitle1">
                        <b>{buttonText}</b>
                      </Typography>
                    </GradientButton>
                  </Box>
                </GridCardContainer>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

const RESOURCE_INFO = [
  {
    id: "ajaskas",
    buttonText: "Getting Started",
    href: "https://www.notion.so/Getting-Started-on-The-FashionVerse-Marketplace-0ef16aa498ab4530a6d19809ed58c706",
    description:
      "Learn how to set up your wallet, browse through the platform, and purchase your first piece of digital clothing",
  },
  {
    id: "ajaskas",
    buttonText: "Designer Collaborations",
    href: "https://www.notion.so/How-can-you-launch-a-collection-with-The-FashionVerse-f636e30a17f343868f13ea0aef6e0bdb",
    description:
      "A fashion designer? Learn more about our collaboration policies and launch your digital brand with us!",
  },
  {
    id: "ajaskas",
    buttonText: "About FashionVerse",
    href: "https://www.notion.so/The-FashionVerse-Inc-Community-81d0d0a9e79e4db3964987511170e2c1",
    description: "Find out more about our mission, roadmap, team, and progress",
  },
  {
    id: "ajaskas",
    buttonText: "Genesis Collection",
    href: "https://www.notion.so/The-Genesis-Collection-df2cd389dbba4833b756c66e7c6b229b",
    description: "Browse through the details of our genesis collection",
  },
];

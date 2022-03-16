import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Button, Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

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

export default function Resources() {
  return (
    <Container>
      <Header />
      <Typography
        variant="h3"
        align="center"
        color="primary"
        sx={{ mt: 16, mb: 10 }}
        className="gradient-text"
      >
        <b>RESOURCES</b>
      </Typography>
      <Grid container justifyContent="center" spacing={12} sx={{ mb: 16 }}>
        {RESOURCE_INFO.map(({ id, href, buttonText, description }) => (
          <Grid item xs={12} sm={12} md={5} key={id}>
            <BlueShadowPaper
              elevation={8}
              sx={{
                maxWidth: "360px",
                aspectRatio: "1/1",
                margin: "auto",
                borderRadius: "32px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <GradientButton
                href={href}
                variant="contained"
                color="primary"
                size="large"
              >
                <Typography variant="h7">
                  <b>{buttonText}</b>
                </Typography>
              </GradientButton>
              <Typography variant="h7" align="center" sx={{ mt: 4 }}>
                {description}
              </Typography>
            </BlueShadowPaper>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
}

const RESOURCE_INFO = [
  {
    id: "ajaskas",
    buttonText: "Getting Started",
    href: "#",
    description:
      "Learn how to set up your wallet, browse through the platform, and purchase your first piece of digital clothing",
  },
  {
    id: "ajaskas",
    buttonText: "Designer Collaborations",
    href: "#",
    description:
      "A fashion designer? Learn more about our collaboration policies and launch your digital brand with us!",
  },
  {
    id: "ajaskas",
    buttonText: "About FashionVerse",
    href: "https://glib-party-b08.notion.site/The-FashionVerse-Inc-Community-81d0d0a9e79e4db3964987511170e2c1",
    description: "Find out more about our mission, roadmap, team, and progress",
  },
  {
    id: "ajaskas",
    buttonText: "GENESIS COLLECTION",
    href: "https://docs.google.com/document/d/1s9yWrtnbdsu-LX0KZ5ledULVFwHYWxQOslSxiLtoJiQ/edit",
    description: "Browse through the details of our genesis collection",
  },
];

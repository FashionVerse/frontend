import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Button, Container, Typography, Grid, Paper } from "@mui/material";

export default function Resources() {
  return (
    <Container>
      <Header />
      <Typography
        variant="h3"
        align="center"
        color="primary"
        sx={{ mt: 16, mb: 10 }}
      >
        RESOURCES
      </Typography>
      <Grid container justifyContent="center" spacing={12} sx={{ mb: 16 }}>
        {RESOURCE_INFO.map(({ id, href, buttonText, description }) => (
          <Grid item xs={12} sm={12} md={5} key={id}>
            <Paper
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
              <Button
                href={href}
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: "999px", px: "48px" }}
              >
                <Typography variant="h6">
                  <b>{buttonText}</b>
                </Typography>
              </Button>
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                {description}
              </Typography>
            </Paper>
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
    buttonText: "Get Started",
    href: "/get-started",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
  {
    id: "ajaskas",
    buttonText: "Get Started",
    href: "/get-started",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
  {
    id: "ajaskas",
    buttonText: "Get Started",
    href: "/get-started",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
  {
    id: "ajaskas",
    buttonText: "Get Started",
    href: "/get-started",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
];

import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import WardrobeCard, {
  WardrobeCardProps,
} from "../src/components/WardRobeCard";

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

export default function Wardrobe() {
  return (
    <Container>
      <Header />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ mt: 16, mb: 10 }}
      >
        <Typography variant="h3" color="primary">
          <b>YOUR WARDROBE</b>
        </Typography>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <GradientButton>
            <Typography variant="body1">VIEW CLOTHES</Typography>
          </GradientButton>
          <GradientButton>
            <Typography variant="body1">VIEW AVATAR</Typography>
          </GradientButton>
        </ButtonGroup>
      </Stack>
      <Grid container spacing={8} sx={{ mb: 16 }}>
        {WardrobeItems.map((props) => (
          <Grid item xs={12} sm={6} md={4} key={props.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WardrobeCard {...props} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
}

const WardrobeItems: WardrobeCardProps[] = [
  {
    id: "asda123r",
    name: "Leather jacket",
    description: "lorem ipsum dolor sit",
    src: "/3d.png",
    alt: "Fashion item",
  },
];

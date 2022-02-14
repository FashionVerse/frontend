import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import {
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { styled } from "@mui/material/styles";

const BlueShadowPaper = styled(Paper)(({ theme }) => ({
  boxShadow: `0px 5.25872px 5.25872px ${theme.palette.primary.main}, inset 30.3961px -30.3961px 30.3961px rgba(149, 149, 149, 0.095), inset -30.3961px 30.3961px 30.3961px rgba(255, 255, 255, 0.095)`,
  background: theme.palette.mode === "dark" ? "#121212" : "#FFF",
}));

export default function Bag() {
  return (
    <Container>
      <Header />
      <Typography
        variant="h3"
        align="center"
        color="primary"
        sx={{
          mt: 16,
          mb: 10,
        }}
      >
        <b>CHECKOUT</b>
      </Typography>
      <Container maxWidth="md">
        <BlueShadowPaper
          sx={{
            borderRadius: "32px",
            mb: 16,
          }}
        >
          <Stack gap={4} sx={{ px: 12, py: 6 }}>
            <CheckoutCard />
          </Stack>
        </BlueShadowPaper>
      </Container>
      <Footer />
    </Container>
  );
}

function CheckoutCard() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Image
          alt="bag-item"
          src="/clothing-item.png"
          layout="fixed"
          height="120px"
          width="120px"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginLeft: 4 }} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              Mytic Beast - Sunrise Yellow Hoodie
            </Typography>
            <Typography variant="body2" gutterBottom>
              Full resolution 1920x1080 • Actual size M
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: 1030114
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="error"
              startIcon={<BsTrash fontSize="10px" />}
            >
              <Typography variant="body1">Remove</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            19.25 ETH
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

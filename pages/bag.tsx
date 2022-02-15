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
  IconButton,
} from "@mui/material";
import DropCard, { DropCardProps } from "../src/components/DropCard";
import { BsTrash, BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { SiEthereum } from "react-icons/si";

const BlueShadowPaper = styled(Paper)(({ theme }) => ({
  boxShadow: `0px 5.25872px 5.25872px ${theme.palette.primary.main}, inset 30.3961px -30.3961px 30.3961px rgba(149, 149, 149, 0.095), inset -30.3961px 30.3961px 30.3961px rgba(255, 255, 255, 0.095)`,
  background: theme.palette.mode === "dark" ? "#121212" : "#FFF",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

export default function Bag() {
  const totalCost = CHECKOUT_DATA.map((c) => c.price).reduce(
    (a, b) => a + b,
    0
  );

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
          <Stack gap={4} sx={{ px: 4, py: 6 }}>
            {CHECKOUT_DATA.map((props) => (
              <CheckoutCard {...props} />
            ))}
          </Stack>

          <Stack
            direction="row"
            justifyContent={"flex-end"}
            sx={{ px: 8, pb: 4 }}
          >
            <Stack gap={2}>
              <Typography variant="h5">
                {"Total Cost: " + totalCost + " ETH"}
              </Typography>
              <GradientButton color="primary" sx={{ borderRadius: "12px" }}>
                <Typography variant="h5">Purchase</Typography>
              </GradientButton>
            </Stack>
          </Stack>
        </BlueShadowPaper>
      </Container>

      <Footer />
    </Container>
  );
}

function CheckoutCard({ quantity, ...dropCardProps }: CheckoutCardProps) {
  return (
    <Grid container gap={2}>
      <Grid item xs={5}>
        <DropCard {...dropCardProps} hideAddToBag hidePrice />
      </Grid>
      <Grid
        item
        container
        direction="column"
        // alignItems="center"
        justifyContent="center"
        xs={6}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" justifyContent="center">
            <IconButton color="primary">
              <BsDashSquare />
            </IconButton>
            <Typography sx={{ px: 2 }} variant="h6">
              {quantity}
            </Typography>
            <IconButton color="primary">
              <BsPlusSquare />
            </IconButton>
          </Stack>
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            {dropCardProps.price}
            <SiEthereum fontSize="1.25rem" />
          </Typography>
          <Button color="error" startIcon={<BsTrash />}>
            Remove
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

interface CheckoutCardProps extends DropCardProps {
  quantity: number;
}

const CHECKOUT_DATA: CheckoutCardProps[] = [
  {
    id: "ausdkbbsk",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    quantity: 1,
  },
  {
    id: "asndka62va",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    quantity: 1,
  },
  {
    id: "as6a0a82asd",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    quantity: 1,
  },
  {
    id: "jda67kajbs",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    quantity: 1,
  },
  {
    id: "asda79qkajs72",
    src: "/3d.png",
    alt: "piece image",
    brandName: "Nike",
    brandImage: "/placeholder.png",
    pieceName: "Leather jacket",
    price: 12,
    rarity: 15,
    quantity: 1,
  },
];

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
import FashionItemCard, {
  FashionItemCardProps,
} from "../src/components/FashionItemCard";
import { BsTrash, BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { SiEthereum } from "react-icons/si";
import { produce } from "immer";

const BlueShadowPaper = styled(Paper)(({ theme }) => ({
  boxShadow: `0px 5.25872px 5.25872px ${theme.palette.primary.main}, inset 30.3961px -30.3961px 30.3961px rgba(149, 149, 149, 0.095), inset -30.3961px 30.3961px 30.3961px rgba(255, 255, 255, 0.095)`,
  background: theme.palette.mode === "dark" ? "#121212" : "#FFF",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

interface CheckoutCardProps extends FashionItemCardProps {
  quantity: number;
}
function toFixedIfNecessary(value, dp) {
  return +parseFloat(value).toFixed(dp);
}

export default function Bag() {
  const [data, setData] = React.useState<CheckoutCardProps[]>(CHECKOUT_DATA);

  const totalCost = data
    .map((c) => c.price * c.quantity)
    .reduce((a, b) => a + b, 0);

  function CheckoutCard({ quantity, ...rest }: CheckoutCardProps) {
    return (
      <Grid container gap={2}>
        <Grid item xs={5}>
          <FashionItemCard {...rest} hideAddToBag hidePrice expandable />
        </Grid>
        <Grid item container direction="column" justifyContent="center" xs={6}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" justifyContent="center">
              <IconButton
                color="primary"
                onClick={() => {
                  setData(
                    produce((state) => {
                      const idx = state.findIndex((s) => s.id === rest.id);
                      if (state[idx].quantity > 1)
                        state[idx].quantity = state[idx].quantity - 1;
                    })
                  );
                }}
              >
                <BsDashSquare />
              </IconButton>
              <Typography sx={{ px: 2 }} variant="h6">
                {quantity}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => {
                  setData(
                    produce((state) => {
                      const idx = state.findIndex((s) => s.id === rest.id);
                      state[idx].quantity = state[idx].quantity + 1;
                    })
                  );
                }}
              >
                <BsPlusSquare />
              </IconButton>
            </Stack>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              {rest.price}
              <SiEthereum fontSize="1.25rem" />
            </Typography>
            <Button
              color="error"
              startIcon={<BsTrash />}
              onClick={() => {
                setData(
                  produce((state) => {
                    state = state.filter((s) => s.id !== rest.id);
                    return state;
                  })
                );
              }}
            >
              Remove
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }

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
        className="gradient-text"
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
            {data.map((props) => (
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
                {"Total Cost: " + toFixedIfNecessary(totalCost, 4) + " ETH"}
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

const CHECKOUT_DATA: CheckoutCardProps[] = [
  {
    id: "as6a0a82asd",
    src: "https://source.unsplash.com/random/900×700/?trousers",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Trousers",
    price: 0.04,
    rarity: 13,
    description: "lorem ipsum dolor sit",
    noOfPieces: 25,
    collectionName: "Street Wear",
    rarityCategory: "Semi-rare",
    expandable: true,
    quantity: 1,
    hideAddToBag: true,
    hidePrice: true,
  },
  {
    id: "jda67kajbs",
    src: "https://source.unsplash.com/random/900×700/?caps",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Caps & Hats",
    price: 0.25,
    rarity: 28,
    description: "lorem ipsum dolor sit",
    noOfPieces: 5,
    collectionName: "Street Wear",
    rarityCategory: "Ultra-rare",
    expandable: true,
    quantity: 1,
    hideAddToBag: true,
    hidePrice: true,
  },
  {
    id: "asda79qkajs72",
    src: "https://source.unsplash.com/random/900×700/?shoes",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Shoes",
    price: 0.01,
    rarity: 8,
    description: "lorem ipsum dolor sit",
    noOfPieces: 25,
    collectionName: "Street Wear",
    rarityCategory: "Semi-rare",
    expandable: true,
    quantity: 2,
    hideAddToBag: true,
    hidePrice: true,
  },
];

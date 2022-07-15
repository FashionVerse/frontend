import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AnimLogo from "./AnimLogo";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled, alpha } from "@mui/system";
import { BsHandbag } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { IconButton } from "@mui/material";
import EnlargedFashionCard from "./EnlargedFashionCard";
import { ethers } from "ethers";
import { collection, setDoc, doc } from "firebase/firestore";
import firestore from "../../firebase/clientApp";
import Web3 from "web3";
import { useRouter } from "next/router";
import etheriumIcon from "../../public/etherium-icon.svg";
import { useSnackbar } from "notistack";

export interface FashionItemCardProps {
  id: string;
  itemId: string;
  nft: any;
  brand: any;
  price: any;
  rarity: number;
  collection: any;
  rarityCategory?: "Bronze" | "Silver" | "Gold" | "Platinum";
  hideAddToBag?: boolean;
  hidePrice?: boolean;
  expandable?: boolean;
  available?: any;
}

export const FashionItemCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: "404px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 51,121,157 )`
      : alpha(theme.palette.primary.light, 0.4),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  padding: "16px",
  borderRadius: "20px",
  boxShadow: "none",
}));

async function addToBag() {
  if (typeof window["ethereum"] !== "undefined") {
  } else {
    alert("Connect your wallet");
  }
}

export default function FashionItemCard(props: FashionItemCardProps) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  async function setCart() {
    if (typeof window["ethereum"] !== "undefined") {
      const ethereum = window["ethereum"];
      if (ethereum) {
        var provider = new ethers.providers.Web3Provider(ethereum);
      }

      const isMetaMaskConnected = async () => {
        const accounts = await provider.listAccounts();
        return accounts.length > 0;
      };
      const connected = await isMetaMaskConnected();
      if (connected) {
        const accounts = await ethereum.enable();
        const account = accounts[0];
        // await setDoc(doc(firestore, "cart", account), {
        //   id: account,

        // });
        // await setDoc(doc(firestore, "/cart/"+account+"/items", props.itemId), {
        //   id: props.itemId,
        //   collection: props.collection.id,
        //   amount: 1,

        // });

        const rawResponse = await fetch(
          process.env.API_URL + "/api/addItemToBag",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item: props.id.toString(),
              account: account,
            }),
          }
        ).catch();
        const content = await rawResponse.json();

        console.log(content);
        enqueueSnackbar("Item added to bag", { variant: "success" });
        window.location.reload();
      } else {
        alert("Connect to Wallet");
        router.replace("/wallets");
      }
    } else {
      alert("MetaMask not installed");
    }
  }

  const [enlarged, setEnlarged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  var rarityCategory: "Bronze" | "Silver" | "Gold" | "Platinum";
  if (props.rarity >= 30) {
    rarityCategory = "Bronze";
  } else if (props.rarity >= 15 && props.rarity < 30) {
    rarityCategory = "Silver";
  } else if (props.rarity >= 5 && props.rarity < 15) {
    rarityCategory = "Gold";
  }
  if (props.rarity < 5) {
    rarityCategory = "Platinum";
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <AnimLogo />
      </Box>
    );
  }

  return (
    <>
      <FashionItemCardContainer className="custom-card h-100">
        <Box
          className="clothe-wrapper"
          sx={{
            minWidth: "300px",
            aspectRatio: "1/1",
            position: "relative",
            borderRadius: "1rem",
            overflow: "hidden",
            backgroundColor: "white",
          }}
          onClick={() => router.push("/products/" + props.id)}
        >
          <Image
            src={props.nft.image}
            alt="NFT"
            width="100%" 
            height="100%" 
            layout="responsive" 
            objectFit="contain"
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
          className="fashion-card-inner-wrapper"
        >
          <ListItem disablePadding>
            <ListItemAvatar sx={{ mr: -1 }}>
              <Avatar
                src={props.brand.avatarSrc}
                sx={{ height: "36px", width: "36px" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={props.nft.name}
              secondary={props.brand.title}
              secondaryTypographyProps={{ style: { marginTop: "-2px" } }}
              primaryTypographyProps={{ style: { fontWeight: "700", } }}
            />
          </ListItem>
          <Stack className="d-flex" sx={{ minWidth: "70px" }}>
            <Typography variant="caption">Rarity</Typography>
            <Typography variant="caption" sx={{ mt: "-2px" }}>
              {rarityCategory}
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: props.hideAddToBag ? "center" : "space-between",
            alignItems: "center",
            gap: "16px",
            mt: 1,
          }}
        >
          {!props.hidePrice && (
            <Stack alignItems="center" direction="row">
              {/* <SiEthereum fontSize="1rem" /> */}
              <Image
                width="23px"
                height="38px"
                src={etheriumIcon}
                alt="etherium icon"
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {Web3.utils.fromWei(props.price.toString(), "ether")}
                {/* {props.price.toString()} */}
              </Typography>
            </Stack>
          )}
          {!props.hideAddToBag && (
            <Stack alignItems="center">
              <IconButton
                size="small"
                onClick={() => {
                  setCart();
                }}
              >
                <BsHandbag />
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: "8px" }}>
                Add to bag
              </Typography>
            </Stack>
          )}
        </Box>
      </FashionItemCardContainer>
      {/* {props.expandable && (
        <EnlargedFashionCard
          state={enlarged}
          setState={setEnlarged}
          {...props}
        />
      )} */}
    </>
  );
}

import * as React from "react";
import Footer from "../src/components/Footer";
import Image from "next/image";
import AnimLogo from "../src/components/AnimLogo";
import { SegmentedControl } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
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
import { useRouter } from "next/router";
import FashionItemCard, {
  FashionItemCardProps,
} from "../src/components/FashionItemCard";
import firestore from "../firebase/clientApp";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  doc,
  getDoc,
  collectionGroup,
} from "@firebase/firestore";
import { motion } from "framer-motion";
import { AbiItem } from "web3-utils";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { nftAbi, marketAbi, marketAddress } from "../public/abi";
import { ethers } from "ethers";
import WardrobeCard from "../src/components/WardRobeCard";
import { NextSeo } from "next-seo";

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

export default function Wardrobe() {
  const [activePage, setActivePage] = React.useState("nfts");

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY
    )
  );

  async function walletInit() {
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
        return account;
      } else {
        alert("Connect to Wallet");
        router.replace("/");
        return false;
      }
    } else {
      alert("MetaMask not installed");
      return false;
    }
  }

  React.useEffect(() => {
    async function getItems() {
      const account = await walletInit();
      if (account != false) {
        const arr = [];
        const ids = [];

        const response = await fetch(
          process.env.API_URL + "/api/getNFTs?account=" + account
        );
        const items = await response.json();

        console.log(items);

        items.map((item) => {
          arr.push({
            id: item.token_id,
            name: item.metadata.name,
            description: item.metadata.description,
            src: item.metadata.image,
            alt: "image",
            quantity: item.amount,
          });
        });

        return arr;
        // for (const id of querySnapshot.docs) {

        //   //const item = await getDoc(doc(collection(firestore, "items"), id.data().id));
        //   const marketContract = new web3.eth.Contract(marketAbi, marketAddress);
        //   const item = await marketContract.methods.getItem(id.data().id).call();
        //   const collectionDoc = await getDoc(doc(collection(firestore, "collections"), collectionName));
        //   const brand = await getDoc(doc(collection(firestore, "brands"), collectionDoc.data().brand));
        //   const contract = new web3.eth.Contract(nftAbi, item.nftContract);

        //   const nft = await contract.methods.tokenURI(item.tokenIds[0]).call();
        //   const response = await fetch(nft);

        //   if(!response.ok)
        //     enqueueSnackbar(response.statusText)

        //   const json = await response.json()
        //   const date = new Date(parseInt(item.releaseTime) * 1000);
        //   if(parseInt(item.available) > 0 && Date.now() > date){
        //     arr.push({...item, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}})
        //   }

        // }
        // console.log(arr)
        // return arr;
      } else {
        alert("Connect your wallet");
      }
    }
    getItems()
      .then((value) => {
        setItems(value);
        console.log(items);
      })
      .catch((e) => {
        enqueueSnackbar(e.message);
      });

    // async function getInfo() {
    //   const querySnapshot = await getDoc(doc(collection(firestore, "collections"), collectionName));
    //   const dropcategory = await getDoc(doc(firestore, "drop", querySnapshot.data().drop))
    //   DividerTableData.subtitle1 = querySnapshot.data().title
    //   DividerTableData.subtitle2 = dropcategory.data().name
    //   return {...querySnapshot.data(), dropCategory: dropcategory.data()};
    // }
    // getInfo()
    //   .then((value) => {
    //     setInfo(value);
    //   })
    //   .catch((e) => {
    //     enqueueSnackbar(e.message);
    //   });
  }, []);

  const [items, setItems] = React.useState(null);

  if (!items) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vh",
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
        className="wrapper home-page common-wrapper checkOutPage"
        maxWidth={false}
      >
        {/* <Header /> */}
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container"
        >
          <Grid item xs={12}>
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
              sx={{ mt: 8, mb: 10 }}
            >
              <Typography
                variant="h3"
                color="primary"
                className="gradient-text"
              >
                <b>YOUR WARDROBE</b>
              </Typography>

              {/* <ButtonGroup
          variant="text"
          aria-label="outlined primary button group"
        >
          <Button 
          onClick={() => setActivePage("nfts")}
          >
          <motion.div
              // className="drops_hover_cursor"
              style = {{
                backgroundImage: activePage=="nfts"? "linear-gradient(90deg, #22caff, #0266c1)":"",
                color: activePage=="nfts"? "white":"",
                padding: "2%",
                borderRadius: "5px",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
            <Typography variant="body1">VIEW FASHION NFTS</Typography>
            </motion.div>
          </Button>
          <Button 
          onClick={() => setActivePage("avatar") }
          >
          <motion.div
              // className="drops_hover_cursor
              style = {{
                backgroundImage: activePage=="avatar"? "linear-gradient(90deg, #22caff, #0266c1)":"",
                color: activePage=="avatar"? "white":"",
                padding: "5%",
                borderRadius: "5px",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1}}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
            <Typography variant="body1">VIEW AVATAR</Typography>
            </motion.div>
          </Button>
        </ButtonGroup> */}
              {/* <MantineProvider theme={{ colorScheme: localStorage.getItem('dark-mode') === "dark"? "dark" : "light" }}> */}
              <SegmentedControl
                value={activePage}
                onChange={setActivePage}
                fullWidth
                size="lg"
                radius="lg"
                color="blue"
                transitionDuration={700}
                transitionTimingFunction="linear"
                data={[
                  { label: "VIEW FASHION NFTS", value: "nfts" },
                  { label: "VIEW AVATAR", value: "avatar" },
                ]}
                sx={() => ({
                  backgroundColor: "rgba(0,0,0,0.05)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "20px",
                })}
              />
              {/* </MantineProvider> */}
            </Stack>
          </Grid>
          {activePage === "nfts" ? (
            <Grid item spacing={8} sx={{ mb: 16 }}>
              {items.map((props) => (
                // <Grid item xs={12} sm={6} md={4} key={props.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <FashionItemCard {...props} hideAddToBag expandable /> */}
                  <WardrobeCard {...props} />
                </Box>
                // </Grid>
              ))}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40vh",
              }}
            >
              <Typography variant="h3" color="textSecondary">
                Coming Soon...
              </Typography>
            </Grid>
          )}
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

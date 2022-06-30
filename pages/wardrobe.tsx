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
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { nftAbi, marketAbi, marketAddress } from "../public/abi";
import { ethers } from "ethers";
import WardrobeCard from "../src/components/WardRobeCard";
import MetalookCard from "../src/components/MetalookCard";
import FinalMetalookCard from "../src/components/FinalMetalookCard";
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
        router.replace("/wallets");
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
        console.log("ITEMS");
        console.log(items);

        items.map((item) => {
          arr.push({
            id: item.token_id,
            name: item.metadata.name,
            description: item.metadata.description,
            src: item.metadata.image,
            alt: "image",
            quantity: item.amount,
            contract: item.token_address,
          });
        });

        return arr;
      } else {
        alert("Connect your wallet");
      }
    }

    async function getMetalook() {
      const account = await walletInit();
      if (account != false) {
        const arr = [];
        const ids = [];

        const response = await fetch(
          process.env.API_URL + "/api/getMetalook?account=" + account
        );
        const items = await response.json();
        console.log(items)

        items.map((item) => {
          arr.push({
            id: item.token_id,
            name: item.metadata.name,
            description: item.metadata.description,
            src: item.metadata.image,
            alt: "image",
            quantity: item.amount,
            contract: item.token_address,
            metalook: item.metalook,
            account: account
          });
        });

        return arr;
      } else {
        alert("Connect your wallet");
      }
    }

    async function getUploadedMetalook() {
      const account = await walletInit();
      if (account != false) {
        const arr = [];
        const ids = [];

        const response = await fetch(
          process.env.API_URL + "/api/getUploadedMetalook?account=" + account
        );
        const items = await response.json();
        console.log(items)

        items.map((item) => {
          arr.push({
            id: item.metalook.tokenId,
            name: item.metadata.name,
            description: item.metadata.description,
            src: item.metalook.metalookImage,
            metalook: item.metalook,
          });
        });

        return arr;
      } else {
        alert("Connect your wallet");
      }
    }


    if(router.query.page) {
      if(router.query.page == 'metalook'){
        setActivePage("metalook");
      }
    }
    getItems()
      .then((value) => {
        setItems(value);
        getMetalook().then((value) => {
          setMetalooks(value);
          getUploadedMetalook().then((value) => {
            setFinalMetalooks(value);
          })
        })
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
  }, [router.query]);

  const [items, setItems] = React.useState(null);
  const [metalooks, setMetalooks] = React.useState(null);
  const [finalMetalooks, setFinalMetalooks] = React.useState(null);

  if (!items || !metalooks || !finalMetalooks) {
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
      <NextSeo
        title="Wardrobe"
        description="View your digital wardrobe!"
        canonical="https://www.thefashionverse.io/wardrobe/"
        twitter={{
          handle: "@FashionVerseInc",
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
              className="wardrobe-heading"
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
                className="custom-tabs"
                radius="lg"
                color="blue"
                transitionDuration={700}
                transitionTimingFunction="linear"
                data={[
                  { label: "VIEW FASHION NFTS", value: "nfts" },
                  { label: "METALOOK", value: "metalook" },
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
            <Grid item className="wardrobe-item-wrapper" sx={{ mb: 16 }}>
              {items.map((props) => (
                // <Grid item xs={12} sm={6} md={4} key={props.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="wardrobe-item"
                >
                  {/* <FashionItemCard {...props} hideAddToBag expandable /> */}
                  <div
                    onClick={() => {
                      window.open(
                        "https://opensea.io/assets/" +
                          props.contract +
                          "/" +
                          props.id
                      );
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {items.length > 0 ? (
                      <WardrobeCard {...props} />
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
                        <h2
                          className="no-items-available"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          No Items in Your Wardrobe
                        </h2>
                      </Grid>
                    )}
                  </div>
                </Box>
                // </Grid>
              ))}
            </Grid>
          ) : (
            <Grid item style={{
              width: "100%", textAlign: "center"}}>
              <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                >Metalooks</Typography>
                {finalMetalooks.length > 0 ?
                <Grid item className="wardrobe-item-wrapper" sx={{ mb: 16 }}>
            {finalMetalooks.map((props) => (
              // <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="wardrobe-item"
              >
                {/* <FashionItemCard {...props} hideAddToBag expandable /> */}
                <div
                >
                    <FinalMetalookCard {...props} />

                </div>
              </Box>
              // </Grid>
            ))} 
              
          </Grid> : (
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
                <h2
                  className="no-items-available"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  No Metalooks in Your Wardrobe
                </h2>
              </Grid>
            )
          }
               <span className="divider" style={{margin: 40, display: "inline-block"}}></span>
            <Grid item className="wardrobe-item-wrapper" sx={{ mb: 16 }}>
            {metalooks.map((props) => (
              // <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="wardrobe-item"
              >
                {/* <FashionItemCard {...props} hideAddToBag expandable /> */}
                <div
                >
                  {metalooks.length > 0 ? (
                    <MetalookCard {...props} />
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
                      <h2
                        className="no-items-available"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                        }}
                      >
                        No Items in Your Wardrobe
                      </h2>
                    </Grid>
                  )}
                </div>
              </Box>
              // </Grid>
            ))}
          </Grid>
          </Grid>
          )}
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

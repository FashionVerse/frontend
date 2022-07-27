import * as React from "react";
import Footer from "../src/components/Footer";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import FashionItemCard, {
  FashionItemCardProps,
} from "../src/components/FashionItemCard";
import { BsTrash, BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { SiEthereum } from "react-icons/si";
import { produce } from "immer";
import firestore from "../firebase/clientApp";
import AnimLogo from "../src/components/AnimLogo";
import { AbiItem } from "web3-utils";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { nftAbi, marketAbi, marketAddress } from "../public/abi";
import { ethers } from "ethers";
import useSWR from "swr";
import Button from "@mui/material/Button";
import { NextSeo } from "next-seo";

const fetcher = (url) => fetch(url).then((res) => res.json());

const BlueShadowPaper = styled(Paper)(({ theme }) => ({
  // boxShadow: `0px 5.25872px 5.25872px ${theme.palette.primary.main}, inset 30.3961px -30.3961px 30.3961px rgba(149, 149, 149, 0.095), inset -30.3961px 30.3961px 30.3961px rgba(255, 255, 255, 0.095)`,
  background: theme.palette.mode === "dark" ? "rgba(18, 18, 18, 0.5)" : "#FFF",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

interface CheckoutCardProps extends FashionItemCardProps {
  quantity: number;
  bagId: number;
}
function toFixedIfNecessary(value, dp) {
  return +parseFloat(value).toFixed(dp);
}

export default function Bag() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY
    )
  );
  const marketContract = new web3.eth.Contract(
    marketAbi as AbiItem[],
    marketAddress
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


  async function deleteItem(bagId){
    try {
      const response = await fetch(
        process.env.API_URL + "/api/deleteItemFromBag",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: bagId}),
        }
      );

    } catch (e){
    }
  }

  async function clearBag(account){
    try {
      const response = await fetch(
        process.env.API_URL + "/api/clearBag",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({account: account}),
        }
      );

    } catch (e){
    }
  }


  async function getItems(account) {
    const arr = [];

    // const querySnapshot = await getDocs(collection(firestore, "/cart/"+account+"/items"));
    // for (const id of querySnapshot.docs) {
    //   //const item = await getDoc(doc(collection(firestore, "items"), id.data().id));

    //   const item = await marketContract.methods.getItem(id.data().id).call();
    //   const collectionDoc = await getDoc(doc(collection(firestore, "collections"), id.data().collection));
    //   const brand = await getDoc(doc(collection(firestore, "brands"), collectionDoc.data().brand));
    //   const contract = new web3.eth.Contract(nftAbi as AbiItem[], item.nftContract);

    //   const nft = await contract.methods.tokenURI(item.tokenIds[0]).call();
    //   const response = await fetch(nft);

    //   if(!response.ok)
    //     enqueueSnackbar(response.statusText)

    //   const json = await response.json()
    //   const now = new Date(Date.now())
    //   const date = new Date(parseInt(item.releaseTime) * 1000);
    //   if(parseInt(item.available) > 0 && now > date){
    //     arr.push({...item, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}, quantity: id.data().amount})
    //   }
    // }
    // const { data, error } = useSWR(process.env.API_URL+'/api/getItemsFromBag?account='+account, fetcher)

    // if (error){

    //   enqueueSnackbar("Failed to load drops", { variant: "error" });
    //   }
    //   // const drops: GridCardProps[] = [];
    //   if (data) {
    //   console.log("items ",data)
    //     // dropData.drops.forEach((item) => {
    //     //   drops.push({
    //     //     topLeftImage: item.gridImages[0],
    //     //     topRightImage: item.gridImages[1],
    //     //     bottomLeftImage: item.gridImages[2],
    //     //     bottomRightImage: item.gridImages[3],
    //     //     avatarSrc: item.avatarSrc,
    //     //     title: item.title,
    //     //     subtitle: item.subtitle,
    //     //     id: item._id,
    //     //     href: "drops/"+item.url,
    //     //   });
    //     // });
    //   }
    // const items = await fetch(process.env.API_URL+'/api/getItemsFromBag?account='+account)
    try {
      const response = await fetch(
        process.env.API_URL + "/api/getItemsFromBag?account=" + account
      );
      const itemData = await response.json();

      itemData.items.map((item) => {
        arr.push({
          id: item._id,
          itemId: item.itemId,
          nft: item.nft.metadata,
          tokenId: item.nft.tokenId,
          brand: item.brand,
          price: item.price,
          rarity: item.totalSupply,
          collection: item.collection,
          expandable: false,
          quantity: item.quantity,
          available: item.available,
          nftContract: item.nft.nftContract,
          bagId: item.bagId
        });
      });

      return {...itemData, items: arr}
    } catch {
      // enqueueSnackbar("Failed to load items", { variant: "error" });
    }

    return {whitelisted: false, isWhiteEnabled: false, items: arr};
  }



  async function purchaseItems() {
    const account = await walletInit();
    if (account !== false) {
      const items = [];
      const token = [];
      const amounts = [];

      try {
        if (data.length > 0) {
          data.map((item) => {
            items.push(item.itemId);
            token.push(item.tokenId);
            amounts.push(item.quantity);
          });

          // const cost = Web3.utils.fromWei(totalCost.toString(), 'ether')

          await window["ethereum"].request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
          const web3 = (window["web3"] = new Web3(
            window["ethereum"]
          ));
          await window["ethereum"].request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }], // chainId must be in hexadecimal numbers
          });

          const marketContract = new web3.eth.Contract(
            marketAbi as AbiItem[],
            marketAddress
          );

          const nftContract = data[0].nftContract;

          setIsLoading(true);


           marketContract.methods
            .createMarketSale(nftContract, items, token, amounts)
            .send({ from: account, value: totalCost }).on('confirmation', async function(confirmationNumber, receipt){
              setIsLoading(false);
              enqueueSnackbar("Your items have been purchased sucessfully", { variant: "success" });
              await clearBag(account);
              window.open("/wardrobe","_self")
            }).on('error', async function (error) {
              enqueueSnackbar("Your items are being purchased, kindly check in after sometime.", { variant: "success" });
              await clearBag(account);
              window.open("/wardrobe","_self")
            });
          
        } else {
          alert("Nothing to purchase");
        }
      } catch (e) {
        setIsLoading(false);
        if(e.code == 4001){
          enqueueSnackbar(e.message, {variant: "error"});
        } else {
          enqueueSnackbar("Your items are being purchased, kindly check in after sometime.", { variant: "success" });
          await clearBag(account);
          window.open("/wardrobe","_self")
        }
    
        // router.reload()
      }
      // if(data.length > 0){
      //   const nftContract = data[0].nftContract;
      //   for( const item of data){
      //     items.push(item.itemId)
      //     amounts.push(item.quantity)
      //   }
      //   console.log(nftContract)
      //   console.log(items)
      //   console.log(amounts)

      //   const web3 = window['web3'] = new Web3(window['web3'].currentProvider);
      //   await window['ethereum'].request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: '0x3' }], // chainId must be in hexadecimal numbers
      //   });
      //   const marketContract = new web3.eth.Contract(marketAbi as AbiItem[], marketAddress);
      //   setIsLoading(true);
      //   marketContract.methods.createMarketSale(nftContract, items, amounts).send({from: account, value: Web3.utils.toWei(String(totalCost),), })
      //   .then(function(receipt){
      //       console.log(receipt);
      //       for(const item of items){
      //         addDoc(collection(firestore, "purchase"), {
      //           address: account,
      //           item: item
      //         }).then((value)=>{
      //           deleteDoc(doc(firestore, "/cart/"+account+"/items", item)).then((value)=>{
      //             window.location.reload()
      //           })
      //         })

      //       }

      //   }).catch((e)=>{
      //     enqueueSnackbar(e.message);
      //     router.reload()
      //   })

      // } else {
      //   alert("Nothing to purchase");
      // }
    }
  }

  React.useEffect(() => {
    walletInit().then((account) => {
      setIsLoading(true);
      if (account !== false) {
        getItems(account)
          .then((value) => {
            setData(value.items);
            setIsUserWhitelisted(value.whitelisted);
            setIsWhitelisted(value.isWhiteEnabled);
            setIsLoading(false);
          })
          .catch((e) => {
            enqueueSnackbar(e.message);
          });
      }
    });
  }, []);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWhitelisted, setIsWhitelisted] = React.useState(null);
  const [isUserWhitelisted, setIsUserWhitelisted] = React.useState(null);

  const totalCost: any = data
    .map((c) => c.price * c.quantity)
    .reduce((a, b) => a + b, 0);


  function CheckoutCard({ quantity, ...rest }: CheckoutCardProps) {

    return (
      <>
        <NextSeo
          title="Bag"
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
        <Grid container spacing={3}  alignItems="center">
          <Grid item sm={6} xs={12}>
            <FashionItemCard {...rest} hideAddToBag hidePrice expandable />
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  color="primary"
                  onClick={() => {
                    setData(
                      produce((state) => {
                        const idx = state.findIndex((s) => s.id === rest.id);
                        if (state[idx].quantity > 1) {
                          state[idx].quantity = state[idx].quantity - 1;
                          const updatedQuantity = state[idx].quantity;
                          walletInit().then((account) => {
                            if (account !== false) {
                              
                            }
                          });
                        }
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
                        if (state[idx].quantity < rest.available) {
                          state[idx].quantity = state[idx].quantity + 1;
                          const updatedQuantity = state[idx].quantity;
                          walletInit().then((account) => {
                            if (account !== false) {
                            }
                          });
                        }
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
                <SiEthereum fontSize="1.25rem" />
                {Web3.utils.fromWei(rest.price, "ether")}
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


                  deleteItem(rest.bagId).then(()=>{
                    enqueueSnackbar("Removed item from bag", { variant: "success" });
                    window.location.reload();
                  })
                }}
              >
                Remove
              </Button>
            </Stack>
          </Grid>

        </Grid>
      </>
    );
  }

  if (isLoading) {
    // TODO: Add proper loader
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
    <Container
      className="wrapper home-page common-wrapper checkOutPage"
      maxWidth={false}
    >
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="custom-container"
      >
        <Grid item xs={12}>
          <Box>
            <Typography
              variant="h1"
              className="secondary-heading"
              sx={{ mt: 10, mb: 10 }}
            >
              <Typography
                variant="h1"
                color="primary"
                component="span"
                className="gradient-text"
              >
                CHECKOUT
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Container maxWidth="md" className="checkOutItems custom-card-drop">
          <BlueShadowPaper
            sx={{
              borderRadius: "32px",
              mb: 16,
            }}
          >
            <Stack className="checkout-spacing" gap={4} sx={{ px: 4, py: 6 }}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "41px",
                  lineHeight: "normal",
                }}
                variant="subtitle1"
                className="sub-heading"
                align="center"
                style={{
                  textAlign: "left",
                  fontSize: "41px",
                  lineHeight: "normal",
                }}
              >
                {totalCost > 0 ? "Items in Order" : <p className="no-items" style={{textAlign: "center"}}> No Items in Order </p>}
              </Typography>
              {data.map((props) => (
                <CheckoutCard {...props} />
              ))}
            </Stack>

            {totalCost > 0 && (
              <Stack
                direction="row"
                justifyContent={"flex-end"}
                sx={{ px: 8, pb: 4 }}
                className="total-cost"
              >
                <Stack gap={2}>
                  <Typography variant="h5">
                    {"Total Cost: " + Web3.utils.fromWei(totalCost.toString(), "ether") + " ETH"}
                  </Typography>
                  <GradientButton
                    color="primary"
                    sx={{ borderRadius: "12px" }}
                    onClick={() => {
                      purchaseItems()
                    }}
                    disabled={isWhitelisted && !isUserWhitelisted}
                  >
                    <Typography variant="h5">Purchase</Typography>
                  </GradientButton>
                </Stack>
              </Stack>
            )}

            {isWhitelisted && !isUserWhitelisted ? (<p className="account-status" style={{color: "red", justifyContent: "flex-end"}}>Account not whitelisted</p>) : <div></div>}
          </BlueShadowPaper>
        </Container>
      </Grid>
      <Footer />
    </Container>
  );
}

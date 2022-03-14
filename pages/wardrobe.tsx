import * as React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Image from "next/image";
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
  collectionGroup
} from "@firebase/firestore";
import { useSnackbar } from "notistack";
import Web3 from 'web3';
import { nftAbi, marketAbi, marketAddress } from "../public/abi";
import { ethers } from 'ethers'

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  padding: "12px 18px",
}));

export default function Wardrobe() {
  const [activePage, setActivePage] = React.useState<"nfts" | "avatar">("nfts");

  const { enqueueSnackbar } = useSnackbar();
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+process.env.INFURA_API_KEY));

  async function walletInit(){

    if(typeof window.ethereum !== 'undefined'){
      const { ethereum } = window;
  if (ethereum) {
      var provider = new ethers.providers.Web3Provider(ethereum);

  }
  
  const isMetaMaskConnected = async () => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  }
    const connected = await isMetaMaskConnected();
    if(connected){
      const accounts = await ethereum.enable();
      const account = accounts[0];
      return account
      
      
    } else {
      alert("Connect to Wallet")
      return false
    }

    } else {
      alert("MetaMask not installed")
      return false
    }
  }
  


  React.useEffect(() => {
    
    async function getItems() {
      const account = await walletInit();
        if(account != false){
          const arr = [];
          const ids = [];

      const querySnapshot = await getDocs(query(collection(firestore, "purchase"), where("address", "==", account)));
      for(const purchase of querySnapshot.docs){
        const items = await getDocs(query(collectionGroup(firestore, 'item'), where("id", "==", purchase.data().item)));
        if(items.size > 0){
          const itemDoc = items.docs[0];
          const collectionId = itemDoc.data().collection;
          console.log(itemDoc.data())
          const collectionDoc = await getDoc(doc(firestore, "collections", collectionId));
          const brandId = collectionDoc.data().brand;
          console.log(brandId)
          const brand = await getDoc(doc(firestore, "brands", brandId));
             const marketContract = new web3.eth.Contract(marketAbi, marketAddress);
        const item = await marketContract.methods.getItem(itemDoc.data().id).call();
        const contract = new web3.eth.Contract(nftAbi, item.nftContract);
        
        
        const nft = await contract.methods.tokenURI(item.tokenIds[0]).call();
        const response = await fetch(nft);

        if(!response.ok)
          enqueueSnackbar(response.statusText)

        const json = await response.json()
        if(!ids.includes(purchase.data().item)){
          arr.push({...item, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}})
          ids.push(purchase.data().item)
        }
        
        
        } else {
          throw "An error has occurred"
        }
      }
      return arr
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
          alert("Connect your wallet")
        }

    }
    getItems()
      .then((value) => {
         setItems(value);
         console.log(items)
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
        <Image
          src="/assets/loading.svg"
          alt="Loading..."
          layout="fixed"
          height={150}
          width={150}
        />
      </Box>
    );
  }

  return (
    <Container>
      <Header />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ mt: 16, mb: 10 }}
      >
        <Typography variant="h3" color="primary" className="gradient-text">
          <b>YOUR WARDROBE</b>
        </Typography>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <GradientButton onClick={() => setActivePage("nfts")}>
            <Typography variant="body1">VIEW FASHION NFTS</Typography>
          </GradientButton>
          <GradientButton onClick={() => setActivePage("avatar")}>
            <Typography variant="body1">VIEW AVATAR</Typography>
          </GradientButton>
        </ButtonGroup>
      </Stack>
      {activePage === "nfts" ? (
        <Grid container spacing={8} sx={{ mb: 16 }}>
          {items.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FashionItemCard {...props} hideAddToBag expandable />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <Typography variant="h3" color="textSecondary">
            Coming Soon...
          </Typography>
        </Container>
      )}
      <Footer />
    </Container>
  );
}

const YOUR_NFTS: FashionItemCardProps[] = [
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
  },
];

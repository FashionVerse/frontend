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
  Box
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
  deleteDoc,
  setDoc,
  addDoc
} from "@firebase/firestore";
import { AbiItem } from 'web3-utils'
import { useSnackbar } from "notistack";
import Web3 from 'web3';
import { nftAbi, marketAbi, marketAddress } from "../public/abi";
import { ethers } from "ethers";

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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+process.env.INFURA_API_KEY));
  const marketContract = new web3.eth.Contract(marketAbi as AbiItem[], marketAddress);

  async function walletInit(){

    if(typeof window['ethereum'] !== 'undefined'){
      const  ethereum  = window['ethereum'];
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
      router.replace("/");
      return false
    }

    } else {
      alert("MetaMask not installed")
      return false
    }
  }

  async function getItems(account) {
    const arr = [];
    const querySnapshot = await getDocs(collection(firestore, "/cart/"+account+"/items"));
    for (const id of querySnapshot.docs) {
      //const item = await getDoc(doc(collection(firestore, "items"), id.data().id));
      
      const item = await marketContract.methods.getItem(id.data().id).call();
      const collectionDoc = await getDoc(doc(collection(firestore, "collections"), id.data().collection));
      const brand = await getDoc(doc(collection(firestore, "brands"), collectionDoc.data().brand));
      const contract = new web3.eth.Contract(nftAbi as AbiItem[], item.nftContract);
      
      
      const nft = await contract.methods.tokenURI(item.tokenIds[0]).call();
      const response = await fetch(nft);

      if(!response.ok)
        enqueueSnackbar(response.statusText)

      const json = await response.json()
      const now = new Date(Date.now())
      const date = new Date(parseInt(item.releaseTime) * 1000);
      if(parseInt(item.available) > 0 && now > date){
        arr.push({...item, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}, quantity: id.data().amount})
      }
    }
    console.log(arr)
    return arr;
  }
  

  async function purchaseItems(){
    const account = await walletInit();
    if(account !== false){
      const items = []
    const amounts = []
      if(data.length > 0){
        const nftContract = data[0].nftContract;
        for( const item of data){
          items.push(item.itemId)
          amounts.push(item.quantity)
        }
        console.log(nftContract)
        console.log(items)
        console.log(amounts)

        const web3 = window['web3'] = new Web3(window['web3'].currentProvider);
        await window['ethereum'].request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3' }], // chainId must be in hexadecimal numbers
        });
        const marketContract = new web3.eth.Contract(marketAbi as AbiItem[], marketAddress);
        setIsLoading(true);
        marketContract.methods.createMarketSale(nftContract, items, amounts).send({from: account, value: Web3.utils.toWei(String(totalCost),), })
        .then(function(receipt){
            console.log(receipt);
            for(const item of items){
              addDoc(collection(firestore, "purchase"), {
                address: account,
                item: item
              }).then((value)=>{
                deleteDoc(doc(firestore, "/cart/"+account+"/items", item)).then((value)=>{
                  window.location.reload()
                })
              })
              
            }
            

        }).catch((e)=>{
          enqueueSnackbar(e.message);
          router.reload()
        })

      } else {
        alert("Nothing to purchase");
      }
    }

    
  }


  React.useEffect(() => {
    walletInit().then((account) => {
      setIsLoading(true);
      if(account !== false){
        getItems(account)
      .then((value) => {
        setData(value);
        setIsLoading(false)
      })
      .catch((e) => {
        enqueueSnackbar(e.message);
      });
      }
    })
    
  
    
    
    
  }, []);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

   const totalCost:any = data
    .map((c) => Number(Web3.utils.fromWei(c.price, 'ether')) * c.quantity)
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
                      if (state[idx].quantity > 1){
                        state[idx].quantity = state[idx].quantity - 1;
                        const updatedQuantity = state[idx].quantity
                        walletInit().then((account)=> {
                          if(account!==false){
                            setDoc(doc(firestore, "/cart/"+account+"/items", rest.itemId), {
                              id: rest.itemId,
                              collection: rest.collection.id,
                              amount: updatedQuantity
                            }).catch((e)=>{
                              enqueueSnackbar(e.message)
                            })
                          }
                        })
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
                      const idx = state.findIndex((s) => s.id === rest.id)
                      console.log(rest)
                      if (state[idx].quantity < rest.available){
                        state[idx].quantity = state[idx].quantity + 1;
                        const updatedQuantity = state[idx].quantity
                        walletInit().then((account)=> {
                          if(account!==false){
                            setDoc(doc(firestore, "/cart/"+account+"/items", rest.itemId), {
                              id: rest.itemId,
                              collection: rest.collection.id,
                              amount: updatedQuantity
                            }).catch((e)=>{
                              enqueueSnackbar(e.message)
                            })
                          }
                        })
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
              {Web3.utils.fromWei( String(rest.price), 'ether')}
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
                walletInit().then((account)=> {
                  if(account!==false){
                    deleteDoc(doc(firestore, "/cart/"+account+"/items", rest.itemId)).then((value)=>{
                      window.location.reload()
                    }).catch((e)=>{
                      enqueueSnackbar(e.message)
                    })
                  }
                })
              }}
            >
              Remove
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }

  if (isLoading) {
    // TODO: Add proper loader
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
    <Container className="checkOutPage">
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
      <Container maxWidth="md" className="checkOutItems">
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
              <GradientButton color="primary" sx={{ borderRadius: "12px" }} onClick={()=>{purchaseItems()}}>
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
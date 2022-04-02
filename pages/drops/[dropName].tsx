import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Footer from "../../src/components/Footer";
import Image from "next/image";
import AnimLogo from "../../src/components/AnimLogo";
import {
  Container,
  Typography,
  Grid,
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Button,
} from "@mui/material";
import { useRouter, Router } from "next/router";
import FashionItemCard, {
  FashionItemCardProps,
} from "../../src/components/FashionItemCard";
import CheckBoxSelect, { Option } from "../../src/components/CheckBoxSelect";
import firestore from "../../firebase/clientApp";
import { AbiItem } from 'web3-utils'
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  doc,
  getDoc
} from "@firebase/firestore";
import { useSnackbar } from "notistack";
import Web3 from 'web3';
import { nftAbi, marketAbi, marketAddress } from "../../public/abi";
import { styled } from "@mui/system";
import { getClientBuildManifest } from "next/dist/client/route-loader";

export default function DropPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      rarity: RARITY_DATA,
      price: PRICE_DATA,
      brand: [],
    },
  });
  const { dropName } = router.query;

  const { enqueueSnackbar } = useSnackbar();
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+process.env.INFURA_API_KEY));
  const marketContract = new web3.eth.Contract(marketAbi as AbiItem[], marketAddress);

  const GradientButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: "white",
    padding: "12px 18px",
  }));

  function checkSelected(arr){
    for(const item of arr) {
      if(item.selected == true){
        return true;
      }
    } 
    return false;
  }


  
  async function getItems() {
    const arr = [];
    const drop = await getDocs(query(collection(firestore, "drop"), where("id", "==", dropName)));
    if(drop.docs.length > 0){
    const querySnapshot = await getDocs(query(collection(firestore, "collections"), where("drop", "==", drop.docs[0].id)));
    for (const id of querySnapshot.docs) {
  
      
      const items = await getDocs(collection(firestore, "/collections/"+id.id+"/item"))
      for(const item of items.docs){
        const itemContract = await marketContract.methods.getItem(item.data().id).call();
        const brand = await getDoc(doc(collection(firestore, "brands"), id.data().brand));
        const contract = new web3.eth.Contract(nftAbi as AbiItem[], itemContract.nftContract);
        const nft = await contract.methods.tokenURI(itemContract.tokenIds[0]).call();
        const response = await fetch(nft);

      if(!response.ok)
        enqueueSnackbar(response.statusText)

      const json = await response.json()
      const date = new Date(parseInt(itemContract.releaseTime) * 1000);
      const now = new Date(Date.now());
      var add = true;
      if(parseInt(itemContract.available)>0 && now > date){
        if(checkSelected(methods.getValues().price)){
          var priceCheck = false;
          for(const priceVal of methods.getValues().price){
            if(priceVal.id == "osndaok" && priceVal.selected){
              if(parseInt(itemContract.price) < parseInt(Web3.utils.toWei("0.05", "ether"))){
                console.log(itemContract);
                priceCheck = true;
              }
            }

            if(priceVal.id == "oichaiu" && priceVal.selected){
              if(parseInt(itemContract.price) > parseInt(Web3.utils.toWei("0.05", "ether")) && parseInt(itemContract.price) <= parseInt(Web3.utils.toWei("0.2", "ether"))){
                console.log(itemContract);
                priceCheck = true;
              } 
            }

            if(priceVal.id == "afhjasd" && priceVal.selected){
              if(parseInt(itemContract.price) > parseInt(Web3.utils.toWei("0.2", "ether")) && parseInt(itemContract.price) <= parseInt(Web3.utils.toWei("0.5", "ether"))){
                console.log(itemContract);
                priceCheck = true;
              } 
            }

            if(priceVal.id == "yuvaeibask" && priceVal.selected){
              if(parseInt(itemContract.price) > parseInt(Web3.utils.toWei("0.5", "ether"))){
                console.log(itemContract);
                priceCheck = true;
              } 
            }
          }

          if(priceCheck && add){
            add = true;
          } else {
            add = false;
          }
        } 

        if(checkSelected(methods.getValues().brand)){
          var brandCheck = false;
          for(const brandVal of methods.getValues().brand){
            if(brandVal.id == brand.data().id){
              brandCheck = true;
            }
          }

          if(brandCheck && add){
            add = true;
          } else {
            add = false;
          }
        }

        if(checkSelected(methods.getValues().rarity)){
          var rarityCheck = false;
        for(const rarityVal of methods.getValues().rarity){
          console.log("LENGTH: "+itemContract.sold.length)
          if(rarityVal.id == "123kjaasd" && rarityVal.selected){
            if(itemContract.sold.length >=30){
              console.log(itemContract);
              rarityCheck  = true;
            }
          }

          if(rarityVal.id == "asdasioqdoj" && rarityVal.selected){
            if(itemContract.sold.length >=15 && itemContract.sold.length < 30){
              console.log(itemContract);
              rarityCheck  = true;
            }
          }

          if(rarityVal.id == "asdaiuqas" && rarityVal.selected){
            if(itemContract.sold.length >=5 && itemContract.sold.length < 15){
              console.log(itemContract);
              rarityCheck  = true;
            }
          }

          if(rarityVal.id == "98ujkacc" && rarityVal.selected){
            if(itemContract.sold.length <5){
              console.log(itemContract);
              rarityCheck  = true;
            }
          }
        }

        if(rarityCheck && add){
          add = true;
        } else {
          add = false;
        }
      }

        if(add){
          arr.push({...itemContract, nft: {...json}, brand: {...brand.data()}, collection: {...id.data()}})
        }
      }
        

      }
    }
  } else {
    router.replace("/404")
  }
    return arr;
  }


  React.useEffect(() => {
    if(!router.isReady) return;

    async function getImages(){
      const drop = await getDocs(query(collection(firestore, "drop"), where("id", "==", dropName)));
      if(drop.docs.length > 0){
        return drop.docs[0].data().images;
      }
    }
    

    async function getBrands(){
      const arr = [];
      const brands = await getDocs(collection(firestore, "brands"));
      for (const brand of brands.docs){
        arr.push(brand.data());
      }
      return arr;
    }

    async function getName() {
      const drop = await getDocs(query(collection(firestore, "drop"), where("id", "==", dropName)));
      if(drop.docs.length > 0){
      return drop.docs[0].data().title;
    } else {
      router.replace("/404")
    }
    }

    

    getItems()
      .then((value) => {
        setItems(value);

        getName()
      .then((value) => {
        setName(value);
        getImages().then((value)=>{
            setImageData(value)
            getBrands()
        .then((value) => {
          setBrands(value);
          const brands = value.map((brand)=>{
             return {
              'value': brand.title,
              'id': brand.id,
              'selected': false,
            }
          })
          methods.setValue('brand', brands)
  
        })
        })
        
      })
       
      })
      .catch((e) => {
        enqueueSnackbar(e.message);
      });

      
  
    
  }, [router.isReady]);

  const [items, setItems] = React.useState(null);
  const [brands, setBrands] = React.useState(null);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imageData, setImageData] = React.useState(null);


  if ((!items && !brands && !imageData) || loading) {

    
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
        <AnimLogo />
      </Box>
    );
  }



  function ImageGallery() {
    if(!imageData){
      return <div></div>
    
        } else {
          return (
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              variant="quilted"
              cols={4}
              rowHeight={180}
              gap={0}
            >
              {
              imageData.map((item, index) => (
                <ImageListItem key={index} cols={1} rows={1}>
                  <img {...srcset(item, 180)} alt="image" loading="eager" />
                </ImageListItem>
              ))}
            </ImageList>
          );
        }
  }

  return (
    <FormProvider {...methods}>
      <Container  className="dropsContainer" maxWidth={false} disableGutters>
        <Container>
          {/* <Header /> */}
        </Container>
        <Box sx={{ mt: 6, mb: 3 }}>
          <ImageGallery />
        </Box>

        <Container className="swContainer">
          <Typography
            variant="h3"
            align="center"
            color="primary"
            sx={{ mt: 16, mb: 10 }}
            className="gradient-text"
          >
            <b>
              {/* Should ideally be this {dropName} */}
              {/* {"STREET WEAR"} */}
              {name.toUpperCase()}
            </b>
          </Typography>
          <Grid container spacing={8} sx={{ mb: 16 }}>
            <Grid item xs={12}>
              <Stack direction="row" gap={2} sx={{ px: 1 }}>
                <CheckBoxSelect formStateName="rarity" label="Rarity" />
                <CheckBoxSelect formStateName="price" label="Price" />
                <div style={{ flexGrow: 1 }} />
                <CheckBoxSelect formStateName="brand" label="Brand" />
                {/* <CheckBoxSelect formStateName="collection" label="Collection" /> */}
                <GradientButton onClick={() => {
                  setLoading(true);
                  getItems().then((items)=>{
                    setItems(items);
                    setLoading(false);
                  })
                  }}>
            <Typography variant="body1">FILTER</Typography>
          </GradientButton>
              </Stack>
            </Grid>
            {items.length > 0 ? items.map((props) => (
              <Grid item xs={12} sm={6} md={4} key={props.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FashionItemCard {...props} expandable />
                </Box>
              </Grid>
            )) : <h2 style={{display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto"}}>No Items Available</h2>}
            {/* {items.map((props) => (
              <Grid item xs={12} sm={6} md={4} key={props.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FashionItemCard {...props} expandable />
                </Box>
              </Grid>
            ))} */}
          </Grid>
        </Container>
        <Footer />
      </Container>
    </FormProvider>
  );
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://source.unsplash.com/random/900×700/?clothing",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?fashion",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?pants",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?trousers",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?people",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?branded",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?designers",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?global",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?logo",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?insignia",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?clothing",
    title: "random",
  },
  {
    img: "https://source.unsplash.com/random/900×700/?bags",
    title: "random",
  },
];

const RARITY_DATA: Option[] = [
  { value: "Semi rare", id: "123kjaasd", selected: false },
  { value: "Ultra rare", id: "asdasioqdoj", selected: false },
  { value: "Super rare", id: "asdaiuqas", selected: false },
  { value: "Extremely rare", id: "98ujkacc", selected: false },
];

const PRICE_DATA: Option[] = [
  { value: "< 0.05 eth", id: "osndaok", selected: false },
  { value: "> 0.05 & <= 0.2 eth", id: "oichaiu", selected: false },
  { value: "> 0.2 eth & <= 0.5 eth", id: "afhjasd", selected: false },
  { value: "> 0.5 eth", id: "yuvaeibask", selected: false },
];

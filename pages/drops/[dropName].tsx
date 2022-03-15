import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import Image from "next/image";
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
      if(parseInt(itemContract.available)>0 && now > date){
        if(checkSelected(methods.getValues().brand)){
        }
        arr.push({...itemContract, nft: {...json}, brand: {...brand.data()}, collection: {...id.data()}})
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
      return drop.docs[0].data().name;
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

      })
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
      .catch((e) => {
        enqueueSnackbar(e.message);
      });

      
  
    
  }, [router.isReady]);

  const [items, setItems] = React.useState(null);
  const [brands, setBrands] = React.useState(null);
  const [name, setName] = React.useState(null);


  if (!items && !brands) {
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

  function ImageGallery() {
    return (
      <ImageList
        sx={{ width: "100%", height: "100%" }}
        variant="quilted"
        cols={4}
        rowHeight={180}
        gap={0}
      >
        {itemData.map((item, index) => (
          <ImageListItem key={index} cols={1} rows={1}>
            <img {...srcset(item.img, 180)} alt={item.title} loading="eager" />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <FormProvider {...methods}>
      <Container  className="dropsContainer" maxWidth={false} disableGutters>
        <Container>
          <Header />
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
              {name}
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
                <GradientButton onClick={() => getItems()}>
            <Typography variant="body1">FILTER</Typography>
          </GradientButton>
              </Stack>
            </Grid>
            {items.map((props) => (
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
            ))}
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
const BRAND_DATA = [
  { value: "Sieke", id: "oansdin", selected: false },
  { value: "Alibas", id: "avwdhjdasjd", selected: false },
  { value: "Gape", id: "7b2212sx", selected: false },
];

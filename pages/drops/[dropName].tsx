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
} from "@mui/material";
import { useRouter, Router } from "next/router";
import FashionItemCard, {
  FashionItemCardProps,
} from "../../src/components/FashionItemCard";
import CheckBoxSelect, { Option } from "../../src/components/CheckBoxSelect";
import firestore from "../../firebase/clientApp";
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

export default function DropPage() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      rarity: RARITY_DATA,
      price: PRICE_DATA,
      brand: BRAND_DATA,
      collection: COLLECTION_DATA,
    },
  });
  const { dropName } = router.query;

  const { enqueueSnackbar } = useSnackbar();
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+process.env.INFURA_API_KEY));
  const marketContract = new web3.eth.Contract(marketAbi, marketAddress);
  


  React.useEffect(() => {
    if(!router.isReady) return;
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
          const contract = new web3.eth.Contract(nftAbi, itemContract.nftContract);
          const nft = await contract.methods.tokenURI(itemContract.tokenIds[0]).call();
          const response = await fetch(nft);

        if(!response.ok)
          enqueueSnackbar(response.statusText)

        const json = await response.json()
        const date = new Date(parseInt(itemContract.releaseTime) * 1000);
        if(parseInt(itemContract.available)>0 && Date.now() > date){
          arr.push({...itemContract, nft: {...json}, brand: {...brand.data()}, collection: {...id.data()}})
        }
          

        }
      }
    } else {
      router.replace("/404")
    }
      return arr;
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
      <Container maxWidth={false} disableGutters>
        <Container>
          <Header />
        </Container>
        <Box sx={{ mt: 6, mb: 3 }}>
          <ImageGallery />
        </Box>

        <Container>
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
                <CheckBoxSelect formStateName="collection" label="Collection" />
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

const DROP_DATA: FashionItemCardProps[] = [
  {
    id: "ausdkbbsk",
    src: "https://source.unsplash.com/random/900×700/?hoodies",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Hoodie",
    price: 0.02,
    rarity: 20,
    description: "lorem ipsum dolor sit",
    noOfPieces: 4,
    collectionName: "Street Wear",
    rarityCategory: "Super-rare",
  },
  {
    id: "asndka62va",
    src: "https://source.unsplash.com/random/900×700/?shirts",
    alt: "piece image",
    brandName: "Spikey",
    brandImage: "/placeholder.png",
    pieceName: "Shirt",
    price: 0.12,
    rarity: 50,
    description: "lorem ipsum dolor sit",
    noOfPieces: 1,
    collectionName: "Street Wear",
    rarityCategory: "Extremely-rare",
  },
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

const RARITY_DATA: Option[] = [
  { value: "Semi rare", id: "123kjaasd" },
  { value: "Ultra rare", id: "asdasioqdoj" },
  { value: "Super rare", id: "asdaiuqas" },
  { value: "Extremely rare", id: "98ujkacc" },
];

const PRICE_DATA: Option[] = [
  { value: "< 0.05 eth", id: "osndaok" },
  { value: "> 0.05 & <= 0.2 eth", id: "oichaiu" },
  { value: "> 0.2 eth & <= 0.5 eth", id: "afhjasd" },
  { value: "> 0.5 eth", id: "yuvaeibask" },
];
const BRAND_DATA = [
  { value: "Sieke", id: "oansdin", selected: false },
  { value: "Alibas", id: "avwdhjdasjd", selected: false },
  { value: "Gape", id: "7b2212sx", selected: false },
];

const COLLECTION_DATA = [
  { value: "Sports", id: "jakais7ja" },
  { value: "Exotic", id: "hayus8as" },
  { value: "Casuals", id: "gh3yyahsa" },
];

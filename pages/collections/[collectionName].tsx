import * as React from "react";
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
} from "@mui/material";
import { useRouter } from "next/router";
import DividedTable, {
  DividedTableProps,
} from "../../src/components/DividedTable";
import FashionItemCard, {
  FashionItemCardProps,
} from "../../src/components/FashionItemCard";
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

export default function CollectionPage() {
  const router = useRouter();
  const { collectionName } = router.query;

  const { enqueueSnackbar } = useSnackbar();
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+process.env.INFURA_API_KEY));
  


  React.useEffect(() => {
    if(!router.isReady) return;
    async function getItems() {
      const arr = [];
      const querySnapshot = await getDocs(collection(firestore, "/collections/"+collectionName+"/item"));
      for (const id of querySnapshot.docs) {
        
        //const item = await getDoc(doc(collection(firestore, "items"), id.data().id));
        const marketContract = new web3.eth.Contract(marketAbi, marketAddress);
        const item = await marketContract.methods.getItem(id.data().id).call();
        const collectionDoc = await getDoc(doc(collection(firestore, "collections"), collectionName));
        const brand = await getDoc(doc(collection(firestore, "brands"), collectionDoc.data().brand));
        const contract = new web3.eth.Contract(nftAbi, item.nftContract);
        
        
        const nft = await contract.methods.tokenURI(item.tokenIds[0]).call();
        const response = await fetch(nft);

        if(!response.ok)
          enqueueSnackbar(response.statusText)

        const json = await response.json()
        arr.push({...item, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}})
      }
      console.log(arr)
      return arr;
    }
    getItems()
      .then((value) => {
        setItems(value);
      })
      .catch((e) => {
        enqueueSnackbar(e.message);
      });
  
    async function getInfo() {
      const querySnapshot = await getDoc(doc(collection(firestore, "collections"), collectionName));
      return querySnapshot.data();
    }
    getInfo()
      .then((value) => {
        setInfo(value);
      })
      .catch((e) => {
        enqueueSnackbar(e.message);
      });
    
  }, [router.isReady]);

  const [items, setItems] = React.useState(null);
  const [info, setInfo] = React.useState(null);

  if (!items || !info) {
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
        rowHeight={140}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={4} rows={4}>
            <img
              {...srcset(item.img, 400)}
              alt={item.title}
              loading="eager"
              style={{ objectFit: "fill" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Container>
        <Header />
      </Container>
      <Box sx={{ mt: 6, position: "relative" }}>
        <ImageGallery />
        <Box
          sx={{
            width: "380px",
            aspectRatio: "1/1",
            borderRadius: "99999px",
            position: "absolute",
            bottom: "-120px",
            left: "50%",
            transform: "translate(-50%, 0)",
            overflow: "hidden",
            backgroundImage:
              "url(https://source.unsplash.com/random/1200x400/?logo)",
          }}
        />
      </Box>
      <Container>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          sx={{ mt: 24, mb: 4 }}
        >
          <b>
            {/* Should ideally be this {collectionName} */}
            {"COLLECTION NAME HERE"}
          </b>
        </Typography>
        <Grid container spacing={8} sx={{ mb: 16 }}>
          <Grid item xs={12}>
            <DividedTable {...DividerTableData} />
            <Container maxWidth="md">
              <Typography sx={{ mt: 6 }} variant="h6" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                consectetur minus iste nulla quo praesentium modi dolorum
                necessitatibus aliquid dolorem accusamus officia, labore neque.
                Impedit, odit? Culpa tempora unde voluptates vero accusantium
                accusamus fugiat, autem neque eaque iusto ipsam sequi!
              </Typography>
            </Container>
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
    img: "https://source.unsplash.com/random/1200x400/?city",
    title: "Collection background",
  },
];

const COLLECTION_ITEMS: FashionItemCardProps[] = [
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

const DividerTableData: DividedTableProps = {
  title1: "COLLECTION",
  subtitle1: "Tundra Burst",
  title2: "DROP CATEGORY",
  subtitle2: "Exotic Wear",
  title3: "PIECES",
  subtitle3: "Only 20 in-store",
};

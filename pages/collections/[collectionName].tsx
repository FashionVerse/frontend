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
import { AbiItem } from 'web3-utils'
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
  getDoc,
  CollectionReference
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
        const marketContract = new web3.eth.Contract(marketAbi as AbiItem[], marketAddress);
        const item = await marketContract.methods.getItem(id.data().id).call();
        const collectionDoc = await getDoc(doc(firestore, "/collections/"+collectionName));
        const brand = await getDoc(doc(collection(firestore, "brands"), collectionDoc.data().brand));
        const contract = new web3.eth.Contract(nftAbi as AbiItem[], item.nftContract);
        
        
        const nft = await contract.methods.tokenURI(item.tokenIds[0]).call();
        const response = await fetch(nft);

        if(!response.ok)
          enqueueSnackbar(response.statusText)

        const json = await response.json()
        const date = new Date(parseInt(item.releaseTime) * 1000);
        const now = new Date(Date.now());
        if(parseInt(item.available) > 0 && now > date){
          arr.push({...item, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}})
        }
        
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
      const querySnapshot = await getDoc(doc(firestore, "/collections/"+collectionName));
      const dropcategory = await getDoc(doc(firestore, "drop", querySnapshot.data().drop));
      const itemSnapshot = await getDocs(collection(firestore, "/collections/"+collectionName+"/item"));
      DividerTableData.subtitle1 = querySnapshot.data().title
      DividerTableData.subtitle2 = dropcategory.data().title
      var num = 0;
      DividerTableData.subtitle3 = itemSnapshot.docs.length.toString();
      return {...querySnapshot.data(), dropCategory: dropcategory.data()};
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

          <ImageListItem key={info.id} cols={4} rows={4}>
            <img
              {...srcset(info.coverSrc, 400)}
              alt={info.title}
              loading="eager"
              style={{ objectFit: "fill" }}
            />
          </ImageListItem>
        
      </ImageList>
    );
  }

  return (
    <Container maxWidth={false} disableGutters className="collectionContainer">
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
              "url("+info.avatarSrc+")",
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
            {info.title}
          </b>
        </Typography>
        <Grid container spacing={8} sx={{ mb: 16 }}>
          <Grid item xs={12}>
            <DividedTable {...DividerTableData} />
            <Container maxWidth="md">
              <Typography sx={{ mt: 6 }} variant="h6" align="center">
                {info.description}
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

var DividerTableData: DividedTableProps = {
  title1: "COLLECTION",
  subtitle1: "Tundra Burst",
  title2: "DROP CATEGORY",
  subtitle2: "Exotic Wear",
  title3: "PIECES",
  subtitle3: "Only 20 in-store",
};

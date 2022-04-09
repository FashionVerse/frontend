import * as React from "react";
import Footer from "../../src/components/Footer";
import Image from "next/image";
import AnimLogo from "../../src/components/AnimLogo";
import { Pagination } from "@mui/material";
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
import GridCard, { GridCardProps } from "../../src/components/GridCard";
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
  Firestore
} from "@firebase/firestore";
import { useSnackbar } from "notistack";
import {motion} from 'framer-motion';
import useSWR from 'swr';
import { FashionItemCardProps } from "../../src/components/FashionItemCard";
import FashionItemCard from "../../src/components/FashionItemCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BrandPage() {
  const router = useRouter();
  const { brandId } = router.query;

  const [page, setPage] = React.useState(1);

  function changePage(event, value){
    setPage(value)
  }


  const { enqueueSnackbar } = useSnackbar();



  const { data, error } = useSWR(process.env.API_URL+'/api/getBrands?url='+brandId+"&page="+page, fetcher)
  if (error) {
    router.replace("/404")
  }
  const arr: FashionItemCardProps[] = [];
  if (data) {
  console.log("data ",data)
    data.items.map((item) => {
       arr.push({
        id: item._id,
        itemId: item.itemId,
        nft: item.nft.metadata,
        brand: data.brand,
        price: item.price,
        rarity: item.totalSupply,
        collection: item.collection,
        rarityCategory: "Semi-rare",
        expandable: false,
      });

      
    })
  }

  // React.useEffect(() => {
  //   if(!router.isReady) return;
  //   async function getCollections() {
  //     const arr = [];
  //     const querySnapshot = await getDocs(query(collection(firestore, "collections"), where("brand", "==", brandId ?? "")));
  //     if(querySnapshot.docs.length > 0){

      
  //     querySnapshot.forEach((doc) => {
  //       arr.push(doc.data());
  //     });
  //     return arr;
  //   } else {
  //     return arr;
  //   }
  //   }
  //   getCollections()
  //     .then((value) => {
  //       setCollections(value);
  //     })
  //     .catch((e) => {
  //       enqueueSnackbar(e.message);
  //     });
  
  //   async function getInfo() {
  //     const querySnapshot = await getDoc(doc(firestore, "/brands/"+brandId));
  //     if(typeof querySnapshot.data() !== 'undefined'){
  //       return querySnapshot.data();
  //     } else {
  //       return {};
  //     }
      
  //   }
  //   getInfo()
  //     .then((value) => {
  //       setInfo(value);
  //     })
  //     .catch((e) => {
  //       enqueueSnackbar(e.message);
  //     });

  //     async function getDesigners() {
  //       const arr = [];
  //       const querySnapshot = await getDocs(collection(firestore, "/brands/"+brandId+"/designers"));
  //       querySnapshot.forEach((doc) => {
  //         arr.push(doc.data());
  //       });
  //       return arr;
  //     }
  //     getDesigners()
  //       .then((value) => {
  //         setDesigners(value);
  //       })
  //       .catch((e) => {
  //         enqueueSnackbar(e.message);
  //       });
    
  // }, [router.isReady]);

  // const [collections, setCollections] = React.useState(null);
  // const [info, setInfo] = React.useState(null);
  // const [designers, setDesigners] = React.useState(null);

  

  if (!data) {
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
              {...srcset(data.brand.coverSrc, 400)}
              alt={data.brand.title}
              loading="eager"
              style={{ objectFit: "fill" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  console.log(data.avatarSrc)

  return (
    <Container maxWidth={false} disableGutters>
      <Container>
        {/* <Header /> */}
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
            backgroundImage: "url("+data.brand.avatarSrc+")",
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
            {/* Should ideally be this {brand} */}
            {data.brand.title}
          </b>
        </Typography>
        <Grid container spacing={8} sx={{ mb: 16 }}>
          <Grid item xs={12}>
            {/* <DividedTable {...DividerTableData} /> */}
            <Container maxWidth="md">
              <Typography sx={{ mt: 6 }} variant="h6" align="center">
                {data.description}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="primary"
                sx={{ mt: 6, mb: 2 }}
              >
                <b>CONTRIBUTING DESIGNERS</b>
              </Typography>
            </Container>
            <Grid
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* {designers.map(({ name, description }, i) => (
                <Grid item xs={12} id={name + i}>
                  <Typography gutterBottom align="center">
                    <b>{name}</b>
                  </Typography>
                  <Typography align="center" variant="body2">
                    {description}
                  </Typography>
                </Grid>
              ))} */}
            </Grid>
          </Grid>
          {/* {collections.length > 0 ? collections.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  router.push("/collections/" + props.id);
                }}
              >
                <GridCard {...props} noBrand />
              </Box>
            </Grid>
          )) : <h2 style={{display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto"}}>No Collections Available</h2>} */}
          {arr.length > 0 ? arr.map((props) => { 
              console.log(props)
              return(
              <Grid item xs={12} sm={6} md={4} key={props.id}>
                  <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: "easeOut", delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
          className="tw-cursor-pointer"
        >
                  <FashionItemCard {...props} expandable />
                  </motion.div>
              </Grid>
            )}) : <h2 style={{display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto"}}>No Items Available</h2>}
        </Grid>
        <div className="tw-flex tw-justify-center tw-items-end tw-pb-10 tw-mb-[5%] -tw-mt-[5%]">
        <Pagination count={data.totalPages} color="primary" size="large" onChange={changePage} page={page} />
        </div>
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
    title: "Brand background",
  },
];

const BRANDS: GridCardProps[] = [
  {
    id: "asdhkjasd3ad",
    title: "Limitless",
    subtitle: "Boundless fashion",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?nike",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?gap",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?adidas",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?cr7",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "naksjadidjadw",
    title: "Vintage",
    subtitle: "Feeling old school?",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?company",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?logo",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pattern",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?facebook",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "hsyaiajskaiaasasd",
    title: "Work Wear",
    subtitle: "Fashion at work",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?designer",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?levis",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?denims",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?puma",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "hajsuaiaosakassd",
    title: "Evening Wear",
    subtitle: "Fashionable evenings",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?brand",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?logo",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?branded",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?company",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
];

const DESIGNERS = [
  {
    name: "Joseph Joestar",
    description: "Creates bizzare designs inspired by ancient gods",
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

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
import Typewriter from "typewriter-effect";
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
  Firestore,
} from "@firebase/firestore";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import useSWR from "swr";
import { FashionItemCardProps } from "../../src/components/FashionItemCard";
import FashionItemCard from "../../src/components/FashionItemCard";
import { NextSeo } from "next-seo";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BrandPage() {
  const router = useRouter();
  const { brandId } = router.query;

  const [page, setPage] = React.useState(1);

  function changePage(event, value) {
    setPage(value);
  }

  const { enqueueSnackbar } = useSnackbar();

  const { data, error } = useSWR(
    process.env.API_URL + "/api/getBrands?url=" + brandId + "&page=" + page,
    fetcher
  );
  if (error) {
    router.replace("/404");
  }
  const arr: FashionItemCardProps[] = [];
  if (data) {
    console.log("data ", data);
    data.items.map((item) => {
      arr.push({
        id: item._id,
        itemId: item.itemId,
        nft: item.nft.metadata,
        brand: data.brand,
        price: item.price,
        rarity: item.totalSupply,
        collection: item.collection,
        rarityCategory: "Bronze",
        expandable: false,
      });
    });
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

  function ImageGallery() {
    return (
      <ImageList
        sx={{ width: "100%", height: "100%" }}
        // variant="quilted"
        rowHeight={572}
        className="parralex-image"
      >
        <ImageListItem>
          <img
            {...srcset(data.brand.coverSrc, 400)}
            alt={data.brand.title}
            loading="eager"
            style={{ objectFit: "cover" }}
          />
        </ImageListItem>
      </ImageList>
      // <ImageList
      //   sx={{ width: "100%", height: "100%" }}
      //   // variant="quilted"
      //   // cols={4}
      //   rowHeight={572}
      //   className="parralex-image"
      // >
      //   {/* {itemData.map((item) => ( */}
      //     <ImageListItem>
      //       <img
      //         {...srcset(data.brand.coverSrc, 400)}
      //         alt={data.brand.title}
      //         loading="eager"
      //         style={{ objectFit: "cover" }}
      //       />
      //     </ImageListItem>
      //   {/* ))} */}
      // </ImageList>
    );
  }

  console.log(data.avatarSrc);

  return (
    <>
      <NextSeo
        title={data.title}
        description={data.subtitle}
        canonical={"https://www.thefashionverse.io/brands/"+data.url+"/"}
        twitter={{
          handle: "@FashionVerseInc",
          cardType: "summary_large_image",
        }}
      />

      <Container
        className="wrapper brand-page-inner common-wrapper"
        maxWidth={false}
        disableGutters
      >
        <Box sx={{ position: "relative" }}>
          <ImageGallery />
          <Box
            sx={{
              width: "380px",
              aspectRatio: "1/1",
              borderRadius: "99999px",
              position: "absolute",
              bottom: "-170px",
              zIndex: 2,
              fill: "contain",
              left: "50%",
              transform: "translate(-50%, 0)",
              overflow: "hidden",
              backgroundImage: "url(" + data.brand.avatarSrc + ")",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 0 16px 0 #c0c0c0",
              whileHover: {
                boxShadow: "0 0 16px 0 #c0c0c0",
              },
            }}
            className="brand-avatar"
          />
        </Box>

        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container"
        >
           <Grid
            container
            direction="row"
            spacing={4}
          >
          <Grid className="desginer-info-outer" item xs={12} sx={{ mt: 28, mb: 4 }}>
            <ul className="designer-info-box">
              <li>
                <Typography variant="h2" className="secondary-heading">
                  <Typography
                    variant="h2"
                    color="primary"
                    component="span"
                    className="gradient-text"
                  >
                    DESIGNER
                  </Typography>
                </Typography>

                <Typography
                  variant="subtitle1"
                  className="sub-heading with-small-font"
                  align="center"
                >
                  {data.brand.contributor}
                </Typography>
              </li>
              <li>
                <Typography variant="h2" className="secondary-heading">
                  <Typography
                    variant="h2"
                    color="primary"
                    component="span"
                    className="gradient-text"
                  >
                    Drop Category
                  </Typography>
                </Typography>

                <Typography
                  variant="subtitle1"
                  className="sub-heading with-small-font"
                  align="center"
                >
                  {data.drop === null ? "": data.drop.title}
                </Typography>
              </li>
              <li>
                <Typography variant="h2" className="secondary-heading">
                  <Typography
                    variant="h2"
                    color="primary"
                    component="span"
                    className="gradient-text"
                  >
                    Unique Designs
                  </Typography>
                </Typography>

                <Typography
                  variant="subtitle1"
                  className="sub-heading with-small-font"
                  align="center"
                >
                  {data.totalItems}
                </Typography>
              </li>
            </ul>
            <span  className="divider"></span>

            <Box>
              <Typography
                variant="h1"
                className="main-heading"
                align="center"
                textTransform="uppercase"
                sx={{ mt: 7, mb: 4 }}
              >
                <Typography
                  variant="h1"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  {data.brand.title}
                </Typography>
              </Typography>

              <Typography
                variant="subtitle1"
                className="sub-heading with-small-font"
                align="center"
              >
                {/* Build your First Digital <br /> Wardrobe */}
                {/* <Typewriter
                  options={{
                    strings: [data.brand.description],
                    autoStart: true,
                    loop: true,
                  }}
                /> */}
                {data.brand.description}
              </Typography>
              <Typography
                variant="h2"
                className="secondary-heading"
                sx={{ mt: 8 }}
                style={{marginBottom: "20px"}}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  Collection Name
                </Typography>
                </Typography>
                <Typography
                variant="h3"
                className="sub-heading"
                sx={{mb: 4}}
                align="center">
                {data.collection === null ? "": data.collection.title}
                </Typography>

                <Typography
                variant="h3"
                className="sub-heading with-small-font"
                align="center">
                {data.collection === null ? "": data.collection.description}
                </Typography>
                
              

              {/* <Typography
                variant="subtitle1"
                className="sub-heading with-small-font"
                align="center"
              >
                {data.brand.contributor}
              </Typography> */}
            </Box>
          </Grid>
          </Grid>

          <Grid
            container
            className="side-spacing custom-card-drop"
            direction="row"
            justifyContent= "center"
            spacing={4}
            sx={{ mt: 2, mb: 10 }}
          >
            {arr.length > 0 ? (
              arr.map((props) => {
                console.log(props);
                return (
                  <Grid item xs={12} sm={6} lg={4} key={props.id}>
                    <FashionItemCard {...props} expandable />
                  </Grid>
                );
              })
            ) : (
              <h2
                className="no-items-available"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                Coming Soon…
              </h2>
            )}
          </Grid>
        </Grid>

        {/* <Typography
          variant="h3"
          align="center"
          color="primary"
          sx={{ mt: 24, mb: 4 }}
        >
          <b>
            {data.brand.title}
          </b>
        </Typography> */}

        {arr.length > 0 ? (
          <div className="tw-flex tw-justify-center tw-items-end tw-pb-4 tw-mb-[5%] tw-mt-5">
            <Pagination
              count={data.totalPages}
              color="primary"
              size="large"
              onChange={changePage}
              page={page}
            />
          </div>
        ) : (
          ""
        )}
        <Footer />
      </Container>
    </>
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

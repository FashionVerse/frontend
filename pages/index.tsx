import * as React from "react";
import Image from "next/image";
import Footer from "../src/components/Footer";
import LandingPageDisplay from "../src/components/LandingPageDisplay";
import { motion } from "framer-motion";
import AnimLogo from "../src/components/AnimLogo";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { BiRocket } from "react-icons/bi";
import { useRouter } from "next/router";
import Slider from "../src/components/Slider";
import GridCard, { GridCardProps } from "../src/components/GridCard";
import { BsDiscord, BsMedium, BsTwitter } from "react-icons/bs";

import AdvisorCard, { AdvisorCardProps } from "../src/components/AdvisorCard";
import firestore from "../firebase/clientApp";
import { AbiItem } from "web3-utils";
import { nftAbi, marketAbi, marketAddress } from "../public/abi";
import Web3 from "web3";
import Typewriter from "typewriter-effect";
import { NextSeo } from "next-seo";
import Card from "@mui/material/Card";
import { styled, alpha } from "@mui/system";
// import {
//   collection,
//   QueryDocumentSnapshot,
//   DocumentData,
//   query,
//   where,
//   limit,
//   getDocs,
//   getDoc,
//   doc
// } from "@firebase/firestore";
import { useSnackbar } from "notistack";
import useSWR from "swr";
import ari from "../../public/ari.jpeg";
import RightImage from "../public/right-image.png";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
}));

export const FashionItemCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: "404px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 51,121,157 )`
      : alpha(theme.palette.primary.light, 0.4),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  padding: "16px",
  borderRadius: "6px",
  boxShadow: "none",
}));

// getStaticProps / getServerSideProps
export default function Index() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY
    )
  );
  const marketContract = new web3.eth.Contract(
    marketAbi as AbiItem[],
    marketAddress
  );

  const getBrands = () => {
    const { data, error } = useSWR(
      process.env.API_URL + "/api/getBrands?size=5",
      fetcher
    );
    return { data: data, error: error };
  };

  // const { data, error } = useSWR(process.env.API_URL+'/api/getBrands?size=5', fetcher)
  const { data: brandData, error: brandError } = getBrands();
  if (brandError) {
    // enqueueSnackbar("Failed to load brands", { variant: "error" });
    console.log("Failed");
  }
  const brands: GridCardProps[] = [];
  if (brandData) {
    console.log("data ", brandData);
    brandData.brands.forEach((item) => {
      brands.push({
        topLeftImage: item.gridImages[0],
        topRightImage: item.gridImages[1],
        bottomLeftImage: item.gridImages[2],
        bottomRightImage: item.gridImages[3],
        avatarSrc: item.avatarSrc,
        title: item.title,
        subtitle: item.subtitle,
        id: item._id,
        href: "brands/" + item.url,
      });
    });
  }

  const getDrops = () => {
    const { data, error } = useSWR(
      process.env.API_URL + "/api/getDrops",
      fetcher
    );
    return { data: data, error: error };
  };

  // const { data, error } = useSWR(process.env.API_URL+'/api/getBrands?size=5', fetcher)
  const { data: dropData, error: dropError } = getDrops();
  if (dropError) {
    // enqueueSnackbar("Failed to load drops", { variant: "error" });
    console.log("Failed");
  }
  const drops: GridCardProps[] = [];
  if (dropData) {
    console.log("drops ", dropData);
    dropData.drops.forEach((item) => {
      drops.push({
        topLeftImage: item.gridImages[0],
        topRightImage: item.gridImages[1],
        bottomLeftImage: item.gridImages[2],
        bottomRightImage: item.gridImages[3],
        avatarSrc: item.avatarSrc,
        title: item.title,
        subtitle: item.subtitle,
        id: item._id,
        href: "drops/" + item.url,
      });
    });
  }

  // const { data, error } = useSWR(process.env.API_URL+'/api/getDrops', fetcher)
  // if (error) enqueueSnackbar("Failed to load brands", { variant: "error" });
  // const drops: GridCardProps[] = [];
  // if (data) {
  // console.log("drops ",data)
  //   data.drops.forEach((item) => {
  //     brands.push({
  //       topLeftImage: item.gridImages[0],
  //       topRightImage: item.gridImages[1],
  //       bottomLeftImage: item.gridImages[2],
  //       bottomRightImage: item.gridImages[3],
  //       avatarSrc: item.avatarSrc,
  //       title: item.title,
  //       subtitle: item.subtitle,
  //       id: item._id,
  //       href: "drops/"+item.url,
  //     });
  //   });
  // }

  // React.useEffect(() => {
  //   async function getBrands() {
  //     const arr: GridCardProps[] = [];
  //     const querySnapshot = await getDocs(query(collection(firestore, "brands"), limit(5)));
  //     querySnapshot.forEach((doc) => {
  //       arr.push(doc.data() as GridCardProps);
  //     });
  //     return arr;
  //   }

  //   async function getFeatured() {
  //     const arr = [];
  //     const items = await getDocs(collection(firestore, "featured"));
  //     for(const item of items.docs) {
  //       const itemContract = await marketContract.methods.getItem(item.data().itemId).call();
  //       const collectionDoc = await getDoc(doc(firestore, "collections", item.data().collection));
  //       const brand = await getDoc(doc(collection(firestore, "brands"), collectionDoc.data().brand));
  //       const contract = new web3.eth.Contract(nftAbi as AbiItem[], itemContract.nftContract);
  //       const nft = await contract.methods.tokenURI(itemContract.tokenIds[0]).call();
  //       const response = await fetch(nft);

  //     if(!response.ok)
  //       enqueueSnackbar(response.statusText)

  //     const json = await response.json()
  //     arr.push({...itemContract, nft: {...json}, brand: {...brand.data()}, collection: {...collectionDoc.data()}})

  //     }
  //     return arr
  //   }

  //   async function getDrops(){
  //     const drops = await getDocs(collection(firestore, "drop"));
  //     return drops.docs;
  //   }
  //       getFeatured().then((value)=>{
  //         setFeatured(value);
  //         getDrops().then((value)=>{
  //           setDrops(value);
  //         })
  //       })

  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  // const [brands, setBrands] = React.useState<GridCardProps[] | null>(null);

  if (!brandData || !dropData) {
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

  return (
    <>
      <NextSeo
        title="The FashionVerse"
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

      <Container className="wrapper home-page common-wrapper" maxWidth={false}>
        <div className="star-wrapper">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>
        {/* First Fold */}
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container first-fold"
        >
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          <Grid item xs={12} md={6} className="main-heading-wrapper">
            <Box sx={{ minHeight: "271px" }}>
              <Typography variant="h1" className="main-heading">
                <Typography
                  variant="h1"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  GENESIS
                </Typography>
                <i>COLLECTION</i>
              </Typography>
              <Typography
                sx={{ mt: 3 }}
                variant="subtitle1"
                className="sub-heading"
                align="center"
              >
                {/* Build your First Digital <br /> Wardrobe */}
                <Typewriter
                  options={{
                    strings: ["Build Your  Digital Wardrobe."],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              className="myNewBox"
              // sx={{
              //   aspectRatio: "1/1",
              // }}
            >
              {/* <Image
              src="/hero-circle.svg"
              alt="..."
              priority
              loading="eager"
              layout="responsive"
              width="740px"
              height="740px"
            /> */}
              <LandingPageDisplay expandable />
            </Box>
          </Grid>
        </Grid>

        {/* Drops */}
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container second-fold section-spacing common-fold"
        >
          <Grid item xs={12}>
            <span className="divider"></span>
            <Box>
              <Typography
                variant="h2"
                className="secondary-heading"
                sx={{ mt: 10, mb: 10 }}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  LATEST&nbsp;
                </Typography>
                <i>DROPS</i>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              className="custom-slider-box"
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                // paddingLeft: "32px",
              }}
            >
              <Slider
                slideArray={drops.map((props) => (
                  // Hard coded link to drop
                  // <motion.div
                  //   // className="drops_hover_cursor"
                  //   style={{
                  //     cursor: "pointer",
                  //   }}
                  //   initial={{ scale: 0.8, opacity: 0 }}
                  //   animate={{ scale: 1, opacity: 1 }}
                  //   transition={{ ease: "easeOut", delay: 0.1 }}
                  //   whileHover={{ scale: 1.05 }}
                  //   whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                  // >
                  <GridCard
                    {...props}
                    noBrand
                    key={props.id}
                    href={props.href}
                  />
                  // </motion.div>
                ))}
              />
            </Box>
          </Grid>
        </Grid>
        {/* Brands */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container section-spacing third-fold common-fold"
        >
          <Grid item xs={12}>
            <span className="divider"></span>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mx: 16, my: 10 }}
              className="our-partner"
            >
              <Typography
                variant="h2"
                className="secondary-heading"
                // sx={{ mt: 10, mb: 10 }}
              >
                OUR PARTNER&nbsp;
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  <b>BRANDS</b>
                </Typography>
              </Typography>
              <GradientButton
                variant="contained"
                color="primary"
                className="exploere-all-btn"
                size="large"
                sx={{ borderRadius: "16px", px: "36px", py: "16px" }}
                startIcon={<BiRocket />}
                href="/brands"
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Explore All
                </Typography>
              </GradientButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                // paddingLeft: "32px",
              }}
            >
              <Slider
                slideArray={brands.map((props) => (
                  <div
                    onClick={() => {
                      router.push(props.href);
                    }}
                  >
                    {/* <motion.div
                      // className="drops_hover_cursor"
                      style={{
                        cursor: "pointer",
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ ease: "easeOut", delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                    > */}
                    <GridCard {...props} key={props.id + "-ahsdkh"} />
                    {/* </motion.div> */}
                  </div>
                ))}
              />
            </Box>
          </Grid>
        </Grid>

        {/* new fold added */}
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container second-fold section-spacing fashion-verse"
        >
          <Grid className="with-spacing" sx={{ mb: 10 }} item xs={12}>
            <span className="divider"></span>
          </Grid>

          <Grid item xs={12} md={6}>
            <Image src={RightImage} alt="RightImage" objectFit="cover" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h2"
                className="secondary-heading"
                sx={{ mb: 4, pb: 1 }}
                style={{ lineHeight: "normal" }}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  The Fashion Verse <br></br>
                </Typography>
                <i>
                  is your Digital Fashion <br></br> Retailer
                </i>
              </Typography>
            </Box>
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
              Our NFTs are tied with Metaverse and Tangible Wearability
            </Typography>
            <List className="custom-list">
              <ListItem disablePadding>
                <ListItemText primary="Gold and Platinum NFTs give you access to claim the piece’s Decentraland compatible NFT in subsequent drops. " />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Soon, we will release phygital NFTs with both metaverse wearability and a tangible piece catered to your fit." />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container same-fold section-spacing common-fold"
        >
          <Grid item xs={12}>
            <span className="divider"></span>
            <Box>
              <Typography
                variant="h2"
                className="secondary-heading"
                sx={{ mt: 10 }}
                style={{ lineHeight: "normal" }}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  Every unique design &nbsp; <br></br>
                </Typography>
                <i>is available in select quantities</i>
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            justifyContent="center"
            spacing={8}
            sx={{ mt: 2 }}
            className="badge-container"
          >
            <Grid item xs={12} sm={6} md={3}>
              {/* <FashionItemCardContainer className="custom-card with-description bronze">
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Bronze"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            30 NFTs
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </FashionItemCardContainer> */}
              <FashionItemCardContainer className="custom-card with-description bronze">
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Bronze"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            30 NFTs
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </FashionItemCardContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FashionItemCardContainer className="custom-card with-description silver">
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Silver"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            20 NFTs
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </FashionItemCardContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FashionItemCardContainer className="custom-card with-description gold">
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Gold"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            12 NFTs
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </FashionItemCardContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FashionItemCardContainer className="custom-card with-description platinum">
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Platinum"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            1 of 1 NFT
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </FashionItemCardContainer>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid
          container
          direction="row"
          justifyContent="center"
          className="custom-container"
          sx={{ mb: 8 }}
          alignItems="stretch"
        >
          <Grid item xs={12}>


            
          </Grid>
        </Grid> */}

        {/* Advisors */}
        {/* <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container section-spacing fourth-fold"
        >
          <Grid item xs={12}>
            <span className="divider"></span>
            <Box sx={{ my: 10 }}>
              <Typography
                sx={{ textTransform: "uppercase" }}
                variant="h2"
                className="secondary-heading"
              >
                We are trusted by&nbsp;
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  <b>prominent personalities</b>
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              {ADVISORS.map((props) => (
                <Grid
                  key={props.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <AdvisorCard {...props} />
                  <motion.div
                    // className="drops_hover_cursor"
                    style={{
                      cursor: "pointer",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ease: "easeOut", delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                  >
                    <AdvisorCard {...props} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid> */}
        {/* Community */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container section-spacing fifth-fold"
        >
          <Grid item xs={12}>
            <span className="divider"></span>
            <Box sx={{ my: 10 }}>
              <Typography
                variant="h2"
                className="secondary-heading"
                sx={{ mt: 10, mb: 10 }}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  JOIN THE&nbsp;
                </Typography>
                <i>
                  <b>FV</b>COMMUNITY
                </i>
              </Typography>
            </Box>
          </Grid>

          <Stack
            direction="row"
            gap={6}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <IconButton
              size="large"
              href="https://twitter.com/FashionVerseInc"
              target="_blank"
            >
              <BsTwitter fontSize={"2em"} color="#1DA1F2" />
            </IconButton>
            <IconButton
              size="large"
              href="https://discord.gg/thefashionverse"
              target="_blank"
            >
              <BsDiscord fontSize={"2em"} color="#738ADB" />
            </IconButton>
            <IconButton
              size="large"
              href="https://medium.com/@FashionVerse"
              target="_blank"
            >
              <BsMedium fontSize={"2em"} color="#515151" />
            </IconButton>
          </Stack>
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

const DROPS: GridCardProps[] = [
  {
    id: "abc123",
    title: "Street Wear",
    subtitle: "Fashion for everyday",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?denim",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?glam",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?glamour",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "h7jaus9",
    title: "Vintage",
    subtitle: "Feeling old school?",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?shirt",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?dress",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?color",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "7haj8ka",
    title: "Work Wear",
    subtitle: "Fashion at work",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?glam",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?shirt",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?color",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "h8ak9ja",
    title: "Party Wear",
    subtitle: "Glam and Glitter",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?dress",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?design",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?clothing",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "jk9a3ha",
    title: "Evening Wear",
    subtitle: "Fashionable evenings",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pant",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?trouser",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pretty",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?clothing",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "9ajus2h",
    title: "Ethnic",
    subtitle: "Fashion for the cultured",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?scarf",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?hoodie",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?shoes",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "ka9kai34",
    title: "Limitless",
    subtitle: "Boundless fashion",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?jeans",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?clothes",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?clothing",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
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

const ADVISORS: AdvisorCardProps[] = [
  // {
  //   id: "klaose",
  //   src: "https://source.unsplash.com/random/900×700/?person",
  //   alt: "advisor brand",
  //   name: "Ari Lightman",
  //   title: "Web3 and NFTs",
  //   background: "Carnegie Mellon Distinguished Professor of Digital Media and Marketing",
  // },
  {
    id: "j7hausa",
    src: "/ari.jpeg",
    alt: "advisor brand",
    name: "Ari Lightman",
    title: "Web3 and NFT Advisor",
    background: "Carnegie Mellon Professor of Digital Media and Marketing",
    link: "https://www.linkedin.com/in/arilightman/",
  },
  {
    id: "jk8hay62ua",
    src: "/richard.jpeg",
    alt: "advisor brand",
    name: "Richard Brown",
    title: "Community Building and Token Economics ",
    background: "Founder of SCRF and ex-Head of Core Community at MakerDAO",
    link: "https://www.linkedin.com/in/richardgbrown/",
  },
  {
    id: "kl8j26ags",
    src: "/amanda.jpeg",
    alt: "advisor brand",
    name: "Amanda Bopp",
    title: "Digital Fashion",
    background: "Vice President of North America Marketing at Kate Spade",
    link: "https://www.linkedin.com/in/amanda-bopp-943b964/",
  },
  // {
  //   id: "l03fg7h",
  //   src: "https://source.unsplash.com/random/900×700/?asian",
  //   alt: "advisor brand",
  //   name: "Oliver Quin",
  //   title: "Technical Advisor",
  //   background:
  //     "Software Engineer at Syndicate Protocol and Carnegie Mellon grad",
  // },
];

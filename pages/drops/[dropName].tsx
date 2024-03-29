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
import { AbiItem } from "web3-utils";
import { Pagination } from "@mui/material";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { nftAbi, marketAbi, marketAddress } from "../../public/abi";
import { styled } from "@mui/system";
import useSWR from "swr";
import Typewriter from "typewriter-effect";
import { NextSeo } from "next-seo";

const fetcher = (url) => fetch(url).then((res) => res.json());

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

  const [page, setPage] = React.useState(1);

  function changePage(event, value) {
    setPage(value);
  }

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY
    )
  );
  const marketContract = new web3.eth.Contract(
    marketAbi as AbiItem[],
    marketAddress
  );

  const GradientButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: "white",
    padding: "12px 18px",
  }));

  function checkSelected(arr) {
    for (const item of arr) {
      if (item.selected == true) {
        return true;
      }
    }
    return false;
  }
  const [mounted, setMounted] = React.useState(false);

  const getDrop = (dropName) => {
    const { data, error } = useSWR(
      process.env.API_URL + "/api/getDrops?url=" + dropName,
      fetcher
    );
    return { data: data, error: error };
  };

  // const getItems = (dropName) =>{
  //   const { data, error } = useSWR(process.env.API_URL+'/api/getItems?dropName='+dropName, fetcher);
  //   return {data: data, error: error}
  // }

  const { data: dropData, error: dropError } = getDrop(dropName);
  if (dropError) {
    // enqueueSnackbar("Failed to load drops", { variant: "error" });
    console.log("Failed");
  }
  // const drops: GridCardProps[] = [];
  if (dropData) {
    console.log("drops ", dropData);
    // dropData.drops.forEach((item) => {
    //   drops.push({
    //     topLeftImage: item.gridImages[0],
    //     topRightImage: item.gridImages[1],
    //     bottomLeftImage: item.gridImages[2],
    //     bottomRightImage: item.gridImages[3],
    //     avatarSrc: item.avatarSrc,
    //     title: item.title,
    //     subtitle: item.subtitle,
    //     id: item._id,
    //     href: "drops/"+item.url,
    //   });
    // });
  }

  async function getItems(page) {
    const items: FashionItemCardProps[] = [];
    try {
      const bodyItem = {
        rarity: [],
        brand: [],
        price: [],
      };
      const rarity = methods.getValues().rarity;
      const brand = methods.getValues().brand;
      const price = methods.getValues().price;

      brand.map((brandItem) => {
        if (brandItem.selected) {
          bodyItem.brand.push(brandItem.id);
        }
      });

      rarity.map((rarityItem) => {
        if (rarityItem.selected) {
          if (rarityItem.id == "123kjaasd") {
            bodyItem.rarity.push({
              min: 30,
            });
          }
          if (rarityItem.id == "asdasioqdoj") {
            bodyItem.rarity.push({
              min: 15,
              max: 30,
            });
          }
          if (rarityItem.id == "asdaiuqas") {
            bodyItem.rarity.push({
              min: 5,
              max: 15,
            });
          }
          if (rarityItem.id == "98ujkacc") {
            bodyItem.rarity.push({
              min: 0,
              max: 5,
            });
          }
        }
      });

      price.map((priceItem) => {
        if (priceItem.selected) {
          if (priceItem.id == "yuvaeibask") {
            bodyItem.price.push({
              min: Web3.utils.toWei("0.5", "ether"),
            });
          }
          if (priceItem.id == "afhjasd") {
            bodyItem.price.push({
              min: Web3.utils.toWei("0.2", "ether"),
              max: Web3.utils.toWei("0.5", "ether"),
            });
          }
          if (priceItem.id == "oichaiu") {
            bodyItem.price.push({
              min: Web3.utils.toWei("0.05", "ether"),
              max: Web3.utils.toWei("0.2", "ether"),
            });
          }
          if (priceItem.id == "osndaok") {
            bodyItem.price.push({
              min: 0,
              max: Web3.utils.toWei("0.05", "ether"),
            });
          }
        }
      });

      const response = await fetch(
        process.env.API_URL + "/api/getItems?dropName=" + page,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyItem),
        }
      );
      const itemData = await response.json();

      if (itemData) {
        console.log("items", itemData);
        setItemData(itemData);
        itemData.items.map((item) => {
          items.push({
            id: item._id,
            itemId: item.itemId,
            nft: item.nft.metadata,
            brand: item.brand,
            price: item.price,
            rarity: item.totalSupply,
            collection: item.collection,
            rarityCategory: "Bronze",
            expandable: false,
          });
        });
      }
    } catch (e) {
      console.log(e);
      // enqueueSnackbar("Failed to load items", { variant: "error" });
      console.log("Failed");
    }
    return items;
  }

  // async function getItems() {
  //   const arr = [];
  //   const drop = await getDocs(query(collection(firestore, "drop"), where("id", "==", dropName)));
  //   if(drop.docs.length > 0){
  //   const querySnapshot = await getDocs(query(collection(firestore, "collections"), where("drop", "==", drop.docs[0].id)));
  //   for (const id of querySnapshot.docs) {

  //     const items = await getDocs(collection(firestore, "/collections/"+id.id+"/item"))
  //     for(const item of items.docs){
  //       const itemContract = await marketContract.methods.getItem(item.data().id).call();
  //       const brand = await getDoc(doc(collection(firestore, "brands"), id.data().brand));
  //       const contract = new web3.eth.Contract(nftAbi as AbiItem[], itemContract.nftContract);
  //       const nft = await contract.methods.tokenURI(itemContract.tokenIds[0]).call();
  //       const response = await fetch(nft);

  //     if(!response.ok)
  //       enqueueSnackbar(response.statusText)

  //     const json = await response.json()
  //     const date = new Date(parseInt(itemContract.releaseTime) * 1000);
  //     const now = new Date(Date.now());
  //     var add = true;
  //     if(parseInt(itemContract.available)>0 && now > date){
  //       if(checkSelected(methods.getValues().price)){
  //         var priceCheck = false;
  //         for(const priceVal of methods.getValues().price){
  //           if(priceVal.id == "osndaok" && priceVal.selected){
  //             if(parseInt(itemContract.price) < parseInt(Web3.utils.toWei("0.05", "ether"))){
  //               console.log(itemContract);
  //               priceCheck = true;
  //             }
  //           }

  //           if(priceVal.id == "oichaiu" && priceVal.selected){
  //             if(parseInt(itemContract.price) > parseInt(Web3.utils.toWei("0.05", "ether")) && parseInt(itemContract.price) <= parseInt(Web3.utils.toWei("0.2", "ether"))){
  //               console.log(itemContract);
  //               priceCheck = true;
  //             }
  //           }

  //           if(priceVal.id == "afhjasd" && priceVal.selected){
  //             if(parseInt(itemContract.price) > parseInt(Web3.utils.toWei("0.2", "ether")) && parseInt(itemContract.price) <= parseInt(Web3.utils.toWei("0.5", "ether"))){
  //               console.log(itemContract);
  //               priceCheck = true;
  //             }
  //           }

  //           if(priceVal.id == "yuvaeibask" && priceVal.selected){
  //             if(parseInt(itemContract.price) > parseInt(Web3.utils.toWei("0.5", "ether"))){
  //               console.log(itemContract);
  //               priceCheck = true;
  //             }
  //           }
  //         }

  //         if(priceCheck && add){
  //           add = true;
  //         } else {
  //           add = false;
  //         }
  //       }

  //       if(checkSelected(methods.getValues().brand)){
  //         var brandCheck = false;
  //         for(const brandVal of methods.getValues().brand){
  //           if(brandVal.id == brand.data().id){
  //             brandCheck = true;
  //           }
  //         }

  //         if(brandCheck && add){
  //           add = true;
  //         } else {
  //           add = false;
  //         }
  //       }

  //       if(checkSelected(methods.getValues().rarity)){
  //         var rarityCheck = false;
  //       for(const rarityVal of methods.getValues().rarity){
  //         console.log("LENGTH: "+itemContract.sold.length)
  //         if(rarityVal.id == "123kjaasd" && rarityVal.selected){
  //           if(itemContract.sold.length >=30){
  //             console.log(itemContract);
  //             rarityCheck  = true;
  //           }
  //         }

  //         if(rarityVal.id == "asdasioqdoj" && rarityVal.selected){
  //           if(itemContract.sold.length >=15 && itemContract.sold.length < 30){
  //             console.log(itemContract);
  //             rarityCheck  = true;
  //           }
  //         }

  //         if(rarityVal.id == "asdaiuqas" && rarityVal.selected){
  //           if(itemContract.sold.length >=5 && itemContract.sold.length < 15){
  //             console.log(itemContract);
  //             rarityCheck  = true;
  //           }
  //         }

  //         if(rarityVal.id == "98ujkacc" && rarityVal.selected){
  //           if(itemContract.sold.length <5){
  //             console.log(itemContract);
  //             rarityCheck  = true;
  //           }
  //         }
  //       }

  //       if(rarityCheck && add){
  //         add = true;
  //       } else {
  //         add = false;
  //       }
  //     }

  //       if(add){
  //         arr.push({...itemContract, nft: {...json}, brand: {...brand.data()}, collection: {...id.data()}})
  //       }
  //     }

  //     }
  //   }
  // } else {
  //   router.replace("/404")
  // }
  //   return arr;
  // }

  // React.useEffect(() => {
  //   if(!router.isReady) return;

  //   async function getImages(){
  //     const drop = await getDocs(query(collection(firestore, "drop"), where("id", "==", dropName)));
  //     if(drop.docs.length > 0){
  //       return drop.docs[0].data().images;
  //     }
  //   }

  //   async function getBrands(){
  //     const arr = [];
  //     const brands = await getDocs(collection(firestore, "brands"));
  //     for (const brand of brands.docs){
  //       arr.push(brand.data());
  //     }
  //     return arr;
  //   }

  //   async function getName() {
  //     const drop = await getDocs(query(collection(firestore, "drop"), where("id", "==", dropName)));
  //     if(drop.docs.length > 0){
  //     return drop.docs[0].data().title;
  //   } else {
  //     router.replace("/404")
  //   }
  //   }

  //   getItems()
  //     .then((value) => {
  //       setItems(value);

  //       getName()
  //     .then((value) => {
  //       setName(value);
  //       getImages().then((value)=>{
  //           setImageData(value)
  //           getBrands()
  //       .then((value) => {
  //         setBrands(value);
  //         const brands = value.map((brand)=>{
  //            return {
  //             'value': brand.title,
  //             'id': brand.id,
  //             'selected': false,
  //           }
  //         })
  //         methods.setValue('brand', brands)

  //       })
  //       })

  //     })

  //     })
  //     .catch((e) => {
  //       enqueueSnackbar(e.message);
  //     });

  // }, [router.isReady]);

  React.useEffect(() => {
    const brands = [];
    fetch(process.env.API_URL + "/api/getBrands")
      .then((response) => response.json())
      .then((data) => {
        data.brands.map((brand) => {
          brands.push({ id: brand._id, value: brand.title, selected: false });
        });
        methods.setValue("brand", brands);

        getItems(dropName).then((value) => {
          console.log(value);
          setItems(value);
        });
      })
      .catch((e) => {});
  }, [dropName]);

  // const [items, setItems] = React.useState(null);
  // const [brands, setBrands] = React.useState(null);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imageData, setImageData] = React.useState(null);
  const [items, setItems] = React.useState(null);
  const [itemData, setItemData] = React.useState(null);

  if (!items || !dropData || loading) {
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
    if (!dropData) {
      return <div></div>;
    } else {
      return (
        <ImageList
          sx={{ width: "100%", height: "100%" }}
          // variant="quilted"
          rowHeight={572}
          className="parralex-image"
        >
          <ImageListItem>
            <img
              {...srcset(dropData.coverSrc, 400)}
              alt={dropData.title}
              loading="eager"
              style={{ objectFit: "cover" }}
            />
          </ImageListItem>
        </ImageList>
      );
    }
  }

  return (
    <>
      <NextSeo
        title={dropData.title}
        description={dropData.subtitle}
        canonical={"https://www.thefashionverse.io/drops/"+dropName+"/"}
        twitter={{
          handle: "@FashionVerseInc",
          cardType: "summary_large_image",
        }}
      />
      <FormProvider {...methods}>
        <Container
          className="wrapper dropsContainer common-wrapper"
          maxWidth={false}
          disableGutters
        >
          <Box sx={{ position: "relative" }}>
            <ImageGallery />
          </Box>

          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="custom-container"
          >
            <Grid item xs={12} sx={{  px: 2}}>
              {/* <span className="divider"></span> */}
              <Box>
                <Typography
                  variant="h1"
                  className="main-heading"
                  align="center"
                  textTransform="uppercase"
                  sx={{ mt: 10, mb: 0 }}
                >
                  <Typography
                    variant="h1"
                    color="primary"
                    component="span"
                    className="gradient-text"
                  >
                    {dropData.title.toUpperCase()}
                  </Typography>
                </Typography>

                <Typography
                  variant="subtitle1"
                  className="sub-heading"
                  align="center"
                >
                  {/* Build your First Digital <br /> Wardrobe */}
                  {/* <Typewriter
                    options={{
                      strings: [dropData.subtitle.toUpperCase()],
                      autoStart: true,
                      loop: true,
                    }} */}
                  {dropData.subtitle.toUpperCase()}
                  {/* /> */}
                </Typography>
              </Box>
            </Grid>

            <Grid
              container
              className="side-spacing custom-card-drop"
              spacing={4}
              sx={{ mt: 2, mb: 10 }}
              justifyContent= "center"
            >
              <Grid item xs={12}>
                <Stack className="cta-wrapper" direction="row" gap={2} sx={{ px: 1 }}>
                  <CheckBoxSelect formStateName="rarity" label="Rarity" />
                  <CheckBoxSelect formStateName="price" label="Price" />
                  <div style={{ flexGrow: 1 }} />
                  <CheckBoxSelect formStateName="brand" label="Brand" />
                  {/* <CheckBoxSelect formStateName="collection" label="Collection" /> */}
                  <GradientButton
                    onClick={() => {
                      setLoading(true);
                      getItems(dropName).then((items) => {
                        setItems(items);
                        setLoading(false);
                      });
                    }}
                  >
                    <Typography variant="body1">FILTER</Typography>
                  </GradientButton>
                </Stack>
              </Grid>

              {items.length > 0 ? (
                items.map((props) => {
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
          <div className="tw-flex tw-justify-center tw-items-end tw-pb-4 tw-mb-[5%] tw-mt-5">
            <Pagination
              count={itemData.totalPages}
              color="primary"
              size="large"
              onChange={changePage}
              page={page}
            />
          </div>

          <Footer />
        </Container>
      </FormProvider>
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
  { value: "Bronze", id: "123kjaasd", selected: false },
  { value: "Silver", id: "asdasioqdoj", selected: false },
  { value: "Gold", id: "asdaiuqas", selected: false },
  { value: "Platinum", id: "98ujkacc", selected: false },
];

const PRICE_DATA: Option[] = [
  { value: "Below 0.05 ETH", id: "osndaok", selected: false },
  { value: "0.05 - 0.2 ETH", id: "oichaiu", selected: false },
  { value: "0.2 - 0.5 ETH", id: "afhjasd", selected: false },
  { value: "Above 0.5 ETH", id: "yuvaeibask", selected: false },
];

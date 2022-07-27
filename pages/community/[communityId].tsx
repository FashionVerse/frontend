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
import { CollabItemCardProps } from "../../src/components/CollabItemCard";
import CollabItemCard from "../../src/components/CollabItemCard";
import { NextSeo } from "next-seo";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BrandPage() {
  const router = useRouter();
  const { communityId } = router.query;

  const [page, setPage] = React.useState(1);

  function changePage(event, value) {
    setPage(value);
  }

  const { enqueueSnackbar } = useSnackbar();

  const { data, error } = useSWR(
    process.env.API_URL + "/api/getCommunity?url=" + communityId + "&page=" + page,
    fetcher
  );
  if (error) {
    router.replace("/404");
  }
  const arr: CollabItemCardProps[] = [];
  if (data) {
    data.items.map((item) => {
      arr.push({
        id: item._id,
        itemId: item.itemId,
        nft: item.nft.metadata,
        brand: data.community,
        price: item.price,
        expandable: false,
      });
    });
  }

  if (!data) {
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
            {...srcset(data.community.coverSrc, 400)}
            alt={data.community.title}
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
      //         {...srcset(data.community.coverSrc, 400)}
      //         alt={data.community.title}
      //         loading="eager"
      //         style={{ objectFit: "cover" }}
      //       />
      //     </ImageListItem>
      //   {/* ))} */}
      // </ImageList>
    );
  }

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
              backgroundImage: "url(" + data.community.avatarSrc + ")",
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
                  {data.community.title}
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
                    strings: [data.community.description],
                    autoStart: true,
                    loop: true,
                  }}
                /> */}
                {data.community.description}
              </Typography>
              
                
              

              {/* <Typography
                variant="subtitle1"
                className="sub-heading with-small-font"
                align="center"
              >
                {data.community.contributor}
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
                return (
                  <Grid item xs={12} sm={6} lg={4} key={props.id}>
                    <CollabItemCard {...props} expandable />
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
            {data.community.title}
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
import * as React from "react";
import Image from "next/image";
import Header from "../../src/components/Header";
import Head from "next/head";
import Footer from "../../src/components/Footer";
import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import GridCard, { GridCardProps } from "../../src/components/GridCard";
import CheckBoxSelect, { Option } from "../../src/components/CheckBoxSelect";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import AnimLogo from "../../src/components/AnimLogo";
import { Pagination } from "@mui/material";
import useSWR from "swr";
import { NextSeo } from "next-seo";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Brands() {
  const methods = useForm({
    defaultValues: {
      drops: DROP_NAME_DATA,
    },
  });

  function changePage(event, value) {
    setPage(value);
  }

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = React.useState(1);
  const { data, error } = useSWR(
    process.env.API_URL + "/api/getBrands?page=" + page,
    fetcher
  );
  // if (error) enqueueSnackbar("Failed to load brands", { variant: "error" });
  const arr: GridCardProps[] = [];
  if (data) {
    console.log("data ", data);
    data.brands.forEach((item) => {
      arr.push({
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

  return (
    <>
      <NextSeo
        title="Brands"
        description="Check out our partner brands!"
        canonical="https://www.thefashionverse.io/brands/"
        twitter={{
          handle: "@FashionVerseInc",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <title>The FashionVerse | Brands</title>
      </Head>
      <FormProvider {...methods}>
        <Container
          className="wrapper brand-page common-wrapper"
          maxWidth={false}
        >
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="custom-container"
          >
            <Grid item xs={12}>
              {/* <span className="divider"></span> */}
              <Box>
                <Typography
                  variant="h1"
                  className="secondary-heading"
                  sx={{ mt: 10, mb: 10 }}
                >
                  <Typography
                    variant="h1"
                    color="primary"
                    component="span"
                    className="gradient-text"
                  >
                    BRANDS
                  </Typography>
                </Typography>
              </Box>
            </Grid>

            {/* <Grid item xs={12} sx={{ mb: 5 }}>
              <Stack direction="row" gap={2} sx={{ px: 1 }}>
                <CheckBoxSelect formStateName="drops" label="Drop" />
              </Stack>
            </Grid> */}

            <Grid
              sx={{ marginBottom: "40px" }}
              container
              direction="row"
              spacing={4}
              justifyContent= "center"
            >
              {arr.map((props) => (
                <Grid item xs={12} sm={6} lg={4} key={props.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GridCard {...props} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {arr.length > 0 ? (
            <div className="tw-flex tw-justify-center tw-items-end tw-pb-10 tw-mb-[5%] tw-mt-5">
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
      </FormProvider>
    </>
  );
}

const DROP_NAME_DATA = [
  { value: "Streetwear", id: "jakais7ja" },
  { value: "Vintage", id: "hayjsu812" },
  { value: "Limitless", id: "asd81ja" },
  { value: "Workwear", id: "jad1da7ja" },
  { value: "Partywear", id: "po8nabsad" },
  { value: "Ethnic", id: "hays7has" },
  { value: "Eveningwear", id: "971bnada" },
];

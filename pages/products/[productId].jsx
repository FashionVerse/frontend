import Head from "next/head";
import Viewer from "../../src/components/Viewer";
import Model from "../../src/components/Model";
import useSWR from "swr";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button, Typography,Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimLogo from "../../src/components/AnimLogo";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  if(!productId) return (
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
  );;
  console.log("Product Id ",productId);
  const { data, error } = useSWR(
    "http://localhost:6969/api/getItems?id=" + productId,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return (
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
  console.log("data fetched",data);
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <div class="tw-flex tw-flex-wrap md:tw-h-screen tw-p-10 tw-h-full tw-gap-x-10 tw-justify-center tw-items-center ">
        <div
          class="tw-mb-4 tw-px-4 md:tw-w-1/2 tw-w-full tw-shadow-2xl tw-h-[60vh] lg:tw-h-full"
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "20px",
          }}
        >
          <Viewer width="100%" height="100%" imgLink={data.nft.metadata.image}>
            <Model
              link={data.nft.metadata.animation_url + "?filename=model.glb"}
            ></Model>
          </Viewer>
        </div>
        <div
          class="tw-my-4 tw-p-6 md:tw-w-1/3 tw-w-full tw-shadow-2xl tw-space-y-7 tw-text-center md:tw-text-justify "
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "20px",
          }}
        >
          <div className="tw-flex tw-flex-col tw-gap-y-4">
            <div>
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                className="tw-font-bold"
              >
                {data.nft.metadata.name}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                {data.nft.metadata.description}
              </Typography>
            </div>
            <Link href={"/brands/"+data.brand._id} className="!tw-cursor-pointer">
            <motion.div
              // className="drops_hover_cursor"
              style={{
                cursor: "pointer",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
            <div className="tw-flex md:tw-flex-row tw-flex-col tw-items-center tw-justify-between tw-pr-5">
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                <span className="tw-font-semibold">Brand:</span> {data.brand.title}
              </Typography>
              <Image src={data.brand.avatarSrc} width="120" height="120" className="tw-rounded-lg"/>
            </div>
            </motion.div>
            </Link>
            <Link href={"/collections/"+data.collection._id} className="!tw-cursor-pointer">
            <motion.div
              // className="drops_hover_cursor"
              style={{
                cursor: "pointer",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
            <div className="tw-flex md:tw-flex-row tw-flex-col tw-items-center tw-justify-between tw-pr-5">
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                <span className="tw-font-semibold">Collection:</span> {data.collection.title}
              </Typography>
              <Image src={data.collection.avatarSrc} width="120" height="120" className="tw-rounded-lg"/>
            </div>
            </motion.div>
            </Link>
            <div>
              {data.available != 0 ? (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="tw-font-light"
                >
                  Total Available{" "}
                  <span className="tw-font-semibold pl-2">
                    {data.available}
                  </span>
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="tw-font-semibold tw-text-red-500"
                >
                  Currently Unavailable
                </Typography>
              )}
            </div>
            {/* <br/> */}
            <div>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                Current Price
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                className="tw-font-bold"
              >
                <img
                  alt="ETH"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  size="24"
                />{" "}
                {data.price} ETH
              </Typography>
            </div>
            <motion.div
              // className="drops_hover_cursor"
              style={{
                cursor: "pointer",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
              {data.available != 0 ? (
                <Button
                  variant="contained"
                  color="primary"
                  className="tw-rounded-lg tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-gap-x-2 tw-w-full"
                >
                  <AccountBalanceWalletIcon /> Add To Bag
                </Button>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  color="primary"
                  className="tw-rounded-lg tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-gap-x-2 tw-w-full"
                >
                  <AccountBalanceWalletIcon /> Add To Bag
                </Button>
              )}
            </motion.div>
            {/* <br/> */}
          </div>
        </div>
      </div>
    </>
  );
}

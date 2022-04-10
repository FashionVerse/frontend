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
import { useState } from "react";
import { ethers } from "ethers";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Footer from "../../src/components/Footer";

const fetcher = (url) => fetch(url, {method: 'POST'}).then((res) => res.json());

function AnimatedButton(props)
{
  const router = useRouter();
  async function setCart(){
    if(typeof window['ethereum'] !== 'undefined'){
      const ethereum  = window['ethereum'];
  if (ethereum) {
      var provider = new ethers.providers.Web3Provider(ethereum);

  }
  
  const isMetaMaskConnected = async () => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  }
    const connected = await isMetaMaskConnected();
    if(connected){
      const accounts = await ethereum.enable();
      const account = accounts[0];
        const rawResponse = await fetch(process.env.API_URL+'/api/addItemToBag', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({item: props.id.toString(), account: account})
        }).catch();
        const content = await rawResponse.json();
        if(content.status === 'ok'){
          setIsAnimating(2)
        }
        else{
          setIsAnimating(0)
        }
        console.log(content);
   } else {
      alert("Connect to Wallet")
      router.replace("/wallets");
    }

    } else {
      alert("MetaMask not installed")
    }
  }
  const [isAnimating, setIsAnimating] = useState(0);
  return(
    <>
    <motion.button 
                type="button" 
                onClick={() => 
                  {
                    setIsAnimating(1)
                    setCart()
                  }
                }
                style={isAnimating===0? {display:"flex"}:{display:"none"}}
                class="tw-cursor-pointer tw-flex tw-gap-4 tw-items-center tw-justify-center tw-py-2 tw-px-4 tw-bg-cyan-500 hover:tw-bg-cyan-600 focus:tw-ring-cyan-400 focus:tw-ring-offset-cyan-200 tw-text-white tw-w-full tw-transition tw-ease-in tw-duration-200 tw-text-center tw-text-base tw-font-semibold tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 tw-rounded-lg "
                >
                  <AccountBalanceWalletIcon /> Add To Bag
                </motion.button>
                <motion.button 
                style={isAnimating===1? {display:"flex"}:{display:"none"}}
                type="button" class="tw-py-2 tw-px-4 tw-flex tw-justify-center tw-items-center  tw-bg-blue-600 hover:tw-bg-blue-700 focus:tw-ring-blue-500 focus:tw-ring-offset-blue-200 tw-text-white tw-w-full tw-transition tw-ease-in tw-duration-200 tw-text-center tw-text-base tw-font-semibold tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2  tw-rounded-lg ">
                <svg width="20" height="20" fill="currentColor" class="tw-mr-2 tw-animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                    </path>
                </svg>
                Adding
              </motion.button>
              <motion.button 
                style={isAnimating===2? {display:"flex"}:{display:"none"}}
                type="button" class="tw-py-2 tw-px-4 tw-gap-2 tw-flex tw-justify-center tw-items-center  tw-bg-green-600 hover:tw-bg-green-700 focus:tw-ring-green-500 focus:tw-ring-offset-green-200 tw-text-white tw-w-full tw-transition tw-ease-in tw-duration-200 tw-text-center tw-text-base tw-font-semibold tw-shadow-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2  tw-rounded-lg ">
                <DoneAllIcon />{' '}
                Added To Bag
              </motion.button>
    </>
  )

}

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
    process.env.API_URL+"/api/getItems?id=" + productId,
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
        <div id="product-container"
          class="tw-relative tw-mb-4 tw-px-4 md:tw-w-1/2 tw-w-full tw-shadow-2xl tw-h-[65vh] lg:tw-h-full"
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)",
            borderRadius: "20px",
          }}
        >
          {/* <Image
            src="/hero-circle.svg"
            alt="..."
            layout="fill"
            priority
            loading="eager"
          /> */}
          <Viewer width="100%" height="100%" imgLink={data.nft.metadata.image} isProduct="true">
            <Model
              link={data.nft.metadata.animation_url + "?filename=model.glb"}
              imgLink={data.nft.metadata.image}
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
          <div className="tw-flex tw-flex-col tw-gap-y-6">
            <div>
              <Typography
                variant="h3"
                component="div"
                color="primary"
                gutterBottom
                className="tw-font-bold"
              >
                {data.nft.metadata.name}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
              >
                {data.nft.metadata.description}
              </Typography>
            </div>
            <Link href={"/brands/"+data.brand.url} className="!tw-cursor-pointer">
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
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-items-center tw-pr-5">
            <Image src={data.brand.avatarSrc} width="40" height="40" className="tw-rounded-full"/>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                {data.brand.title}
              </Typography>
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
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                <span className="tw-font-semibold">{data.collection.title}</span>
              </Typography>
            </motion.div>
            </Link>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="tw-font-light"
              >
                <span className="tw-font-semibold">Rarity:</span> <span className="tw-animate-gradient-x tw-font-bold tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-l tw-from-rose-400 tw-via-fuchsia-500 tw-to-indigo-500">Ultra Rare</span>
              </Typography>
            <div>
              {data.available != 0 ? (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="tw-font-light"
                >
                  Total Available:{" "}
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
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
              {data.available != 0 ? (
                <>
                <AnimatedButton id={data._id}/>
              </>
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
      <div className="tw-pt-[4rem] tw-pb-[4rem]">
        <Footer />
      </div>
    </>
  );
}

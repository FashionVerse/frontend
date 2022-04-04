import Head from 'next/head'
import Viewer from '../src/components/Viewer'
import Model from '../src/components/Model'
import useSWR from 'swr'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
    Button,
    Typography
  } from "@mui/material";
import {motion} from "framer-motion";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Product() {
    const { data, error } = useSWR('http://localhost:6969/api/getItems?id=6246dc05119819d71bc2a498', fetcher)
    if (error) return <div>failed to load</div>
    if(!data) return <div>loading...</div>
    console.log("data fetched",data);
    return (
        <>
        <Head>
            <title>Product</title>
        </Head>
        <div class="tw-flex tw-flex-wrap md:tw-h-screen tw-p-10 tw-h-full tw-gap-x-10 tw-justify-center tw-items-center ">
        <div class="tw-mb-4 tw-px-4 md:tw-w-1/2 tw-w-full tw-shadow-2xl " style= {{  
          backgroundColor: "rgba(0,0,0,0.05)",  
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
        }} >
        <Viewer width="100%" height="100%" imgLink={data.nft.metadata.image}>
               <Model link={data.nft.metadata.animation_url+"?filename=model.glb"}></Model>
        </Viewer>
        </div>
        <div class="tw-my-4 tw-p-6 md:tw-w-1/3 tw-w-full tw-shadow-2xl tw-space-y-7 tw-text-center md:tw-text-justify " style= {{  
          backgroundColor: "rgba(0,0,0,0.05)",  
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
        }} >
          <div className="tw-flex tw-flex-col tw-gap-y-4">
          <div>
        <Typography variant="h3" component="div" gutterBottom className="tw-font-bold">
            {data.nft.metadata.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" className="tw-font-light">
            {data.nft.metadata.description}
      </Typography>
      </div>
      <div>
      <Typography variant="subtitle1" gutterBottom component="div" className="tw-font-light">
           Total Available: <span className="tw-font-semibold pl-2">{data.available}</span>
      </Typography>
      </div>
      {/* <br/> */}
      <div>
      <Typography variant="h6" gutterBottom component="div" className="tw-font-light">
        Current Price
      </Typography>
        <Typography variant="h5" gutterBottom component="div" className="tw-font-bold">
        <img alt="ETH" style={{width:"24px",height:"24px",objectFit:"contain"}} src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" size="24"/>{' '}
        {data.price} ETH
        </Typography>
        </div>
        <motion.div
         // className="drops_hover_cursor"
         style = {{
           cursor: "pointer",
         }}
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ ease: "easeOut", delay: 0.1 }}
         whileHover={{ scale: 1.035 }}
         whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
       >{
         data.available!=0?
         <Button variant="contained" color="primary" className="tw-rounded-lg tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-gap-x-2 tw-w-full">
            <AccountBalanceWalletIcon/> Add To Bag
        </Button>
        : <Button disabled variant="contained" color="primary" className="tw-rounded-lg tw-pl-5 tw-pr-5 tw-pt-3 tw-pb-3 tw-gap-x-2 tw-w-full">
        <AccountBalanceWalletIcon/> Add To Bag
    </Button>
       }
        </motion.div>
        {/* <br/> */}
        </div>
        </div>
        </div>
        </>
    )
}

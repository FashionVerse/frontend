import * as React from "react";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  FashionItemCardContainer,
  FashionItemCardProps,
} from "./FashionItemCard";
import { Stack } from "@mui/material";
import { SiEthereum } from "react-icons/si";
import { BsHandbag } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { ethers } from "ethers";
import { collection, setDoc, doc } from "firebase/firestore"; 
import firestore from "../../firebase/clientApp";
import Web3 from "web3";

export interface CardDialogProps extends FashionItemCardProps {
  open: boolean;
  onClose: () => void;
}

export interface EnlargedFashionCardProps extends FashionItemCardProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CardDialog(props: CardDialogProps) {

  async function setCart(){
    if(typeof window.ethereum !== 'undefined'){
      const { ethereum } = window;
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
      console.log(account)
      setIsLoading(true);
      await setDoc(doc(firestore, "cart", account), {
        id: account,

      });
      await setDoc(doc(firestore, "/cart/"+account+"/items", props.itemId), {
        id: props.itemId,
        brand: props.brand.id,
        collection: props.collection.id,
        amount: 1,

      });

      

      setIsLoading(false);
      
    } else {
      alert("Connect to Wallet")
    }

    } else {
      alert("MetaMask not installed")
    }
  }
  const [isLoading, setIsLoading] = React.useState(false);

  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <FashionItemCardContainer sx={{ maxWidth: "none", minWidth: "440px" }}>
        <Box
          sx={{
            minWidth: "300px",
            aspectRatio: "1/1",
            position: "relative",
            borderRadius: "1rem",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <Image
            src={props.nft.properties.image.description}
            alt="NFT Image"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ pl: 0.5, pt: 2, pr: 1 }}
        >
          <Stack>
            <Typography>
              <b>{props.nft.properties.name.description}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {props.nft.properties.description.description}
            </Typography>
            <Typography variant="caption" gutterBottom>
              <b>{props.brand.title}</b>
            </Typography>
          </Stack>
          <Stack sx={{ textAlign: "right" }}>
            <Typography variant="caption">
              <b>{props.rarityCategory}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {"No. of pieces - " + props.available}
            </Typography>
            <Typography variant="caption" color="primary">
              {props.collection.title}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ px: 0.5, pt: 1 }}
        >
          <Stack alignItems="baseline" direction="row">
            <Typography variant="h6" sx={{ mr: "4px" }}>
              {Web3.utils.fromWei( props.price, 'ether')}
            </Typography>
            <SiEthereum fontSize="1rem" />
          </Stack>
          <Stack alignItems="end">
            <IconButton size="small" sx={{ mr: "6px" }} onClick={()=>{setCart()}}>
              <BsHandbag />
            </IconButton>
            <Typography variant="caption" sx={{ fontSize: "8px" }}>
              Add to bag
            </Typography>
          </Stack>
        </Stack>
      </FashionItemCardContainer>
    </Dialog>
  );
}

export default function EnlargedFashionCard(props: EnlargedFashionCardProps) {
  const { state, setState, ...rest } = props;

  const handleClose = () => {
    setState(false);
  };

  return (
    <div>
      <CardDialog open={state} onClose={handleClose} {...rest} />
    </div>
  );
}

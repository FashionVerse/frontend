import * as React from "react";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DropCardContainer, DropCardProps } from "./DropCard";
import { Stack } from "@mui/material";
import { SiEthereum } from "react-icons/si";
import { BsHandbag } from "react-icons/bs";
import { IconButton } from "@mui/material";

export interface CardDialogProps extends DropCardProps {
  open: boolean;
  onClose: () => void;
}

export interface EnlargedFashionCardProps extends DropCardProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CardDialog(props: CardDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <DropCardContainer sx={{ maxWidth: "none", minWidth: "440px" }}>
        <Box
          sx={{
            minWidth: "300px",
            aspectRatio: "1/1",
            position: "relative",
            borderRadius: "1rem",
            backgroundColor: "white",
          }}
        >
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ pl: 0.5, pt: 2, pr: 1 }}
        >
          <Stack>
            <Typography>
              <b>{props.pieceName}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {props.description}
            </Typography>
            <Typography variant="caption" gutterBottom>
              <b>{props.brandName}</b>
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="caption">
              <b>{"RARE"}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {"No. of pieces - " + props.rarity}
            </Typography>
            <Typography variant="caption" color="primary">
              {props.collectionName}
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
              {props.price}
            </Typography>
            <SiEthereum fontSize="1rem" />
          </Stack>
          <Stack alignItems="end">
            <IconButton size="small" sx={{ mr: "6px" }}>
              <BsHandbag />
            </IconButton>
            <Typography variant="caption" sx={{ fontSize: "8px" }}>
              Add to bag
            </Typography>
          </Stack>
        </Stack>
      </DropCardContainer>
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

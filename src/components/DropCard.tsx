import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled, alpha } from "@mui/system";
import { BsHandbag } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { IconButton } from "@mui/material";

export interface DropCardProps {
  id: string;
  src: string;
  alt: string;
  pieceName: string;
  brandName: string;
  brandImage: string;
  rarity: number;
  price: number;
  hideAddToBag?: boolean;
  hidePrice?: boolean;
}

const DropCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: "375px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 255, 255, 255, 0.2 )`
      : alpha(theme.palette.primary.light, 0.2),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  padding: "16px",
  borderRadius: "16px",
}));

export default function DropCard(props: DropCardProps) {
  return (
    <DropCardContainer>
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
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <ListItem disablePadding>
          <ListItemAvatar sx={{ mr: -1 }}>
            <Avatar
              src={props.brandImage}
              sx={{ height: "36px", width: "36px" }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={props.pieceName}
            secondary={props.brandName}
            secondaryTypographyProps={{ style: { marginTop: "-2px" } }}
          />
        </ListItem>
        <Stack justifyContent="center" alignItems="center" sx={{ mr: 1 }}>
          <Typography variant="caption">Rare</Typography>
          <Typography variant="caption" sx={{ mt: "-2px" }}>
            {props.price}
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: props.hideAddToBag ? "center" : "space-between",
          alignItems: "center",
          gap: "16px",
          mt: 1,
        }}
      >
        {!props.hidePrice && (
          <Stack alignItems="center" direction="row">
            <SiEthereum fontSize="1rem" />
            <Typography variant="h6" sx={{ ml: "4px" }}>
              {props.price}
            </Typography>
          </Stack>
        )}
        {!props.hideAddToBag && (
          <Stack alignItems="center">
            <IconButton size="small">
              <BsHandbag />
            </IconButton>
            <Typography variant="caption" sx={{ fontSize: "8px" }}>
              Add to bag
            </Typography>
          </Stack>
        )}
      </Box>
    </DropCardContainer>
  );
}

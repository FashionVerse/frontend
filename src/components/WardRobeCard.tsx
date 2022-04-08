import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/system";

export interface WardrobeCardProps {
  id: string;
  name: string;
  description: string;
  src: string;
  alt: string;
  quantity: string;
}

const WardrobeCardContainer = styled(Card)(({ theme }) => ({
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

export default function WardrobeCard(props: WardrobeCardProps) {
  return (
    <WardrobeCardContainer>
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
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {props.name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="center">
          {props.description}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="center">
          Quantity: {props.quantity}
        </Typography>
      </Box>
    </WardrobeCardContainer>
  );
}

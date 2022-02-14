import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/system";

export interface AdvisorCardProps {
  src: string;
  alt: string;
  id: string;
  name: string;
  title: string;
  background: string;
}

const AdvisorCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: "375px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 255, 255, 255, 0.2 )`
      : alpha(theme.palette.primary.light, 0.2),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
}));

export default function AdvisorCard(props: AdvisorCardProps) {
  return (
    <AdvisorCardContainer>
      <CardMedia
        component="img"
        height="200"
        image={props.src}
        alt={props.alt}
      />
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600 }} component="div">
          {props.name}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.background}
        </Typography>
      </CardContent>
    </AdvisorCardContainer>
  );
}

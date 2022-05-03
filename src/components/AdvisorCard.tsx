import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled, alpha, useTheme } from "@mui/system";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

export interface AdvisorCardProps {
  src: string;
  alt: string;
  id: string;
  name: string;
  title: string;
  background: string;
  link: string;
}

const AdvisorCardContainer = styled(Card)(({ theme }) => ({
  // maxWidth: "375px",
  width: "100%",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 51,121,157)`
      : alpha(theme.palette.primary.light, 0.4),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  borderRadius: "1rem",
}));

export default function AdvisorCard(props: AdvisorCardProps) {
  const {
    palette: { mode },
  } = useTheme();
  return (
    <AdvisorCardContainer className="custom-card">
        <CardActionArea target="_blank" href={props.link}>
            <figure>
              <CardMedia
                component="img"
                height="300"
                image={props.src}
                alt={props.alt}
              />
            </figure>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600 }} component="div">
                {props.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color={mode === "dark" ? "primary" : "secondary"}
              >
                {props.title}
              </Typography>
              <Typography sx={{minHeight: 45}} variant="body2" color="text.secondary">
                {props.background}
              </Typography>
            </CardContent>
        </CardActionArea>
    </AdvisorCardContainer>
  );
}

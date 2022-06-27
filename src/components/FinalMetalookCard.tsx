import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/system";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

export interface FinalMetalookCard {
  id: string;
  name: string;
  description: string;
  src: string;
  metalook: any;
}

const FinalMetalookCardContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 51,121,157 )`
      : alpha(theme.palette.primary.light, 0.4),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  padding: "16px",
  borderRadius: "16px",
}));

export default function FinalMetalookCard(props: FinalMetalookCard) {

  return (
    
    <FinalMetalookCardContainer>
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
          alt="metalook"
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
        </Typography>
        <br />
        <Button variant="outlined" onClick={()=>{window.open(props.src, '_blank').focus();}} startIcon={<DownloadIcon />}>
          Download
      </Button>
      </Box>
    </FinalMetalookCardContainer>

  );
}

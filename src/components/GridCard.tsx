import * as React from "react";
import {
  Box,
  Paper,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { BsHeart } from "react-icons/bs";

type GridImageProps = {
  bgColor?: string;
  src: string;
  alt: string;
};

export type GridCardProps = {
  topLeftImage: GridImageProps;
  topRightImage: GridImageProps;
  bottomLeftImage: GridImageProps;
  bottomRightImage: GridImageProps;
  avatarSrc: string;
  title: string;
  subtitle: string;
  id: string;
};

const GridCard = (props: GridCardProps) => {
  const {
    topLeftImage,
    topRightImage,
    bottomLeftImage,
    bottomRightImage,
    avatarSrc,
    title,
    subtitle,
  } = props;
  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: "18px",
        padding: "12px",
        paddingBottom: "0px",
        background: `rgba( 255, 255, 255, 0.2 )`,
        backdropFilter: `blur( 8px )`,
        WebkitBackdropFilter: `blur( 8px )`,
        marginTop: "12px",
        marginBottom: "12px",
      }}
    >
      <Stack justifyContent={"space-between"}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "18px",
                position: "relative",
                overflow: "hidden",
                borderBottomRightRadius: "4px",
                backgroundColor: topLeftImage.bgColor,
              }}
            >
              <Image
                src={topLeftImage.src}
                alt={topLeftImage.alt}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "18px",
                borderBottomLeftRadius: "4px",
                position: "relative",
                overflow: "hidden",
                backgroundColor: topRightImage.bgColor,
              }}
            >
              <Image
                src={topRightImage.src}
                alt={topRightImage.alt}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "18px",
                position: "relative",
                overflow: "hidden",
                borderTopRightRadius: "4px",
                backgroundColor: bottomLeftImage.bgColor,
              }}
            >
              <Image
                src={bottomLeftImage.src}
                alt={bottomLeftImage.alt}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "18px",
                borderTopLeftRadius: "4px",
                position: "relative",
                overflow: "hidden",
                backgroundColor: bottomRightImage.bgColor,
              }}
            >
              <Image
                src={bottomRightImage.src}
                alt={bottomRightImage.alt}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
        </Grid>
        <List sx={{ width: "100%", maxWidth: 360 }}>
          <ListItem
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <BsHeart />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={avatarSrc} />
            </ListItemAvatar>
            <ListItemText
              primary={title}
              secondary={subtitle}
              //   primaryTypographyProps={{ variant: "" }}
            />
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
};

export default GridCard;

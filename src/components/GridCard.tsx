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
} from "@mui/material";
import Image from "next/image";
import { styled, alpha, useTheme } from "@mui/system";
import { useRouter } from "next/router";

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
  noBrand?: boolean;
  href?: string;
};

const GridCardContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  // maxWidth: "403px",
  borderRadius: "24px",
  padding: "26px",
  paddingBottom: "0px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 255, 255, 255, 0.2 )`
      : alpha(theme.palette.primary.light, 0.2),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  marginTop: "12px",
  marginBottom: "12px",
}));

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

  const {
    palette: { mode },
  } = useTheme();

  const router = useRouter();

  return (
    <GridCardContainer
      onClick={() => (props.href ? router.push(props.href) : null)}
    >
      <Stack justifyContent={"space-between"}>
        <Grid container spacing={2}>
          <Grid item md={6}>
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
                src={topLeftImage.toString()}
                alt="grid card"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Grid>
          <Grid item md={6}>
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
                src={topRightImage.toString()}
                alt="grid card"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Grid>
          <Grid item md={6}>
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
                src={bottomLeftImage.toString()}
                alt="grid card"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Grid>
          <Grid item md={6}>
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
                src={bottomRightImage.toString()}
                alt="grid card"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Grid>
        </Grid>
        <List className="bottom-info" sx={{  pl: props.noBrand ? 1 : 0 }}>
          <ListItem disablePadding>
            {!props.noBrand && (
              <ListItemAvatar>
                <Avatar src={avatarSrc}  sx={{ width: 61, height: 61 }} />
              </ListItemAvatar>
            )}
            <ListItemText
              primary={title}
              secondary={subtitle}
              primaryTypographyProps={{ variant: "h6", fontWeight: 700 }}
              secondaryTypographyProps={{
                variant: "caption",
                color: mode === "dark" ? "primary" : "secondary",
                // mt: -0.8,
              }}
            />
          </ListItem>
        </List>
      </Stack>
    </GridCardContainer>
  );
};

export default GridCard;

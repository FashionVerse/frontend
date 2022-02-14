import Logo from "../components/Logo";
import Link from "../components/Link";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  BsEnvelope,
  BsGeoAlt,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

const NavIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.04)",
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const BlueAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
}));

export default function Footer() {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={5}>
          <Stack>
            <Logo size="56px" withText>
              <Typography sx={{ ml: "12px" }} variant="h5">
                <strong>FASHION</strong>VERSE
              </Typography>
            </Logo>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
              sx={{ mt: 2 }}
            >
              The Fashion, Inc. is an NFT marketplace for 3D digital clothing
              that enables the user to build an avatar wearable digital closet,
              often interlinked with physical fashion utility.
            </Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem disableGutters>
                <ListItemAvatar sx={{ mr: -1, mt: 1, ml: 0.5 }}>
                  <BsEnvelope style={{ fontSize: "2rem" }} />
                </ListItemAvatar>
                <ListItemText
                  primary="Support email"
                  secondary="community@thefashionverse.io"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </ListItem>
            </List>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontWeight: 600 }}
          >
            About
          </Typography>
          <List dense={true}>
            {ABOUT_LINKS.map(({ id, label, href }) => (
              <ListItem key={id} disableGutters>
                <Link href={href} noLinkStyle>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ color: "textPrimary" }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontWeight: 600 }}
          >
            Support
          </Typography>
          <List dense={true}>
            {SUPPORT_LINKS.map(({ id, label, href }) => (
              <ListItem key={id} disableGutters>
                <Link href={href} noLinkStyle>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ color: "textPrimary" }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ borderTop: "2px solid #ccc", my: 2, pt: 2 }}
        >
          <Grid item>
            <Typography variant="caption">
              {"© " + new Date().getFullYear() + ". All rights reserved"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const ABOUT_LINKS = [
  { label: "About us", href: "about", id: "asdjas" },
  { label: "Blog", href: "blog", id: "kaijsa" },
  { label: "Legal & Privacy", href: "legal", id: "lakosa" },
  { label: "Cookie policies", href: "cookie-policy", id: "kaijsy" },
  { label: "Cookie preferences", href: "cookie-preferences", id: "lauhsn" },
];

const SUPPORT_LINKS = [
  { label: "Contact us", href: "contact", id: "lpokiu" },
  { label: "Bug bounty", href: "bug-bounty", id: "qwerty" },
];

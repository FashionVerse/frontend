import Logo from "../components/Logo";
import Link from "../components/Link";
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

export default function Footer() {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <Logo size="56px" withText>
            <Typography sx={{ ml: "12px" }} variant="h5">
              <strong>FASHION</strong>VERSE
            </Typography>
          </Logo>
        </Grid>
        <Grid item xs={5}>
          <Stack>
            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              modi incidunt molestiae, debitis quisquam culpa veritatis magni
              sequi id, harum quos commodi!
            </Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar>
                    <BsEnvelope />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Support email"
                  secondary="lorem@ipsum.com"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar>
                    <BsGeoAlt />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Company address"
                  secondary="15 Yemen road, Yemen"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </ListItem>
            </List>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">About</Typography>
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
          <Typography variant="h6">Support</Typography>
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
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ borderTop: "2px solid #ccc", mt: 2, pt: 2 }}
        >
          <Grid item>
            <Stack direction="row" gap={2}>
              <IconButton size="small" href="#">
                <BsTwitter />
              </IconButton>
              <IconButton size="small" href="#">
                <BsInstagram />
              </IconButton>
              <IconButton size="small" href="#">
                <BsYoutube />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item sx={{ mb: 4 }}>
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

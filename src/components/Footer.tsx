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
import { BsEnvelope } from "react-icons/bs";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <Container maxWidth="lg" className="footer">
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12} md={5}>
          <Stack>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            >
              <Logo size="70px" withText>
                <Typography
                  fontWeight={300}
                  sx={{ ml: "8px", letterSpacing: 3 }}
                  variant="h4"
                >
                  <strong>FASHION</strong>VERSE
                </Typography>
              </Logo>
            </motion.div>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
              sx={{ mt: 2, color: "#8393AF", fontWeight: 700 }}
            >
              The Fashion, Inc. is an NFT marketplace for 3D digital clothing
              that enables the user to build an metaverse compatible digital
              closet.
            </Typography>
            <List className="email-box">
              <ListItem disableGutters>
                <ListItemAvatar sx={{ mr: -1, mt: 1, ml: 0.5 }}>
                  <BsEnvelope style={{ fontSize: "2rem" }} />
                </ListItemAvatar>
                <ListItemText
                  primary="Support email"
                  sx={{ fontWeight: 400, color: "#8393AF" }}
                  secondary="community@thefashionverse.io"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </ListItem>
            </List>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mt: 8 }} className="footer-headings">
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontWeight: 400, color: "#000000" }}
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
        <Grid item xs={12} md={2} sx={{ mt: 8 }} className="footer-headings">
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontWeight: 400, color: "#000000" }}
          >
            Support
          </Typography>
          <List dense={true}>
            {SUPPORT_LINKS.map(({ id, label, href }) => (
              <ListItem key={id} disableGutters>
                <Link href={href} noLinkStyle>
                  <ListItemText
                    primary={label}
                    sx={{ color: "#8393AF", fontWeight: 700 }}
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
          sx={{ my: 2, pt: 2 }}
          className="copy-right-box"
        >
          <Grid item>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#8393AF" }}
            >
              {"© " + new Date().getFullYear() + ". All rights reserved"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const ABOUT_LINKS = [
  {
    label: "About us",
    href: "https://www.notion.so/The-FashionVerse-Inc-f6e6a8b81d7e44e0bcff50039a813d75",
    id: "asdjas",
  },
  { label: "Blog", href: "blog", id: "kaijsa" },
  // { label: "Legal & Privacy", href: "legal", id: "lakosa" },
  // { label: "Cookie policies", href: "cookie-policy", id: "kaijsy" },
  // { label: "Cookie preferences", href: "cookie-preferences", id: "lauhsn" },
];

const SUPPORT_LINKS = [
  { label: "Contact us", href: "contact", id: "lpokiu" },
  // { label: "Bug bounty", href: "bug-bounty", id: "qwerty" },
];

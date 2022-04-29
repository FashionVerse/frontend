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
               <div className="customize-logo">
              <Logo size="70px" withText>
                <Typography
               fontWeight={400}
               sx={{ ml: "8px", letterSpacing: 3 }}
               variant="h4"
                >
                  The<strong>FASHION</strong>VERSE
                </Typography>
              </Logo>
              </div>
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
    href: "https://www.notion.so/The-FashionVerse-Inc-Community-81d0d0a9e79e4db3964987511170e2c1",
    id: "asdjas",
  },
  {
    label: "FAQs",
    href: "https://www.notion.so/Frequently-Asked-Questions-03f878292e3b4f30875ec4e3884896bd",
    id: "asdja",
  },
  { label: "Blog", href: "https://medium.com/@FashionVerse", id: "kaijsa" },
  // { label: "Legal & Privacy", href: "legal", id: "lakosa" },
  // { label: "Cookie policies", href: "cookie-policy", id: "kaijsy" },
  // { label: "Cookie preferences", href: "cookie-preferences", id: "lauhsn" },
];

const SUPPORT_LINKS = [
  { label: "Contact us", href: "contact", id: "lpokiu" },
  { label: "Suggestion Form", href: "https://docs.google.com/forms/d/e/1FAIpQLSerQnqtUGZSnUEHFgbd2Unmdv0_0tcnIS1YVIJjp3D5BzKfjg/viewform?usp=sf_link", id: "abcd" },
  { label: "Questions Form", href: "https://docs.google.com/forms/d/e/1FAIpQLSdFo9dZhe-19nwXYOlQbwiZzr_jk9R7I85SYBje33PCeQ6yeA/viewform?usp=sf_link", id: "xyz" },
  // { label: "Bug bounty", href: "bug-bounty", id: "qwerty" },
];

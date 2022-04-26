// 404.js
import Link from "next/link";
import Footer from "../src/components/Footer";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";
export default function FourOhFour() {
  return (
    <>
      <Container
        className="wrapper home-page common-wrapper checkOutPage"
        maxWidth={false}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="custom-container"
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 12,
            }}
          >
            <span className="divider"></span>
            <Box>
              <Typography
                variant="h1"
                className="secondary-heading"
                style={{fontFamily: "'Commissioner',sans-serif"}}
                sx={{ mt: 10, mb: 6}}
              >
                 404 -&nbsp;
                <Typography
                  variant="h1"
                  color="primary"
                  component="span"
                  className="gradient-text"
                >
                  Page Not Found
                </Typography>
              </Typography>
            </Box>
            <Typography
              sx={{ mt: 0 }}
              variant="subtitle1"
              className="sub-heading"
              align="center"
            >
              <Link   style={{color: "#fff"}} href="/">
                <a style={{color: "#fff"}}>Go back home</a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </>
  );
}

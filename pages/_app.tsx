import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { Container, PaletteMode, Typography, Box } from "@mui/material";
import { useWindowSize } from "../src/useWindowSize";
import "../styles/tailwind.css";
import "../styles/style.css";
import "keen-slider/keen-slider.min.css";
import { SnackbarProvider } from "notistack";
import { AnimateSharedLayout } from 'framer-motion'
import Header from "../src/components/Header";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function MyApp(props: any) {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const item = localStorage.getItem('key')
    if (item) {
      console.log("!!",item)
    }
  }
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("key", mode);
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      }
    }),
    []
  );

  const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
      mode,
      primary: {
        main: "#22CAFF",
      },
      secondary: {
        main: "#0266C1",
      },
    },
    typography: {
      //fontFamily: ["Crimson Pro", "serif"].join(","),

      button: {
        textTransform: "none",
      },
      fontSize: 16,
    },
    // components: {
    //   MuiContainer: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: "",
    //       },
    //     },
    //   },
    // },
  });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const { width, height } = useWindowSize();

  console.log(height);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>TheFashionVerse</title>
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxWidth={false}
            disableGutters
            sx={{
              backgroundImage:
                mode === "dark"
                  ? "#121212"
                  : "linear-gradient(to right, #eeeeee, #ffffff)",
            }}
          >
            <div
              className={mode === "dark" ? "bg-style-dark" : "bg-style-light"}
              style={{
                marginTop: "-24px",
                paddingTop: "24px",
              }}
            >
              {/* {!width || width > 999 ? (
                <SnackbarProvider>
                  <Component {...pageProps} />
                </SnackbarProvider>
              ) : (
                <Box
                  sx={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" align="center">
                    FashionVerse works best on devices with a viewport width
                    larger than 1280px. Please re-size or switch devices to
                    launch FashionVerse.
                  </Typography>
                </Box>
              )} */}
              <Header />

              <SnackbarProvider>
              <AnimateSharedLayout>
                  <Component {...pageProps} />
              </AnimateSharedLayout>
                </SnackbarProvider>
            </div>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

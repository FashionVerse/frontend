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
import { AnimateSharedLayout } from "framer-motion";
import Header from "../src/components/Header";
import { MantineProvider } from "@mantine/core";
import { ColorSchemeProvider, ColorScheme } from "@mantine/core";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");
  React.useEffect(() => {
    setMode(localStorage.getItem("dark-mode") === "dark" ? "dark" : "light");
    setColorScheme(
      localStorage.getItem("dark-mode") === "dark" ? "dark" : "light"
    );
  }, []);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        setColorScheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  React.useEffect(() => {
    // console.log("mode", mode);
    localStorage.setItem("dark-mode", mode);
  }, [mode]);
  const font = "'Commissioner', sans-serif";
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
    // spacing: [0, 4, 8, 16, 32, 64],
    typography: {
      fontFamily: font,
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
  

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>TheFashionVerse</title>
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <MantineProvider theme={{ colorScheme: colorScheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Container
              maxWidth={false}
              disableGutters
              sx={{
                backgroundImage:
                  mode === "dark"
                    ? "#000"
                    : "linear-gradient(to right, #eeeeee, #ffffff)",
              }}
            > */}
              <div
                className={mode === "dark" ? "bg-style-dark" : "bg-style-light"}
                // style={{
                //   marginTop: "-24px",
                //   paddingTop: "24px",
                // }}
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
            {/* </Container> */}
          </ThemeProvider>
        </MantineProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

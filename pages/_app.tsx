import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { PaletteMode, Typography } from "@mui/material";
import { useWindowSize } from "../src/useWindowSize";
import "../src/styles.css";
import "keen-slider/keen-slider.min.css";
import { Box } from "@mui/system";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
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
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      button: {
        textTransform: "none",
      },
    },
  });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const { width } = useWindowSize();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div
            className={mode === "dark" ? "bg-style-dark" : "bg-style-light"}
            style={{ marginTop: "-24px", paddingTop: "24px" }}
          >
            {!width || width > 1279 ? (
              <Component {...pageProps} />
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
                  larger than 1280px. Please re-size or switch devices to launch
                  FashionVerse.
                </Typography>
              </Box>
            )}
          </div>
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

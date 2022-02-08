import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          console.log(prevMode);
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : mode,
        },
      }),
    [mode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
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

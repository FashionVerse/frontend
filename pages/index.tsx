import * as React from "react";
import { ColorModeContext } from "./_app";
import { IconButton, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";

export default function Index() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Container sx={{ h: "100vh" }}>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Container>
  );
}

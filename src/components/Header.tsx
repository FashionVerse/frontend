import * as React from "react";
import { Stack, Typography } from "@mui/material";
import { ColorModeContext } from "../../pages/_app";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  BsBrightnessHigh,
  BsMoonStars,
  BsHeart,
  BsWallet,
  BsHandbag,
  BsDoorOpen,
} from "react-icons/bs";
import Logo from "./Logo";
import Link from "./Link";

export default function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
      <Logo size="48px" withText>
        <Typography sx={{ ml: "12px" }} variant="h6">
          <strong>FASHION</strong>VERSE
        </Typography>
      </Logo>
      <div style={{ flexGrow: 1 }} />
      <Stack direction="row" gap={3} alignItems={"center"}>
        <Stack direction="row" gap={6} alignItems={"center"}>
          <Link href={"#Brands"} color="inherit" hoverStyle>
            Brands
          </Link>
          <Link href={"#Drops"} color="inherit" hoverStyle>
            Drops
          </Link>
          <Link href={"#Resources"} color="inherit" hoverStyle>
            Resources
          </Link>
        </Stack>
        <IconButton sx={{ ml: "16px" }} size="small">
          <BsWallet />
        </IconButton>
        <IconButton size="small">
          <BsDoorOpen />
        </IconButton>
        <IconButton size="small">
          <BsHandbag />
        </IconButton>
        <IconButton size="small">
          <BsHeart />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode} size="small">
          {theme.palette.mode === "dark" ? (
            <BsBrightnessHigh />
          ) : (
            <BsMoonStars />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
}

import * as React from "react";
import { Stack, styled, Typography } from "@mui/material";
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

const NavIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.04)",
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
}));

export default function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
      <Logo size="48px" withText>
        <Typography sx={{ ml: "12px" }} variant="h5">
          <strong>FASHION</strong>VERSE
        </Typography>
      </Logo>
      <div style={{ flexGrow: 1 }} />
      <Stack direction="row" gap={3} alignItems={"center"}>
        <Stack direction="row" gap={6} alignItems={"center"}>
          <Link href={"/brands"} color="inherit" hoverStyle>
            <Typography variant="h6">Brands</Typography>
          </Link>
          <Link href={"#Drops"} color="inherit" hoverStyle>
            <Typography variant="h6">Drops</Typography>
          </Link>
          <Link href={"/resources"} color="inherit" hoverStyle>
            <Typography variant="h6">Resources</Typography>
          </Link>
        </Stack>
        <Link href={"/wallets"} color="inherit" noLinkStyle>
          <NavIconButton sx={{ ml: "16px" }} size="small">
            <BsWallet />
          </NavIconButton>
        </Link>
        <Link href={"#closet"} color="inherit" noLinkStyle>
          <NavIconButton size="small">
            <BsDoorOpen />
          </NavIconButton>
        </Link>
        <Link href={"/bag"} color="inherit" noLinkStyle>
          <NavIconButton size="small">
            <BsHandbag />
          </NavIconButton>
        </Link>

        <NavIconButton size="small">
          <BsHeart />
        </NavIconButton>
        <NavIconButton onClick={colorMode.toggleColorMode} size="small">
          {theme.palette.mode === "dark" ? (
            <BsBrightnessHigh />
          ) : (
            <BsMoonStars />
          )}
        </NavIconButton>
      </Stack>
    </Stack>
  );
}

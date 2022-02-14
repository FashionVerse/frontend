import * as React from "react";
import { Stack, styled, Typography } from "@mui/material";
import { ColorModeContext } from "../../pages/_app";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  BsBrightnessHigh,
  BsMoonStars,
  BsWallet,
  BsHandbag,
  BsDoorOpen,
} from "react-icons/bs";
import Logo from "./Logo";
import Link from "./Link";
import Tooltip from "@mui/material/Tooltip";
import ListMenu from "./ListMenu";

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
      <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 6 }}>
        {theme.palette.mode === "dark" ? <BsBrightnessHigh /> : <BsMoonStars />}
      </IconButton>
      <Logo size="48px" withText>
        <Typography sx={{ ml: "12px" }} variant="h5">
          <strong>FASHION</strong>VERSE
        </Typography>
      </Logo>
      <div style={{ flexGrow: 1 }} />
      <Stack direction="row" gap={3} alignItems={"center"}>
        <Stack
          direction="row"
          gap={6}
          alignItems={"center"}
          sx={{ mr: 4, fontSize: "1.2rem" }}
        >
          <Link href={"/brands"} color="inherit" hoverStyle>
            <Typography>Brands</Typography>
          </Link>
          <ListMenu items={DropsNavs}>
            <Typography
              sx={{
                cursor: "pointer",
                ":hover": { transform: "scale(1.125)" },
              }}
            >
              Drops
            </Typography>
          </ListMenu>
          <Link href={"/resources"} color="inherit" hoverStyle>
            <Typography>Resources</Typography>
          </Link>
        </Stack>
        <Tooltip title="Wallet Connect">
          <Link href={"/wallets"} color="inherit" noLinkStyle>
            <NavIconButton sx={{ ml: "16px" }} size="small">
              <BsWallet />
            </NavIconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Digital Wardrobe">
          <Link href={"/wardrobe"} color="inherit" noLinkStyle>
            <NavIconButton size="small">
              <BsDoorOpen />
            </NavIconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Shopping Cart">
          <Link href={"/bag"} color="inherit" noLinkStyle>
            <NavIconButton size="small">
              <BsHandbag />
            </NavIconButton>
          </Link>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

const DropsNavs = [
  { id: "uijabids7jas", label: "Street Wear", href: "/drops/street-wear" },
  { id: "ha8jaks92a2", label: "Vintage", href: "/" },
  { id: "ha8j39jak3j", label: "Work Wear", href: "/" },
  { id: "hj8jsia930an", label: "Party Wear", href: "/" },
  { id: "7ja93iajsh3a", label: "Evening Wear", href: "/" },
  { id: "haksnaj83jaa9", label: "Ethnic", href: "/" },
  { id: "haksnaj83jaa9", label: "Limitless", href: "/" },
];

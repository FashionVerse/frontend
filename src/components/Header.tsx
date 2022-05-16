import * as React from "react";
import { Badge, Container, Stack, styled, Typography } from "@mui/material";
import { ColorModeContext } from "../../pages/_app";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
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
import useSWR from "swr";
import Image from "next/image";
import walletDark from "../../public/wallet-dark.png";
import walletWhite from "../../public/wallet.svg";
import wardrobeDark from "../../public/wardrobe-dark.png";
import wardrobeWhite from "../../public/wardrobe.svg";
import cartDark from "../../public/cart-dark.png";
import cartWhite from "../../public/shopping-cart.svg";
// import wardrobe from "../../public/wardrobe.png";
// import cart from "../../public/shopping-cart.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { stack as Menu } from "react-burger-menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ethers } from "ethers";

const fetcher = (url) => fetch(url).then((res) => res.json());

const NavIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.04)",
  padding: theme.spacing(1),
  filter: `drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))`,
}));

export default function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#22CAFF" : "#fff",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#22CAFF"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  // React.useEffect(() => {
  //   if(typeof window['ethereum'] !== 'undefined'){
  //     const ethereum = window['ethereum'];
  // if (ethereum) {
  //     var provider = new ethers.providers.Web3Provider(ethereum);
  // }

  // const isMetaMaskConnected = async () => {
  //   const accounts = await provider.listAccounts();
  //   return accounts.length > 0;
  // }

  // const  getAccount = async () => {
  //   const connected = await isMetaMaskConnected();
  //   if(connected){
  //     const accounts = await ethereum.enable();
  //     const account = accounts[0];
  //   }
  // }

  // ethereum.on('accountsChanged', function (accounts) {
  //   getAccount();
  // })
  //   }

  //   async function getDrops(){
  //     const arr = [];
  //     const drops = await getDocs(collection(firestore, "drop"));
  //     for(const drop of drops.docs){
  //       arr.push({id: drop.data().id, label: drop.data().title, href: "/drops/"+drop.data().id})
  //     }
  //     return arr;

  //   }

  //   getDrops().then((value)=>{
  //     setDrops(value);

  //   })

  // }, [])

  // const getDrops = () => {
  //   const { data, error } = useSWR(
  //     process.env.API_URL + "/api/getDrops",
  //     fetcher
  //   );
  //   return { data: data, error: error };
  // };

  async function getDrops() {
    try {
    const response = await fetch(
      process.env.API_URL + "/api/getDrops"
    );

    const data = await response.json();
    return data
    } catch (e) {
      console.log(e)
    }
  };

  // const { data: dropData, error: dropError } = getDrops();

  


  async function getBag() {
    try {
    if (typeof window["ethereum"] !== "undefined") {
      const ethereum = window["ethereum"];
      if (ethereum) {
        var provider = new ethers.providers.Web3Provider(ethereum);
      }

      const isMetaMaskConnected = async () => {
        const accounts = await provider.listAccounts();
        return accounts.length > 0;
      };

      const connected = await isMetaMaskConnected();
      if (connected) {
        const accounts = await ethereum.enable();
        const account = accounts[0];
        const response = await fetch(
          process.env.API_URL + "/api/getItemsFromBag?account="+account,
        );

        const data = await response.json()
        return data;
      } 
    }

    return {items: []};
  } catch(e) {
    console.log(e);
  }
  }



  

  // const [drops, setDrops] = React.useState(null);
  const [stickyHeader, setStickyHeader] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setStickyHeader(window.pageYOffset > 100)
      );
    }

    setLoading(true)

    getBag().then((data)=>{
      setBagData(data);

      getDrops().then((dropData)=>{
        const drops = [];
    console.log("drops ", dropData);
    dropData.drops.forEach((drop) => {
      drops.push({
        id: drop._id,
        label: drop.title,
        href: "/drops/" + drop.url,
      });
    });

    setDrops(drops);

    setLoading(false);

      })
    });
  }, []);

  const [bagData, setBagData] = React.useState(null);
  const [drops, setDrops] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  if(loading){
    return <div></div>
  }

  return (
    <header className={`header ${stickyHeader ? "stick-header" : ""}`}>
      <Container className="custom-container" maxWidth={false}>
        <Stack className="inner-container" direction="row" alignItems="center">
          {/* <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 6 }}>
            {theme.palette.mode === "dark" ? (
              <BsBrightnessHigh />
            ) : (
              <BsMoonStars />
            )}
          </IconButton> */}
          {/* 
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeOut", delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
          > */}
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
          {/* </motion.div> */}
          <div className="blankDiv" style={{ flexGrow: 1 }} />

          <Stack
            className="custom-navbar"
            direction="row"
            gap={3}
            alignItems={"center"}
          >
            <Stack
              direction="row"
              gap={6}
              className="navbar-inner"
              alignItems={"center"}
              sx={{ mr: 4, fontSize: "1.2rem" }}
            >
              <Link
                // sx={{ display: { xs: "none", md: "flex" } }}
                href={"/brands"}
                color="inherit"
                hoverStyle
              >
                <Typography
                  sx={{ fontWeight: 600, textTransform: "uppercase" }}
                >
                  Brands
                </Typography>
              </Link>
              {!drops ? (
                <ListMenu items={[]}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      ":hover": { transform: "scale(1.125)" },
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Drops
                  </Typography>
                </ListMenu>
              ) : (
                <ListMenu items={drops}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      // ":hover": { transform: "scale(1.125)" },
                      fontWeight: 600,
                      textTransform: "uppercase",
                      display: "flex",
                    }}
                  >
                    Drops <KeyboardArrowDownIcon />
                  </Typography>
                </ListMenu>
              )}
              <Link href={"/resources"} color="inherit" hoverStyle>
                <Typography
                  sx={{ fontWeight: 600, textTransform: "uppercase" }}
                >
                  Resources
                </Typography>
              </Link>
            </Stack>

            <Tooltip
              sx={{ display: { xs: "none", md: "flex" } }}
              title="Connect Wallet"
            >
              <Link href={"/wallets"} color="inherit" noLinkStyle>
                <motion.div
                  // className="drops_hover_cursor"
                  style={{
                    cursor: "pointer",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                >
                  <NavIconButton sx={{ ml: "16px" }} size="small">
                    {/* <BsWallet /> */}
                    <Image
                      // src={
                      //   theme.palette.mode === "dark" ? walletWhite : walletDark
                      // }
                      src={walletWhite}
                      alt="wallet"
                      width="29px"
                      height="29px"
                    />
                  </NavIconButton>
                </motion.div>
              </Link>
            </Tooltip>
            <Tooltip
              sx={{ display: { xs: "none", md: "flex" } }}
              title="Digital Wardrobe"
            >
              <Link href={"/wardrobe"} color="inherit" noLinkStyle>
                <motion.div
                  // className="drops_hover_cursor"
                  style={{
                    cursor: "pointer",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                >
                  <NavIconButton size="small">
                    {/* <BsDoorOpen /> */}
                    <Image
                      // src={
                      //   theme.palette.mode === "dark" ?  wardrobeWhite: wardrobeDark
                      // }
                      src={wardrobeWhite}
                      alt="wardrobe"
                      width="29px"
                      height="29px"
                    />
                  </NavIconButton>
                </motion.div>
              </Link>
            </Tooltip>
            <Tooltip
              sx={{ display: { xs: "none", md: "flex" } }}
              title="Shopping Cart"
            >
              <Link href={"/bag"} color="inherit" noLinkStyle>
                <motion.div
                  // className="drops_hover_cursor"
                  style={{
                    cursor: "pointer",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                >
                  <NavIconButton size="small">
                    {/* <BsHandbag /> */}

                    
                  {
                    !bagData ?  <Image
                    // src={
                    //   theme.palette.mode === "dark" ? cartWhite : cartDark
                    // }
                    src={cartWhite}
                    alt="cart"
                    width="29px"
                    height="30px"
                  /> : <Badge badgeContent={bagData.items.length} color="primary">

                  <Image
                    // src={
                    //   theme.palette.mode === "dark" ? cartWhite : cartDark
                    // }
                    src={cartWhite}
                    alt="cart"
                    width="29px"
                    height="30px"
                  />
                  </Badge>
                  }

                {/* <Badge badgeContent={4} color="primary">

                    <Image
                      // src={
                      //   theme.palette.mode === "dark" ? cartWhite : cartDark
                      // }
                      src={cartWhite}
                      alt="cart"
                      width="29px"
                      height="30px"
                    />
                    </Badge> */}
                  </NavIconButton>
                </motion.div>
              </Link>
            </Tooltip>
            <FormGroup>
              {/* <FormControlLabel
                onClick={colorMode.toggleColorMode}
                control={<Switch defaultChecked />}
                label="Dark Mode"
                sx={{ position: "fixed" }}
              /> */}

              <FormControlLabel
                onChange={() => {
                  colorMode.toggleColorMode();
                }}
                className="custom-switch"
                control={<MaterialUISwitch />}
                label=""
                checked={theme.palette.mode === "dark"}
              />
            </FormGroup>
          </Stack>
          <Menu className="mobile-menu">
            <Link href={"/brands"} color="inherit" hoverStyle>
              <Typography sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                Brands
              </Typography>
            </Link>
            <Link href={"/resources"} color="inherit" hoverStyle>
              <Typography sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                Resources
              </Typography>
            </Link>
            <Link href={"/wallets"} color="inherit" hoverStyle>
              <Typography sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                Connect Wallet
              </Typography>
            </Link>
            <Link href={"/wardrobe"} color="inherit" hoverStyle>
              <Typography sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                Digital Wardrobe
              </Typography>
            </Link>
            <Link href={"/bag"} color="inherit" hoverStyle>
              <Typography sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                Shopping Cart
              </Typography>
            </Link>
          </Menu>
        </Stack>
      </Container>
    </header>
  );
}

const DropsNavs = [
  { id: "uijabids7jas", label: "Street Wear", href: "/drops/street-wear" },
  { id: "ha8jaks92a2", label: "Vintage", href: "/" },
  { id: "ha8j39jak3j", label: "Work Wear", href: "/" },
  { id: "hj8jsia930an", label: "Party Wear", href: "/" },
  { id: "7ja93iajsh3a", label: "Evening Wear", href: "/" },
  { id: "naj83jaa9", label: "Ethnic", href: "/" },
  { id: "haksnaj83jaa9", label: "Limitless", href: "/" },
];

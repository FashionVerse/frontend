import * as React from "react";
import Image from "next/image";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import LandingPageDisplay from "../src/components/LandingPageDisplay";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { BiRocket } from "react-icons/bi";
import { useRouter } from "next/router";
import Slider from "../src/components/Slider";
import GridCard, { GridCardProps } from "../src/components/GridCard";
import { BsDiscord, BsMedium, BsTwitter } from "react-icons/bs";
import { styled } from "@mui/system";
import AdvisorCard, { AdvisorCardProps } from "../src/components/AdvisorCard";
import firestore from "../firebase/clientApp";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
}));

// getStaticProps / getServerSideProps
export default function Index() {
  const router = useRouter();

  React.useEffect(() => {
    async function getBrands() {
      const arr: GridCardProps[] = [];
      const querySnapshot = await getDocs(collection(firestore, "brands"));
      querySnapshot.forEach((doc) => {
        arr.push(doc.data() as GridCardProps);
      });
      return arr;
    }
    getBrands()
      .then((value) => {
        setBrands(value);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [brands, setBrands] = React.useState<GridCardProps[] | null>(null);

  if (!brands) {
    // TODO: Add proper loader
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Image
          src="/assets/loading.gif"
          alt="Loading..."
          layout="fixed"
          height={300}
          width={300}
        />
      </Box>
    );
  }

  return (
    <Container>
      <Header />
      {/* Hero */}
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        sx={{ mt: 10, gap: 6 }}
      >
        <div>
          <Typography variant="h3">
            <Typography
              variant="h3"
              sx={{ fontWeight: 700 }}
              color="primary"
              component="span"
              className="gradient-text"
            >
              GENESIS
            </Typography>
            <i>COLLECTION</i>
          </Typography>
          <Typography
            sx={{ mt: 3, fontSize: "2.5rem" }}
            variant="h4"
            align="center"
          >
            Build your First Digital <br /> Wardrobe
          </Typography>
        </div>
        <Box
          sx={{
            width: "50%",
            minWidth: "300px",
            maxWidth: "540px",
            aspectRatio: "1/1",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/hero-circle.svg"
            alt="..."
            layout="fill"
            priority
            loading="eager"
          />
          <LandingPageDisplay />
        </Box>
      </Stack>
      {/* Drops */}
      <Typography variant="h3" align="center" sx={{ mt: 16, mb: 10 }}>
        <Typography
          variant="h3"
          color="primary"
          component="span"
          className="gradient-text"
        >
          <b>LATEST</b>
        </Typography>
        DROPS
      </Typography>
      <Slider
        slideArray={DROPS.map((props) => (
          // Hard coded link to drop
          <GridCard
            {...props}
            noBrand
            key={props.id}
            href="/drops/street-wear"
          />
        ))}
      />
      {/* Brands */}
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction={"row"}
        sx={{ margin: "128px 64px 64px" }}
      >
        <Typography variant="h3">
          OUR PARTNER&nbsp;
          <Typography
            variant="h3"
            color="primary"
            component="span"
            className="gradient-text"
          >
            <b>BRANDS</b>
          </Typography>
        </Typography>
        <GradientButton
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: "16px", px: "36px", py: "16px" }}
          startIcon={<BiRocket />}
          href="/brands"
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Explore All
          </Typography>
        </GradientButton>
      </Stack>
      <Slider
        slideArray={brands.map((props) => (
          <div
            onClick={() => {
              router.push("/brands/" + props.id);
            }}
          >
            <GridCard {...props} key={props.id + "-ahsdkh"} />
          </div>
        ))}
      />
      {/* Advisors */}
      <Typography variant="h3" align="center" sx={{ mt: 16, mb: 10 }}>
        OUR&nbsp;
        <Typography
          variant="h3"
          color="primary"
          component="span"
          className="gradient-text"
        >
          <b>ADVISORS</b>
        </Typography>
      </Typography>
      <Grid container spacing={12}>
        {ADVISORS.map((props) => (
          <Grid
            key={props.id}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <AdvisorCard {...props} />
          </Grid>
        ))}
      </Grid>
      {/* Community */}
      <Typography variant="h3" align="center" sx={{ mt: 16, mb: 10 }}>
        <Typography
          variant="h3"
          color="primary"
          component="span"
          sx={{ fontWeight: 300 }}
          className="gradient-text"
        >
          <b>JOIN THE</b>&nbsp;
        </Typography>
        <b>FV</b>COMMUNITY
      </Typography>
      <Stack
        direction="row"
        gap={6}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 20 }}
      >
        <IconButton
          size="large"
          href="https://twitter.com/FashionVerseInc"
          target="_blank"
        >
          <BsTwitter fontSize={"2em"} color="#1DA1F2" />
        </IconButton>
        <IconButton
          size="large"
          href="https://discord.gg/SPmtYrBq"
          target="_blank"
        >
          <BsDiscord fontSize={"2em"} color="#738ADB" />
        </IconButton>
        <IconButton
          size="large"
          href="https://medium.com/@FashionVerse"
          target="_blank"
        >
          <BsMedium fontSize={"2em"} color="#515151" />
        </IconButton>
      </Stack>
      <Footer />
    </Container>
  );
}

const DROPS: GridCardProps[] = [
  {
    id: "abc123",
    title: "Street Wear",
    subtitle: "Fashion for everyday",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?denim",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?glam",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?glamour",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "h7jaus9",
    title: "Vintage",
    subtitle: "Feeling old school?",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?shirt",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?dress",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?color",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "7haj8ka",
    title: "Work Wear",
    subtitle: "Fashion at work",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?glam",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?shirt",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?color",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "h8ak9ja",
    title: "Party Wear",
    subtitle: "Glam and Glitter",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?dress",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?design",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?clothing",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "jk9a3ha",
    title: "Evening Wear",
    subtitle: "Fashionable evenings",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pant",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?trouser",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pretty",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?clothing",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "9ajus2h",
    title: "Ethnic",
    subtitle: "Fashion for the cultured",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?scarf",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?hoodie",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?shoes",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "ka9kai34",
    title: "Limitless",
    subtitle: "Boundless fashion",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?jeans",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?fashion",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?clothes",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?clothing",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
];

const BRANDS: GridCardProps[] = [
  {
    id: "asdhkjasd3ad",
    title: "Limitless",
    subtitle: "Boundless fashion",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?nike",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?gap",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?adidas",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?cr7",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "naksjadidjadw",
    title: "Vintage",
    subtitle: "Feeling old school?",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?company",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?logo",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?pattern",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?facebook",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "hsyaiajskaiaasasd",
    title: "Work Wear",
    subtitle: "Fashion at work",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?designer",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?levis",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?denims",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?puma",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
  {
    id: "hajsuaiaosakassd",
    title: "Evening Wear",
    subtitle: "Fashionable evenings",
    avatarSrc: "https://source.unsplash.com/random/900×700/?facebook",
    topLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?brand",
      alt: "grid image",
      bgColor: "#F2B4B0",
    },
    topRightImage: {
      src: "https://source.unsplash.com/random/900×700/?logo",
      alt: "grid image",
      bgColor: "#F6FDE2",
    },
    bottomLeftImage: {
      src: "https://source.unsplash.com/random/900×700/?branded",
      alt: "grid image",
      bgColor: "#FEECE5",
    },
    bottomRightImage: {
      src: "https://source.unsplash.com/random/900×700/?company",
      alt: "grid image",
      bgColor: "#E5E5F0",
    },
  },
];

const ADVISORS: AdvisorCardProps[] = [
  {
    id: "klaose",
    src: "https://source.unsplash.com/random/900×700/?person",
    alt: "advisor brand",
    name: "Shivam Sharma",
    title: "Blockchain and Smart Contracts Advisor",
    background: "Blockchain Engineer at Polygon",
  },
  {
    id: "j7hausa",
    src: "https://source.unsplash.com/random/900×700/?hispanic",
    alt: "advisor brand",
    name: "Ari Lightman",
    title: "Web3 and NFT Advisor",
    background: "Carnegie Mellon Professor of Digital Media and Marketing",
  },
  {
    id: "jk8hay62ua",
    src: "https://source.unsplash.com/random/900×700/?actress",
    alt: "advisor brand",
    name: "Baek Kim",
    title: "Business and Web3 Strategy Advisor",
    background: "Partner at Hashed and Carnegie Mellon grad",
  },
  {
    id: "kl8j26ags",
    src: "https://source.unsplash.com/random/900×700/?actor",
    alt: "advisor brand",
    name: "JP Ren",
    title: "Business Strategy Advisor",
    background: "Y Combinator Alum and Snapjoy Co-Founder",
  },
  {
    id: "l03fg7h",
    src: "https://source.unsplash.com/random/900×700/?asian",
    alt: "advisor brand",
    name: "Oliver Quin",
    title: "Technical Advisor",
    background:
      "Software Engineer at Syndicate Protocol and Carnegie Mellon grad",
  },
];

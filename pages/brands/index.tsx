import * as React from "react";
import Image from "next/image";
import Footer from "../../src/components/Footer";
import { Container, Grid, Box, Typography } from "@mui/material";
import GridCard, { GridCardProps } from "../../src/components/GridCard";
import CheckBoxSelect from "../../src/components/CheckBoxSelect";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import firestore from "../../firebase/clientApp";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";

export default function Brands() {
  const methods = useForm({
    defaultValues: {
      drops: DROP_NAME_DATA,
    },
  });

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar(e.message);
      });
  }, []);

  const [brands, setBrands] = React.useState(null);

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
          src="/assets/loading.svg"
          alt="Loading..."
          layout="fixed"
          height={150}
          width={150}
        />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Container className="brandsInner">
        <Typography
          variant="h3"
          align="center"
          color="primary"
          sx={{ mt: 16, mb: 10 }}
          className="gradient-text"
        >
          <b>BRANDS</b>
        </Typography>
        <Grid container spacing={8} sx={{ mb: 16 }}>
          {/* <Grid item xs={12} sx={{ ml: 3 }}>
            <CheckBoxSelect formStateName="drops" label="Drop" />
          </Grid> */}
          {brands.map((props) => (
            <Grid item xs={12} sm={6} md={4} key={props.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  router.push("/brands/" + props.id);
                }}
              >
                <GridCard {...props} />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </Container>
    </FormProvider>
  );
}

const DROP_NAME_DATA = [
  { value: "Streetwear", id: "jakais7ja" },
  { value: "Vintage", id: "hayjsu812" },
  { value: "Limitless", id: "asd81ja" },
  { value: "Workwear", id: "jad1da7ja" },
  { value: "Partywear", id: "po8nabsad" },
  { value: "Ethnic", id: "hays7has" },
  { value: "Eveningwear", id: "971bnada" },
];

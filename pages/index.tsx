import * as React from "react";
import { Container } from "@mui/material";
import Header from "../src/components/Header";

export default function Index() {
  return (
    <Container sx={{ h: "100vh" }}>
      <Header />
    </Container>
  );
}

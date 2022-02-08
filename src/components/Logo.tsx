import * as React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

type Props = {
  size: string;
  withText?: boolean;
};

const Logo: React.FC<Props> = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        src="/logo.svg"
        alt="Fashion-verse logo"
        layout="fixed"
        height="32px"
        width="32px"
      />
      {props.withText && props.children}
    </Box>
  );
};

export default Logo;

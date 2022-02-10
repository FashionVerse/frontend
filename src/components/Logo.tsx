import * as React from "react";
import Image from "next/image";
import Link from "../components/Link";
import { Box } from "@mui/material";

type Props = {
  size: string;
  withText?: boolean;
};

const Logo: React.FC<Props> = (props) => {
  return (
    <Link href="/" noLinkStyle>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/logo.svg"
          alt="Fashion-verse logo"
          layout="fixed"
          height={props.size}
          width={props.size}
        />
        {props.withText && props.children}
      </Box>
    </Link>
  );
};

export default Logo;

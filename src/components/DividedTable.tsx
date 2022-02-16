import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Stack, Typography } from "@mui/material";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
  maxWidth: "800px",
  margin: "auto",
  border: "2px solid " + theme.palette.primary.main,
  borderRadius: "24px",
  padding: "12px",
}));

const BlueDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export type DividedTableProps = {
  title1: string;
  subtitle1: string;
  title2: string;
  subtitle2: string;
  title3: string;
  subtitle3: string;
};

export default function DividedTable(props: DividedTableProps) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs sx={{ textAlign: "center", mx: "16px", border: "none" }}>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="body1">{props.title1}</Typography>
          <Typography variant="body2">{props.subtitle1}</Typography>
        </Stack>
      </Grid>
      <BlueDivider orientation="vertical" flexItem />{" "}
      <Grid item xs sx={{ textAlign: "center", mx: "16px", border: "none" }}>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="body1">{props.title2}</Typography>
          <Typography variant="body2">{props.subtitle2}</Typography>
        </Stack>
      </Grid>
      <BlueDivider orientation="vertical" flexItem />
      <Grid item xs sx={{ textAlign: "center", mx: "16px", border: "none" }}>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="body1">{props.title3}</Typography>
          <Typography variant="body2">{props.subtitle3}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/system";

export type Option = {
  selected?: boolean;
  value: string;
  id: string;
};

type CheckBoxSelectProps = { formStateName: string; label: string };

const StyledSelect = styled(Select)({
  borderRadius: "8px",
  padding: "0px 12px",
  fontSize: "20px",
});

export default function CheckBoxSelect({
  formStateName,
  label,
}: CheckBoxSelectProps) {
  const { watch } = useFormContext();
  const options: Option[] = watch(formStateName);

  return (
    <div>
      <StyledSelect
        multiple
        value={options.map((opt) => opt.value)}
        renderValue={() => label}
      >
        {options.map((opt: Option) => (
          <MenuItem key={opt.id} value={opt.value} disableRipple>
            <Checkbox checked={opt.selected} />
            <ListItemText primary={opt.value} />
          </MenuItem>
        ))}
      </StyledSelect>
    </div>
  );
}

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { alpha } from "@mui/material";

export type SelectState = { options: string[]; selected: string };

type CheckBoxSelectProps = {
  state: SelectState;
  setState: React.Dispatch<React.SetStateAction<SelectState>>;
  label: string;
};

export default function CheckBoxSelect({
  state,
  setState,
  label,
}: CheckBoxSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof state["options"]>) => {
    const {
      target: { value },
    } = event;
    setState({
      options: state.options,
      selected: typeof value === "string" ? value : value.join(","),
    });
  };

  return (
    <div>
      <FormControl>
        <Select
          id="multiple-checkbox"
          multiple
          value={state.options}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => label}
          sx={{
            maxWidth: "200px",
            backgroundColor: alpha("#20242B", 0.68),
            borderRadius: "12px",
          }}
          size="small"
        >
          {state.options.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={!state.selected.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

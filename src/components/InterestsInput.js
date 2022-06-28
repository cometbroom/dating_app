import { Autocomplete, Paper, TextField } from "@mui/material";
import { useRef } from "react";
import useFetch from "../hooks/useFetch";
import ErrorProvider from "../tools/ErrorProvider";
import InterestsIcon from "@mui/icons-material/Interests";
import { COLORS } from "../tools/constants";

export default function InterestsInput({ placeholder, values, setValues }) {
  const autofill = useRef(null);
  const [data, loading, error] = useFetch("/api/interests");

  const isEnoughValues = values.length > 0 && values.length < 3;

  function selectHandler(e, option, reason) {
    const labels = autofill.current.querySelectorAll("span.MuiChip-label");
    setValues(Array.from(labels).map((x) => x.textContent.toUpperCase()));
  }

  function enterHandler(e) {
    if (e.key === "Enter") e.preventDefault();
  }

  return (
    <Paper sx={{ display: "flex", width: "100%", gap: "10px", p: 1 }}>
      <InterestsIcon
        sx={{
          color: COLORS.primary,
          display: "flex",
          alignSelf: "center",
        }}
        aria-label="menu"
      />

      <ErrorProvider loading={loading} error={error}>
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={data}
          sx={{ width: "100%", border: "none" }}
          onBlur={selectHandler}
          onKeyDown={enterHandler}
          renderInput={(params) => (
            <TextField
              error={isEnoughValues}
              helperText={
                isEnoughValues ? "Please enter at least 3 interests" : ""
              }
              hel
              ref={autofill}
              {...params}
              label={placeholder}
            />
          )}
        />
      </ErrorProvider>
    </Paper>
  );
}

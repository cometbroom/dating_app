import {
  Autocomplete,
  Divider,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useRef } from "react";

export default function InterestsInput({ placeholder }) {
  const autofill = useRef(null);

  function selectHandler(e, option, reason) {
    const value = autofill.current.innerText.split("\n");

    value.splice(0, 1);
    value.splice(-1, 1);

    console.dir(value);
  }

  function enterHandler(e) {
    if (e.key === "Enter") e.preventDefault();
  }

  //wn. find a way to take the interests to the state.
  // might have to wait for input change and double check interests for existence and
  // then add them.

  return (
    <>
      <Paper
        component="form"
        sx={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>

        <Autocomplete
          multiple
          id="combo-box-demo"
          options={["er", "few"]}
          sx={{ width: "100%" }}
          // onSelect={selectHandler}
          onInputChange={selectHandler}
          onKeyDown={enterHandler}
          renderInput={(params) => (
            <TextField ref={autofill} {...params} label="Movie" />
          )}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </>
  );
}

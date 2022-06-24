import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { VALIDATION } from "../tools/constants";

export default function LoginController() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  function debounce(callFunction, duration = 600) {
    let timerId;
    return (e) => {
      clearInterval(timerId);
      timerId = setTimeout(() => {
        callFunction(e.target.value);
      }, duration);
    };
  }

  const checkEmail = () => !email.match(VALIDATION.email) && email != "";
  const checkPass = () =>
    !password.match(VALIDATION.password) && password != "";

  async function submitForm() {
    if (valid !== true) return;
    const response = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, interests }),
    });
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    setValid(false);
    email.match(VALIDATION.email) &&
      password.match(VALIDATION.password) &&
      setValid(true);
  }, [email, password]);

  return (
    <Stack spacing={2}>
      <TextField
        required
        error={checkEmail()}
        id="outlined-email-required"
        helperText={
          checkEmail() && "Enter a valid email address such as John@aol.com"
        }
        label="Email address"
        type="email"
        inputProps={{
          size: "30",
          required: true,
        }}
        onChange={debounce(setEmail)}
      />
      <TextField
        id="outlined-password-input"
        required
        error={checkPass()}
        helperText={
          checkPass() &&
          "Please enter a password between 8 and 16 character with one letter and one number"
        }
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={debounce(setPassword)}
      />
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
      </FormGroup>

      <Button
        disabled={!valid}
        variant="contained"
        color="secondary"
        onClick={submitForm}
      >
        Login
      </Button>
    </Stack>
  );
}

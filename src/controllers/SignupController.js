import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import InterestsInput from "../components/InterestsInput";
import { VALIDATION } from "../tools/constants";

export default function SignupController() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [valid, setValid] = useState(false);
  const [interests, setInterests] = useState([]);

  function debounce(callFunction, duration = 600) {
    let timerId;
    return (e) => {
      clearInterval(timerId);
      timerId = setTimeout(() => {
        callFunction(e.target.value);
      }, duration);
    };
  }

  const checkName = () => !name.match(VALIDATION.name) && name != "";
  const checkEmail = () => !email.match(VALIDATION.email) && email != "";
  const checkPass = () =>
    !password.match(VALIDATION.password) && password != "";
  const checkConfirm = () => password !== confirmPass && password != "";

  useEffect(() => {
    setValid(false);
    name.match(VALIDATION.name) &&
      email.match(VALIDATION.email) &&
      password.match(VALIDATION.password) &&
      password === confirmPass &&
      setValid(true);
  }, [name, email, password, confirmPass]);

  async function submitForm() {
    if (valid !== true) return;
    const response = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, interests }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <Stack spacing={2}>
        <InterestsInput
          placeholder="Add a few interests"
          setValues={setInterests}
          values={interests}
        />
        <TextField
          required
          error={checkName()}
          helperText={checkName() && "Enter a valid name such as John"}
          id="outlined-required"
          label="Name"
          onChange={debounce(setName)}
        />
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
        <TextField
          id="outlined-password-input"
          required
          error={checkConfirm()}
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          onChange={debounce(setConfirmPass)}
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
          Sign up!
        </Button>
      </Stack>
    </>
  );
}

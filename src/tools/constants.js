export const COLORS = {
  primary: "#27efff",
  primaryDark: "#1BA7B2",
  primaryLight: "#52F2FF",
  secondary: "#fff1c7",
  secondaryDark: "#B2A88B",
  secondaryLight: "#FFF3D2",
  error: "#f44336",
  errorLight: "#E57373",
  errorDark: "#d32f2f",
  warning: "#ff9800",
  warningLight: "#ffb74d",
  warningDark: "#f57c00",
};

export const ANIMATIONS = {
  swipeDuration: 0.5,
};

export const VALIDATION = {
  name: /^[a-zA-Z'-]+$/,
  email: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
};

export const LOGGED_IN_USER = "62b6b5ac6397ae593e2fff12";

export const INTERESTS = [
  "PING PONG",
  "VIDEO GAMES",
  "HACKING",
  "TENNIS",
  "SWIMMING",
  "TRAVEL",
  "ADVENTURE",
  "COOKING",
  "DRAWING",
  "SINGING",
  "PROGRAMMING",
];

export const PEER_IDS = {
  id1: "97223302-7d7d-4528-b6ad-5329f3e28836",
  id2: "b2d6f0b2-bdf5-4886-9332-5067c8458ad6",
};

export const CALL_STATES = {
  OUTGOING: 0,
  INCOMING: 1,
  ONCALL: 2,
};

export const GET_ERROR_PATH = (yourJoin) => `/error/${yourJoin}`;

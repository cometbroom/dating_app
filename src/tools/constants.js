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
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
};

export const LOGGED_IN_USER = "62b17e42e8d61e12618a5626";

export const INTERESTS = [
  "Ping Pong",
  "Video Games",
  "Hacking",
]

export const GET_ERROR_PATH = (yourJoin) => `/error/${yourJoin}`;

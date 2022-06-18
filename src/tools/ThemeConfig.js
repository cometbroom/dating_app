import { createTheme } from "@mui/material";

export default function configurateTheme() {
  const theme = createTheme({
    palette: {
      type: "dark",
      mode: "dark",
      primary: {
        main: "#27efff",
      },
      secondary: {
        main: "#fff1c7",
      },
    },
    typography: {
      fontFamily: 'Love Ya Like A Sister, Comfortaa, cursive, "Roboto"',
      fontSize: 18,
      fontWeightLight: 300,
      htmlFontSize: 16,
    },
    overrides: {
      MuiButton: {
        root: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 30px",
        },
      },
    },
  });

  return theme;
}

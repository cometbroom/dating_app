import { SvgIcon, Typography } from "@mui/material";

const LOGO_TITLE = "Submarine";

export default function LogoIcon() {
  return (
    <>
      <SvgIcon>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 11v6h2l1 -1.5l3 1.5h10a3 3 0 0 0 0 -6h-10h0l-3 1.5l-1 -1.5h-2z"></path>
        <path d="M17 11l-1 -3h-5l-1 3"></path>
        <path d="M13 8v-2a1 1 0 0 1 1 -1h1"></path>
      </SvgIcon>
      <Typography variant="h6" component="div" ml={1}>
        {LOGO_TITLE}
      </Typography>
    </>
  );
}

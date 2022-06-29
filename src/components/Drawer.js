import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import LogoIcon from "./LogoIcon";

export default function DrawerSide({ drawerToggle, navItems }) {
  return (
    <Box onClick={drawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        <LogoIcon></LogoIcon>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link href={`/${item.toLowerCase()}`}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

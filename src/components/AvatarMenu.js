import { Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";
import BadgedAvatar from "./BadgedAvatar";

export default function AvatarMenu({ biggerScreens, img, title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          gap: "5px",
          overflow: "hidden",
        }}
      >
        <span onClick={handleClick}>
          <BadgedAvatar dot="dot" src={img} alt={`${title}'s avatar photo`} />
        </span>
        {biggerScreens && (
          <>
            <Typography variant="caption">Logged in as </Typography>
            <Typography variant="caption">{title}</Typography>
          </>
        )}
      </Toolbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            signOut({ callbackUrl: "/signup/" });
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

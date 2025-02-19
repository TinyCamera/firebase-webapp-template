import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar, Box, Menu, MenuItem } from "@mui/material";
import { RootState } from "../../../store/store";
import { signInRequest, signOutRequest } from "../store/authSlice";

export const AuthButton: React.FC = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    dispatch(signInRequest());
  };

  const handleSignOut = () => {
    dispatch(signOutRequest());
    handleClose();
  };

  if (loading) {
    return <Button disabled>Loading...</Button>;
  }

  if (!user) {
    return (
      <Button variant="contained" color="primary" onClick={handleSignIn}>
        Sign In with Google
      </Button>
    );
  }

  return (
    <Box>
      <Avatar
        onClick={handleClick}
        alt={user.displayName || "User"}
        src={user.photoURL || undefined}
        sx={{ cursor: "pointer" }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

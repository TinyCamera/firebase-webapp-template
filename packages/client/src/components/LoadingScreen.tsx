import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const LoadingScreen: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <CircularProgress size={60} />
    </Box>
  );
};

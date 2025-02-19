import React from "react";
import { Typography, Paper, Box } from "@mui/material";

export const ProfilePage: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">
          Your profile information will be displayed here.
        </Typography>
      </Box>
    </Paper>
  );
};

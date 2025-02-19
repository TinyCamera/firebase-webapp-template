import React from "react";
import { Button, Stack, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useDispatch } from "react-redux";
import { googleSignInRequest, githubSignInRequest } from "../store/authSlice";

export const SocialAuthButtons: React.FC = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(googleSignInRequest());
  };

  const handleGitHubSignIn = () => {
    dispatch(githubSignInRequest());
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          fullWidth
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={handleGitHubSignIn}
          fullWidth
        >
          Continue with GitHub
        </Button>
      </Stack>
      <Divider sx={{ width: "100%", mb: 2 }}>
        <Typography color="textSecondary" variant="body2">
          OR
        </Typography>
      </Divider>
    </>
  );
};

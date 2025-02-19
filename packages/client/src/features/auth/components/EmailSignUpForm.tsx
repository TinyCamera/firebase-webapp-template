import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { emailSignUpRequest } from "../store/authSlice";
import { RootState } from "../../../store/store";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Link,
  Typography,
  FormHelperText,
} from "@mui/material";

interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export const EmailSignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const password = watch("password");

  const onSubmit = (data: SignUpFormInputs) => {
    const { confirmPassword, ...signUpData } = data;
    dispatch(emailSignUpRequest(signUpData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Stack spacing={2}>
        <TextField
          {...register("displayName", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          label="Full Name"
          error={!!errors.displayName}
          helperText={errors.displayName?.message}
          fullWidth
        />

        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message:
                "Password must contain at least one letter and one number",
            },
          })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <TextField
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          label="Confirm Password"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
        />

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          Sign Up
        </Button>

        <Link
          component={RouterLink}
          to="/login"
          variant="body2"
          align="center"
          underline="hover"
          sx={{ mt: 1 }}
        >
          Already have an account? Sign in
        </Link>
      </Stack>
      {error && (
        <FormHelperText error sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </FormHelperText>
      )}
    </form>
  );
};

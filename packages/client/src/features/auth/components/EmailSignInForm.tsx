import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInRequest } from "../store/authSlice";
import { RootState } from "../../../store/store";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Stack, Link, FormHelperText } from "@mui/material";

interface SignInFormInputs {
  email: string;
  password: string;
}

export const EmailSignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>();

  const onSubmit = (data: SignInFormInputs) => {
    dispatch(emailSignInRequest(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Stack spacing={2}>
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
          })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          Sign In
        </Button>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            underline="hover"
          >
            Forgot password?
          </Link>
          <Link
            component={RouterLink}
            to="/signup"
            variant="body2"
            underline="hover"
          >
            Don't have an account? Sign up
          </Link>
        </Stack>
        {error && (
          <FormHelperText error sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </FormHelperText>
        )}
      </Stack>
    </form>
  );
};

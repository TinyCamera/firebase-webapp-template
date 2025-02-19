import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { passwordResetRequest } from "../../features/auth/store/authSlice";
import { RootState } from "../../store/store";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Link, Stack, FormHelperText } from "@mui/material";
import { AuthLayout } from "../../features/auth/components/AuthLayout";

interface ForgotPasswordInputs {
  email: string;
}

export const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ForgotPasswordInputs>();

  const onSubmit = (data: ForgotPasswordInputs) => {
    dispatch(passwordResetRequest(data.email));
  };

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={3}>
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
            helperText={
              errors.email?.message ||
              "Enter your email address and we'll send you a link to reset your password"
            }
            disabled={isSubmitSuccessful}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || isSubmitSuccessful}
            fullWidth
          >
            {isSubmitSuccessful
              ? "Reset link sent!"
              : "Send password reset link"}
          </Button>

          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            align="center"
            underline="hover"
          >
            Back to Sign In
          </Link>
        </Stack>
        {error && (
          <FormHelperText error sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </FormHelperText>
        )}
      </form>
    </AuthLayout>
  );
};

import React from "react";
import { AuthLayout } from "../../features/auth/components/AuthLayout";
import { SocialAuthButtons } from "../../features/auth/components/SocialAuthButtons";
import { EmailSignUpForm } from "../../features/auth/components/EmailSignUpForm";

export const SignupPage: React.FC = () => {
  return (
    <AuthLayout title="Create Account">
      <SocialAuthButtons />
      <EmailSignUpForm />
    </AuthLayout>
  );
};

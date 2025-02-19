import React from "react";
import { AuthLayout } from "../../features/auth/components/AuthLayout";
import { SocialAuthButtons } from "../../features/auth/components/SocialAuthButtons";
import { EmailSignInForm } from "../../features/auth/components/EmailSignInForm";

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout title="Sign In">
      <SocialAuthButtons />
      <EmailSignInForm />
    </AuthLayout>
  );
};

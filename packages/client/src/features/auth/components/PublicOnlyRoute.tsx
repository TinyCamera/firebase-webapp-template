import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({
  children,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

import React from "react";

import { useAuth } from "../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

const Routes: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      {user.id ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
};

export default Routes;

import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home/Home";

const Stack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;

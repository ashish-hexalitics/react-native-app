import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./Drawer";
import AuthNavigator from "./AuthNavigator";
import AuthContext from "../context/AuthContext";

export default function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { isAuthenticated } = authContext;

  return (
    <NavigationContainer independent={true}>
      {isAuthenticated ? <MyDrawer /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack"; // Import the Stack Navigator
import Header from "../components/Header";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />, 
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;

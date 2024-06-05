import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import JobDetail from "../components/JobDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="JobDetail" component={JobDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;

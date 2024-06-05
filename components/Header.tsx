import React, { useContext } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { AppBar, Badge, IconButton } from "@react-native-material/core";
import { Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";

const Header = ({ navigation }: any) => {
  const { user, logout } = useContext<any>(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  return (
    <AppBar
      title="My App"
      leading={(props) => (
        <IconButton
          icon={(props) => <Feather name="menu" size={24} color="white" />}
          onPress={() => navigation.toggleDrawer()}
          {...props}
        />
      )}
      trailing={(props) => (
        <View style={styles.trailingContainer}>
          {user && (
            <>
              <Badge label={4} style={styles.badge} />
              <EvilIcons name="user" size={40} color="white" />
              <IconButton
                icon={(props) => (
                  <FontAwesome name="sign-out" color="white" size={25} />
                )}
                onPress={handleLogout}
                {...props}
              />
            </>
          )}
        </View>
      )}
      style={styles.appBar}
    />
  );
};

export default Header;

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  trailingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    marginRight: 8,
    marginTop: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

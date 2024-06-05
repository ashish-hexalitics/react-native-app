import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Pressable } from "@react-native-material/core";
import AuthContext from "../context/AuthContext";

function Login({ navigation }: any) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Handle the case where context is not available
    return null;
  }

  const { login } = authContext;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = form;
    if (email && password) {
      try {
        const response = await fetch(
          "https://www.api.qapreneur.in/api/v5/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
        const result = await response.json();

        if (response.ok) {
          Alert.alert("Login Successful", `Welcome, ${result.data.user.name}`);
          await login(result.data.user);
          // Reset navigation stack and navigate to the Home screen
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          Alert.alert("Error", result.message || "Something went wrong");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } else {
      Alert.alert("Error", "Please enter both email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h4" style={styles.header}>
        Login
      </Text>
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={(value) => handleInputChange("email", value)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={form.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Register</Text>
      </Pressable>
      {/* <Pressable onPress={() => navigation.navigate("Home")}>
        <Text style={styles.link}>Skip</Text>
      </Pressable> */}
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 24,
    textAlign: "center",
    marginTop:50
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    padding: 10,
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
  },
});

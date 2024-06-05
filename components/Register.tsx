import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Pressable,
} from "@react-native-material/core";
import { setItem, clear } from "../utils/AsyncStorage";
import AuthContext from "../context/AuthContext";

function Register({ navigation }: any) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Handle the case where context is not available
    return null;
  }

  const { login } = authContext;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleRegister = async () => {
    const {
      firstName,
      lastName,
      fullName,
      contactNumber,
      email,
      password,
      confirmPassword,
    } = form;
    if (
      firstName &&
      lastName &&
      fullName &&
      contactNumber &&
      email &&
      password &&
      password === confirmPassword
    ) {
      const response = await fetch(
        "https://www.api.qapreneur.in/api/v5/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: contactNumber,
            roleId: "65dc3bf712b9076791cb2798",
            password,
            name: fullName,
            passwordConfirm: confirmPassword,
            contactNumber: contactNumber,
            extra: {
              contactNumber: contactNumber,
            },
          }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        Alert.alert("Register Successful", `Email: ${email}`);
        await login(result.data.user);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        // Handle error response
        Alert.alert("Error", result.message || "Something went wrong");
      }
    } else {
      Alert.alert("Error", "Please enter all fields correctly");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h4" style={styles.header}>
        Register
      </Text>
      <TextInput
        label="First Name"
        value={form.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
        style={styles.input}
      />
      <TextInput
        label="Last Name"
        value={form.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
        style={styles.input}
      />
      <TextInput
        label="Full Name"
        value={form.fullName}
        onChangeText={(value) => handleInputChange("fullName", value)}
        style={styles.input}
      />
      <TextInput
        label="Contact Number"
        value={form.contactNumber}
        onChangeText={(value) => handleInputChange("contactNumber", value)}
        style={styles.input}
      />
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
      <TextInput
        label="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(value) => handleInputChange("confirmPassword", value)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} style={styles.button} />
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Already have an account?. Login</Text>
      </Pressable>
      {/* <Pressable
        onPress={() => Alert.alert("Skipped Registration")}
        style={styles.skip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable> */}
    </View>
  );
}

export default Register;

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
    alignItems: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  skip: {
    marginTop: 16,
    alignItems: "center",
  },
  skipText: {
    color: "gray",
  },
});

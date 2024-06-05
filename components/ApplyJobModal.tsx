import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";

const ApplyJobModal = ({ visible, onClose, jobId }: any) => {
  const [description, setDescription] = useState("");
  const { user } = useContext<any>(AuthContext);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Description cannot be empty");
      return;
    }

    try {
      const response = await fetch(`https://www.api.qapreneur.in/api/v5/jobs/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.activeToken}`, // Assuming the user's token is stored in user object
        },
        body: JSON.stringify({ jobId, description }),
      });

      if (response.ok) {
        Alert.alert("Success", "Job applied successfully");
        onClose(); // Close the modal and navigate back
      } else {
        const result = await response.json();
        Alert.alert("Error", result.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Apply for Job</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
            <EvilIcons name="arrow-right" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ApplyJobModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(98, 0, 238)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    marginRight: 8,
  },
  closeButton: {
    paddingVertical: 10,
  },
  closeButtonText: {
    color: "rgb(98, 0, 238)",
    fontSize: 18,
  },
});

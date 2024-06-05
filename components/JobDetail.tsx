import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import HTMLView from "react-native-htmlview";
import { useWindowDimensions } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import ApplyJobModal from "../components/ApplyJobModal";

function JobDetail({ route, navigation }: any) {
  const { job } = route.params;
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  const handleApplyNow = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("Home"); // Navigate back to Home after closing modal
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{job.jobTitle}</Text>
        <Text style={styles.company}>{job.companyDetail.name}</Text>
        <Text style={styles.location}>{job.location}</Text>
        <HTMLView value={job.description} stylesheet={htmlStyles} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyNow}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
          <EvilIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ApplyJobModal visible={modalVisible} onClose={handleCloseModal} jobId={job._id} />
    </>
  );
}

export default JobDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
  },
  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(98, 0, 238)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: 300,
  },
  applyButtonText: {
    color: "white",
    fontSize: 18,
    marginRight: 8,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
  },
  a: {
    fontSize: 16,
  },
});

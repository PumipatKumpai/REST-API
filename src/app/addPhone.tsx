import api from "@/utils/crud-api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

export default function AddPhone() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sect, setSect] = useState("");
  const [tel, setTel] = useState("");

  const addPhone = async () => {
    if (name.trim() === "" || sect === "" || tel.trim() === "") {
      Alert.alert(
        "Missing Information",
        "Please complete all required fields.",
      );
      return;
    }

    const phone = {
      id: uuidv4(),
      name: name.trim(),
      sect,
      tel: tel.trim(),
    };

    try {
      await api.post("phones", phone);

      setName("");
      setSect("");
      setTel("");

      router.replace("/");
    } catch (err) {
      console.log(err);

      Alert.alert("Error", "Unable to add student information.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.smallTitle}>NEW CONTACT</Text>
            <Text style={styles.title}>Add New Student</Text>

            <Text style={styles.subtitle}>
              Enter the student's contact information below.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student Name</Text>

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter student name"
                placeholderTextColor="#A8ABBD"
              />
            </View>

            {/* Section */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Section</Text>

              <RadioButton.Group
                value={sect}
                onValueChange={(value) => setSect(value)}
              >
                <View style={styles.sectionContainer}>
                  <TouchableOpacity
                    style={[
                      styles.sectionOption,
                      sect === "CED" && styles.sectionSelected,
                    ]}
                    onPress={() => setSect("CED")}
                  >
                    <RadioButton value="CED" color="#6366F1" />

                    <View>
                      <Text style={styles.sectionName}>CED</Text>
                      <Text style={styles.sectionDescription}>
                        Computer Education
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.sectionOption,
                      sect === "TCT" && styles.sectionSelected,
                    ]}
                    onPress={() => setSect("TCT")}
                  >
                    <RadioButton value="TCT" color="#6366F1" />

                    <View>
                      <Text style={styles.sectionName}>TCT</Text>
                      <Text style={styles.sectionDescription}>
                        Technology Program
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </RadioButton.Group>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>

              <TextInput
                style={styles.input}
                value={tel}
                onChangeText={setTel}
                placeholder="e.g. 0812345678"
                placeholderTextColor="#A8ABBD"
                keyboardType="phone-pad"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={addPhone} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Student</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F6FC",
  },

  scrollContent: {
    flexGrow: 1,
  },

  wrapper: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    padding: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  backButtonText: {
    fontSize: 34,
    lineHeight: 36,
    color: "#555B75",
  },

  header: {
    marginBottom: 28,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7D82A3",
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#292D43",
  },

  subtitle: {
    color: "#8589A3",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 28,
    borderRadius: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 3,
  },

  inputGroup: {
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#41465E",
    marginBottom: 10,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E4E6EF",
    borderRadius: 14,
    backgroundColor: "#F9FAFD",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#2E3246",
  },

  sectionContainer: {
    flexDirection: "row",
    gap: 12,
  },

  sectionOption: {
    flex: 1,
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E6EF",
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FAFBFD",
  },

  sectionSelected: {
    borderColor: "#6366F1",
    backgroundColor: "#F1F1FF",
  },

  sectionName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#35394F",
  },

  sectionDescription: {
    fontSize: 10,
    color: "#999DAF",
    marginTop: 2,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF0F6",
  },

  cancelText: {
    color: "#666B82",
    fontSize: 14,
    fontWeight: "700",
  },

  addButton: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6366F1",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

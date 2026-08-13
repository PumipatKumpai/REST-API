import api from "@/utils/crud-api";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Phone = {
  id: string;
  name: string;
  sect: string;
  tel: string;
};

type CardProps = {
  phone: Phone;
  refresh: () => void;
};

export default function Card({ phone, refresh }: CardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ================= DELETE =================

  const deletePhone = async () => {
    try {
      setDeleting(true);

      await api.delete("phones/" + phone.id);

      setShowDeleteModal(false);

      refresh();
    } catch (err) {
      console.log("Delete Error:", err);
    } finally {
      setDeleting(false);
    }
  };

  // ================= EDIT =================

  const editPhone = () => {
    router.push({
      pathname: "/editPhone",
      params: {
        id: phone.id,
        name: phone.name,
        sect: phone.sect,
        tel: phone.tel,
      },
    });
  };

  const isTCT = phone.sect === "TCT";

  return (
    <>
      {/* ================= STUDENT CARD ================= */}

      <View style={styles.card}>
        {/* Avatar */}
        <View
          style={[styles.avatar, isTCT ? styles.avatarTCT : styles.avatarCED]}
        >
          <Text style={styles.avatarText}>
            {phone.name ? phone.name.charAt(0).toUpperCase() : "S"}
          </Text>
        </View>

        {/* Information */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{phone.name}</Text>

            <View
              style={[
                styles.sectionBadge,
                isTCT ? styles.tctBadge : styles.cedBadge,
              ]}
            >
              <Text
                style={[
                  styles.sectionText,
                  isTCT ? styles.tctText : styles.cedText,
                ]}
              >
                {phone.sect}
              </Text>
            </View>
          </View>

          <View style={styles.phoneRow}>
            <Text style={styles.phoneIcon}>☎</Text>

            <Text style={styles.phone}>{phone.tel}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={editPhone}
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Text style={styles.editIcon}>✎</Text>

            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteIcon}>🗑</Text>

            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= DELETE MODAL ================= */}

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Delete Icon */}
            <View style={styles.modalIconContainer}>
              <Text style={styles.modalIcon}>🗑️</Text>
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>Delete Student?</Text>

            {/* Message */}
            <Text style={styles.modalMessage}>
              Are you sure you want to delete
            </Text>

            <Text style={styles.studentName}>{phone.name}</Text>

            <Text style={styles.warningText}>
              This action cannot be undone.
            </Text>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalDeleteButton,
                  deleting && styles.disabledButton,
                ]}
                onPress={deletePhone}
                disabled={deleting}
              >
                <Text style={styles.modalDeleteText}>
                  {deleting ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // ================= CARD =================

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#ECEEF5",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  // ================= AVATAR =================

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 17,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 14,
  },

  avatarTCT: {
    backgroundColor: "#ECE9FF",
  },

  avatarCED: {
    backgroundColor: "#E6F8F1",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#555B75",
  },

  // ================= INFORMATION =================

  infoContainer: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#34384F",
    marginRight: 8,
  },

  sectionBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },

  tctBadge: {
    backgroundColor: "#EEEAFE",
  },

  cedBadge: {
    backgroundColor: "#E8F8F2",
  },

  sectionText: {
    fontSize: 10,
    fontWeight: "800",
  },

  tctText: {
    color: "#7666E8",
  },

  cedText: {
    color: "#39A77C",
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  phoneIcon: {
    fontSize: 13,
    color: "#999DB1",
    marginRight: 6,
  },

  phone: {
    fontSize: 13,
    color: "#858A9F",
  },

  // ================= ACTIONS =================

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginLeft: 10,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EEF0FF",

    paddingHorizontal: 12,
    paddingVertical: 9,

    borderRadius: 12,
  },

  editIcon: {
    fontSize: 13,
    marginRight: 4,
    color: "#6366F1",
  },

  editText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6366F1",
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF0F2",

    paddingHorizontal: 12,
    paddingVertical: 9,

    borderRadius: 12,
  },

  deleteIcon: {
    fontSize: 12,
    marginRight: 4,
  },

  deleteText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#E45A6F",
  },

  // ================= MODAL =================

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(30, 32, 50, 0.55)",

    justifyContent: "center",
    alignItems: "center",

    padding: 20,
  },

  modalBox: {
    width: "100%",
    maxWidth: 420,

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    paddingHorizontal: 30,
    paddingVertical: 32,

    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 10,
  },

  modalIconContainer: {
    width: 75,
    height: 75,

    borderRadius: 25,

    backgroundColor: "#FFF0F2",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  modalIcon: {
    fontSize: 34,
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: "800",

    color: "#30344C",

    marginBottom: 10,

    textAlign: "center",
  },

  modalMessage: {
    fontSize: 14,
    color: "#85899F",
    textAlign: "center",
  },

  studentName: {
    fontSize: 17,
    fontWeight: "800",

    color: "#E45A6F",

    marginTop: 6,
    marginBottom: 8,

    textAlign: "center",
  },

  warningText: {
    fontSize: 12,

    color: "#A0A4B7",

    marginBottom: 25,

    textAlign: "center",
  },

  modalButtons: {
    width: "100%",

    flexDirection: "row",

    gap: 12,
  },

  modalCancelButton: {
    flex: 1,

    height: 50,

    backgroundColor: "#F0F1F6",

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  modalCancelText: {
    fontSize: 14,
    fontWeight: "700",

    color: "#686D83",
  },

  modalDeleteButton: {
    flex: 1,

    height: 50,

    backgroundColor: "#E85D72",

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#E85D72",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  modalDeleteText: {
    fontSize: 14,
    fontWeight: "800",

    color: "#FFFFFF",
  },

  disabledButton: {
    opacity: 0.6,
  },
});

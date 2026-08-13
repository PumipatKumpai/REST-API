import Card from "@/components/card";
import api from "@/utils/crud-api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Phone = {
  id: string;
  name: string;
  sect: string;
  tel: string;
};

export default function Index() {
  const [data, setData] = useState<Phone[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get("phones");
      setData(response.data);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  // Search + Filter
  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.tel.toLowerCase().includes(keyword);

    const matchSection = filter === "ALL" || item.sect === filter;

    return matchSearch && matchSection;
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {/* ================= HEADER ================= */}

        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            <View style={styles.welcomeBadge}>
              <Text style={styles.welcomeBadgeText}>✨ STUDENT DIRECTORY</Text>
            </View>

            <Text style={styles.heroTitle}>Student Phones</Text>

            <Text style={styles.heroSubtitle}>
              Manage your student contacts easily.
            </Text>
          </View>

          <View style={styles.studentCount}>
            <Text style={styles.countIcon}>👥</Text>

            <Text style={styles.countNumber}>{data.length}</Text>

            <Text style={styles.countText}>Students</Text>
          </View>

          {/* Decoration */}
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />
        </View>

        {/* ================= ADD BUTTON ================= */}

        <Pressable
          onPress={() => router.push("/addPhone")}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <View style={styles.addIconBox}>
            <Text style={styles.addIcon}>＋</Text>
          </View>

          <View style={styles.addTextContainer}>
            <Text style={styles.addTitle}>Add New Student</Text>

            <Text style={styles.addSubtitle}>Create a new student contact</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* ================= SEARCH ================= */}

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search name or phone number..."
            placeholderTextColor="#9EA3B8"
          />

          {search !== "" && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ================= FILTER ================= */}

        <View style={styles.filterContainer}>
          {/* ALL */}
          <TouchableOpacity
            onPress={() => setFilter("ALL")}
            style={[
              styles.filterButton,
              filter === "ALL" && styles.filterAllActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === "ALL" && styles.filterActiveText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {/* TCT */}
          <TouchableOpacity
            onPress={() => setFilter("TCT")}
            style={[
              styles.filterButton,
              styles.tctButton,
              filter === "TCT" && styles.filterTctActive,
            ]}
          >
            <View style={styles.tctDot} />

            <Text
              style={[
                styles.filterText,
                filter === "TCT" && styles.filterActiveText,
              ]}
            >
              TCT
            </Text>
          </TouchableOpacity>

          {/* CED */}
          <TouchableOpacity
            onPress={() => setFilter("CED")}
            style={[
              styles.filterButton,
              styles.cedButton,
              filter === "CED" && styles.filterCedActive,
            ]}
          >
            <View style={styles.cedDot} />

            <Text
              style={[
                styles.filterText,
                filter === "CED" && styles.filterActiveText,
              ]}
            >
              CED
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= LIST HEADER ================= */}

        <View style={styles.listHeader}>
          <View>
            <Text style={styles.listTitle}>Student List</Text>

            <Text style={styles.listSubtitle}>Your saved student contacts</Text>
          </View>

          <View style={styles.resultBadge}>
            <Text style={styles.resultText}>
              {filteredData.length} contacts
            </Text>
          </View>
        </View>

        {/* ================= LIST ================= */}

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            return <Card phone={item} refresh={getData} />;
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconBox}>
                <Text style={styles.emptyIcon}>🔎</Text>
              </View>

              <Text style={styles.emptyTitle}>No students found</Text>

              <Text style={styles.emptySubtitle}>
                Try another name, phone number or section.
              </Text>

              {(search !== "" || filter !== "ALL") && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={() => {
                    setSearch("");
                    setFilter("ALL");
                  }}
                >
                  <Text style={styles.resetText}>Reset Search</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ================= PAGE =================

  screen: {
    flex: 1,
    backgroundColor: "#F7F8FD",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 25,
  },

  // ================= HERO =================

  hero: {
    backgroundColor: "#E9E9FF",
    borderRadius: 28,
    padding: 25,
    marginBottom: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    overflow: "hidden",

    shadowColor: "#6965D8",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 3,
  },

  heroLeft: {
    flex: 1,
    zIndex: 2,
  },

  welcomeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },

  welcomeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#6C63E8",
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#292D46",
  },

  heroSubtitle: {
    fontSize: 13,
    color: "#747997",
    marginTop: 7,
  },

  studentCount: {
    width: 100,
    height: 100,
    borderRadius: 25,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 2,

    shadowColor: "#6965D8",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },

  countIcon: {
    fontSize: 20,
    marginBottom: 2,
  },

  countNumber: {
    fontSize: 25,
    fontWeight: "800",
    color: "#6366F1",
  },

  countText: {
    fontSize: 10,
    color: "#8A8EA5",
    marginTop: 1,
  },

  circleOne: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: "#D5D4FF",
    right: -50,
    top: -60,
  },

  circleTwo: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#FFE5EE",
    right: 120,
    bottom: -45,
  },

  // ================= ADD BUTTON =================

  addButton: {
    backgroundColor: "#6366F1",

    paddingVertical: 15,
    paddingHorizontal: 17,

    borderRadius: 20,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 18,

    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.18,
    shadowRadius: 13,
    elevation: 4,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  addIconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,

    backgroundColor: "rgba(255,255,255,0.18)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,
  },

  addIcon: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "300",
  },

  addTextContainer: {
    flex: 1,
  },

  addTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  addSubtitle: {
    color: "#DDDEFF",
    fontSize: 11,
    marginTop: 3,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "300",
  },

  // ================= SEARCH =================

  searchContainer: {
    height: 54,

    backgroundColor: "#FFFFFF",

    borderRadius: 17,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#ECEEF5",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },

  searchIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#30344C",
  },

  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#F0F1F6",
    justifyContent: "center",
    alignItems: "center",
  },

  clearText: {
    color: "#888DA5",
    fontSize: 11,
    fontWeight: "700",
  },

  // ================= FILTER =================

  filterContainer: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 25,
    gap: 9,
  },

  filterButton: {
    minWidth: 72,

    paddingVertical: 9,
    paddingHorizontal: 17,

    borderRadius: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E7E9F2",
  },

  filterAllActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },

  tctButton: {
    backgroundColor: "#F3F1FF",
  },

  cedButton: {
    backgroundColor: "#ECFAF5",
  },

  filterTctActive: {
    backgroundColor: "#8B7CF6",
    borderColor: "#8B7CF6",
  },

  filterCedActive: {
    backgroundColor: "#4DBA91",
    borderColor: "#4DBA91",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#656A83",
  },

  filterActiveText: {
    color: "#FFFFFF",
  },

  tctDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#8B7CF6",
    marginRight: 6,
  },

  cedDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#4DBA91",
    marginRight: 6,
  },

  // ================= LIST TITLE =================

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,
  },

  listTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#30344C",
  },

  listSubtitle: {
    fontSize: 11,
    color: "#979BAF",
    marginTop: 3,
  },

  resultBadge: {
    backgroundColor: "#FFF0F5",

    paddingVertical: 7,
    paddingHorizontal: 12,

    borderRadius: 18,
  },

  resultText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#E56791",
  },

  // ================= LIST =================

  listContent: {
    paddingBottom: 40,
  },

  // ================= EMPTY =================

  emptyContainer: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    alignItems: "center",

    paddingVertical: 40,
    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: "#ECEEF5",
  },

  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,

    backgroundColor: "#F2F1FF",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 13,
  },

  emptyIcon: {
    fontSize: 25,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#3C4058",
  },

  emptySubtitle: {
    fontSize: 12,
    color: "#969AAF",
    textAlign: "center",
    marginTop: 5,
  },

  resetButton: {
    marginTop: 16,

    paddingHorizontal: 17,
    paddingVertical: 9,

    borderRadius: 15,

    backgroundColor: "#ECECFF",
  },

  resetText: {
    fontSize: 12,
    color: "#6366F1",
    fontWeight: "700",
  },
});

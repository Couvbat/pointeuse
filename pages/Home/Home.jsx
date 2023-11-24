import { StatusBar } from "expo-status-bar";
import { useState, React } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome as FAIcons,
} from "@expo/vector-icons";
import { useQuery } from "react-query";
import { TimerTab } from "../components/TimerTab";
import { getLastTimestamp } from "../../utils/Api";

let Home = ({ navigation }) => {
  const { refetch, isLoading } = useQuery("LastTimestamp", () =>
    getLastTimestamp(),
    {
      onSettled: (data) => {
        handleStart(data);
        },
    }
  );

  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = (lastTimestamp) => {
    setStartTime(0);
    setStartTime(
      new Date().getTime() -
        new Date(
          lastTimestamp.date.split("/")[2],
          lastTimestamp.date.split("/")[1] - 1,
          lastTimestamp.date.split("/")[0],
          lastTimestamp.time.split(":")[0],
          lastTimestamp.time.split(":")[1],
          lastTimestamp.time.split(":")[2]
        ).getTime()
    );
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setStartTime(0);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => {
          handleStop();
          refetch();

        }} />
      }
    >
      <TimerTab
        startTime={startTime}
        isRunning={isRunning}
      />

      {/* Row 1 */}
      <View style={styles.row}>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Timestamps");
          }}
        >
          <MaterialCommunityIcons
            name="baby-bottle-outline"
            size={48}
            color={"white"}
          />
          <Text style={styles.text}>Timestamps</Text>
        </Pressable>

        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Couches");
          }}
        >
          <MaterialCommunityIcons
            name="human-baby-changing-table"
            size={48}
            color={"white"}
          />
          <Text style={styles.text}>Couches</Text>
        </Pressable>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Pots");
          }}
        >
          <MaterialCommunityIcons name="pot-mix" size={48} color={"white"} />
          <Text style={styles.text}>Pots</Text>
        </Pressable>

        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Bains");
          }}
        >
          <FAIcons name="bathtub" size={48} color={"white"} />
          <Text style={styles.text}>Bains</Text>
        </Pressable>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <Pressable style={styles.box}>
          <Text style={styles.text}>5</Text>
        </Pressable>

        <Pressable style={styles.box}>
          <Text style={styles.text}>6</Text>
        </Pressable>
      </View>

      {/* Row 4 */}
      <View style={styles.row}>
        <Pressable style={styles.box}>
          <Text style={styles.text}>7</Text>
        </Pressable>

        <Pressable style={styles.box}>
          <Text style={styles.text}>8</Text>
        </Pressable>
      </View>

      {/* Row 5 */}
      <View style={styles.row}>
        <Pressable style={styles.box}>
          <Text style={styles.text}>9</Text>
        </Pressable>

        <Pressable style={styles.box}>
          <Text style={styles.text}>10</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495867",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  box: {
    flex: 1,
    height: 128,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8899AA",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    // shadow
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default Home;

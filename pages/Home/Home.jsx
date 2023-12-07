import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "react-query";
import TimerTab from "../components/TimerTab";
import StopButton from "../components/StopButton";
import { getLastTimestamp } from "../../utils/Api";
import Icons from '@expo/vector-icons/FontAwesome5';

let Home = ({ navigation }) => {

  const [lastTimestamp, setLastTimestamp] = useState();
  const [isRunning, setIsRunning] = useState(false);

  const { refetch, isFetching } = useQuery('LastTimestamp', getLastTimestamp, {
    onSettled: (data) => {
      console.log('Query settled with data:', data); // Add this for debugging
      if (data) {
        setLastTimestamp(data);
        if (data.isActive == 1) {
          setIsRunning(true);
        }
      }
    },
  });


  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={() => {
          refetch();
        }} />
      }
    >
      {/* Timer Tab */}
      {isRunning &&
        <TimerTab lastTimestamp={lastTimestamp} />
      }

      {/* Row 1 */}
      <View style={styles.row}>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Timestamps");
          }}
        >
          <Icons
            name="clock"
            size={48}
            color={"white"}
          />
          <Text style={styles.text}>Timestamps</Text>
        </Pressable>

        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Calendar");
          }}
        >
          <Icons name="calendar-alt" size={48} color={"white"} />
          <Text style={styles.text}>Calendrier</Text>
        </Pressable>
      </View>

      {/* Stop Button */}
      {isRunning &&
        <StopButton lastTimestamp={lastTimestamp} setIsRunning={setIsRunning} />
      }

      <StatusBar style="auto" />

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323264",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  stop: {
    fontSize: 64,
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
    backgroundColor: "#46468C",
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
  stopButton: {
    flex: 1,
    flexDirection: "column-reverse",
    height: 128,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B30000",
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
    fontSize: 48,
  },
});

export default Home;

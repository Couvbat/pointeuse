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
import { useQuery, useMutation, useQueryClient } from "react-query";
import { TimerTab } from "../components/TimerTab";
import {
  formatDateTime,
  formatDate,
  formatTime,
  convertDateFormat,
} from "../../utils/dateFormating";
import { getLastTimestamp, updateTimestamp } from "../../utils/Api";
import Icons from "react-native-vector-icons/FontAwesome5"

let Home = ({ navigation }) => {
  const { refetch, isLoading } = useQuery("LastTimestamp", () =>
    getLastTimestamp(),
    {
      onSettled: (data) => {
        if (data){
          setLastTimestamp(data);
          handleStart(data);
        }
      },
    }
  );

  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState();

  const handleStart = (lastTimestamp) => {
    if (lastTimestamp.isActive == 1) {
      setStartTime(0);
      const formattedDate = convertDateFormat(lastTimestamp.created_at);
      const dateParts = formattedDate.split(' ')[0].split('/');
      const timeParts = formattedDate.split(' ')[1].split(':');
      const timestampDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2]),
        parseInt(timeParts[0]),
        parseInt(timeParts[1]),
        parseInt(timeParts[2])
      );
      setStartTime(new Date().getTime() - timestampDate.getTime());
      setIsRunning(true);
    }
  };

  const handleStopTimestamp = (lastTimestamp) => {
    const newTimestamp = {
      isActive: false,
    };
    updateTimestamp(lastTimestamp.id, newTimestamp);
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

      {isRunning && <TimerTab startTime={startTime} isRunning={isRunning} />}

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
            navigation.navigate("Days");
          }}
        >
          <Icons
            name="calendar-day"
            size={48}
            color={"white"}
          />
          <Text style={styles.text}>Journées</Text>
        </Pressable>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Months");
          }}
        >
          <Icons name="calendar-alt" size={48} color={"white"} />
          <Text style={styles.text}>Mois</Text>
        </Pressable>

        <Pressable style={styles.box}>
          <Text style={styles.text}>4</Text>
        </Pressable>
      </View>

      {/* Stop Button */}
      {isRunning &&
          <Pressable
            style={styles.stopButton}
            onPress={() => {
              handleStopTimestamp(lastTimestamp);
              handleStop();
            }}>
            <Text style={styles.stop}>Stop</Text>
          </Pressable>
      }


      <StatusBar style="auto" />

    </ScrollView >
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

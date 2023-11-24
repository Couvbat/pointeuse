import { StyleSheet, Text, View } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";

export function TimerTab({ startTime, isRunning }) {
  return (
    <>
      <View style={styles.wrapper}>
        {!isRunning && (<Text style={styles.loading}>Chargement...</Text>)}

        {isRunning && (
          <>
            <Text style={styles.text}>Dernier Timestamp créé il y a : </Text>
            <Stopwatch
              options={styles.stopwatch}
              laps
              start={isRunning}
              startTime={startTime}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 64,
    justifyContent: "center",
    backgroundColor: "#8899AA",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
  },
  loading: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical:"auto",
  },
  stopwatch: {
    text: {
      fontSize: 20,
      alignSelf: "center",
      color: "white",
    },
  },
});

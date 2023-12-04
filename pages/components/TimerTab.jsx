import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStopwatch } from 'react-timer-hook';

const padTime = (time) => String(time).padStart(2, '0');

export function TimerTab({ elapsedTime, isRunning }) {
  const {
    seconds,
    minutes,
    hours,
    start,
    reset,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (isRunning) {
      // Only reset if elapsedTime changes
      // Note: Add a check to ensure elapsedTime is not null
      if (elapsedTime) {
        reset(elapsedTime ? elapsedTime / 1000 : 0, elapsedTime !== undefined);
        start();
      }
    } else {
      reset();
    }
    // Remove lastTimestamp from the dependency array if not used
  }, [isRunning, elapsedTime, reset, start]);

  return (
    <View style={styles.wrapper}>
      {isRunning ? (
        <Text style={styles.text}>
          Dernier Timestamp créé il y a : {padTime(hours)}:{padTime(minutes)}:{padTime(seconds)}
        </Text>
      ) : (
        <Text style={styles.loading}>Chargement...</Text>
      )}
    </View>
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

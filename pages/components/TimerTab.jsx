import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStopwatch } from 'react-timer-hook';
import { getLastTimestamp } from '../../utils/Api';

export function TimerTab({ elapsedTime, isRunning }) {
  const {
    seconds,
    minutes,
    hours,
    start,
    reset,
  } = useStopwatch({ autoStart: false });


  return (
    <View style={styles.wrapper}>
      {isActive ? (
        <Text style={styles.text}>
          Dernier Timestamp créé il y a : }
        </Text>
      ) : (
        <Text style={styles.loading}>Il n'y a aucun timestamp actif.</Text>
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

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useStopwatch } from 'react-timer-hook';

const TimerTab = ({ lastTimestamp }) => {
  // If the last timestamp is not active, don't display the timer
  if (!lastTimestamp || lastTimestamp.isActive == '0' || lastTimestamp.type == undefined) {
    return null;
  }

    // Calculate the elapsed time in seconds between now and the created_at timestamp
    const elapsedTime = new Date() - new Date(lastTimestamp.created_at);

    // Initialize the stopwatch using an offset
    const { seconds, minutes, hours } = useStopwatch({
      offsetTimestamp: new Date(new Date().getTime() + elapsedTime),
      autoStart: true
    });

  return (
    <View style={styles.box}>
      <View style={styles.container}>
        <Text style={styles.text}>Timestamp ({lastTimestamp.type}) actif depuis :</Text>
        <Text style={styles.time}>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  time: {
    fontSize: 36,
    color: 'white'
  },
  box: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5555AA",
  }
});

export default TimerTab;
import { StyleSheet, Text, View } from 'react-native';
import { useStopwatch } from 'react-timer-hook';

const TimerTab = ({ lastTimestamp }) => {

  const elapsedTime = Math.floor((new Date().getTime() - new Date(lastTimestamp.created_at).getTime()) / 1000);
  console.log(elapsedTime)

  function Stopwatch() {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ offsetTimestamp: new Date().setSeconds(new Date().getSeconds() + elapsedTime), autoStart: true });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Timestamp ({lastTimestamp.type}) actif depuis :</Text>
        <Text style={styles.time}>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <Stopwatch />
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
    backgroundColor: "#8899AA",
  }
});

export default TimerTab;
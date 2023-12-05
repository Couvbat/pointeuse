import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLastTimestamp } from '../../utils/Api';
import { useQuery } from 'react-query';

const calculateElapsedTime = (timestamp) => {
  const now = new Date();
  const timestampMoment = new Date(timestamp);
  return (now - timestampMoment).toLocaleString('fr', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
}

const TimerTab = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const { refetch } = useQuery('LastTimestamp', getLastTimestamp, {
    onSettled: (data) => {
      console.log('Query settled with data:', data); // Add this for debugging
      if (data) {
        setElapsedTime(calculateElapsedTime(data));
      }
    },
  });

  useEffect(() => {
    refetch();
    const interval = setInterval(refetch, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{elapsedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimerTab;
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{elapsedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimerTab;
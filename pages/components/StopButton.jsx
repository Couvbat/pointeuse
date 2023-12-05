import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { getLastTimestamp, updateTimestamp } from "../../utils/Api";
import { useMutation, useQuery, useQueryClient } from "react-query";

const StopButton = ({ lastTimestamp }) => {
  if (lastTimestamp === null || lastTimestamp === undefined || lastTimestamp.isActive == 0) {
    return null;
  }

  const [isRunning, setIsRunning] = useState(true);

  const handleStop = () => {
    updateTimestamp(lastTimestamp.id, { isActive: false });
    setIsRunning(false);
    console.log('stop')
  };

  return (
    <View style={styles.container}>
      {isRunning ? (
        <Pressable style={styles.buttonStop} onPress={handleStop}>
          <Text style={styles.text}>Stop</Text>
        </Pressable>
      ) : null}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStop: {
    backgroundColor: "#FF0000",
    width: 300,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});

export default StopButton;
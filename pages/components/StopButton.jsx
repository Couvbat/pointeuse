import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { updateTimestamp } from "../../utils/Api";
import { useMutation, useQueryClient } from "react-query";

const StopButton = ({ lastTimestamp, setIsRunning }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => updateTimestamp(lastTimestamp.id, { isActive: '0' }), {
    onSuccess: () => {
      // Invalidate and refetch queries after the mutation succeeds
      queryClient.invalidateQueries('LastTimestamp');
      queryClient.invalidateQueries('Timestamps');
      setIsRunning(false);
    },
    onError: (error) => {
      console.log('Error updating timestamp:', error);
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.buttonStop}
        // Disable the button when the mutation is in progress
        onPress={() => mutation.mutate()}
        disabled={mutation.isLoading}
      >
        <Text style={styles.text}>Stop</Text>
      </Pressable>
    </View>
  );
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
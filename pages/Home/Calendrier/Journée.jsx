import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { getTimestampsByDate } from "../../../utils/Api";
import { calculateDuration, convertToTimeFormat, calculateDailyDurations } from "../../../utils/dateFormating";

let Journée = ({ route, navigation }) => {

  const queryClient = useQueryClient();
  const date = route.params.day;
  const [timestamps, setTimestamps] = useState([]);

  const { refetch, isFetching, error, data } = useQuery(
    ["TimestampsByDate", date],
    ({ queryKey }) => getTimestampsByDate(queryKey[1]),
    {
      onSettled: (data, error) => { // Add error parameter to the callback for debugging
        console.log('Query settled with data:', data);
        if (data) setTimestamps(data); // We check if data is not undefined before setting the state
        console.log('Query error:', error);
      },
      onError: (err) => {
        console.error('Query error:', err); // Print error if any
      },
    }
  );

  const dailyDurations = calculateDailyDurations(timestamps);


  return (
    <View style={styles.container}>
      <FlatList
        data={timestamps}
        keyExtractor={(_, index) => index.toString()} // Removed unused 'item' variable
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <Text style={styles.text}>
              {item.dateTime} : {item.type}
            </Text>
          </Pressable>
        )}
        ListHeaderComponent={ // Use ListHeaderComponent to render the summary that will be fixed at the top
          <>

            <View style={styles.listItem}>
              <Text style={styles.text}>Total de la journée :</Text>
              <Text style={styles.text}>total trajet : {dailyDurations.trajet}</Text>
              <Text style={styles.text}>total travaux : {dailyDurations.travaux}</Text>
              <Text style={styles.text}>total pause : {dailyDurations.pause}</Text>
            </View>
            {isFetching && <Text style={styles.loading}>Chargement...</Text>}
            {timestamps.length === 0 && !isFetching && (
              <View style={styles.listItem}>
                <Text style={styles.text}>Il n'y a pas encore de Timestamps a cette date</Text>
              </View>
            )}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323264",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  listItem: {
    backgroundColor: "#46468C",
    margin: 8,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    // shadow
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  loading: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Journée;
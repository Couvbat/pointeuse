import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useQuery, useQueryClient } from "react-query";
import { getTimestampsByDate } from "../../../utils/Api";
import { formatCalendarDate, calculateDuration, calculateDurations, convertToTimeFormat } from "../../../utils/dateFormating";

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

let Calendrier = ({ navigation }) => {

  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState(formatCalendarDate(new Date())); // This will hold the selected day
  const [timestamps, setTimestamps] = useState([]); // This will hold the timestamps for the selected day

  console.log('init selected day:', selectedDay)
  console.log('init timestamps:', timestamps)

  const { refetch, isFetching, error, data } = useQuery(
    ["TimestampsByDate", selectedDay],
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
  const dailyDurations = calculateDurations(timestamps);

  return (
    <View style={styles.container}>
      <Calendar
        hideExtraDays={true}
        enableSwipeMonths={true}
        onMonthChange={(month) => { console.log('month changed', month) }
        }
        onDayPress={day => {
          queryClient.invalidateQueries(["TimestampsByDate", day.dateString]);
          setSelectedDay(day.dateString);
          getTimestampsByDate(day.dateString)
            .then(data => {
              setTimestamps(data); // This will update the timestamps state with the new data
            })
            .catch(error => {
              console.error(error);
            });
        }}
        markedDates={{
          [selectedDay]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      />
      <View style={styles.container}>
        {isFetching && <Text style={styles.text}>Récupération des données.</Text>}
        {error && <Text style={styles.text}>Erreur lors de la récupération des données.</Text>}
        {timestamps && timestamps.length === 0 && !isFetching && <Text style={styles.text}>Aucun timestamps à cette date.</Text>}

        {!isFetching && timestamps && timestamps.length > 0 && (
          <FlatList
            data={timestamps}
            keyExtractor={(_, index) => index.toString()} // Removed unused 'item' variable
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.text}>
                  {convertToTimeFormat(item.dateTime)} : {item.type} : {calculateDuration(item.created_at, item.updated_at)}
                </Text>
              </View>
            )}
            ListHeaderComponent={ // Use ListHeaderComponent to render the summary that will be fixed at the top
              <View style={styles.listItem}>
                <Text style={styles.text}>total trajet : {dailyDurations.trajet}</Text>
                <Text style={styles.text}>total travaux : {dailyDurations.travaux}</Text>
                <Text style={styles.text}>total pause : {dailyDurations.pause}</Text>
              </View>
            }
          />
        )}
      </View>
    </View> // Added closing tag for View
  );
};

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
});

export default Calendrier;
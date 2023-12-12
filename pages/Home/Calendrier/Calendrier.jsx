import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useQuery, useQueryClient } from "react-query";
import { getTimestampsByDate } from "../../../utils/Api";
import { formatCalendarDate,calculateDuration } from "../../../utils/dateFormating";

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
      <View>
        <Text style={styles.text}>Selected date: {selectedDay}</Text>
        {!isFetching && timestamps && timestamps.length > 0 &&
          <>
            <Text style={styles.text}>Timestamps nb: {timestamps.length}</Text>
            <Text style={styles.text}>Timestamps ids: {timestamps.map(timestamp => `${timestamp.id},`)}</Text>
            <Text style={styles.text}>Timestamps duree: {timestamps.map(timestamp => `${calculateDuration(timestamp.created_at,timestamp.updated_at)},`)}</Text>
          </>
        }
      </View>
    </View>
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
});

export default Calendrier;
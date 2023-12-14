import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useQuery, useQueryClient } from "react-query";
import { getTimestampsByMonth } from "../../../utils/Api";
import { formatCalendarDate, calculateMonthlyTotalDurations } from "../../../utils/dateFormating";

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
  const [selectedMonth, setSelectedMonth] = useState(formatCalendarDate(new Date())); // This will hold the selected day
  const [timestamps, setTimestamps] = useState([]); // This will hold the timestamps for the selected month

  console.log('init selected day:', selectedMonth)
  console.log('init timestamps:', timestamps)

  const { refetch, isFetching, error, data } = useQuery(
    ["TimestampsByMonth", selectedMonth],
    ({ queryKey }) => getTimestampsByMonth(queryKey[1]),
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

  const monthlyDurations = calculateMonthlyTotalDurations(timestamps);

  return (
    <View style={styles.container}>
      <Calendar
        style={{
          margin: 10,
          height: 380,
          borderRadius: 20
        }}
        hideExtraDays={true}
        enableSwipeMonths={true}
        onMonthChange={(month) => {
          console.log('month changed', month)
          queryClient.invalidateQueries(["TimestampsByMonth", month.dateString]);
          setSelectedMonth(month.dateString);
          getTimestampsByMonth(month.dateString)
            .then(data => {
              setTimestamps(data); // This will update the timestamps state with the new data
            })
            .catch(error => {
              console.error(error);
            });
        }
        }
        onDayLongPress={(day) => navigation.navigate("Journée", { day: day.dateString })}
        markedDates={{
          [selectedMonth]: { selected: true, disableTouchEvent: false, selectedDotColor: 'orange' }
        }}
      />
      <View style={styles.container}>

        {isFetching &&
          <Text style={styles.loading}>Chargement...</Text>
        }
        {error &&
          <View style={styles.listItem}>
            <Text style={styles.text}>Erreur lors de la récupération des données.</Text>
          </View>
        }

        {timestamps && timestamps.length === 0 && !isFetching &&
          <View style={styles.listItem}>
            <Text style={styles.text}>Il n'y a pas encore de Timestamp a cette date.</Text>
          </View>
        }

        {!isFetching && timestamps && timestamps.length > 0 && (
          <View style={styles.listItem}>
            <Text style={styles.text}>Total du mois :</Text>
            <Text style={styles.text}>trajet : {monthlyDurations.trajet}</Text>
            <Text style={styles.text}>travaux : {monthlyDurations.travaux}</Text>
            <Text style={styles.text}>pause : {monthlyDurations.pause}</Text>
          </View>
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
  loading: {
    marginVertical: 20,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

});

export default Calendrier;
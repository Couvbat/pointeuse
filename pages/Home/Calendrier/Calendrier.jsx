import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useQuery, useQueryClient } from "react-query";
import { getTimestampsByDate } from "../../../utils/Api";
import { formatCalendarDate } from "../../../utils/dateFormating";

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

let Calendrier = () => {
  const [selected, setSelected] = useState(formatCalendarDate(new Date()));
  const { refetch, isFetching, error, data } = useQuery(
    "TimestampsByDate",
    () => getTimestampsByDate(selected),
    {
      onSettled: (data) => {
        console.log('Query settled with data:', data); // Add this for debugging
        console.log(selected)
      }
    }
  );
  const timestamps = data || [];
  return (
    <View style={styles.container}>
      <Calendar
        hideExtraDays={true}
        enableSwipeMonths={true}
        onMonthChange={(month) => { console.log('month changed', month) }
        }
        onDayPress={day => {
          setSelected(day.dateString);
          refetch()
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      />
      <View>
        <Text style={styles.text}>Selected date: {selected}</Text>
        <Text style={styles.text}>Timestamps: {timestamps.length}</Text>
        <Text style={styles.text}>Timestamps: {timestamps.map(timestamp => timestamp.id)}</Text>
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
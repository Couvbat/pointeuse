import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Button, FlatList, RefreshControl, Pressable } from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createTimestamp, getLastTimestamp, updateTimestamp, getTimestamps } from "../../../utils/Api";
import { formatDateTimeAsDate, formatDateTimeAsTime } from "../../../utils/dateFormating";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icons from '@expo/vector-icons/FontAwesome5';


let Timestamps = ({ navigation }) => {
  const queryClient = useQueryClient();

  // Fetching timestamps for display
  const { refetch, isFetching, error, data } = useQuery("Timestamps", getTimestamps);
  const timestamps = data || [];

  // State for managing modal and date-time picker visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  // State for managing selected timestamp details
  const [type, setType] = useState('trajet');
  const [dateTime, setDateTime] = useState(new Date()); // Single state for date and time

  const handleDetails = (id) => {
    navigation.navigate("Timestamp", { id: id });
  };

  const deactivateLastTimestamp = useMutation(
    lastTimestamp => updateTimestamp(lastTimestamp.id, { isActive: false }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('LastTimestamp');
        queryClient.invalidateQueries('Timestamps');
      },
      // onError can be defined to handle errors
    }
  );

  const addTimestampMutation = useMutation(
    newTimestamp => createTimestamp(newTimestamp),
    {
      onSuccess: () => {
        setModalVisible(false);
        queryClient.invalidateQueries('Timestamps');
      },
      // onError can be defined to handle errors
    }
  );

  const handleDateChange = (_event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setDateTime(currentDate);
    setDatePickerVisible(false);
  };

  const handleTimeChange = (_event, selectedTime) => {
    const currentTime = selectedTime || dateTime;
    setDateTime(currentTime);
    setTimePickerVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);

    if (!modalVisible) { // When opening the modal, set dateTime to now
      setDateTime(new Date());
    }
  };

  const handleAddTimestamp = () => {
    // The following getLastTimestamp() logic should really be a part of creating new timestamps,
    // potentially implemented as a transaction on the backend side.
    getLastTimestamp().then((lastTimestamp) => {
      if (lastTimestamp && lastTimestamp.isActive === 1) {
        deactivateLastTimestamp.mutate(lastTimestamp);
      }
    });

    const formattedDateTime = formatDateTimeAsDate(dateTime) + ' ' + formatDateTimeAsTime(dateTime);
    const newTimestamp = {
      type: type,
      dateTime: formattedDateTime,
      isActive: 1,
    };
    addTimestampMutation.mutate(newTimestamp);
  };

  return (
    <View style={styles.container}>
      {isFetching && <Text style={styles.loading}>Chargement...</Text>}
      {error && <Text style={styles.error}>{error.message}</Text>}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalView}>
          {/* Rest of modal content */}
          {/* Date Picker */}
          <Pressable
            style={styles.modalItem}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.DateTimePicker}>{formatDateTimeAsDate(dateTime)}</Text>
          </Pressable>
          {datePickerVisible && (
            <DateTimePicker
              mode="date"
              value={dateTime}
              onChange={handleDateChange}
              display="default"
            />
          )}

          {/* Time Picker */}
          <Pressable
            style={styles.modalItem}
            onPress={() => setTimePickerVisible(true)}
          >
            <Text style={styles.DateTimePicker}>{formatDateTimeAsTime(dateTime)}</Text>
          </Pressable>
          {timePickerVisible && (
            <DateTimePicker
              mode="time"
              value={dateTime}
              onChange={handleTimeChange}
              display="default"
            />
          )}

          {/* Add Button */}
          <Button title="Ajouter" onPress={handleAddTimestamp} />
        </View>
      </Modal>

      {/* List of Timestamps */}
      {timestamps.length === 0 && !isFetching && (
        <Text style={styles.empty}>Il n'y a pas encore de Timestamps</Text>
      )}

      <FlatList
        data={timestamps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={item.isActive === 1 ? styles.activeItem : styles.listItem}
            onPress={() => navigation.navigate("Timestamp", { id: item.id })}
          >
            <Text style={styles.text}>
              {item.dateTime} : {item.type}
            </Text>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch}/>
        }
      />

      {/* Add Timestamp Button */}
      <Button title="Ajouter un Timestamp" onPress={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323264",
  },
  loading: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  list: {
    flex: 1,
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
  ActiveItem: {
    backgroundColor: "#5555AA",
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
  text: {
    fontSize: 16,
    color: "white",
  },
  modalText: {
    fontSize: 16,
    color: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#323264",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    width: "100%",
    backgroundColor: "#46468C",
    margin: 8,
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    width: 32,
  },
  row: {
    marginTop: 16,
    flexDirection: "row",
  },
  DateTimePicker: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },
});

export default Timestamps;

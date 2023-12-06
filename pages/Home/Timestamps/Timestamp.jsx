import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTimestamp, updateTimestamp, deleteTimestamp } from "../../../utils/Api";
import {
  formatDateTime,
  formatDate,
  formatTime,
  convertDateFormat,
  calculateDuration
} from "../../../utils/dateFormating";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icons from '@expo/vector-icons/FontAwesome5';

let Timestamp = ({ route, navigation }) => {

  const { isFetching, error, data } = useQuery(
    "Timestamp",
    () => getTimestamp(route.params.id),
    {
      onSettled: (data) => {
        setType(data.type);
        const formattedDate = convertDateFormat(data.created_at);
        const dateParts = formattedDate.split(' ')[0].split('/');
        const timeParts = formattedDate.split(' ')[1].split(':');
        setDate(dateParts.join('/'));
        setTime(timeParts.join(':'));
        setDateTimeOBJ(
          new Date(
            parseInt(dateParts[2]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[0]),
            parseInt(timeParts[0]),
            parseInt(timeParts[1]),
            parseInt(timeParts[2])
          )
        );
      },
    }
  );
  const Timestamp = data || [];

  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [type, setType] = useState(Timestamp.type);
  const [date, setDate] = useState(Timestamp.date);
  const [time, setTime] = useState(Timestamp.time);
  const [dateTimeOBJ, setDateTimeOBJ] = useState();

  const handleDeleteTimestamp = (id) => {
    Alert.alert(
      "Supprimer le Timestamp",
      "Voulez-vous vraiment supprimer ce Timestamp ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => {
            deleteTimestamp(id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleDate = (_event, selectedDate) => {
    setDatePickerVisible(false);
    setDate(formatDate(selectedDate));
  };

  const handleTime = (_event, selectedTime) => {
    setTimePickerVisible(false);
    setTime(formatTime(selectedTime));
  };

  return (
    <View style={styles.container}>
      {isFetching && <Text style={styles.loading}>Chargement...</Text>}

      {error && <Text>Error: {error.message}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalItem}>
            <Text style={styles.modalText}>Type de Timestamp:</Text>
            <View style={styles.row}>
              <Pressable
                onPress={() => {
                  setType("trajet");
                }}
              >
                <Icons
                  name="truck"
                  size={48}
                  color={type == "trajet" ? "green" : "black"}
                />
              </Pressable>
              <View style={styles.spacer}></View>
              <Pressable
                onPress={() => {
                  setType("travaux");
                }}
              >
                <Icons
                  name="briefcase"
                  size={48}
                  color={type == "travaux" ? "green" : "black"}
                />
              </Pressable>
              <View style={styles.spacer}></View>
              <Pressable
                onPress={() => {
                  setType("pause");
                }}
              >
                <Icons
                  name="pause-circle"
                  size={48}
                  color={type == "pause" ? "green" : "black"}
                />
              </Pressable>
            </View>
          </View>
          <Pressable
            style={styles.modalItem}
            onPress={() => {
              setDatePickerVisible(true);
            }}
          >
            <Text style={styles.DateTimePicker}>{date}</Text>
          </Pressable>
          {datePickerVisible && (
            <DateTimePicker
              mode="date"
              value={dateTimeOBJ}
              onChange={handleDate}
            />
          )}

          <Pressable
            style={styles.modalItem}
            onPress={() => {
              setTimePickerVisible(true);
            }}
          >
            <Text style={styles.DateTimePicker}>{time}</Text>
          </Pressable>
          {timePickerVisible && (
            <DateTimePicker
              mode="time"
              value={dateTimeOBJ}
              onChange={handleTime}
            />
          )}
        </View>
      </Modal>

      <View style={styles.box}>
        <Text style={styles.text}>Type : {Timestamp.type}</Text>
        <Text style={styles.text}>Date : {convertDateFormat(Timestamp.created_at).split(' ')[0]}</Text>
        <Text style={styles.text}>Heure début: {convertDateFormat(Timestamp.created_at).split(' ')[1]}</Text>
        <Text style={styles.text}>Heure fin: {convertDateFormat(Timestamp.updated_at).split(' ')[1]}</Text>
        <Text style={styles.text}>durée: {calculateDuration(Timestamp.created_at, Timestamp.updated_at)}</Text>
      </View>

      <Button
        title="Supprimer"
        color="#B30000"
        onPress={() => {
          handleDeleteTimestamp(Timestamp.id);
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323264",
  },
  box: {
    flex: 1,
    marginVertical: 150,
    marginHorizontal: 25,
    backgroundColor: "#46468C",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    marginVertical: 10,
    color: "#FFFFFF",
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
  DateTimePicker: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },
  spacer: {
    width: 64,
  },
  row: {
    marginTop: 16,
    flexDirection: "row",
  },
});

export default Timestamp;

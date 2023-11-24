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
} from "../../../utils/dateFormating";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icons from "react-native-vector-icons/FontAwesome5";

let Timestamp = ({ route, navigation }) => {
  const { isLoading, error, data } = useQuery(
    "Timestamp",
    () => getTimestamp(route.params.id),
    {
      onSettled: (data) => {
        setType(data.type);
        setDate(data.date);
        setTime(data.time);
        setDateTimeOBJ(
          new Date(
            parseInt(data.date.split("/")[2]),
            parseInt(data.date.split("/")[1]) - 1,
            parseInt(data.date.split("/")[0]),
            parseInt(data.time.split(":")[0]),
            parseInt(data.time.split(":")[1]),
            parseInt(data.time.split(":")[2])
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

  const handleUpdateTimestamp = () => {
    const dateTime = formatDateTime(date, time);
    const newTimestamp = {
      type: type,
      date: date,
      time: time,
      dateTime: dateTime,
      isActive: true,
    };
    updateTimestamp(Timestamp.id, newTimestamp);
    setModalVisible(!modalVisible);

  };

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
      {isLoading && <Text style={styles.loading}>Chargement...</Text>}

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
          <Button
            title="Modifier"
            color="#17B890"
            onPress={() => {
              handleUpdateTimestamp();
            }}
          ></Button>
        </View>
      </Modal>

      <View style={styles.box}>
        <Text style={styles.text}>Date : {Timestamp.date}</Text>
        <Text style={styles.text}>Heure : {Timestamp.time}</Text>
        <Text style={styles.text}>Type : {Timestamp.type}</Text>
      </View>

      <Button
        title="Modifier"
        color="#56CBF9"
        onPress={() => {
          setModalVisible(true);
        }}
      ></Button>
      <Button
        title="Supprimer"
        color="#984447"
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
    backgroundColor: "#495867",
  },
  box: {
    flex: 1,
    marginVertical: 150,
    marginHorizontal: 25,
    backgroundColor: "#8899AA",
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
    marginVertical: 20,
    color: "#FFFFFF",
  },
  modalText: {
    fontSize: 16,
    color: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#495867",
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
    backgroundColor: "#8899AA",
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

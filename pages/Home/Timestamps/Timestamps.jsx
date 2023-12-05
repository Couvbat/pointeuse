import { useState } from "react";
import {
  Button,
  Modal,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createTimestamp, getTimestamps, getLastTimestamp, updateTimestamp } from "../../../utils/Api";
import {
  formatDate,
  formatTime,
  formatDateTime,
} from "../../../utils/dateFormating";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icons from "react-native-vector-icons/FontAwesome5"

let Timestamps = ({ navigation }) => {
  const { refetch, isLoading, error, data } = useQuery("Timestamps", () => getTimestamps());
  const Timestamps = data || [];

  const [now, setNow] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [type, setType] = useState('trajet');
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const handleDetails = (id) => {
    navigation.navigate("Timestamp", { id: id });
  };

  const handleAddTimestamp = () => {
    getLastTimestamp().then((lastTimestamp) => {
      if (lastTimestamp && lastTimestamp.isActive == 1) {
        const oldTimestamp = {
          isActive: false,
        };
        updateTimestamp(lastTimestamp.id, oldTimestamp);
      }
    });

    const dateTime = formatDateTime(date, time);
    const newTimestamp = {
      type: type,
      date: date,
      time: time,
      dateTime: dateTime,
      isActive: '1',
    };
    createTimestamp(newTimestamp);
    setModalVisible(!modalVisible);
    setType('trajet');
    setDate();
    setTime();
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
            <Text style={styles.modalText}>Type de Timestamp :</Text>
            <View style={styles.row}>
              <Pressable
                onPress={() => {
                  setType("trajet");
                }}
              >
                <Icons
                  name="truck"
                  size={48}
                  color={type == "trajet" ? "#5555AA" : "black"}
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
                  color={type == "travaux" ? "#5555AA" : "black"}
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
                  color={type == "pause" ? "#5555AA" : "black"}
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
            <DateTimePicker mode="date" value={now} onChange={handleDate} />
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
            <DateTimePicker mode="time" value={now} onChange={handleTime} />
          )}
          <Button
            title="Ajouter"
            color="#17B890"
            onPress={() => {
              handleAddTimestamp();
            }}
          ></Button>
        </View>
      </Modal>

      {Timestamps.length == 0 && !isLoading && (
        <Text style={styles.loading}>Il n'y a pas encore de Timestamps</Text>
      )}
      <FlatList
        data={Timestamps}
        style={styles.list}
        renderItem={({ item }) => (
          <>
            {item.isActive == 1 ? (
              <View style={styles.ActiveItem}>
                <Pressable
                  onPress={() => {
                    handleDetails(item.id);
                  }}
                >
                  <Text style={styles.text}>
                    {item.date} à {item.time} : {item.type}
                  </Text>
                </Pressable>
              </View>
            ) : (
            <View style={styles.listItem}>
              <Pressable
                onPress={() => {
                  handleDetails(item.id);
                }}
              >
                <Text style={styles.text}>
                  {item.date} à {item.time} : {item.type}
                </Text>
              </Pressable>
            </View>
          )}
          </>
        )}
        keyExtractor={(_item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      ></FlatList>

      <Button
        title="Ajouter un Timestamp"
        color="#17B890"
        onPress={() => {
          setModalVisible(true);
          setNow(new Date());
          setDate(formatDate(new Date()));
          setTime(formatTime(new Date()));
        }}
      />
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

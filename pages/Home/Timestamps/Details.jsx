import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useQuery } from "react-query";
import { getTimestamp, deleteTimestamp } from "../../../utils/Api";
import {
  formatDate,
  formatTime,
  convertDateFormat,
  calculateDuration
} from "../../../utils/dateFormating";
import Icons from '@expo/vector-icons/FontAwesome5';

/**
 * Renders the details of a timestamp.
 *
 * @param {Object} route - The route object containing the parameters.
 * @param {Object} navigation - The navigation object.
 * @returns {JSX.Element} - The JSX element representing the details of the timestamp.
 */
let Details = ({ route, navigation }) => {
  console.log("Details route.params.id:", route.params.id);
  const { isFetching, error, data } = useQuery(
    "Timestamp",
    () => getTimestamp(route.params.id),
    {
      onSettled: (data) => {
        setType(data.type);
        const formattedDate = convertDateFormat(data.created_at);
      },
    }
  );
  const Timestamp = data || [];

  const [modalVisible, setModalVisible] = useState(false);

  const [type, setType] = useState(Timestamp.type);

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
        </View>
      </Modal>

      <View style={styles.box}>
        <Text style={styles.text}>Type : {Timestamp.type}</Text>
        <Text style={styles.text}>Date : {convertDateFormat(Timestamp.created_at).split(' ')[0]}</Text>
        <Text style={styles.text}>Heure début : {convertDateFormat(Timestamp.created_at).split(' ')[1]}</Text>
        {Timestamp.updated_at && Timestamp.updated_at !== Timestamp.created_at &&
          <>
            <Text style={styles.text}>Heure fin : {convertDateFormat(Timestamp.updated_at).split(' ')[1]}</Text>
            <Text style={styles.text}>durée: {calculateDuration(Timestamp.created_at, Timestamp.updated_at)}</Text>
          </>
        }
      </View>

      <Button
        title="Supprimer"
        color="#FF0000"
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
});

export default Details;

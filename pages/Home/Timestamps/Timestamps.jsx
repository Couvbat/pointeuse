import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Button, FlatList, RefreshControl, Pressable } from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createTimestamp, getLastTimestamp, updateTimestamp, getTimestamps } from "../../../utils/Api";
import { formatDateTimeAsDate, formatDateTimeAsTime } from "../../../utils/dateFormating";
import Icons from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Renders a component for displaying and managing timestamps.
 *
 * @component
 * @param {Object} navigation - The navigation object for navigating between screens.
 * @returns {JSX.Element} The Timestamps component.
 */
let Timestamps = ({ navigation }) => {
  const queryClient = useQueryClient();

  // Fetching timestamps for display
  const { refetch, isFetching, error, data } = useQuery("Timestamps", getTimestamps);
  const timestamps = data || [];

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries('LastTimestamp');
      queryClient.invalidateQueries('Timestamps');
      refetch();
    }, [refetch])
  );

  // State for managing modal and date-time picker visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State for managing selected timestamp details
  const [type, setType] = useState('trajet');
  const [dateTime, setDateTime] = useState(new Date()); // Single state for date and time

  const deactivateLastTimestamp = useMutation(
    lastTimestamp => updateTimestamp(lastTimestamp.id, { isActive: '0' }),
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
        queryClient.invalidateQueries('LastTimestamp');
        queryClient.invalidateQueries('Timestamps');
      },
      // onError can be defined to handle errors
    }
  );

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
      if (lastTimestamp && lastTimestamp.isActive == '1') {
        deactivateLastTimestamp.mutate(lastTimestamp);
      }
    });

    const formattedDateTime = formatDateTimeAsDate(dateTime) + ' ' + formatDateTimeAsTime(dateTime);
    const newTimestamp = {
      type: type,
      dateTime: formattedDateTime,
      isActive: '1',
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
          <View style={styles.modalItem}>
            <Text style={styles.text}>Date : {formatDateTimeAsDate(dateTime)}</Text>
            <Text style={styles.text}>Heure : {formatDateTimeAsTime(dateTime)}</Text>
          </View>

        

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
            style={item.isActive == "1" ? styles.activeItem : styles.listItem}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <Text style={styles.text}>
              {item.dateTime} : {item.type}
            </Text>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
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
  activeItem: {
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
});

export default Timestamps;

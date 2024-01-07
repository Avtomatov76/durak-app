import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export default function ModalDisplay(props: any) {
  const [selectedOption, setSelectedOption] = useState(props.deckSize);
  // Show modal at the beginning to choose between 36 and 52 cards (or other options)
  // Upon choosing an option, hide modal and pass the option to the HomeScreen to continue

  // give user option to play more or to end
  // if play/finish - end the game and reset everything except the game count

  //console.log("--- selected option 1 --- : ", selectedOption);

  const handlePress = () => {
    if (selectedOption == "default") return;

    if (props.flag == "options") {
      props.selectDeckSize(selectedOption || 36);
    } else props.resetGame();
  };

  //
  // console.log("MODAL DISPLAY OPTIONS: ", props.flag);
  // console.log("MODAL DISPLAY VISIBLE: ", props.visible);
  //
  const displayOptions = () => {
    return (
      <View
        //style={{ padding: 0, margin: 0 }}
        style={styles.pickerContainer}
      >
        <Picker
          style={styles.pickerStyles}
          selectedValue={selectedOption}
          onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
        >
          <Picker.Item
            label="Russian Fool (36 cards)"
            value={36}
            //style={{ height: 60, backgroundColor: "red" }}
          />
          <Picker.Item label="Full deck (52 cards)" value={52} />
        </Picker>
      </View>
    );
  };

  //
  const displayLoserMessage = () => {
    return (
      <View style={{ flexDirection: "column" }}>
        {props.loser == "wash" ? (
          <Text style={styles.modalText}>No one is a fool! It's a wash!</Text>
        ) : (
          <>
            <Text style={styles.modalText}>And the fool is.....</Text>
            <Text style={styles.textStyle}>{props.loser}</Text>
          </>
        )}
      </View>
    );
  };
  //

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={styles.modalView}
    >
      {props.flag == "options" ? displayOptions() : displayLoserMessage()}
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={props.hideLoser}
      >
        <Text style={styles.btnText} onPress={handlePress}>
          Ok
        </Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: "30%",
    backgroundColor: "white",
    padding: 35,
    margin: 20,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  modalView: {
    justifyContent: "space-between",
    height: 150, //"33%",
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "red",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerStyles: {
    width: "70%",
    backgroundColor: "gray",
    color: "white",
  },
});

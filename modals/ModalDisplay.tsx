import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Modal, RadioButton } from "react-native-paper";

export default function ModalDisplay(props: any) {
  const [checked, setChecked] = useState(36);

  const handleSubmit = () => {
    if (props.flag == "options") {
      props.selectDeckSize(checked || 36);
    } else props.resetGame();
    props.hideLoser;
  };

  const handlePress = (option: any) => {
    setChecked(parseInt(option));
    console.log("OPTION selected: ", option);
  };

  const displayOptions = () => {
    return (
      <View style={styles.pickerContainer}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
          onPress={() => handlePress("36")}
        >
          <RadioButton
            value={checked.toString()}
            status={checked.toString() == "36" ? "checked" : "unchecked"}
            onPress={() => handlePress("36")}
          />
          <Text style={{ padding: 5 }}>Russian Fool &#x28;36 cards&#x29;</Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
          onPress={() => handlePress("52")}
        >
          <RadioButton
            value={checked.toString()}
            status={checked.toString() == "52" ? "checked" : "unchecked"}
            onPress={() => handlePress("52")}
          />
          <Text style={{ padding: 5 }}>Full deck &#x28;52 cards&#x29;</Text>
        </Pressable>
      </View>
    );
  };

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

  return (
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={styles.modalView}
    >
      {props.flag == "options" ? displayOptions() : displayLoserMessage()}
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={handleSubmit}
      >
        <Text style={styles.btnText}>Ok</Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: "space-between",
    height: 200, //"33%",
    marginTop: 50,
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
    borderRadius: 50,
    padding: 10,
    elevation: 2,
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
    padding: 5,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
